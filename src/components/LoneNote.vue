<template>
    <div class="lone-note">
        <Note :note="this.note" />
    </div>
</template>

<script>
    import Note from './Note.vue'
    import axios from 'axios'

    export default {
        name: 'lone-note',
        components: { Note },
        data() {
            return {
                note: {}
            }
        },
        mounted() {
            const id = this.$route.params.id
            axios
                .get(`http://localhost:3300/notes/${id}/`)
                .then(res => (this.note = res.data))
                .catch(err => (alert(err)))
        }
    }
</script>

<style>

</style>
