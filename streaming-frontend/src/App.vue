<template>
  <div>
    <VideoPlane :videoList="videoList"></VideoPlane>
    <UploadBox></UploadBox>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import UploadBox from "./components/Upload-Box-Component.vue";
import VideoPlane from "./components/Video-Plane-Component.vue";
import ApiService  from './services/ApiService.js'

export default defineComponent({
  components: {
    UploadBox,
    VideoPlane,
  },
  data() {
    return {
      // mockVideoUrl: "http://localhost:3030/hls/devito,360p.mp4,480p.mp4,720p.mp4,.en_US.vtt,.urlset/master.m3u8",
      // mockVideoUrl2: "http://localhost:3030/hls/thekid.mp4/master.m3u8",
      // posterUrl: "none",
      videoList: [],
    };
  },
  // computed:{
  //   async fetchVideos(){
  //     this.videoList = await ApiService.getVideos();
  //     console.log("CONSOLEEE: " + this.videoList);
  //     return this.videoList
  //   }
  // },
  async mounted() {
    this.videoList = await ApiService.getVideos();
    // console.log(this.videoList);
  }
});
</script>