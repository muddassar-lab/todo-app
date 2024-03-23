import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {

    schema: "http://localhost:8000/graphql",
    debug: true,
    documents: ["./src/lib/graphql/**/*.graphql"],
    noSilentErrors: true,
    generates: {
        "./src/lib/gql/": {
            preset: "client",
            config: {
                withHooks: true,
                scalars: {
                    DateTimeUtc: {
                        input: 'string',
                        output: 'string'
                    }
                }
            }
        }
    },
    ignoreNoDocuments: true,
};

export default config