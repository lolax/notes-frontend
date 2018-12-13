<template>
    <div class="register">
        <h1>Register</h1>
        <input
            class="input"
            type="text"
            v-model="username"
            v-on:keyup.enter="register"
            placeholder="Username"
        />
        <input
            class="input"
            type="text"
            v-model="password"
            v-on:keyup.enter="register"
            placeholder="Password"
        />
        <div class="submit" @click="register">Submit</div>
        <div>{{this.message}}</div>
    </div>
</template>

<script>
    export default {
        name: 'register',
        data() {
            return {
                username: "",
                password: "",
                message: ""
            }
        },
        methods: {
            register() {
                return this.username && this.password ? this.$router.push("/login") : this.message = "Please enter a username & password"
            }
        }
    }
</script>

<style scoped>
    .register {
        width: 40%;
        margin: 250px auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 4px double lavender;
        padding: 30px;
        height: 280px;
    }
    
    h1 {
        font-size: 24px;
        font-weight: normal;
    }

    .input {
        width: 80%;
        font-size: 18px;
        margin: 5px auto;
    }
    .submit {
        border: 1px solid black;
        border-radius: 4px;
        cursor: pointer;
        padding: 10px;
        margin: 15px 0;
        width: 100px;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none; 
    }
    .submit:hover {
        background: black;
        color: white;
    }
    .message {
        font-size: 18px;
        padding: 10px;
    }
</style>
