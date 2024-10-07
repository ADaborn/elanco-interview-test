
import axios, { AxiosResponse } from 'axios'

type APICountry = {
    name: {
        common: string
        official: string
    }
    cca2: string
    capital: Array<string>
    region: string
    languages: {
        eng: string
    }
    maps: {
        googleMaps: string
    }
    timezones: Array<string>
    flags: {
        png: string
        svg: string
    }
    population: number
}

export class CountryData {
    name: string;
    lowercaseName: string;
    code: string;
    flag: string;
    region: string;
    timezone: string;
    population: number;
    languages: string;
    capital: string;
    lowercaseCapital: string;

    constructor(newCountry: APICountry) {
        this.name = newCountry.name.common;
        this.lowercaseName = newCountry.name.common.toLowerCase();
        this.code = newCountry.cca2;
        this.flag = newCountry.flags.png;
        this.region = newCountry.region;
        this.timezone = newCountry.timezones[0];
        this.population = newCountry.population;
        this.languages = newCountry.languages?.eng;
        this.capital = newCountry.capital?.[0];
        this.lowercaseCapital = this.capital?.toLowerCase();
    }
}

export interface CountryTable {
    [key: string]: CountryData;
}


export async function fetchCountries(): Promise<CountryData[]> {
    try {
        const axiosResponse: AxiosResponse<APICountry[]> = await axios.get<APICountry[]>('https://restcountries.com/v3.1/all')
        // Convert from API datatype to our own friendly datatype    
        return axiosResponse.data.map<CountryData>((apiCountry: APICountry) => new CountryData(apiCountry));
    } catch (error) {
        throw `Error retrieving country information ${error.message}`;
    }
}

export function cleanCountry(): CountryData {
    return
}
