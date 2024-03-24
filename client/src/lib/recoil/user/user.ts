import {atom} from "recoil";
import {User} from "../../gql/graphql.ts";

export const User_Atom = atom<User | null>({
    key: "User_Atom",
    default: null
})