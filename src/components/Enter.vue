<template>
    <div class="register">
        <h1>register or log in</h1>
        <input
            class="input"
            type="text"
            v-model="email"
            v-on:keyup.enter="register"
            placeholder="email"
        />
        <input
            class="input"
            type="password"
            v-model="password"
            v-on:keyup.enter="register"
            placeholder="password"
        />
        <div class="btn-container">
            <div class="submit" @click="register">register</div>
            <div class="submit" @click="login">login</div>
        </div>
        <div class="message">{{this.message}}</div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    require('firebase/auth')

    export default {
        name: 'register',
        data() {
            return {
                email: "",
                password: "",
                message: ""
            }
        },
        methods: {
            login() {
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .signInWithEmailAndPassword(this.email, this.password)
                        .then(
                            () => this.$router.push("/notes"),
                            (err) => this.message = err.message
                        )
                } else {
                    this.message = "Please enter a email & password"
                }
            },
            register() {
                if (this.email && this.password) {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.email, this.password)
                        .then(
                            () => {
                                this.message = "Account successfully created"
                                this.login()
                            },
                            (err) => this.message = err.message
                        )
                } else {
                    this.message = "Please enter a email & password"
                }
            }
        }
    }
</script>

<style scoped>
    .register {
        width: 50%;
        margin: 250px auto 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 4px double #e9bed3;
        padding: 30px;
        height: auto;
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
        margin: 30px 0;
        width: 100px;
        font-size: 16px;
        -webkit-user-select: none;
        -moz-user-select: none; 
    }
    .submit:hover {
        background: black;
        color: white;
    }
    .btn-container {
        width: 100%;
        max-width: 400px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
    }
    .message {
        font-size: 18px;
    }
    @media (max-width: 800px) {
        .btn-container {
            flex-direction: column;
        }
        .submit {
            margin: 10px;
            width: 50%;
        }
    }
    @media (max-width: 400px) {
        .register {
            border: 0;
            width: 100%;
            padding: 1px;
        }
        .btn-container {
            flex-direction: column;
        }
        .submit {
            margin: 10px;
            width: 50%;
        }
    }
</style>
