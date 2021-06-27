import axios from "axios";

// This is wrapper around existing axios package.
export default axios.create({
  baseURL: "http://localhost:4000", // When you start the application backend runs on this url
});
