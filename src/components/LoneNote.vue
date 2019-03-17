<template>
    <div class="lone-note">
        <Note 
            :note="this.note" 
            @edit="editNote"
            @delete="deleteNote"
            @clone="cloneNote"
        />
        <div>{{this.message}}</div>
    </div>
</template>

<script>
    import Note from './Note.vue'
    import { global } from '../mixins.js'
    import axios from 'axios'

    export default {
        name: 'lone-note',
        components: { Note },
        mixins: [global],
        data() {
            return {
                note: {},
                message: ""
            }
        },
        mounted() {
            const id = this.$route.params.id
            axios
                // .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`, {headers: { Authorization: localStorage.getItem("token") }})
                .get(`http://localhost:3300/restricted/notes/${id}/`, {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.note = res.data))
                .catch(err => (this.message = "Note could not be retrieved"))
            this.$root.$on("reloadResources", () => {
                axios
                    // .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`, {headers: { Authorization: localStorage.getItem("token") }})
                    .get(`http://localhost:3300/restricted/notes/${id}/`, {headers: { Authorization: localStorage.getItem("token") }})
                    .then(res => (this.note = res.data))
                    .catch(err => (this.message = "Note could not be refreshed"))
            })
        }
    }
</script>

<style>
    .lone-note {
        margin-top: 170px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        align-items: center;
        word-wrap: normal;

    }
    .message {
        margin-top: 20px;
        height: 20px;
        font-size: 18px;
    }
</style>
