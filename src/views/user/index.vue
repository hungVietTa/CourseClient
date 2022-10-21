<template>
  <div>
      <h1>course</h1>
  </div>
</template>
<script>
export default {
  methods:{
    async get(){
      let el = this
      let data = await this.axios.get('api/v1/admin/courses/23').then(res=>res.data)
      data = data.lessons
      data.forEach(element => {
        element.name = element.name.replace(/.*\| /g,'')
      });
      console.log(data)
      let i = 0
      let interval = setInterval(function(){
        console.log(i)
        el.axios.put(`api/v1/admin/courses/23/lessons/${data[i].id}`,data[i])
        i++
        if (i>16) clearInterval(interval)
      },1000)
    }
  },
  mounted(){
    // this.get()
  }
}
</script>