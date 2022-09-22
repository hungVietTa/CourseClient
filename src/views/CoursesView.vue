<template>
    <div>
        <header-comp/>
        <h1>Courses view</h1>
    </div>
</template>
<script>
// @ is an alias to /src
import HeaderComp from '@/components/HeaderComp.vue';

export default {
  name: 'HomeView',
  components: {
    HeaderComp
}
}
</script>