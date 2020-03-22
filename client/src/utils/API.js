import axios from "axios";

export default {
    signupUser: function(userData) {
        return axios.post("/api/users/signup", userData);
    },
    searchVendor: function(term) {
        return axios.get("/api/vendor/search", term);
    }
}