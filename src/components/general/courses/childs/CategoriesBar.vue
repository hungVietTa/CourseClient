<template>
  <div>
    <nav class="categories-bar mb-5" v-if="categories">
      <ul class="d-flex align-items-center px-5 bg-primary border-primary-blur">
        <li
          class="me-5 py-1"
          v-for="(category, index) in categories"
          :key="index"
        >
          <span
            @click="selectCategory(category,index)"
            class="text-white cursor-pointer"
            :class="{ active: index == currentIndex }"
            :key="index"
          >
            {{ category.name }}
          </span>
        </li>
      </ul>
    </nav>
    <div class="heading px-3">
      <h3 class="fw-bold mb-5">{{ categories[currentIndex].name }}</h3>
      <h5 class="fw-bold mb-3">Courses to get you started</h5>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["categories"],
  methods: {
    selectCategory(category, index){
      if (index == this.currentIndex)
        return
      this.currentIndex = index;
      this.$emit("selectCategory", category);
    },
  },
};
</script>
<style scoped>
.heading {
  width: 1300px;
  margin: auto;
}
span.active {
  font-weight: bold;
  color: white;
}
</style>
