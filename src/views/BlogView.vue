<template>
  <div class="mfs-blog-view">
    <header-comp />
    <span class="ql-formats mfs-ql-save" ref="save">
      <button class="mfs-save-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-save"
          viewBox="0 0 18 18"
        >
          <path
            d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
          />
        </svg>
      </button>
    </span>
    <main class="mfs-text-start">
      <div class="mfs-text-editor">
        <vue-editor
          :editorOptions="editorSettings"
          ref="textEditor"
        />
      </div>
      <div class="mfs-comment">
        <div class="content">
          <textarea name="comment" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import HeaderComp from "../components/HeaderComp.vue";
import { VueEditor,Quill } from "vue2-editor";
import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from "quill-image-resize-vue";
Quill.register('modules/imageDrop', ImageDrop);
  Quill.register('modules/imageResize', ImageResize)
export default {
  data() {
    return {
      textEditor: {},
      content: "",
      node: {},
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    };
  },
  name: "BlogView",
  components: {
    HeaderComp,
    VueEditor,
  },
  methods: {
    resize(target) {
      console.log(target.value);
      this.img.width = this.size;
    },
    addSaveBtn() {
      let el = this;
      let temp = this.textEditor.$el.querySelector(".ql-toolbar");
      temp.appendChild(this.$refs.save);
      this.textEditor.$el.querySelector(".mfs-save-btn").onclick = function () {
        localStorage.setItem(
          "main",
          JSON.stringify(el.textEditor.quill.getContents())
        );
      };
    },
  },
  mounted() {
    this.textEditor = this.$refs.textEditor;
    this.addSaveBtn();
    this.content = JSON.parse(localStorage.getItem("main"));
    if (this.content) this.textEditor.quill.setContents(this.content);
  },
};
</script>
<style>
.mfs-title {
  border: none;
  outline: none;
}
.mfs-range {
  -webkit-appearance: none;
  -moz-appearance: none;
}
.mfs-text-editor {
  position: relative;
}
.mfs-slider {
  color: #444;
  margin-left: 20px;
  display: inline-flex;
  align-items: center;
  width: auto;
}
.ql-toolbar {
  text-align: left;
  position: sticky;
  top: 132px;
  z-index: 9999;
  background-color: white;
}
.ql-container.ql-snow {
  border-bottom: none !important;
}
</style>
