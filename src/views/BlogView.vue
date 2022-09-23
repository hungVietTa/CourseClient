<template>
  <div class="blog-view">
    <header-comp />
    <main class="text-start">
      <input class="title" placeholder="Title" type="text" />
      <div class="row">
        <div class="draft">
          <div class="toolbar">
            <button class="my-btn" @click="check()">
              <font-awesome-icon icon="fa-solid fa-font" />
            </button>
            <button class="my-btn" @click="strongMulti()">
              <font-awesome-icon icon="fa-solid fa-bold" />
            </button>
            <button class="my-btn" @click="play('i')">
              <font-awesome-icon icon="fa-solid fa-italic" />
            </button>
            <button class="my-btn" @click="play('u')">
              <font-awesome-icon icon="fa-solid fa-underline" />
            </button>
            <button class="my-btn" @click="heading('h1')">
              H1
              <!-- <font-awesome-icon icon="fa-solid fa-strikethrough" /> -->
            </button>
            <button class="my-btn" @click="heading('h3')">
              H3
              <!-- <font-awesome-icon icon="fa-solid fa-list" /> -->
            </button>
            <button class="my-btn" @click="heading('p')">
              P
              <!-- <font-awesome-icon icon="fa-solid fa-list-ol" /> -->
            </button>
            <button @click="fade()" class="my-btn">
              <font-awesome-icon icon="fa-solid fa-quote-right" />
            </button>
            <button @click="removeMutilStrong()" class="my-btn">
              <font-awesome-icon icon="fa-solid fa-arrow-down" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-code-compare" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-code" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-table-cells" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-image" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-link" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
            </button>
            <button class="my-btn">
              <font-awesome-icon icon="fa-solid fa-keyboard" />
            </button>
          </div>
          <div width="400" height="400" id="draft-content" ref="draft">
            <h1>
              Hello world <strong>Ahris</strong>
               <i>Garen <strong>Maokai</strong> </i> Death is like <i>the wind</i>
            </h1>
            <p>Atcalata</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import HeaderComp from "../components/HeaderComp.vue";

export default {
  name: "BlogView",
  components: {
    HeaderComp,
  },
  methods: {
    addStrong(node){
        let newNode = document.createElement("strong")
        newNode.appendChild(node)
        return newNode
    },
    unwrapStrong(node){
        let newNode = node.parentElement
        while (node.firstChild) {
            newNode.insertBefore(node.firstChild,node)
        }
        node.remove()
        return newNode
    },
    removeMutilStrong() {
        let el = this
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let ancestor = range.commonAncestorContainer
        let nodeList = ancestor.querySelectorAll("strong")
        for ( let i = 0; i < nodeList.length; i){
            console.log(2)
            el.unwrapStrong(nodeList[i])
        }
    },
    play(type) {
      let newNode = document.createElement(type);
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      // const documentFragment = range.extractContents();
      // console.log(documentFragment)

      // let textNode = document.createTextNode(selection.toString())
      // newNode.appendChild(textNode)
      range.surroundContents(newNode);
    },
    strongMulti() {
        // let el = this
        let newNode = document.createElement("strong")
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let fragment = range.extractContents()
        let nodeList = fragment.childNodes
        // console.log(nodeList[1])
        for ( let i = 0;i< nodeList.length ;i){
            newNode.appendChild(nodeList[i])
        }
        // fragment.childNodes.forEach(item=>item=el.addStrong(item))
        range.insertNode(newNode)
        range.selectNodeContents(newNode)
    },
    fade() {
    //   let newNode = document.createElement(type);
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
    //   let startNode = range.startContainer;
    //   let startOffset = range.startOffset;
    //   let endNode = range.endContainer;
    //   let endOffset = range.endOffset;
      let anchorRange = range.cloneRange(true);
      console.log(anchorRange);
      let oldNode = range.startContainer;
      // let anchorRange = range.cloneRange()

      // console.log(anchorRange)
      // console.log(oldNode)
      while (["STRONG"].includes(oldNode.nodeName) == false) {
        oldNode = oldNode.parentElement;
      }
      range.selectNode(oldNode);
      console.log(oldNode);
      console.log(range);
    //   let oldNodeList = oldNode.childNodes;
      // range.selectNode(oldNode)
      console.log(oldNode.nodeName);
      // range.surroundContents(newNode)
      // console.log(anchorRange)
      // range = range.cloneRange()
      // console.log(oldNodeList)
      // newNode.innerHTML = oldNode.innerHTML
      while ( oldNode.firstChild ) {
        oldNode.parentNode.insertBefore(oldNode.firstChild,oldNode);
      }
      oldNode.remove()

    //range.insertNode(newNode);
    //oldNode.remove();
    //   console.log(type);
    //   console.log(anchorRange);
      // anchorRange = JSON.parse(localStorage.getItem('test'))
    //   console.log(anchorRange);
    //   range.setStart(startNode, startOffset);
    //   range.setEnd(endNode, endOffset);
      // console.log(oldNode)
      // console.log(newNode)
      // const documentFragment = range.extractContents();
      // console.log(documentFragment)

      // let textNode = document.createTextNode(selection.toString())
      // newNode.appendChild(textNode)
    },
    heading(type) {
      let newNode = document.createElement(type);
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);
      let startNode = range.startContainer;
      let startOffset = range.startOffset;
      let endNode = range.endContainer;
      let endOffset = range.endOffset;
      let anchorRange = range.cloneRange(true);
      console.log(anchorRange);
      let oldNode = range.startContainer;
      // let anchorRange = range.cloneRange()

      // console.log(anchorRange)
      // console.log(oldNode)
      while (["H1", "H3", "P"].includes(oldNode.nodeName) == false) {
        oldNode = oldNode.parentElement;
      }
      range.selectNode(oldNode);
      console.log(oldNode);
      console.log(range);
      let oldNodeList = oldNode.childNodes;
      // range.selectNode(oldNode)
      console.log(oldNode.nodeName);
      // range.surroundContents(newNode)
      // console.log(anchorRange)
      // range = range.cloneRange()
      // console.log(oldNodeList)
      // newNode.innerHTML = oldNode.innerHTML
      for (let i = 0; i < oldNodeList.length; i) {
        // console.log(oldNodeList)
        newNode.appendChild(oldNodeList[0]);
      }

      range.insertNode(newNode);
      oldNode.remove();
      console.log(type);
      console.log(anchorRange);
      // anchorRange = JSON.parse(localStorage.getItem('test'))
      console.log(anchorRange);
      range.setStart(startNode, startOffset);
      range.setEnd(endNode, endOffset);
      // console.log(oldNode)
      // console.log(newNode)
      // const documentFragment = range.extractContents();
      // console.log(documentFragment)

      // let textNode = document.createTextNode(selection.toString())
      // newNode.appendChild(textNode)
    },
    check() {
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        console.log(range)
        let fragment = range.extractContents()
        console.log(fragment.nodeName)
    },
  },
  mounted() {
    this.$refs.draft.contentEditable = "plaintext-only";
  },
};
</script>
<style scoped>
.title {
  border: none;
  outline: none;
}
.draft,
.view {
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
