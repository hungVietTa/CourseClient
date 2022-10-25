import axios from "axios";

export default {
    // GET CATEGORY LIST
    async getCategories(limit,page) {
        return await axios
            .get(`api/v1/admin/categories?limit=${limit}&page=${page}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // CREATE NEW COURSE
    async createCategory(data) {
        await axios
            .post(`api/v1/admin/categories`, data)
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // SHOW COURSE
    async showCategory(id) {
        return await axios
            .get(`api/v1/admin/categories/${id}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },
    // UPDATE COURSE
    async updateCategory(data) {
        await axios.put(`api/v1/admin/categories/${data.id}`,data)
            .then(() => false)
            .catch((res) => console.log(res));
    },
    // DELETE COURSE
    async deleteCategory(id) {
        await axios
            .delete(`api/v1/admin/categories/${id}`)
            .then(() => false)
            .catch((res) => console.log(res));
    }

};