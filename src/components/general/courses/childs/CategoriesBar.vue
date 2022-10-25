<template>
    <!-- CATEGORIES START -->
    <nav class="categories-bar mb-5" v-if="categories">
      <ul class="d-flex align-items-center px-5 bg-primary border-primary-blur">
        <li
          class="me-5 py-1"
          v-for="(category, index) in categories"
          :key="index"
        >
          <router-link class="text-white" :to='"/courses/"+category.split(" ").join("-").toLowerCase()' :key="category">
            {{ category }}
          </router-link>
        </li>
      </ul>
    </nav>
    <!-- CATEGORIES END -->
</template>
<script>
export default {
    data(){
      return {
        props:["categories"]
      }
    }
}
</script>