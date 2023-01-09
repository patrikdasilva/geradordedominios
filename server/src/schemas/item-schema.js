import { gql } from "apollo-server";

export const typeDefs = gql`
    type Item {
        id: String,
        type: String,
        description: String
    }
    type Domain {
        name: String,
        extension: String,
        link: String,
        available: Boolean
    }
    type Query {
        items (type: String): [Item]
    }
    input ItemInput {
        type: String,
        description: String
    }
    type Mutation {
        saveItem(item :ItemInput): Item
        deleteItem(id: String): Boolean
        generateDomains: [Domain]
        generateDomain(name: String): [Domain]
    }
`;
