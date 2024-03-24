import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {removeTypenameFromVariables} from "@apollo/client/link/remove-typename";

const httpLink = createHttpLink({
    uri: 'http://127.0.0.1:8000/graphql',
});

const authLink = setContext((_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('access_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

const removeTypenameLink = removeTypenameFromVariables();

export const client = new ApolloClient({
    link: authLink.concat(httpLink).concat(removeTypenameLink),
    cache: new InMemoryCache()
});