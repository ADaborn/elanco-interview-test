
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardMedia, Grid2 as Grid, Skeleton, Typography } from "@mui/material";
import styles from "./CountryList.module.css";

interface CountryListProps {
    isLoading?: boolean,
    countries?: Country[]
}

interface Country {
    flag: string,
    name: string;
    timezone: string,
    region: string,
    code: string
}

const skeletonArray = Array.from(Array(10).keys()); // Creates an array for 1...n

const Skeletons = () => (
    <div className={styles.skeletonContainer}>
        {
            skeletonArray.map((s) => <Skeleton key={s} variant="rounded" width="232px" height="206px" data-testid="skeleton" />)
        }
    </div>
);

export default function CountryList({ isLoading, countries }: CountryListProps) {
    if (isLoading) return <Skeletons />;

    return (<Grid container data-testid="countrylist">
        {
            !!countries &&
            countries.map((country: Country) => (
                <Grid key={country.name} data-testid="country">
                    <Link href={`/country/${country.code}`} data-testid="anchor">
                        <Card className={styles.card} sx={{ boxShadow: 12 }}>
                            <CardMedia className={styles.media}>
                                <Image alt={`Flag of ${country.name}`} src={country.flag} style={{ objectFit: "cover" }} width="200" height="100" data-testid="flagimage" />
                            </CardMedia>
                            <CardContent>
                                <Typography variant="h6" gutterBottom className={styles.title}>{country.name}</Typography>
                                <Typography variant="caption">{country.region}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
    </Grid>);
}



