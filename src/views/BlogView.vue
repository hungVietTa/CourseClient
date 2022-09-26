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
    <span class="mfs-slider" ref="slider" v-show="inputResize">
      <input
        @input="resize($event.target)"
        class="mfs-range blue"
        min="300"
        max="2000"
        type="range"
        v-model="size"
      />
      <input
        class="mfs-size-input"
        @input="resize($event.target)"
        type="number"
        v-model="size"
      />
      pixel
    </span>
    <main class="mfs-text-start">
      <div class="mfs-text-editor">
        <vue-editor
          :editorOptions="editorSettings"
          ref="textEditor"
        />
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
      size: 0,
      imgSizes: [],
      img: {},
      inputResize: false,
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
      temp.appendChild(this.$refs.slider);
      this.textEditor.$el.querySelector(".mfs-save-btn").onclick = function () {
        // let imgList = this.textEditor.$el.querySelectorAll("img");
        // console.log(imgList.length);
        // for (let i = 0; i < imgList.length; i++) {
        //   imgList.style.width = el.imgSizes[i];
        //   imgList[i].ondblclick = function () {
        //     el.img = imgList[i];
        //     el.inputResize = true;
        //   };
        // }
        // localStorage.setItem("imgSize", JSON.stringify(el.imgSizes));
        localStorage.setItem(
          "main",
          JSON.stringify(el.textEditor.quill.getContents())
        );
      };
    },
  },
  mounted() {
    // let el = this;
    this.textEditor = this.$refs.textEditor;
    this.addSaveBtn();
    this.content = JSON.parse(localStorage.getItem("main"));
    if (this.content) this.textEditor.quill.setContents(this.content);
  //   this.imgSizes = JSON.parse(localStorage.getItem("imgSizes"));
  //   if (this.imgSizes) this.textEditor.quill.setContents(this.imgSizes);
  //   let imgList = this.textEditor.$el.querySelectorAll("img");
  //   console.log(imgList.length);
  //   for (let i = 0; i < imgList.length; i++) {
  //     imgList[i].ondblclick = function () {
  //       el.img = imgList[i];
  //       el.size = imgList[i].offsetWidth;
  //       el.inputResize = true;
  //     };
  //   }
  },
};
</script>
<style>
.mfs-title {
  border: none;
  outline: none;
}
.mfs-text-editor img {
  width: 300px;
  display: block !important;
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
  top: 147px;
  z-index: 9999;
  background-color: white;
}
.mfs-size-input {
  border: none;
  outline: none;
  margin-left: 5px;
  width: 50px;
  text-align: right;
}
.mfs-view {
  border: 1px solid #ccc;
}
.mfs-my-btn {
  background-color: transparent;
  color: #444;
  border: none;
  padding: 10px;
}
.mfs-draft-content {
  width: 100%;
  box-sizing: border-box;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  background: rgba(59, 173, 227, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(59, 173, 227, 1)),
    color-stop(25%, rgba(87, 111, 230, 1)),
    color-stop(51%, rgba(152, 68, 183, 1)),
    color-stop(100%, rgba(255, 53, 127, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-moz-range-track {
  -moz-appearance: none;
  background: rgba(59, 173, 227, 1);
  background: -moz-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -webkit-gradient(
    left bottom,
    right top,
    color-stop(0%, rgba(59, 173, 227, 1)),
    color-stop(25%, rgba(87, 111, 230, 1)),
    color-stop(51%, rgba(152, 68, 183, 1)),
    color-stop(100%, rgba(255, 53, 127, 1))
  );
  background: -webkit-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -o-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: -ms-linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  background: linear-gradient(
    45deg,
    rgba(59, 173, 227, 1) 0%,
    rgba(87, 111, 230, 1) 25%,
    rgba(152, 68, 183, 1) 51%,
    rgba(255, 53, 127, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3bade3 ', endColorstr='#ff357f ', GradientType=1 );
  height: 2px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  max-width: 80px;
  position: relative;
  bottom: 5px;
  background-color: #1d1c25;
  cursor: -webkit-grab;

  -webkit-transition: border 1000ms ease;
  transition: border 1000ms ease;
}

input[type="range"]::-moz-range-thumb {
  -moz-appearance: none;
  border: 2px solid;
  border-radius: 50%;
  height: 25px;
  width: 25px;
  max-width: 80px;
  position: relative;
  bottom: 11px;
  background-color: #1d1c25;
  cursor: -moz-grab;
  -moz-transition: border 1000ms ease;
  transition: border 1000ms ease;
}

.range.blue::-webkit-slider-thumb {
  border-color: rgb(59, 173, 227);
}

.range.ltpurple::-webkit-slider-thumb {
  border-color: rgb(87, 111, 230);
}

.range.purple::-webkit-slider-thumb {
  border-color: rgb(152, 68, 183);
}

.range.pink::-webkit-slider-thumb {
  border-color: rgb(255, 53, 127);
}

.range.blue::-moz-range-thumb {
  border-color: rgb(59, 173, 227);
}

.range.ltpurple::-moz-range-thumb {
  border-color: rgb(87, 111, 230);
}

.range.purple::-moz-range-thumb {
  border-color: rgb(152, 68, 183);
}

.range.pink::-moz-range-thumb {
  border-color: rgb(255, 53, 127);
}

input[type="range"]::-webkit-slider-thumb:active {
  cursor: -webkit-grabbing;
}

input[type="range"]::-moz-range-thumb:active {
  cursor: -moz-grabbing;
}
</style>
