import axios from "axios"

export const global = {
    methods: {
        editNote(id, changes) {  
            axios
                .put(`https://lola-notes-server.herokuapp.com/restricted/notes/${id}`, changes,  {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.notes = this.notes.map(note => note.id === id ? res.data : note)))
                .catch(err => (console.log(err)))
                .then(() => this.$root.$emit("reloadResources"))
            this.editTitle = ""
            this.editContent = ""
            this.editId = 0
        },
        deleteNote(id) {
            axios
                .delete(`https://lola-notes-server.herokuapp.com/restricted/notes/${id}`,  {headers: { Authorization: localStorage.getItem("token") }})
                .then(res => (this.notes = res.data))
                .catch(err => (console.log(err)))
                .then(() => this.$root.$emit("reloadResources"))
                .then(this.$router.push("/notes"))
        },
        cloneNote(title, content) {
            const clone = { title, content }
            axios  
                .post("https://lola-notes-server.herokuapp.com/restricted/notes", clone,  {headers: { Authorization: localStorage.getItem("token") }})
                .then(() => (this.message = "Note cloned"))
                .catch(err => (console.log(err)))
                .then(() => this.$root.$emit("reloadResources"))

        }
    }
}
