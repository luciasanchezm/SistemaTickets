<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/categorias">Categorías</router-link> |
			<router-link to="/personal">Personal</router-link> |
			<router-link to="/tickets">Tickets</router-link>
		</div>
		<router-view class="container" />
		<notifications position="bottom center" />
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}

.fadeInUp {
	opacity: 0;
	transform: translateY(10px);
	animation: fadeInUp 0.4s forwards;
}

.fadeInDown {
	opacity: 0;
	transform: translateY(-10px);
	animation: fadeInUp 0.4s forwards;
}

.fadeInLeft {
	opacity: 0;
	transform: translateX(10px);
	animation: fadeInRight 0.4s forwards;
}

.fadeInRight {
	opacity: 0;
	transform: translateX(-10px);
	animation: fadeInRight 0.4s forwards;
}

.bounceIn {
	transform: scale(0, 0);
	animation: bounceIn 0.6s forwards;
}

.delayed-01 {
	animation-delay: 0.1s;
}
.delayed-02 {
	animation-delay: 0.2s;
}

@keyframes fadeInUp {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
@keyframes fadeInRight {
	to {
		opacity: 1;
		transform: translateX(0);
	}
}
@keyframes bounceIn {
	33% {
		transform: scale(1.1, 1.1);
	}
	66% {
		transform: scale(0.9, 0.9);
	}
	100% {
		transform: scale(1, 1);
	}
}
</style>
