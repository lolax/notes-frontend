<template>
    <div class="lone-note">
        <Note 
            :note="this.note" 
            @edit="editNote"
            @delete="deleteNote"
        />
    </div>
</template>

<script>
    import Note from './Note.vue'
    import { noteCRUD } from '../mixins.js'
    import axios from 'axios'

    export default {
        name: 'lone-note',
        components: { Note },
        mixins: [noteCRUD],
        data() {
            return {
                note: {}
            }
        },
        mounted() {
            const id = this.$route.params.id
            axios
                .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`)
                .then(res => (this.note = res.data))
                .catch(err => (alert(err)))
        },
        updated() {
            const id = this.$route.params.id
            axios
                .get(`https://lola-notes-server.herokuapp.com/notes/${id}/`)
                .then(res => (this.note = res.data))
                .catch(err => (alert(err)))
        }
    }
</script>

<style>

</style>
