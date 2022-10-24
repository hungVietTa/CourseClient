import axios from "axios";

export default {
    // GET CATEGORY LIST
    async getCourseCategories(limit,page) {
        return await axios
            .get(`api/v1/admin/course-categories?limit=${limit}&page=${page}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // CREATE NEW COURSE
    async createCourseCategory(course_id,category_id) {
        await axios
            .post(`api/v1/admin/course-categories`, {
                course_id:course_id,
                category_id:category_id
            })
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // SHOW COURSE
    async showCourseCategory(course_id) {
        return await axios
            .get(`api/v1/admin/course-categories/${course_id}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // UPDATE COURSE
    async updateCourseCategory(course_id,category_id) {
        await axios.put(`api/v1/admin/course-categories`,{
            course_id:course_id,
            category_id:category_id
        })
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // DELETE COURSE
    async deleteCourseCategory(course_id) {
        await axios
            .delete(`api/v1/admin/course-categories`,{
                course_id:course_id
            })
            .then(() => false)
            .catch((res) => console.log(res));
    }

};