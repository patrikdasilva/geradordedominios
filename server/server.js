import { ApolloServer, gql } from "apollo-server";
import dns from "dns";
import connectToDatabase from "./src/database/connection.js";
import { config } from "dotenv";
import ItemService from "./src/service/service.js";

config();

connectToDatabase();

const typeDefs = gql`
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

const isDomainAvaiable = function (url) {
    return new Promise(function (resolve, reject) {
        dns.resolve(url, function (error) {
            if(error) resolve(true);
            else resolve(false);
        }) 
    });
}

const resolvers = {
    Query: {
        async items(_, args) {
            return await ItemService.getItemsByType(args.type);
        },
    },
    Mutation: {
        async saveItem(_, args) {
            return await ItemService.create(args.item);
        },
        async deleteItem(_, args) {
            return await ItemService.delete(args.id);
        },
        async generateDomains() {
			const  domains = [];
            for(const prefix of await ItemService.getItemsByType("prefix")) {
				for(const sufix of await ItemService.getItemsByType("sufix")) {
					const name  = prefix.description + sufix.description;	
					const url   = name.toLocaleLowerCase();
					const link  = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=.com.br&domainCycle=2`;
                    const available = await isDomainAvaiable(`${url}.com.br`);

					domains.push({
						name,
						link,
                        available
					});
				}
			}

            return domains;
        },
        async generateDomain(_, args) {
            const domains       = [];
            const name          = args.name;
            const extensions    = [".com.br", ".com", ".net", ".net"];

            for(const extension of extensions) {
                const url       = name.toLocaleLowerCase();
                const link      = `https://cart.hostgator.com.br/?pid=d&sld=${url}&tld=${extension}&domainCycle=2`;
                const available = await isDomainAvaiable(`${url}${extension}`);
              
                domains.push({
                    name,
                    extension,
                    link,
                    available
                });
            }

            return domains;
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen();