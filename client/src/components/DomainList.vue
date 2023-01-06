<template>
	<div>
		<div class="container">
			<div class="row">
				<div class="col-md">
					<AppItemList title="Prefixos" type="prefix" v-bind:items="items.prefix" v-on:addItem="addItem" v-on:deleteItem="deleteItem"/>
				</div>
				<div class="col-md">
					<AppItemList title="Sufixos" type="sufix" v-bind:items="items.sufix" v-on:addItem="addItem" v-on:deleteItem="deleteItem"/>
				</div>
			</div>
			<h5>Domínios <span class="badge bg-info">{{ domains.length }}</span></h5>
			<div class="card">
				<div class="card-body">
					<ul class="list-group">
						<li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
							<div class="row">
								<div class="col-md-4">
									{{ domain.name }}
								</div>
								<div class="col-md-4">
									<span class="badge bg-info">
										{{ (domain.available) ? "Dísponivel" : "Indisponível"}}
									</span>
								</div>
								<div class="col-md-4 text-end">
									<a v-bind:href="domain.link" target="blank" class="btn btn-info">
										<i class="fa fa-shopping-cart"></i>
									</a>
									&ensp;
									<button class="btn btn-info" @click="openDomain(domain)">
										<i class="fa fa-search"></i>
									</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<br>
		</div>
	</div>
</template>

<script>

import { mapActions, mapState } from "vuex";
import AppItemList from "./AppItemList";

export default {
	name: "DomainList",
	components: {
		AppItemList
	},
	data: function () {
		return {};
	},
	methods: {
		...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
		openDomain(domain) {
			this.$router.push({
				path: `/domains/${domain.name}`
			});
		}
	},
	computed: {
		...mapState(["items", "domains"])
	}
};
</script>

<style scoped>
</style>
