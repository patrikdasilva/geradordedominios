<template>
	<div>
		<div id="slogan" class="text-center">
			<h1>Gerador de domínios</h1>
			<h6 class="text-secondory">Gerador de nomes utilizando Graphql, Vuejs e nodejs</h6>
		</div>

		<div id="main">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

export default {
	name: "App",
};
</script>

<style>
#slogan {
	margin: 30px 0;
}

#main {
	background-color: #f1f1f1;
	padding: 30px 0;
}
</style>
