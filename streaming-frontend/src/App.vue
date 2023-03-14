<template>
  <video-player
    src="http://localhost:3030/hls/devito,360p.mp4,480p.mp4,720p.mp4,.en_US.vtt,.urlset/master.m3u8"
    poster="/your-path/poster.jpg"
    controls
    :loop="true"
    :volume="0.6"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import { VideoPlayer } from '@videojs-player/vue'
  import 'video.js/dist/video-js.css'

  export default defineComponent({
    components: {
      VideoPlayer
    }
  })
</script>