<template>

    <body class="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0" style="font-family:'Lato',sans-serif;">
    <header class="max-w-lg mx-auto">
        <a href="#">
            <h1 class="text-4xl font-bold text-white text-center">Match Cut</h1>
        </a>
    </header>

    <main class="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
            <h3 class="font-bold text-2xl">Welcome to Match Cut</h3>
            <p class="text-gray-600 pt-2">Sign in to your account.</p>
        </section>

        <section class="mt-10">
            <form class="flex flex-col" method="POST" action="#" @submit.prevent="register">
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="username">Username</label>
                    <input v-model="username" type="text" id="username" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>

                <li class="ml-6 pt-0 mb-6 text-red-500" v-if="username.length < 3">Username must be longer!</li>

                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                    <input v-model="email" type="text" id="email" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>

                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password1">Password</label>
                    <input v-model="password1" type="password" id="password1" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>

                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password2">Re-enter Password</label>
                    <input v-model="password2" type="password" id="password2" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>

                <div class="mb-3">
                    <li class="ml-6 pt-2 text-red-500" v-if="password1.length < 8">Password must contain at least 8 characters!</li>
                    <li class="ml-6 pt-2 text-red-500" v-if="!simPwUsername()">Password can't be similiar to username!</li>
                    <li class="ml-6 pt-2 text-red-500" v-if="!pwNumLet(password1)">Password must contain both a number & capital letter!</li>
                    <li class="ml-6 pt-2 text-red-500" v-if="(password1 !== password2)">Passwords must be the same!</li>
                </div>

                <div class="flex justify-end">
                    <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                </div>

                <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit" @click="pwStrength">Register</button>
            </form>
        </section>
    </main>

    <div class="max-w-lg mx-auto text-center mt-12 mb-6">
        <p class="text-white">Don't have an account? <a href="#" class="font-bold hover:underline">Sign up</a>.</p>
    </div>

    <footer class="max-w-lg mx-auto flex justify-center text-white">
        <a href="#" class="hover:underline">Contact</a>
        <span class="mx-3">•</span>
        <a href="#" class="hover:underline">Privacy</a>
    </footer>
</body>

</template>

<script>
export default {
    data() {
        return {
            email: '',
            username: '',
            usernameLength: false,
            password1: '',
            password2: '',
            passwordLength: false,
            passwordNum: false,
            passwordLet: false,
            passwordStrong: false,
            passwordUser: false,
            passwordConfirmed: false,
            makeNewUser: false
        }
    },
    methods: {
        pwStrength(){

            //validate username minimum 3 characters
            if(this.username.length > 2) {
                this.usernameLength = true;
            }

            //check if password is minimum 8 characters
            if(this.password1.length > 7) {
                this.passwordLength = true
            }

            //check if password contains an uppercase character and a numeric
            this.passwordNum = /\d/.test(this.password1);
            this.passwordLet = /[A-Z]/.test(this.password1);

            //if it does set passwordStrong to true
            if(this.passwordNum && this.passwordLet) {
                this.passwordStrong = true
            }

            //check to see if the password has the username included in or equal to it (NOT CASE SENSITIVE)
            if(this.username === this.password1 || this.password1.includes(this.username)) {
                this.passwordUser = false
            } else {
                this.passwordUser = true
            }

            //if the pw satisfies all above conditions set passwordConfirmed to true
            if(this.passwordLength && this.passwordStrong && this.passwordUser) {
                this.passwordConfirmed = true
            }

            //if password is valid and username is valid set makeNewUser to true 
            if(this.passwordConfirmed && this.usernameLength) {
                this.makeNewUser = true;
            }

        },
        pwNumLet(pw){

            //Function to add li item for error handling when pw doesnt have both capital and numeric

            this.passwordNum = /\d/.test(pw)
            this.passwordLet = /[A-Z]/.test(pw)

            if(this.passwordNum && this.passwordLet) {
                this.passwordStrong = true
                return true
            } else {
                this.passwordStrong = false
                return false
            }

        },
        simPwUsername(){

            //Function to add li item when pw includes or equals username

            var u = this.username.toLowerCase()
            var p = this.password1.toLowerCase()

            if(u === p || p.includes(u)) {
                this.passwordUser = false
                return false
            } else {
                this.passwordUser = true
                return true
            }

        },
        validUsername() {

            //Function to add li item when username length is less than 3 chars

            if(this.username.length > 2){
                this.username = this.username.toLowerCase()
                this.usernameLength = true
                return true
            } else {
                this.usernameLength = false
                return false
            }

        },
        async register() {
            if(this.makeNewUser === true){
                try {
                    const payload = {
                        username: this.username,
                        email: this.email,
                        password1: this.password1,
                        password2: this.password2
                    };
                    await this.$store.dispatch("registerUser", payload);
                    this.$router.push({ name: "Home" });
                } catch (err) {
                    console.error(err);
                }
            }
        }
    
    }
}
</script>

<style scoped>

    .body-bg {
            background-color: #9921e8;
            background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
    }

</style>
