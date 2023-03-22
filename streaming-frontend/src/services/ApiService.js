import axios from "axios";

export default {
    async getVideos() {
        let url =
            "http://localhost:5002/videos";
        var vdo = await axios.get(url);
        return vdo.data
    },
}