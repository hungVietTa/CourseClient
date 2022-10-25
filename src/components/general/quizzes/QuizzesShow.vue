<template>
  <div>
    <main class="pt-5 text-center">
      <h1 class="mb-3">HTML Basics</h1>
      <div v-if="enrolling">
        <p>
          The exam including {{ list.length }} questions with the time limit of
          15 minutes. You will pass the test by correcting at least
          {{ minimum }}/{{ list.length }} of them
        </p>
        <p>Are you ready</p>
        <button class="btn btn-primary" @click="start">Ready</button>
      </div>
      <ul class="text-center" v-show="processing || reviewing">
        <div class="btn-group">
          <button
            @click="currentId = currentId - 1"
            :style="{ visibility: prevVisibility }"
            class="btn btn-primary"
          >
            Previous question
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
              <label
                v-if="value != null"
                :class="{
                  incorrect:
                    key == item.choice &&
                    key != solutions[index] &&
                    solutions.length,
                  correct: key == solutions[index],
                }"
                class="cursor-pointer py-1"
              >
                <input
                  type="radio"
                  :value="key"
                  :name="item.id"
                  v-model="item.choice"
                />
                <span class="ms-2">{{ value }}</span></label
              >
            </div>
            <p v-show="reviewing">
              The solution for this question should be found in the lesson :
              <a href="facebook.com" target="”_blank”">
                {{ hintLesson[index] }}
              </a>
            </p>
          </div>
        </li>
        <div class="text-center">
          <p v-show="!reviewing && processing">{{ countDown }}</p>
          <button
            @click="unfinishedCheck"
            v-if="!reviewing && processing"
            class="btn btn-primary mt-4"
          >
            Submit
          </button>
        </div>
      </ul>
      <button
        class="btn btn-primary"
        v-if="reviewing && !done"
        @click="
          reviewing = false;
          done = true;
        "
      >
        Quay lại
      </button>
      <div v-if="done">
        <p v-if="timeout">
          Thời gian làm bài đã kết thúc, kết quả của bạn đã tự động được nộp
        </p>
        <h2>
          You are finished with score {{ score }}/{{ 10 * list.length }}
          {{ processing }}
        </h2>
        <button class="btn btn-primary mb-4" @click="showResult">Show result</button>
        <div v-if="pass">
          <p>Congratulation !</p>
          <button>Explore next lesson</button>
        </div>
        <div v-if="!pass">
          <button class="btn btn-secondary" @click="tryAgain">Try again</button>
        </div>
      </div>
    </main>
    <modal-comp
      @cancel="callOf"
      @process="keepUp"
      :modaltitle="''"
      :modalbody="
        'Bạn vẫn chưa chọn đáp án cho các câu : ' +
        remains +
        ' .Bạn xác nhận vẫn muốn nộp bài ?'
      "
      :modalcancel="'Submit'"
      :modalconsent="'Cancel'"
      v-if="modal"
    />
  </div>
</template>
<script>
import ModalComp from "@/components/others/ModalComponent.vue";
import { startTimer } from "@/mymodules/timer.js";

export default {
  data() {
    return {
      hintLesson: ["Basic Javascript"],
      solutions: [],
      timeout: false,
      interval: 0,
      countDown: "",
      examTitle: "Challenger",
      pass: false,
      enrolling: true,
      done: false,
      processing: false,
      reviewing: false,
      time: 15 * 60,
      minimum: 5,
      list: [],
      currentId: 1,
      score: 0,
      modal: false,
      remains: "",
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
    ModalComp,
  },
  methods: {
    startTimer() {},
    start() {
      this.solutions=[];
      this.processing = true;
      this.enrolling = false;
      this.interval = this.startTimer(this.time, this.submit, this);
    },
    unfinishedCheck() {
      this.list.forEach((item) => {
        if (item.choice == "") this.remains += item.id + " ";
      });
      if (this.remains == "") this.submit();
      else this.modal = true;
    },
    submit() {
      if (this.interval) clearInterval(this.interval);
      this.list.forEach((item) => {
        this.solutions.push(item.correct_answer);
      });
      this.list.forEach((item) => {
        if (item.choice == item.correct_answer) this.score += 10;
      });
      if (this.score >= 10 * this.minimum) this.pass = true;
      else this.pass = false;
      this.done = true;
      this.processing = false;
      this.modal = false;
    },
    showResult() {
      this.currentId = 1;
      this.reviewing = true;
      this.done = false;
      this.timeout = false;
    },
    keepUp() {
      this.submit();
      this.modal = false;
    },
    callOf() {
      this.modal = false;
    },
    tryAgain() {
      this.list.forEach((item) => {
        item.choice = "";
      });
      this.currentId=1
      this.enrolling = true;
      this.done = false;
      this.timeout = false;
    },
    async post(list) {
      for (let i = 0; i < this.list.length; i++) {
        delete list[i].description;
        delete list[i].explaination;
        delete list[i].tip;
        delete list[i].id;
        await this.axios.post("http://localhost:4000/quiz", list[i]);
      }
    },
  },
  mounted() {
    this.startTimer = startTimer;
    this.axios.get("http://localhost:4000/quiz").then((res) => {
      this.list = res.data;
      this.list.forEach((item) => {
        item.choice = "";
      });
    });
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
  box-shadow: none;
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
.correct {
  color: green;
}
.incorrect {
  color: salmon;
}
</style>
