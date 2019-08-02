import axios from "axios";

const instance = axios.create({
  baseURL: "https://sandwichbuilder.firebaseio.com/"
});

export default instance;
