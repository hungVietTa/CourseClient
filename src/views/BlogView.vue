<template>
    <div class="blog-view">
        <header-comp/>
        <main class="text-start">
            <input class="title" placeholder="Title" type="text">
            <div class="row">
                <div class="col-6 draft">
                    <div class="toolbar">
                        <button class="my-btn" @click="check()"><font-awesome-icon icon="fa-solid fa-font" /></button>
                        <button class="my-btn" @click="play('strong')"><font-awesome-icon icon="fa-solid fa-bold" /></button>
                        <button class="my-btn" @click="play('i')"> <font-awesome-icon icon="fa-solid fa-italic" /></button>
                        <button class="my-btn" @click="play('u')"><font-awesome-icon icon="fa-solid fa-underline" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-strikethrough" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-list" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-list-ol" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-quote-right" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-arrow-down" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-code-compare" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-code" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-table-cells" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-image" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-link" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-trash" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-arrow-rotate-left" /></button>
                        <button class="my-btn"><font-awesome-icon icon="fa-solid fa-keyboard" /></button>
                    </div>
                    <div width="400" height="400" id="draft-content" ref="draft">
                        <h1>Hello world Yasuo Riven </h1>
                        <p>Atcalata</p>
                    </div>
                </div>
                <div class="col-6 view">Thurst</div>
            </div>
        </main>
    </div>
</template>
<script>
import HeaderComp from "../components/HeaderComp.vue"

export default {
    name:"BlogView",
    components:{
        HeaderComp
    },
    methods:{
        play(type){
            let newNode = document.createElement(type)
            let selection = window.getSelection()
            let range = selection.getRangeAt(0)
            // const documentFragment = range.extractContents();
            // console.log(documentFragment)
            
            // let textNode = document.createTextNode(selection.toString())
            // newNode.appendChild(textNode)
            range.surroundContents(newNode)
        },
        check(){
            
        }
    },
    mounted(){
       this.$refs.draft.contentEditable="true"
       
    }    
}
</script>
<style scoped>
.title {
    border: none;
    outline: none;
}
.draft, .view {
    border: 1px solid #ccc;
}
.my-btn {
    background-color: transparent;
    color: #444;
    border: none;
    padding: 10px;
}
.draft-content {
    width: 100%;
    box-sizing: border-box;
}
#draft-content {
    outline: none;
}
</style>
