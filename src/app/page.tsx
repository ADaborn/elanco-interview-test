"use client";
import styles from "./page.module.css";
import { gql, useQuery } from '@apollo/client'
import { Typography } from "@mui/material";
import { useState } from "react";
import CountryList from "./components/CountryList";
import Filters, { Filter } from "./components/Filter";

export const AllCountriesQuery = gql`
  query($region: String, $timezone: String, $name: String, $capital: String) {
    countries(region: $region, timezone: $timezone, name: $name, capital: $capital) {
      code
      flag
      name
      timezone
      region
    }
    regions
    timezones
  }
`;

export default function Home() {
  const [filters, setFilters] = useState<Filter>({ name: '', capital: '', region: '', timezone: '' });

  const { data, error, loading } = useQuery(AllCountriesQuery,
    {
      variables: filters
    }
  );

  if (error) return <h1>Ooops, something went wrong {error.message}</h1>

  const countries = data?.countries;
  const regions = data?.regions;
  const timezones = data?.timezones;

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Typography variant="h1">Countries</Typography>
        <Filters regions={regions} timezones={timezones} filters={filters} onChange={(newFilters: Filter) => { setFilters({ ...filters, ...newFilters }) }} />
        <CountryList isLoading={loading} countries={countries} />
      </main>
    </div>
  );
}


