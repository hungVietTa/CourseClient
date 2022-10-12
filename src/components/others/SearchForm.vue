<template>
    <form @submit.prevent="submit" class="d-flex align-items-center">
        <input type="search" placeholder="Search ..." v-model="searchValue">
        <button class="btn btn-primary">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
    </form>
</template>
<script>
export default {
    data(){
        return {
            searchValue:undefined
        }
    },
    name:"SearchForm",
    methods:{
        submit(){
            this.$emit('searching',this.searchValue)
        }
    }
}
</script>
<style scoped>
form {
    background-color: var(--primary);
    border-radius: 6px;
    border: 1px solid var(--primary);
    overflow: hidden;
}
input {
    border: none;
    line-height: 35px;
    outline: none;
    padding-left: 5px;
}
.btn {
    padding: 5px 10px;
}
</style>