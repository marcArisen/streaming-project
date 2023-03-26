import axios from "axios";

const rootApi = "http://localhost:5002";

export default {
  async getVideos() {
    const response = await axios.get(`${rootApi}/videos`);
    return response.data;
  },
  async uploadVideo(formData) {
    return await axios.post(`${rootApi}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
