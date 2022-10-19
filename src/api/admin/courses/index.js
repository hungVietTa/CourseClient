import axios from "axios";

export default {
    // GET COURSES LIST
    async getCourses(page) {
        return await axios
            .get(`api/v1/admin/courses?limit=7&page=${page}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // CREATE NEW COURSE
    async createCourse(data) {
        await axios
            .post(`api/v1/admin/courses`, data)
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // SHOW COURSE
    async showCourse(id) {
        return await axios
            .get(`api/v1/admin/courses/${id}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // UPDATE COURSE
    async updateCourse(data,id) {
        console.log(data)
        await axios({
            method: 'put',
            url: `api/v1/admin/courses/${id}`,
            data: data,
            headers: {
                'Content-Type': `multipart/form-data`,
            },
        })
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // DELETE COURSE
    async deleteCourse(id) {
        await axios
            .delete(`api/v1/admin/courses/${id}`)
            .then(() => false)
            .catch((res) => console.log(res));
    }

};