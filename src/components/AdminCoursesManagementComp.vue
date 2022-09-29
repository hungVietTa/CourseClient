<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index" >
                <p>Title : {{item.snippet.title}}</p>
                <p><img :src="item.snippet.thumbnails.default.url" alt=""></p>
                <p>Title : {{item.snippet.description}}</p>
                 <p>Title : {{item.snippet.position}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default  {
   data(){
    return {
        list:[]
    }
   },
   mounted(){
    this.axios.get('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLm8ctt9NhMNV75T9WYIrA6m9I_uw7vS56&key=AIzaSyApn2HB5U_StzHWNmyVb37etPSkji7b94c').then(res=>this.list=res.data.items).catch(err=>console.log(err))
   }
}
</script>
<style scoped>
img {
    width: 120px;
    height: 90px;
}
</style>
