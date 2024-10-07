"use client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo";

export default function (props:any) {
    return (
        <>
            <ApolloProvider client={apolloClient}>
                {props.children}
            </ApolloProvider>
        </>
    )

}