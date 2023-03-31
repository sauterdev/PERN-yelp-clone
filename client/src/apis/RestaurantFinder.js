import axios from "axios";

//used for making http requests
export default axios.create({
    baseURL: "http://localhost:4000/api/v1/restaurants",
});