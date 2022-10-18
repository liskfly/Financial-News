<template>
  <div class="themes">
    <ul class="articles">
      <li v-for="{title,id,display_time,read_time,word_times,cover_url,visit_times,like_times,comment_times}
             in news" :key="id" class="articles-list" @click=" goToArticle(id)">
        <span class="title">{{title}}</span>
        <span class="time">{{getTime(display_time) + '·阅读时长' +
                    read_time + '分钟·' + word_times + '字'}}</span>
        <img :src="cover_url">
        <div class="readers">
          <span>{{visit_times}}阅读</span>
          <div class="comment">
            <span>{{like_times}}</span>
            <img src="../../../assets/img/gQ.png">
            <span>{{comment_times}}</span>
            <img src="../../../assets/img/Tc.png">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDate } from "@/assets/GetDate";
export default {
  props: ["news"],
  methods: {
    getTime (a) {
      return getDate(a)
    },
     goToArticle(b){
       this.$router.push(
        `/article?article_id=${b}`
      )
    }

  },
}
</script>

<style lang="scss" scoped>
.themes {
  box-sizing: border-box;
  width: 100vw;
  padding: 2vh 3vw 0 3vw;
  background-color: white;

  .articles {
    display: flex;
    flex-direction: column;

    .articles-list {
      padding: 2vh 0;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid rgb(232, 232, 232);

      .title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 2vh;
      }

      .time {
        font-size: 12px;
        color: grey;
        margin-bottom: 2vh;
      }

      .readers {
        height: 2vh;
        color: grey;
        margin-top: 2vh;
        display: flex;
        font-size: 12px;
        justify-content: space-between;

        .comment {
          display: flex;
          justify-content: center;

          span {
            margin-left: 4vw;
          }

          img {
            width: 4vw;
            height: 2vh;
            margin-left: 2vw;
          }
        }
      }
    }
  }
}
</style>