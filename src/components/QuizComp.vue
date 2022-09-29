<template>
  <div>
    <header-comp />
    <main>
      <h1 v-show="done">
        You are finished with score {{ score }}/{{ 10 * list.length }}
      </h1>
      <ul v-show="!done">
        <div class="btn-group">
          <button
            @click="currentId = currentId - 1"
            :style="{ visibility: prevVisibility }"
            class="btn btn-primary"
          >
            Previous quenstion
          </button>
          <span
            class="btn btn-danger me-2 ms-2"
            :class="{ active: currentId == item.id }"
            @click="currentId = item.id"
            v-for="(item, index) in list"
            :key="index"
            >{{ item.id }}</span
          >
          <button
            @click="currentId = currentId + 1"
            :style="{ visibility: nextVisibility }"
            class="btn btn-primary"
          >
            Next question
          </button>
        </div>
        <li v-for="(item, index) in list" :key="index">
          <div class="content" v-show="currentId == item.id">
            <p>{{ item.question }}</p>
            <div v-for="(value, key) in item.answers" :key="key" class="mt-2">
              <label v-if="value != null">
                <input
                  type="radio"
                  :value="key"
                  :name="item.id"
                  v-model="item.choice"
                />
                {{ value }}</label
              >
            </div>
          </div>
        </li>
        <button @click="unfinishedCheck" class="btn btn-primary mt-4">Submit</button>
      </ul>
    </main>
    <modal-comp
      :modaltitle="''"
      :modalbody="
        'Bạn vẫn chưa chọn đáp án cho các câu : ' +
        remains +
        ' .Bạn xác nhận vẫn muốn nộp bài ?'
      "
      :modalcancel="'Hủy'"
      :modalconsent="'Nộp bài'"
      v-if="modal"
    />
  </div>
</template>
<script>
import HeaderComp from "./HeaderComp.vue";
import ModalComp from "./ModalComp.vue";

export default {
  data() {
    return {
      list: [],
      currentId: 1,
      score: 0,
      done: false,
      modal: false,
      remains:''
    };
  },
  computed: {
    prevVisibility() {
      if (this.currentId <= 1) return "hidden";
      else return "visible";
    },
    nextVisibility() {
      if (this.currentId >= this.list.length) return "hidden";
      else return "visible";
    },
  },
  components: {
    HeaderComp,
    ModalComp,
  },
  methods: {
    unfinishedCheck(){
        console.log(2)
        this.list.forEach(item => {
        if (item.choice == "") 
          this.remains+=item.id+' ';
        })
        if ( this.remains == '')
            this.submit()
        else 
            this.modal = true
    },
    submit(){
        this.list.forEach((item)=>{
        if (item.choice == item.correct_answer) 
            this.score += 10;})
      this.done = true;
      this.modal = false
    },
    async post(list) {
      for (let i = 0; i < this.list.length; i++) {
        delete list[i].description;
        delete list[i].explaination;
        delete list[i].tip;
        delete list[i].id;
        await this.axios.post("http://localhost:4000/quiz", list[i]);
      }
    }
  },
  mounted() {
    this.axios.get("http://localhost:4000/quiz").then((res) => {
      this.list = res.data;
      this.list.forEach((item) => (item.choice = ""));
    });
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  text-align: left;
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
}
.btn-danger {
  background-color: #fff;
  border: 1px solid #888;
  color: #333;
  border-radius: 9px !important;
  outline: none;
}
.btn-danger:hover {
  background-color: #bbb;
  border: 1px solid #888;
}
.btn.active {
  background-color: #bbb;
}
</style>
