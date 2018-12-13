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
            <div id="submit" class="btn" @click="addNote">Submit</div>
        </form>
        <div class="message">{{message}}</div>
        <h2>Notes</h2>
        <input
            class="search"
            type="text"
            v-model="search"
            @input="filterNotes"
            placeholder="Search Notes"
        />
        <section class="notes">
            <Note 
                v-for="note in filteredNotes" 
                :key="note.id" 
                :note="note"
                @edit="editNote"
                @delete="deleteNote"
                @clone="cloneNote"
            />
        </section>
    </div>
</template>

<script>
    import Note from './Note.vue'
    import axios from "axios"
    import { global } from '../mixins.js'

    export default {
        name:"notes",
        components: { Note },
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
        mounted() {
            axios
                .get("https://lola-notes-server.herokuapp.com/notes")
                .then(res => (this.allNotes = res.data))
                .catch(err => (this.message = err))
                .then(() => this.filteredNotes = this.allNotes)

            this.$root.$on("reloadResources", () => {
                axios
                    .get("https://lola-notes-server.herokuapp.com/notes/")
                    .then(res => (this.allNotes = res.data))
                    .catch(err => (this.message = err))
                    .then(() => this.filteredNotes = this.allNotes)

            })
        },
        methods: {
            filterNotes() {
                let lowerCaseSearch = this.search.toLowerCase();
                this.filteredNotes = this.allNotes.filter(note => {
                    return (note.title.toLowerCase().includes(lowerCaseSearch) || note.content.toLowerCase().includes(lowerCaseSearch))
                })
            },
            addNote() {
                if (this.title && this.content) {
                    const newNote = { title: this.title, content: this.content }
                    axios  
                        .post("https://lola-notes-server.herokuapp.com/notes", newNote)
                        .then(res => (this.message = "Note added."))
                        .catch(err => (this.message = err))
                        .then(() => this.$root.$emit("reloadResources"))
                    this.title = ""
                    this.content = ""
                } else {
                    this.message = "Please enter note title & content."
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
        margin: 20px auto;
        padding: 15px;
    }
    .input {
        width: 80%;
        margin: 5px;
        padding: 10px;
    }
    .search {
        width: 30%;
        margin: 15px;
        padding: 10px;
        font-size: 18px;
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
</style>