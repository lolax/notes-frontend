<template>
    <div class="new-component">
        <form class="form">new note
            <input 
                class="input" 
                type="text"
                v-model="title" 
                v-on:keyup.enter="addNote"
                placeholder="Title"
            />
            <input 
                class="input" 
                type="text" 
                v-model="content" 
                v-on:keyup.enter="addNote"
                placeholder="Content"
            />
            <div id="submit" class="btn" @click="addNote">submit</div>
        </form>
        <div class="message">{{message}}</div>
    </div>
</template>

<script>
    import axios from "axios"
    import { global } from '../mixins.js'

    export default {
        name:"new",
        mixins: [global],
        data() {
            return {
                allNotes: [],
                filteredNotes: [],
                title: "",
                content: "",
                search: "",
                message: ""
            }
        },
        methods: {
            addNote() {
                if (this.title && this.content) {
                    const newNote = { title: this.title, content: this.content }
                    axios  
                        .post("https://lola-notes-server.herokuapp.com/restricted/notes", newNote, {headers: { Authorization: localStorage.getItem("token") }})
                        .then(() => (this.message = "Note added"))
                        .catch(() => (this.message= "Note failed to add"))
                        .then(() => this.$root.$emit("reloadResources"))
                    this.title = ""
                    this.content = ""
                } else {
                    this.message = "Please enter note title & content"
                }
            },
        }
    }
</script>

<style>
    .form {
        font-size: 18px;
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 170px auto 20px;
        padding: 15px;
    }
    .input {
        width: 80%;
        margin: 5px;
        padding: 10px;
    }
    .btn {
        border: 1px solid black;
        border-radius: 4px;
        cursor: pointer;
        padding: 8px;
        width: 70px;
        -webkit-user-select: none;
        -moz-user-select: none; 
    }
    .btn:hover {
        background: black;
        color: white;
    }
    #submit {
        width: 40%;
        margin: 30px;
        -webkit-user-select: none;
        -moz-user-select: none; 
    }
    .message {
        height: 20px;
        font-size: 18px;
        margin-bottom: 20px;
    }
</style>