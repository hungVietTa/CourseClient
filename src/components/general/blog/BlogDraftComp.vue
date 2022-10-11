<template>
  <div class="mfs-blog-view">
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
          :customModules="customModulesForEditor"
          :editorOptions="editorSettings"
          ref="textEditor"
        />
      </div>
      <div class="mfs-comment">
        <div class="content">
          <textarea
            name="comment"
            v-model="newComment"
            id="comment"
            cols="50"
            rows="5"
          ></textarea>
          <button @click="postComment">POST</button>
          <div class="comment-list">
            <ul class="text-start">
              <li
                class="comment"
                v-for="(comment, index) in [...comments].reverse()"
                :key="index"
              >
                {{ comment.content }}
                <button class="me-2" @click="showReply($event.target)">
                  <font-awesome-icon class="pe-none" icon="fa-solid fa-reply" />
                </button>
                <button
                  v-if="comment.children.length"
                  @click="showSubComment($event.target)"
                >
                  See more {{ comment.children.length }} comments
                </button>
                <ul class="sub-comment">
                  <li
                    v-for="(subComment, role) in comment.children"
                    :key="role"
                  >
                    <p>{{ subComment.content }}</p>
                  </li>
                </ul>
                <div class="reply">
                  <div contenteditable="true"></div>
                  <button class="ms-auto">HỦY</button>
                  <button class="ms-auto">TRẢ LỜI</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-vue";
export default {
  data() {
    return {
      newReply: "",
      newComment: "",
      comments: [],
      textEditor: {},
      content: "",
      node: {},
      customModulesForEditor: [
        { alias: "imageDrop", module: ImageDrop },
        { alias: "imageResize", module: ImageResize },
      ],
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {},
        },
      },
    };
  },
  name: "BlogView",
  components: {
    VueEditor
  },
  methods: {
    resize(target) {
      console.log(target.value);
      this.img.width = this.size;
    },
    showSubComment(target) {
      let element = target.parentNode.querySelector(".sub-comment");
      element.style.display =
        element.style.display == "block" ? "none" : "block";
    },
    showReply(target) {
      let element = target.parentNode.querySelector(".reply");
      element.style.display = "block";
    },
    postComment() {
      this.axios
        .post("http://localhost:3000/comments", {
          content: this.newComment,
          children: [],
        })
        .then(() => {
          this.newComment = "";
          this.axios
            .get("http://localhost:3000/comments")
            .then((res) => (this.comments = res.data));
        });
    },
    reply(id) {
      this.axios.put(`http://localhost:3000/comments/${id}`, {
        children: [{}],
      });
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
    this.axios.get("http://localhost:3000/comments").then((res) => {
      this.comments = res.data;
      console.log(this.comments);
    });
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
.comment {
  background-color: darkslategray;
  color: white;
}
.sub-comment {
  background-color: salmon;
  display: none;
}
.reply {
  display: none;
}
.reply div {
  min-height: 20px;
  background-color: white;
  border: 1px solid darkslategray;
  color: black;
  padding: 0 5px;
}
</style>
