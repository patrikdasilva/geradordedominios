<template>
	<div>
		<div class="container">
			<div class="text-left">
				<router-link to="/domains">Voltar</router-link>
				<br>
				<h2>{{ domain }}</h2>
			</div>
			<div class="card">
				<div class="card-body">
					<ul class="list-group">
						<li class="list-group-item" v-for="domain in domains" v-bind:key="domain.extension">
							<div class="row">
								<div class="col-md-4">
									{{ domain.extension }}
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
		</div>
	</div>
</template>

<script>

export default({
	props: ["domain"],
	data() {
		return {
			domains: [],
		};
	},
	created() {
		const myHeaders = new Headers();
		myHeaders.append("content-type", "application/json; charset=utf-8");
		myHeaders.append("Access-Control-Allow-Origin", "*");
		
		const options = {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				query: ` 
				mutation ($name: String) {
					domains: generateDomain(name: $name) {
						name
						extension
						link
						available
					}
				}
				`,
				variables: {
					name: this.domain
				}
			})
		};
		
		fetch("http://localhost:4000", options)
			.then(response => response.json())
			.then(res => {
				const query = res.data;
				this.domains = query.domains;
			});
	}
});
</script>
