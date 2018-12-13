<template>
    <div class="note">
        <router-link :to="`/notes/${note.id}`">
            <h3 class="title">{{note.title}}</h3>
            <p class="content">{{note.content}}</p>
        </router-link>  
        <div class="buttons">
            <div class="btn" @click="startEdit(note.id)">Edit</div>
            <div class="btn" @click="$emit('delete', note.id)">Delete</div>
        </div>
        <div v-bind:class="[editId === note.id ? 'active' : 'hidden']">
            <input 
                class="input" 
                type="text"
                v-model="editTitle" 
                v-on:keyup.enter="submitEdit(note.id)"
            />
            <input 
                class="input" 
                type="text" 
                v-model="editContent" 
                v-on:keyup.enter="submitEdit(note.id)"
            />
            <div id="submit" class="btn" @click="submitEdit(note.id)">Submit</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "note",
        props: ["note"],
        data() {
            return {
                editTitle: "",
                editContent: "",
                editId: 0
            }
        },
        methods: {
            startEdit(id) {
                this.editId = id
                this.editTitle = this.note.title
                this.editContent = this.note.content
                
            },
            submitEdit(id) {
                if (this.editTitle && this.editContent) {
                    const changes = { title: this.editTitle, content: this.editContent, id }
                    this.$emit('edit', id, changes)
                    this.editId = 0
                    this.editTitle = ""
                    this.editContent = ""
                } else {
                    alert("please fix")
                }
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
        border: 0;
        background: white;
        padding: 0;
    }

   .note {
        width: 30%;
        border: 1px solid black;
        padding: 10px 10px 20px;
        margin: 10px;
    }
    .title {
        text-decoration: none;
        color: black;
        padding-bottom: 5px;
        border-bottom: 4px double black;
    }
    .content {
        text-decoration: none;
        color: black;
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
