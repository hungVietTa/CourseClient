import axios from "axios";

export default {
    // GET CATEGORY LIST
    async getCategories(limit,page) {
        return await axios
            .get(`api/v1/admin/categories?limit=${limit}&page=${page}`)
            .then(res => res.data)
            .catch((res) => console.log(res));
    },

};