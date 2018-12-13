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
                .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`)
                .then(res => (this.note = res.data))
                .catch(err => (this.message = err))
            this.$root.$on("reloadResources", () => {
                axios
                    .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`)
                    .then(res => (this.note = res.data))
                    .catch(err => (this.message = err))
            })
        }
    }
</script>

<style>
    .lone-note {
        width: 100%;
        display: flex;
        padding-top: 30px;
        justify-content: center;
    }
</style>
