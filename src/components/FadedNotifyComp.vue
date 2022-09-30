<template>
    <div>
        <p>{{fadedMessage}}sdfds</p>
    </div>
</template>
<script>
export default {
    props:{
        fadedMessage:{
            type:String
        }
    }
}
</script>
<style scoped>
@keyframes myAnimation{
  0%{
    opacity: 1;
    transform: rotateX(90deg);
  }
  50%{
    opacity: 0.5;
    transform: rotateX(0deg);
  }
  100%{
    display: none;
    opacity: 0;
    transform: rotateX(90deg);
  }
}
div {

    animation-name: myAnimation;
    animation-duration: 2000ms;
    animation-fill-mode: forwards;
}
</style>
