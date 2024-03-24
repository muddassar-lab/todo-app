import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


// Import the generated route tree
import {routeTree} from './routeTree.gen'
import {ApolloProvider} from "@apollo/client";
import {client} from "./lib/client/client.ts";
import {RecoilRoot} from "recoil";
import "./styles/index.css"

// Create a new router instance
const router = createRouter({routeTree})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <RecoilRoot>
                <ApolloProvider client={client}>
                    <RouterProvider router={router}/>
                </ApolloProvider>
            </RecoilRoot>
        </StrictMode>,
    )
}