<template>
  <div id="app">
    <!-- <div class="waiting" v-if="false">
      <button class="btn btn-primary" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div> -->
    <SuccessAlert/>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script>
import SuccessAlert from "@/components/others/SuccessAlert.vue"

  export default {
    components:{
      SuccessAlert
    }
  }
</script>
<style lang="scss">
</style>
