<template>
    <div class="shop-items">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3 col-sm-6">
                    <!-- Restaurant Item -->
                    <div class="item">
                        <!-- Item's image -->
                        <img class="img-responsive" :src="course.img" alt="">
                        <!-- Item details -->
                        <div class="item-dtls">
                            <!-- product title -->
                            <h4><a href="#">{{course.name}}</a></h4>
                            <p class="course-progress">Tiến độ : {{course.currentStage}}/{{course.allStage}}</p>
                            <!-- price -->
                            <span class="price lblue">{{course.price | moneyDelimit}} VND</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'UserCoursesComp',
    data() {
        return {
            courses: []
            //     name: "Ruby On Rail",
            //     img: "https://via.placeholder.com/200x200/5F9EA0/000000",
            //     currentStage: 5,
            //     allStage: 10,
            //     price: 1500000,
            //     type: "BackEnd"
            // }
        }
    },
    filters:{
        moneyDelimit: function(number){
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    // created(){
    //     getCourses(){
    //         this.courses = axios.get('http://localhost:3000/courses')
    //     }
    // }
}
</script>
<style scoped lang="scss">
.shop-items {
    flex-grow: 1;
    margin-top: 40px;

    // .container-fluid {

    //     .row {

    //         .col-md-3 {

    //             .item {

    //                 .img-responsive {}

    //                 .item-dtls {

    //                     h4 {

    //                         a {}
    //                     }

    //                     .price {}
    //                 }

    //                 .ecom {

    //                     .btn {}
    //                 }
    //             }
    //         }
    //     }
    // }
}
</style>