
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import styles from "./Filter.module.css";

export interface Filter {
    name: string,
    capital: string,
    region: string,
    timezone: string
}

interface FilterProps {
    regions: string[],
    timezones: string[],
    filters: Filter,
    onChange: (newFilters: Filter) => void
}

export default (props: FilterProps) => {
    const filters: Filter = props.filters;

    return (
        <div className={styles.filter}>
            <TextField id="filter-name" label="Country" variant="standard" value={filters.name} onChange={(e) => props.onChange({ ...filters, name: e.target.value })} />
            <TextField id="filter-capital" label="Capital city" variant="standard" value={filters.capital} onChange={(e) => props.onChange({ ...filters, capital: e.target.value })} />
            <FormControl variant="standard">
                <InputLabel>Region</InputLabel>
                <Select id="filter-region" className={styles.filterSelect} value={filters.region} onChange={(e) => { props.onChange({ ...filters, region: e.target.value }) }}>
                    <MenuItem value="">Clear</MenuItem>
                    {
                        props.regions?.map((region) => <MenuItem key={region} value={region}>{region}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <FormControl variant="standard">
                <InputLabel>Timezone</InputLabel>
                <Select id="filter-timezone" className={styles.filterSelect} value={filters.timezone} onChange={(e) => { props.onChange({ ...filters, timezone: e.target.value }) }}>
                    <MenuItem value="">Clear</MenuItem>
                    {
                        props.timezones?.map((timezone) => <MenuItem key={timezone} value={timezone}>{timezone}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <Button variant="outlined" onClick={() => {props.onChange({name: "", capital: "", region: "", timezone: ""})}}>Clear</Button>
        </div>
    )
}
