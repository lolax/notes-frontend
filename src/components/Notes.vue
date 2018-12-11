<template>
    <div class="notes-component">
        <form class="form">New Note
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
            <div id="submit" class="btn" @click="addNote()">Submit</div>
        </form>
        <div class="message">{{message}}</div>
        <h2>Notes</h2>
        <section class="notes">
            <Note 
                v-for="note in notes" 
                :key="note.id" 
                :note="note"
                @edit="editNote"
                @delete="deleteNote"
            />
        </section>
    </div>
</template>

<script>
    import Note from './Note.vue'
    import axios from "axios"
    import { noteCRUD } from '../mixins.js'

    // axios.defaults.withCredentials = true
    export default {
        name:"notes",
        components: { Note },
        mixins: [noteCRUD],
        data() {
            return {
                notes: [],
                title: "",
                content: "",
                message: ""
            }
        },
        mounted() {
            axios
                .get("https://lola-notes-server.herokuapp.com/notes")
                .then(res => (this.notes = res.data))
                .catch(err => (this.message = err))
        },
        updated() {
            axios
                .get("https://lola-notes-server.herokuapp.com/notes")
                .then(res => (this.notes = res.data))
                .catch(err => (this.message = err))
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
        margin: 20px auto;
        padding: 15px;
    }
    .input {
        width: 80%;
        margin: 5px;
        padding: 10px;
    }
    .buttons {
        display: flex;
        justify-content: space-evenly;
    }
    .btn {
        border: 1px solid black;
        border-radius: 4px;
        cursor: pointer;
        padding: 5px;
        width: 70px;
    }
    .btn:hover {
        background: black;
        color: white;
    }
    #submit {
        width: 40%;
        margin: 10px;
    }
    .notes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .note {
        width: 200px;
        border: 1px solid black;
        padding: 10px 10px 20px;
        margin: 10px;
    }
    .title {
        padding-bottom: 5px;
        border-bottom: 4px double black;
    }
    .active {
        display: flex;
        flex-direction: column;
        margin: 10px;
        align-items: center;
    }
    .hidden {
        display: none;
    }
</style>