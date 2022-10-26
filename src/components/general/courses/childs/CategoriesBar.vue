<template>
    <nav class="categories-bar mb-5" v-if="categories">
      <ul class="d-flex align-items-center px-5 bg-primary border-primary-blur">
        <li
          class="me-5 py-1"
          v-for="(category, index) in categories"
          :key="index"
        > 
          <router-link class="text-white" :to='"/courses/"+ toUrl(category.name)' :key="index">
            {{ category.name }} 
          </router-link>
        </li>
      </ul>
    </nav>
   
</template>
<script>
import stringCase from '@/mixin/stringCase';
export default {
  props:["categories"],
  mixins:[stringCase]
}
</script>