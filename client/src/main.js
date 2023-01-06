import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createStore } from "vuex";

import App from "./App.vue";
import DomainList from "./components/DomainList";
import DomainView from "./components/DomainView";

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{path: "/domains", name: "Domains", component: DomainList},
		{path: "/domains/:domain", props: true, component: DomainView},
		{path: "/", redirect: "/domains"}
	]
});

const store = createStore({
	state: {
		items: {
			prefix: [],
			sufix: []
		},
		domains: []
	},
	mutations: {
		addItem(state, payload) {
			const { item, newItem } = payload;
			state.items[item.type].push(newItem);
		},
		deleteItem(state, payload) {
			const { item } = payload;
			state.items[item.type].splice(state.items[item.type].indexOf(item), 1);
		},
		setItems(state, payload) {
			const { items, type } 	= payload;
			state.items[type] 		= items;
		},
		setDomains(state, payload) {
			const { domains } 	= payload;
			state.domains 		= domains;
		}
	},
	actions: {
		async addItem(context, payload) {
			const item = payload;

			const myHeaders = new Headers();
			myHeaders.append("content-type", "application/json; charset=utf-8");
			myHeaders.append("Access-Control-Allow-Origin", "*");

			const options = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify({
					query: ` 
						mutation ($item: ItemInput) {
							newItem: saveItem(item: $item) {
								id
								type
								description
							}
						}
					`,
					variables: {
						item
					}
				})
			};

			fetch("http://localhost:4000", options)
				.then(response => response.json())
				.then(res => {
					const query 	= res.data;
					const newItem 	= query.newItem;
					context.commit("addItem", { item, newItem });
					context.dispatch("generateDomains");
				});
		},
		async getItems(context, payload) {
			const type = payload;

			const myHeaders = new Headers();
			myHeaders.append("content-type", "application/json; charset=utf-8");
			myHeaders.append("Access-Control-Allow-Origin", "*");

			const options = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify({
					query: `
						query ($type: String) {
							items: items (type: $type) {
								id
								type
								description
							}
						}
					`,
					variables: {
						type
					}
				})
			};

			return fetch("http://localhost:4000", options)
				.then(response => response.json())
				.then(res => {
					const query 				= res.data;
					context.commit("setItems", { items: query.items, type } );
				});
		},
		async deleteItem(context, payload) {
			const item 		= payload;
			const myHeaders = new Headers();
			myHeaders.append("content-type", "application/json; charset=utf-8");
			myHeaders.append("Access-Control-Allow-Origin", "*");

			const options = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify({
					query: `
						mutation ($id: String) {
							deleteItem(id: $id)
						}
					`,
					variables: {
						id: item.id
					}
				})
			};

			return fetch("http://localhost:4000", options)
				.then(() => {
					context.commit("deleteItem", { item });
					context.dispatch("generateDomains");
				});
		},
		async generateDomains(context) {
			const myHeaders = new Headers();
			myHeaders.append("content-type", "application/json; charset=utf-8");
			myHeaders.append("Access-Control-Allow-Origin", "*");

			const options = {
				method: "POST",
				headers: myHeaders,
				body: JSON.stringify({
					query: `
						mutation {
							domains: generateDomains {
								name,
								link,
								available
							}
						}
					`
				})
			};

			return fetch("http://localhost:4000", options)
				.then(response => response.json())
				.then(res => {
					const query 			= res.data;
					context.commit("setDomains", { domains: query.domains });
				});
		}
	}
});

Promise.all([
	store.dispatch("getItems","prefix"),
	store.dispatch("getItems","sufix")
]).then(() => {
	store.dispatch("generateDomains");
});

createApp(App)
	.use(store)
	.use(router)
	.mount("#app");

