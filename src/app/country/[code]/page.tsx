"use client";
import { gql, useQuery } from '@apollo/client'
import styles from "./page.module.css"
import { Button, Skeleton, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const CountryQuery = gql`
    query($code: String!) {
        country(code: $code) {
            code
            flag
            name
            population
            region
            timezone
            capital
        }
    }
`;

interface FieldProps {
    fieldname: string,
    value: string
}

const Field = ({ fieldname, value }: FieldProps) => {
    if (fieldname === "__typename") return null;
    if (fieldname === "flag") return null;

    return (
        <div className={styles.field}>
            <Typography variant="h6">{fieldname}</Typography>
            <Typography variant="body1">{value}</Typography>
        </div>);
};

interface PageProps {
    params: {
        code: string
    }
}

export default function ({params:{code}}: PageProps) {
    const { data, error, loading } = useQuery(CountryQuery, { variables: { code } });

    if (loading) return (
        <div className={styles.page}>
            <Typography variant="h3">Loading. Please wait...</Typography>
            <Skeleton variant="rectangular" height="400px" width="400px" />
        </div>);

    if (error) return <h3>Ooops, something went wrong: {error.message}</h3>

    const country = data?.country;

    return (
        <div className={styles.page}>
            <div className={styles.imageContainer}>
                <Image src={country?.flag} fill alt={`Flag for ${country.name}`} />
            </div>
            <div>
                <Typography variant="h1">{country?.name}</Typography>
                <div className={styles.fields}>
                    {
                        Object.keys(country).map((key: string) => (
                            <Field fieldname={key} value={country[key]} />
                        ))
                    }
                </div>
                <Link href="/">
                    <Button variant="outlined">Back</Button>
                </Link>
            </div>
        </div>
    );
}