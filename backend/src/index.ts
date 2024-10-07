import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { fetchCountries } from './countries.js';
import { CountryData, CountryTable } from './countries.js';


const typeDefs = `#graphql
  type Country {
    code: String
    name: String
    flag: String
    region: String
    timezone: String
    population: String
    currency: String
    languages: String
    capital: String
  }

  type Query {
    countries(region: String, timezone: String, name: String, capital: String): [Country]
    country(code: String!): Country
    regions: [String]
    timezones: [String]
  }
`;

interface Filter {
  name: string,
  capital: string,
  region: string,
  timezone: string
}


// Filters the countries, returning an array of countries that match
async function filterCountries(filter: Filter) {
  filter.name = filter.name?.toLowerCase();
  filter.capital = filter.capital?.toLowerCase();

  // Debug - add a 2second delay for front-end testing
  // await (() => new Promise(res=>setTimeout(res,2000)))();

  // Filter the bulkCountries array. Return false if a filter is present, but the country doesn't match it
  const filteredCountries: CountryData[] = bulkCountries.filter<CountryData>((country): country is CountryData => {
    if (!!filter.name && !country.lowercaseName.includes(filter.name)) return false;
    if (!!filter.capital && !country.lowercaseCapital?.includes(filter.capital)) return false;
    if (!!filter.region && country.region !== filter.region) return false;
    if (!!filter.timezone && country.timezone !== filter.timezone) return false;
    return true;
  });
  return filteredCountries;
}

// Download country data from API
const bulkCountries: CountryData[] = await fetchCountries()
bulkCountries.sort((a: CountryData, b: CountryData) => a.name.localeCompare(b.name))
console.log(`Countries downloaded: ${bulkCountries?.length}`)

// Cleanse the data to make it easier to use in the resolvers
const countries: CountryTable = {};
const regions: String[] = [];
const timezones: String[] = [];

// Create country table, keyed on the country code
bulkCountries.forEach((country: CountryData) => {
  countries[country.code] = country;

  // If the regions list DOESN'T contain this region, add it
  if (!regions.some(region => region === country?.region))
    regions.push(country.region);

  // If the timezone doesn't exist in the list, add it
  if (!timezones.some(timezone => timezone === country?.timezone))
    timezones.push(country.timezone);

})
regions.sort();
timezones.sort();


// Apollo resolvers for the 4 different queries
const resolvers = {
  Query: {
    countries: (_parent: any, args: Filter) => filterCountries(args),
    country: (_parent: any, args: { code: string }) => countries[args.code],
    regions: () => regions,
    timezones: () => timezones
  },
};

interface MyContext {
  token?: String;
}

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  '/',
  cors<cors.CorsRequest>(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  express.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);