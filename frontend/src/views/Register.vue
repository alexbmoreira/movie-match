<template>
<!--
    <form @submit.prevent="register">  
        <div class="container">   
            <label>Email Address : </label>   
            <input v-model="email" type="text" placeholder="Enter Email" name="email" required>
            <label>Username : </label>   
            <input v-model="username" type="text" placeholder="Enter Username" name="username" required>  
            <label>Password : </label>   
            <input v-model="password1" type="password" placeholder="Enter Password" name="password1" required>  
            <label>Confirm Password : </label>   
            <input v-model="password2" type="password" placeholder="Enter Password Again" name="password2" required>
            <button type="submit">Register</button>    
        </div>   
    </form>
    -->

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
            <form class="flex flex-col" method="POST" action="#">
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="email">Email</label>
                    <input type="text" id="email" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>
                <div class="mb-6 pt-3 rounded bg-gray-200">
                    <label class="block text-gray-700 text-sm font-bold mb-2 ml-3" for="password">Password</label>
                    <input type="password" id="password" class="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3">
                </div>
                <div class="flex justify-end">
                    <a href="#" class="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a>
                </div>
                <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">Sign In</button>
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
            password1: '',
            password2: '',
        }
    },
    methods: {
    async register() {
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
</script>

<style scoped>

.body-bg {
            background-color: #9921e8;
            background-image: linear-gradient(315deg, #9921e8 0%, #5f72be 74%);
        }


/*

Body {  
  font-family: Calibri, Helvetica, sans-serif;  
  background-color: pink;  
}  
button {   
       background-color: #4CAF50;   
       width: 100%;  
        color: orange;   
        padding: 15px;   
        margin: 10px 0px;   
        border: none;   
        cursor: pointer;   
         }   
 form {   
        border: 3px solid #f1f1f1;   
    }   
 input[type=text], input[type=password] {   
        width: 100%;   
        margin: 8px 0;  
        padding: 12px 20px;   
        display: inline-block;   
        border: 2px solid green;   
        box-sizing: border-box;   
    }  
 button:hover {   
        opacity: 0.7;   
    }   
  
 .container {   
        padding: 25px;   
        background-color: lightblue;  
        width: 50%;
        margin: auto;
    }   
*/

</style>
