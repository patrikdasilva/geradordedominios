import { ApolloServer }     from "apollo-server";
import { config }           from "dotenv";
import { typeDefs }         from "./src/schemas/item-schema.js";
import { resolvers }        from "./src/resolvers/item-resolver.js";
import connectToDatabase    from "./src/database/connection.js";

async function init () {
    config();

    connectToDatabase();

    const server = new ApolloServer({typeDefs, resolvers});
    server.listen();
}

init();