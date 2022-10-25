<template>
  <section v-if="reviews">
    <!-- NEW REVIEW START-->
    <div class="mb-3" v-if="!yourReview">
      <h5 class="fw-bold">Rate this course</h5>
      <h3 class="text-white me-2">
        <i
          v-for="(e, index) in 5"
          :key="index"
          :class="{ 'click-filled': index < newReview.rating }"
          class="pe-1 cursor-pointer star-icon"
          @mouseover="hoverStar($event.currentTarget, index)"
          @mouseout="emptyStar($event.currentTarget)"
          @click="newReview.rating = index + 1"
          ><font-awesome-icon icon="fa-solid fa-star" />
        </i>
      </h3>
      <div>
        <h6 class="fw-bold">Describe your experience :</h6>
        <div class="mb-2">
          <textarea
            id="comment"
            class="w-100 border-radius-6"
            rows="2"
            v-model="newReview.content"
          ></textarea>
        </div>
        <div class="text-center">
          <button
            class="btn btn-primary px-2 py-0 mx-1"
            @click="postReview(newReview)"
          >
            POST
          </button>
        </div>
      </div>
    </div>
    <!-- NEW REVIEW, UPDATE END-->

    <!-- UPDATE REVIEW START-->
    <div class="mb-3" v-if="yourReview && !yourReviewShow">
      <h5 class="fw-bold">Rate this course</h5>
      <h3 class="text-white me-2">
        <i
          v-for="(e, index) in 5"
          :key="index"
          :class="{ 'click-filled': index < yourReview.rating }"
          class="pe-1 cursor-pointer star-icon"
          @mouseover="hoverStar($event.currentTarget, index)"
          @mouseout="emptyStar($event.currentTarget)"
          @click="yourReview.rating = index + 1"
          ><font-awesome-icon icon="fa-solid fa-star" />
        </i>
      </h3>
      <div>
        <h6 class="fw-bold">Describe your experience :</h6>
        <div class="mb-2">
          <textarea
            id="comment"
            class="w-100 border-radius-6"
            rows="2"
            v-model="yourReview.content"
          ></textarea>
        </div>
        <div class="text-center">
          <button
            class="btn btn-primary px-2 py-0 mx-1"
            @click="updateReview(yourReview)"
          >
            UPDATE
          </button>
          <button
            v-if="yourReview"
            class="btn btn-secondary px-2 py-0 mx-1"
            @click="
              yourReviewShow = true;
              Object.assign(yourReview, yourReviewBeforeEdit);
            "
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
    <!-- UPDATE REVIEW END-->

    <!-- YOUR REVIEW START-->
    <ul class="review-list" v-show="yourReviewShow" v-if="yourReview">
      <h5 class="fw-bold mb-0">Your review</h5>
      <li
        class="
          text-start
          d-flex
          py-3
          px-1
          align-items-center
          border-bottom-primary-blur
        "
      >
        <div class="col-1">
          <img :src="yourReview.avatar" alt="" />
        </div>
        <div class="col-11">
          <h6 class="fw-bold mb-1">{{ yourReview.username }}</h6>
          <p class="mb-1">
            <span class="text-white me-2">
              <i
                v-for="(e, index) in 5"
                :key="index"
                :class="{
                  'click-filled': index <= yourReview.rating - 1,
                }"
                class="pe-1 cursor-pointer star-icon"
                ><font-awesome-icon icon="fa-solid fa-star" />
              </i>
            </span>
            <span class="text-secondary">2 weeks ago</span><br />
          </p>
          <span>{{ yourReview.content }}</span
          ><br />
          <button
            @click="yourReviewShow = false"
            class="btn fst-italic text-primary pt-3 pb-1 ps-0"
          >
            <i><font-awesome-icon icon="fa-solid fa-pen-to-square" /></i>
            Edit your review
          </button>
        </div>
      </li>
    </ul>
    <!-- YOUR REVIEW END -->
    <!-- REVIEW STATISTIC START -->
    <div v-if="stats" class="mb-3 border-bottom-primary-blur pb-4">
      <h5 class="fw-bold mb-3">Student feedback</h5>

      <div class="d-flex align-items-center">
        <div class="col-2 text-center">
          <h1 class="fw-bold">{{ stats.average }}</h1>
          <span class="text-star ps-1">
            <i
              v-for="index in 5"
              :key="index"
              class="pe-1 cursor-pointer star-icon"
            >
              <!-- select the star icon according to the rating number -->
              <font-awesome-icon
                :icon="
                  stats.average - index > 0
                    ? 'fa-solid fa-star'
                    : stats.average - index > -1
                    ? 'fa-solid fa-star-half-stroke'
                    : 'fa-regular fa-star'
                "
              />
            </i>
          </span>
        </div>
        <div class="col-10">
          <div v-for="row in 5" :key="row" class="row g-0 align-items-center">
            <div class="col-8 ps-2">
              <div class="progress">
                <div
                  class="progress-bar bg-primary"
                  :style="{ width: stats.percent[row - 1] + '%' }"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div class="col-3 text-star">
              <span class="ms-4">
                <i
                  v-for="index in 5"
                  :key="index"
                  class="pe-1 cursor-pointer star-icon"
                >
                  <!-- select the star icon according to the rating number -->
                  <font-awesome-icon
                    :icon="
                      6 - row >= index
                        ? 'fa-solid fa-star'
                        : 'fa-regular fa-star'
                    "
                  />
                </i>
              </span>
            </div>
            <div class="col-1">
              <span class="text-secondary">
                {{ stats.percent[row - 1] }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- REVIEW STATISTIC END -->
    <!-- REVIEW LIST START-->
    <ul class="review-list">
      <h4 class="fw-bold">Others</h4>
      <li
        v-for="(review, idx) in reviews"
        :key="idx"
        class="text-start d-flex py-3 px-1 align-items-center border-bottom"
      >
        <div class="col-1">
          <img :src="review.avatar" alt="" />
        </div>
        <div class="col-11">
          <h6 class="fw-bold mb-1">{{ review.username }}</h6>
          <p class="mb-1">
            <span class="text-white me-2">
              <i
                v-for="(e, index) in 5"
                :key="index"
                :class="{ 'click-filled': index <= review.rating - 1 }"
                class="pe-1 cursor-pointer star-icon"
                ><font-awesome-icon icon="fa-solid fa-star" />
              </i>
            </span>
            <span class="text-secondary">2 weeks ago</span>
          </p>
          <span>{{ review.content }}</span>
        </div>
      </li>
    </ul>
    <!-- REVIEW LIST END -->
  </section>
</template>
<script>
import API from "@/api/general/courses/index";

export default {
  data() {
    return {
      // reviews
      reviews: false,
      // stats
      stats: false,
      // new review
      newReview: {
        rating: -1,
        content: "",
      },
      // your review
      yourReview: false,
      yourReviewShow: true,
      yourReviewBeforeEdit: {},
      // new review
      formShow: true,
    };
  },
  methods: {
    // REVIEW
    // RATING
    hoverStar(el, index) {
      let elements = el.parentNode.children;
      let i = 0;
      while (i <= index) {
        elements[i].classList.add("hover-filled");
        i++;
      }
    },
    emptyStar(el) {
      let elements = el.parentNode.children;
      let i = 0;
      while (i <= 4) {
        elements[i].classList.remove("hover-filled");
        i++;
      }
    },
    // CALL API
    async getReviews() {
      this.reviews = await API.getReviews();
    },
    async getYourReview() {
      this.yourReview = await API.getYourReview();
      Object.assign(this.yourReviewBeforeEdit, this.yourReview);
    },
    async getStats() {
      this.stats = await API.getStats();
    },
    async postReview(data) {
      await API.postReview(data);
      this.getReviews();
      this.getYourReview();
    },
    async updateReview(data) {
      await API.updateReview(data, data.id);
      this.getReviews();
      this.getYourReview();
      this.yourReviewShow = true;
    },
  },
  computed: {
    course_id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.getReviews();
    this.getYourReview();
    this.getStats();
  },
};
</script>
<style scoped>
/* REVIEW */
.review-list li img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
.comment {
  background-color: darkslategray;
  color: white;
}
/* prgressbar */
.progress {
  height: 12px;
}

/* btn */
.btn {
  border: 0;
}
</style>