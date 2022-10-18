<template>
    <div>
        <!-- CATEGORIES START -->
        <nav class="categories-bar">
            <ul class="d-flex align-items-center px-5 bg-primary border-primary-blur">
                <li class="px-4 py-1" v-for="(category,index) in categories" :key="index">
                    <router-link class="text-white" :to="`/${type}/${category}`" :key="category">
                        {{category}}
                    </router-link>
                </li>
            </ul>
        </nav>
        <!-- CATEGORIES END -->
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
ul {
    box-shadow: 0 1px 1px rgb(0 0 0 / 15%)
}
a img {
    height: 30px;
    width: 30px;
}
.router-link-active {
    font-weight: bold;
}
</style>