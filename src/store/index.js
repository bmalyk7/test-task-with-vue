import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    counter: 25,
    posts: [],
    name: '',
    page: 1,
    limit: 10,
    totalPages: 0,
    show: false,
  },
  mutations: {
      setPosts(state, posts){
          state.posts = posts
      },
      setTotalPages(state, pages){
          state.totalPages = pages
      },
      setPage(state, page){
          state.page = page
      },
      setName(state, name){
          state.name = name
      },
  },
  actions: {
   async fetchPosts({commit, state}){
      axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}?_page=${state.page}`).then(response => {
          let posts = response.data.map(post => {
              return {...post, show: false}
          })
          commit('setPosts', posts)
          commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
        }).catch(error => {
          alert(error)
      })
       axios.get(`https://jsonplaceholder.typicode.com/users/${state.page}`).then(response => {
          commit('setName',response.data.name)
        }).catch(error => {
           alert(error)
       })
    },
    async paginate({commit, state}, item){
        commit('setPage', item)
         axios.get(`https://jsonplaceholder.typicode.com/posts`,{
            params: {
                _limit: state.limit,
                _page: state.page,
            }
        }).then(response => {
                let posts = response.data.map(post => {
                    return {...post, show: false}
                })
                commit('setPosts', posts)
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
            }
        ).catch(error => {
            alert(error)
         })
         axios.get(`https://jsonplaceholder.typicode.com/users/${state.page}`).then(response => {
            commit('setName',response.data.name)
        }).catch(error => {
             alert(error)
         })
    },
    async removePost({commit, state}, id){
       let posts = [...state.posts].filter(post => post.id !== id)
       commit('setPosts', posts)
       //Kod w przypadku gdyby API rzeczywiście usuwało post
       //  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
       //  await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
       //      headers: {
       //          _limit: state.limit,
       //          _page: state.page,
       //      }
       //  }).then(response => {
       //      commit('setPosts', response.data)
       //  }).catch(error => {
        //             alert(error)
        //          })
    },
    toggleShow({commit, state}, id){
       let postToChange = [...state.posts].find(post => post.id === id)
       let indx =  [...state.posts].findIndex(post => post.id === id)
        postToChange = {...postToChange, show:!postToChange.show}
        let posts = [...state.posts]
        let postsReplace = posts.splice(indx, 1, postToChange)
        commit('setPosts', posts)
    }
  },
    getters: {
      modifiedPosts(state){
          return [...state.posts].map(post => {
              return {...post, name: state.name}
          })
      }
    }
})
