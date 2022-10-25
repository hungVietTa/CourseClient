<template>
  <div>
    <div class="table-wrapper pt-3 border-top" v-if="false">
      <h4 class="fw-bold text-start mb-4">
        QUIZS ({{ quizzesData.meta.total }})
      </h4>
      <div class="text-start mb-4">
        <button class="btn btn-primary" @click="quizNewFormShow = true">
          Add new quiz
        </button>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Time</th>
              <th>Lesson ID</th>
              <th colspan="4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              @keydown.prevent="keyPos($event, index)"
              v-for="(quiz, index) in quizzesData.quizzes"
              :key="index"
              tabindex="0"
            >
              <td>{{ quiz.id }}</td>
              <td>{{ quiz.name }}</td>
              <td>{{ quiz.time }}</td>
              <td>{{ quiz.lesson_id }}</td>
              <td>
                <router-link
                  :to="$route.path + `/quizzes/${quiz.id}`"
                  class="btn btn-primary px-3 py-1"
                  >Edit</router-link
                >
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="
                    modalQuizDelete = true;
                    currentQuiz = quiz;
                  "
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- PAGINATION START -->
      <div
        class="vue-pagination mb-4"
        v-if="quizzesData && quizzesData.meta.pages > 1"
      >
        <paginate
          v-model="currentQuizPage"
          :pageCount="quizzesData.meta.pages"
          :click-handler="quizPaging"
        />
      </div>
      <!-- PAGINATION END -->

      <!-- ADD QUIZS FORM -->
      <div class="overlay" v-if="quizNewFormShow">
        <div class="form-popup">
          <h3 class="fw-bold">Add new quiz</h3>
          <form @submit.prevent="createQuiz()">
            <label class="w-100">Name:</label>
            <input v-model="newQuiz.name" class="w-100 mb-3" type="text" />
            <label>Description: </label>
            <textarea
              v-model="newQuiz.description"
              class="mb-2"
              type="text"
              col="5"
              rows="5"
            ></textarea>
            <label class="w-100">Time:</label>
            <input v-model="newQuiz.time" class="w-100 mb-3" type="number" />
            <label class="w-100">Lesson ID:</label>
            <input
              v-model="newQuiz.lesson_id"
              class="w-100 mb-3"
              type="number"
            />
            <div class="text-end">
              <button class="btn btn-primary me-2" type="submit">Add</button>
              <button
                class="btn btn-secondary"
                @click="quizNewFormShow = false"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- QUIZS LIST END -->

    <!-- MODAL QUIZ DELETE-->
    <ModalComponent
      v-if="modalQuizDelete"
      @cancel="modalQuizDelete = false"
      @process="deleteQuiz()"
    />
  </div>
</template>
<script>
</script>