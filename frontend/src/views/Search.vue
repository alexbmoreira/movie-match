<template>
<div>
    <h1>{{search}}</h1>
    <h2>{{search_type}}</h2>
    <div :searchData = setData(placeholder)></div>
</div>
</template>

<script>

import searchAPI from '../api/movies'

export default {
    name: 'Search',
    data() {
        return {
            search: '',
            search_type: '',
            searchData: []
        }
    },
    methods: {
        setData(payload){
            this.searchData = payload
        },
        async makeSearch() {
            if (this.search.length > 0 && this.search_type.length > 0) {
                var placeholder = await searchAPI.searchMovie(this.search_type, this.search)
                console.log(placeholder)
                this.searchData = placeholder.data
                console.log(this.searchData)
            }
        }
    },
    created() {
        this.search = this.$route.params.data.string
        this.search_type = this.$route.params.data.type
        
        console.log(this.search)
        console.log(this.search_type)

        this.makeSearch()

    }
}
</script>

