import axios from "axios"

export const global = {
    methods: {
        editNote(id, changes) {  
            axios
                .put(`https://lola-notes-server.herokuapp.com/notes/${id}`, changes)
                .then(res => (this.notes = this.notes.map(note => note.id === id ? res.data : note)))
                .catch(err => (this.message = err))
                .then(() => this.$root.$emit("reloadResources"))
            this.editTitle = ""
            this.editContent = ""
            this.editId = 0
        },
        deleteNote(id) {
            axios
                .delete(`https://lola-notes-server.herokuapp.com/notes/${id}`)
                .then(res => (this.notes = res.data))
                .catch(err => (this.message = err))
                .then(() => this.$root.$emit("reloadResources"))
                .then(this.$router.push("/notes"))
        },
        cloneNote(title, content) {
            const clone = { title, content }
            axios  
                .post("https://lola-notes-server.herokuapp.com/notes", clone)
                .then(res => (this.message = "Note cloned"))
                .catch(err => (this.message = err))
                .then(() => this.$root.$emit("reloadResources"))

        }
    }
}
