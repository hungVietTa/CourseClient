<template>
  <div>
    <HeaderComp />
    <div class="about">
      <section class="slogan">
        <div class="row">
          <div class="col-7 mt-3 pt-5">
            <h1 class="mb-5">We share knowledge with the world</h1>
            <div class="our-history">
              <h3 class="mb-3 text-center">Câu chuyện của chúng tôi</h3>
              <p class="">
                Khi chúng tôi bắt đầu Lulucademy, mục tiêu của chúng tôi là cung
                cấp cho bất kỳ ai trong thế giới khả năng học hỏi các kỹ năng họ
                cần để thành công trong thế kỉ 21. Chúng tôi bắt đầu tạo ra một
                ứng dụng mới, mang tính tương tác trong cách học - làm cho nó
                hấp dẫn, linh hoạt và dễ tiếp cận cho càng nhiều người càng tốt.
                Kể từ đó, chúng tôi đã giúp hàng triệu người trên toàn thế giới
                mở khóa các kỹ năng kỹ thuật hiện đại và phát huy hết tiềm năng
                của họ thông qua mã. ✨
              </p>
              <div class="under-slash"></div>
            </div>
            <!-- <p >Tham gia hành trình của chúng tôi</p>
          <ul class="recruit">
            <li><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Cộng tác viên : 2 vị trí</li>
            <li><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Giảng viên : 2 vị trí</li>
            <li><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Thiết kế : 1 vị trí</li>
          </ul>
          <button class="btn btn-primary" >Ứng tuyển</button> -->
          </div>
          <div class="col-5">
            <img class="slogan-image" src="../assets/about/master.png" alt="" />
          </div>
        </div>
      </section>
      <section class="mission">
        <div class="row">
          <div class="col-6">
              <img class="mission-image" src="../assets/about/crew.png" alt="" />
            </div>
          <div class="col-6 mt-3 pt-5">
            <div class="our-mission position-relative">
              <h3 class="mb-3">Sứ mệnh của chúng tôi</h3>
              <p class="">
                Chúng tôi muốn tạo ra một thế giới nơi mọi người có thể xây dựng
                điều gì đó có ý nghĩa bằng công nghệ và mọi người đều có công cụ
                học tập, tài nguyên và cơ hội để làm điều đó. Code chứa đựng một
                thế giới khả năng - tất cả những gì cần có là sự tò mò và ham
                học hỏi. Tại Codecademy, chúng tôi cam kết trao quyền cho tất cả
                mọi người, bất kể họ đang ở đâu trong hành trình viết mã, tiếp
                tục học hỏi, phát triển và tạo tác động đến thế giới xung quanh.
              </p>
              <div class="under-slash"></div>
            </div>
          </div>
        </div>
      </section>
      <section class="team">
        <h3 class="mb-5">Đội ngũ</h3>
        <div class="row">
          <div class="col-3">
              <div class="team-card">
                <img class="mission-image" src="../assets/about/team/JamieOneill.jpeg" alt="" />
                <p>Jamie Oneill</p>
              </div>
          </div>
          <div class="col-3">
              <div class="team-card">
                <img class="mission-image" src="../assets/about/team/PaulineReese.jpeg" alt="" />
                <p>Pauline Reese</p>
              </div>
          </div>
          <div class="col-3">
              <div class="team-card">
                <img class="mission-image" src="../assets/about/team/ArasYoung.jpeg" alt="" />
                <p>Aras Young</p>
              </div>
          </div>
          <div class="col-3">
              <div class="team-card">
                <img class="mission-image" src="../assets/about/team/LuciBloggs.jpeg" alt="" />
                <p>Luci Bloggs</p>
              </div>
          </div>
        </div>
      </section>
      <section class="recruit">
        <h3 class="mb-5">Tham gia hành trình của chúng tôi</h3>
          <div class="recruit-list">
            <div class="badge text-bg-info"><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Cộng tác viên : 2 vị trí</div>
            <div class="badge text-bg-info"><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Giảng viên : 2 vị trí</div>
            <div class="badge text-bg-info"><font-awesome-icon class="recruit-icon" icon="fa-solid fa-check" /> Thiết kế : 1 vị trí</div>
          </div>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderComp from "@/components/HeaderComp.vue";

export default {
  name: "HomeView",
  components: {
    HeaderComp,
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.about {
  margin: auto;
  margin-top: 20px;
  max-width: 1300px;
}
.under-slash {
  position: absolute;
  width: 50px;
  height: 3px;
  background-color:#ccc;
  border-radius: 5px;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
}
.slogan {
  margin: auto;
    .our-history {
      text-align: justify;
      position: relative;
  }
  .slogan-image {
    width: 300px;
  }
}
.mission {
  margin-top: 20px;
  .mission-image {
    width: 500px;
  }
}
.team {
  margin-top: 40px;
  .team-card {
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: contain;
    }
  }
}
.recruit {
  margin-top: 40px;
  .recruit-list {
    display: flex;
    padding: 0;
    list-style: none;
    text-align: left;
    margin: auto;
    justify-content: space-evenly;

    .badge{
      padding: 10px 15px;
      font-size: 16px;      

      .recruit-icon {
      color: green;
    }
    }

   
  }
}
</style>
