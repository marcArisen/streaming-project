import axios from "axios";

const rootApi = import.meta.env.VITE_BACKEND_URL || "http://localhost:5002";

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
  async updateVideo(body) {
    return await axios.put(`${rootApi}/update`, body);
  },
  async deleteVideo(name) {
    return await axios.delete(`${rootApi}/delete/${name}`);
  },
};
