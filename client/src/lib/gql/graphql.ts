/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeUtc: { input: string; output: string; }
};

/** Root query type containing operations for retrieving data. */
export type Query = {
  __typename?: 'Query';
  /** Retrieve the authenticated user. */
  get_authenticated_user?: Maybe<User>;
  /** Retrieves todos associated with the authenticated user. */
  get_authenticated_user_todos?: Maybe<Array<Todo>>;
};

/** Represents a user in the system. */
export type User = {
  __typename?: 'User';
  /** The timestamp when the user was created (in UTC). */
  created_at: Scalars['DateTimeUtc']['output'];
  /** The email address of the user. */
  email: Scalars['String']['output'];
  /** The unique id of the user. */
  id: Scalars['ID']['output'];
  /** List of todos associated with the user. */
  todos?: Maybe<Array<Todo>>;
  /** The timestamp when the user was last updated (in UTC). */
  updated_at: Scalars['DateTimeUtc']['output'];
  /** The unique username of the user. */
  username: Scalars['String']['output'];
};

/** Represents a task or todo item. */
export type Todo = {
  __typename?: 'Todo';
  /** Timestamp indicating when the todo item was created (in UTC). */
  created_at: Scalars['DateTimeUtc']['output'];
  /** Description of the todo item. */
  description?: Maybe<Scalars['String']['output']>;
  /** id of the todo item. */
  id: Scalars['ID']['output'];
  /** Indicates whether the todo item is completed or not. */
  is_completed: Scalars['Boolean']['output'];
  /** Title of the todo item. */
  title: Scalars['String']['output'];
  /** Timestamp indicating when the todo item was last updated (in UTC). */
  updated_at: Scalars['DateTimeUtc']['output'];
  /** The user who owns this todo item. */
  user?: Maybe<User>;
  /** ID of the user associated with the todo item. */
  user_id: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a new todo item. */
  create_todo?: Maybe<Todo>;
  /** Deletes a todo item. */
  delete_todo?: Maybe<Todo>;
  /** Entry point for user login functionality. */
  login?: Maybe<LoginResponse>;
  /** Entry point for user registration functionality. */
  register?: Maybe<Scalars['String']['output']>;
  /** Updates an existing todo item. */
  update_todo?: Maybe<Todo>;
};


export type MutationCreate_TodoArgs = {
  input?: InputMaybe<CreateTodoInput>;
};


export type MutationDelete_TodoArgs = {
  input?: InputMaybe<DeleteTodoInput>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationRegisterArgs = {
  input?: InputMaybe<RegisterInput>;
};


export type MutationUpdate_TodoArgs = {
  input?: InputMaybe<UpdateTodoInput>;
};

/** Input object for creating a new todo item. */
export type CreateTodoInput = {
  /** Description of the todo item (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Title of the todo item (required, maximum 255 characters). */
  title: Scalars['String']['input'];
};

/** Input object for deleting a todo item. */
export type DeleteTodoInput = {
  /** ID of the todo item to be deleted (required, must be a valid UUID, and must exist in the database). */
  id: Scalars['ID']['input'];
};

/** Input object for user login credentials. */
export type LoginInput = {
  /** Device name from which the login is initiated. */
  device_name?: InputMaybe<Scalars['String']['input']>;
  /** Email address used for login. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Password associated with the email for login. */
  password?: InputMaybe<Scalars['String']['input']>;
};

/** Response object for user login operation. */
export type LoginResponse = {
  __typename?: 'LoginResponse';
  /** Access token for the authenticated user session. */
  access_token?: Maybe<Scalars['String']['output']>;
};

/** Input object for user login credentials. */
export type RegisterInput = {
  /** Email address used for registration. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Password associated with the email for registration. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Username used for registration. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Input object for updating an existing todo item. */
export type UpdateTodoInput = {
  /** New description of the todo item (optional). */
  description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the todo item to be updated (required, must be a valid UUID, and must exist in the database). */
  id: Scalars['ID']['input'];
  /** New completion status of the todo item (required). */
  is_completed: Scalars['Boolean']['input'];
  /** New title of the todo item (required, maximum 255 characters). */
  title: Scalars['String']['input'];
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Response object for user registration operation. */
export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  /** Message indicating the status or outcome of the registration operation. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}
