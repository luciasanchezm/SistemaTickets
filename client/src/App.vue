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

.delayed-1 {
  animation-delay: 1s;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
