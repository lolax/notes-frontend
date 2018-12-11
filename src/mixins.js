import axios from "axios"
axios.defaults.withCredentials = true

export const noteCRUD = {
    methods: {
        addNote() {
            if (this.title && this.content) {
                const newNote = { title: this.title, content: this.content }
                axios  
                    .post("http://localhost:3300/notes", newNote)
                    .then(res => (this.notes.push(res.data)))
                    .catch(err => (this.message = err))
                this.title = ""
                this.content = ""
            } else {
                this.message = "Please enter note title & content."
            }
        },
        editNote(id, changes) {  
            axios
                .put(`http://localhost:3300/notes/${id}`, changes)
                .then(res => (this.notes = this.notes.map(note => note.id === id ? res.data : note)))
                .catch(err => (this.message = err))
            this.editTitle = ""
            this.editContent = ""
            this.editId = 0
        },
        deleteNote(id) {
            axios
                .delete(`http://localhost:3300/notes/${id}`)
                .then(res => (this.notes = res.data))
                .catch(err => (this.message = err))
                .then(this.$router.push("/notes"))
        }
    }
}
