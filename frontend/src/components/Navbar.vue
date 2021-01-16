<template>
    
    <header class="opacity-100 bg-app-accent border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-xl md:pb-4">

        <!-- Logo text or image -->
        <div class="flex items-center justify-between mb-4 md:mb-0">
            <h1 class="leading-none text-2xl text-white">
                <a class="font-semibold no-underline text-white hover:text-app-accent" href="#">
                Match Cut
                </a>
            </h1>

            <a class="text-black hover:text-orange md:hidden" href="#">
            <i class="fa fa-2x fa-bars"></i>
            </a>
        </div>

        <!-- Search field -->
        <form class="mb-4 w-full md:mb-0 md:w-1/4">
            <label class="hidden" for="search-form">Search...</label>
            <input class="placeholder-primary bg-app-accent border-2 shadow-lg p-2 rounded-lg shadow-inner w-full focus:border-app-primary focus:border-2 transition duration-500 hover:opacity-25 hover:border-app-primary transition duration-500" placeholder="Search" type="text">
             <button class="hidden">Submit</button>
        </form>

        <!-- Nav Bar -->
        <nav>
            <button class="invisible md:visible cursor-pointer text-white border-2 border-solid hover:border-double font-medium py-2 rounded shadow-lg hover:shadow-xl hover:bg-white hover:font-bold hover:text-app-accent transition duration-200" type="submit">
            <a class="m-6"> Login </a>
            </button>

            <a class="invisible md:visible text-white font-semibold py-2 m-4 hover:text-app-primary"> Register </a>
            
        </nav>

    </header>

</template>

<script>
export default {
    
}
</script>

<style>

</style>
