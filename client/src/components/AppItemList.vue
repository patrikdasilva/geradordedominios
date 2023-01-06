<template>
	<div class="hello">
		<h5>{{title}} <span class="badge bg-info">{{ items.length }}</span></h5>
		<div class="card">
			<div class="card-body">
				<ul class="list-group">
					<li class="list-group-item" v-for="item in items" v-bind:key="item.id">
						<div class="row">
							<div class="col-md">
								{{ item.description }}
							</div>
							<div class="col-md text-end">
								<button class="btn btn-danger" v-on:click="deleteItem(item)">
									<i class="fa fa-trash"></i>
								</button>
							</div>
						</div>
					</li>
				</ul>
				<br>
				<div class="input-group">
					<input type="text" class="form-control" placeholder="Digite o item" v-model="description" v-on:keyup.enter="addItem(type, description)">
					<button class="btn btn-info" v-on:click="addItem(type, description)">
						<i class="fa fa-plus"></i>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ["items", "title", "type"],
	data() {
		return {
			description: ""
		};
	},
	methods: {
		addItem(type, description) {
			this.$emit("addItem", {
				type,
				description
			});
			this.description = "";
		},
		deleteItem(description) {
			this.$emit("deleteItem", description);
		}
	}
};
</script>

<style scoped>
</style>
