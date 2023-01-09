import ItemService from "../service/service.js";
import dns from "dns";

export const isDomainAvaiable = function (url) {
    return new Promise(function (resolve, reject) {
        dns.resolve(url, function (error) {
            if(error) resolve(true);
            else resolve(false);
        }) 
    });
}

export const resolvers = {
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