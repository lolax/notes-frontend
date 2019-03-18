<template>
    <div id="main">
    <div class="nav">
        <router-link v-if="validated" class="link" to="/notes" exact>notes</router-link>
        <router-link v-if="validated" class="link" to="/new" exact>new</router-link>
        <div v-if="validated" class="link" @click="logout()">logout</div>
    </div>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from "axios"
    import firebase from 'firebase'
    require('firebase/auth')

    export default {
        name: "app",
        data() {
            return {
                validated: false,
            }
        },
        mounted() {
            if (localStorage.getItem('token')) {
                this.validated = true
            }
        },
        methods: {
            logout() {
                firebase
                .auth()
                .signOut()
                .then(
                    () => {
                        this.$router.push("/")
                        this.validated = false
                        localStorage.clear()
                    },
                    () => alert(err.message)
                )
            },
        }
    }
</script>

<style>
    #main {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: black;
        width: 100%;
        margin: 0;
    }

    .nav {
        width: 100%;
        margin: 0;
        padding: 40px 0;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        background-color: #e9bed3;
    }

    .link {
        margin: 0 20px;
        border: 1px solid #e9bed3;
        text-decoration: none;
        color: black;
        background: white;
        padding: 10px 15px;
        outline: 0;
        outline-offset: 0;
        transition: 300ms;
        cursor: pointer;
    }

    .link:hover {
        border: 1px solid black;
        outline: 1px solid black;
        outline-offset: 5px;
        transition: 300ms;
    }
</style>
