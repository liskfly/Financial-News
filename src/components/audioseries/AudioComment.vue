<template>
  <div class="comment">
       <div class="comment-box">
          <div class="user">
            <div class="user-img"></div>
            <div class="user-megs">
              <p class="user-name"></p>
              <p class="comment-time"></p>
            </div>
          </div>
          <div class="comment-text">
            <p></p>
          </div>
          <div class="comment-like">
            <i></i>
          </div>
       </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
export default {
  props: ["seriesId"],
  data(){
    return {
        comment:""
    }
  },
  created() {
    this.getAudioComment = debounce(this.getAudioComment);
  },
  mounted(){
     this.getAudioComment()
  },
  methods: {
    getAudioComment() {
      this.$axios
        .get(
          `http://api2021.cbnweek.com:80/v4/articles/${this.seriesId}/audio_comments?page=1&per=20&type=AudioArticle`
        )
        .then(({ data }) => {
          this.comment = data;
          // console.log(this.comment);
        });
    },
  },
};
</script>