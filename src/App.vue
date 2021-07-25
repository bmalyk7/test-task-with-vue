<template>
  <div id="nav">
    <div class="post" v-for="post in this.$store.getters.postsPerPage" :key="post.id">
      <h1>{{this.$store.state.name}}</h1>
      <h2>Title:<i>{{post.title}}</i></h2>
      <span v-if="!post.show">
        {{post.body.slice(0, 10)}}
        <span @click="this.$store.dispatch('toggleShow', post.id)"><strong>Show more</strong></span>
      </span>
      <span v-else>
        {{post.body}}
        <span @click="this.$store.dispatch('toggleShow', post.id)"><strong>Hide</strong></span>
      </span>
      <button
          class="delete_btn"
          @click="this.$store.dispatch('removePost', post.id)">
        Delete
      </button>
    </div>
    <ul class="pagination-wrapper">
    <li class="pagination-item" @click="this.$store.dispatch('paginate', item)" v-for="item in this.$store.getters.pagItems" :key="item">
      {{item}}
    </li>
    </ul>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('fetchPosts')
  }
}
</script>

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
.post{
  padding: 10px 15px 30px 15px;
  border: 2px solid lawngreen;
  margin: 50px auto;
  width: 600px;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
}
.pagination-wrapper{
  list-style-type: none;
  margin: 10px auto;
  display: flex;
  width: 450px;
  padding: 0;
  justify-content: space-between;
}
.pagination-item{
  padding: 10px 15px;
  background: dodgerblue;
  color: white;
  cursor: pointer;
}
.delete_btn{
  padding: 10px 15px;
  border-radius: 1rem;
  border:none;
  background: salmon;
  color: white;
  cursor: pointer;
}
</style>
