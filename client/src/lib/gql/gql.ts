/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation Login($input: LoginInput) {\n  login(input: $input) {\n    access_token\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout {\n    message\n  }\n}": types.LogoutDocument,
    "mutation Register($input: RegisterInput) {\n  register(input: $input) {\n    message\n  }\n}": types.RegisterDocument,
    "mutation CreateTodo($input: CreateTodoInput) {\n  create_todo(input: $input) {\n    id\n  }\n}": types.CreateTodoDocument,
    "mutation DeleteTodo($input: DeleteTodoInput) {\n  delete_todo(input: $input) {\n    id\n  }\n}": types.DeleteTodoDocument,
    "mutation UpdateTodo($input: UpdateTodoInput) {\n  update_todo(input: $input) {\n    id\n  }\n}": types.UpdateTodoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: LoginInput) {\n  login(input: $input) {\n    access_token\n  }\n}"): (typeof documents)["mutation Login($input: LoginInput) {\n  login(input: $input) {\n    access_token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout {\n    message\n  }\n}"): (typeof documents)["mutation Logout {\n  logout {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: RegisterInput) {\n  register(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation Register($input: RegisterInput) {\n  register(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTodo($input: CreateTodoInput) {\n  create_todo(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation CreateTodo($input: CreateTodoInput) {\n  create_todo(input: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTodo($input: DeleteTodoInput) {\n  delete_todo(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation DeleteTodo($input: DeleteTodoInput) {\n  delete_todo(input: $input) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateTodo($input: UpdateTodoInput) {\n  update_todo(input: $input) {\n    id\n  }\n}"): (typeof documents)["mutation UpdateTodo($input: UpdateTodoInput) {\n  update_todo(input: $input) {\n    id\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;