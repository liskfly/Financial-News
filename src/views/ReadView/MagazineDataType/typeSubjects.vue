<template>
  <div class="bookContent">
    <div class="bottom">
      <div class="trialReading">
        <span>试读</span>
      </div>
      <div class="subscribe">
        <div>
          <span>订阅</span>
          <div>{{ bookData.price }}元</div>
        </div>
      </div>
    </div>
    <div class="description">{{ bookData.description }}</div>
    <ul class="comment">
      <li
        v-for="{ id, introduction, avatar, name } in bookData.authors"
        :key="id"
        class="comment-list"
        @click="goKeyWordArticle(id)"
      >
        <div class="introduction">{{ introduction }}</div>
        <div class="avatar">
          <img :src="avatar" />
          <span>{{ name }}</span>
        </div>
      </li>
    </ul>
    <div style="fontsize: 18px">最新文章</div>
    <ul class="newest">
      <li
        v-for="(
          { id, title, summary, display_time, read_time }, index
        ) in bookData.articles"
        :key="id"
        class="newest-list"
        @click="goToArticle(id, index)"
      >
        <span class="title">{{ title }}</span>
        <span class="summary">{{ summary }}</span>
        <span class="time">{{
          getTime(display_time) + "·阅读时长" + read_time + "分钟"
        }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDateMon } from "@/assets/GetDate";
export default {
  props: ["bookData"],
  methods: {
    getTime(a) {
      return getDateMon(a);
    },
    goKeyWordArticle(id) {
      this.$router.push(
        `/keyword-article?keyword_type=authors&keyword_id=${id}`
      );
    },
    goToArticle(a, b) {
      if (b == 0) {
        this.$router.push(`/article?article_id=${a}`);
      }else{
        console.log("路由未完成");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bookContent {
  box-sizing: border-box;
  padding: 4vh 2vw 7vh 2vw;
  background-color: #fff;

  .description {
    font-size: 14px;
  }

  .newest {
    margin-top: 2vh;

    .newest-list {
      padding-top: 2vh;
      display: flex;
      flex-direction: column;

      span {
        padding-bottom: 2vh;
      }

      .title {
        font-size: 16px;
        font-weight: 700;
      }

      .summary {
        font-size: 14px;
        color: grey;
      }

      .time {
        font-size: 12px;
        color: grey;
        border-bottom: 1px solid rgb(232, 232, 232);
      }
    }
  }

  .comment {
    width: 96vw;
    height: 23vh;
    display: flex;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .comment-list {
      margin: 2vh 3vw;
      box-shadow: 0px 0px 5px #c6c6c6;

      .introduction {
        box-sizing: border-box;
        width: 60vw;
        font-size: 14px;
        padding: 2vh 2vw 2vh 3vw;
        line-height: 20px;
        color: rgb(48, 48, 48);
      }

      .avatar {
        box-sizing: border-box;
        width: 60vw;
        padding: 0 2vw 0 3vw;
        display: flex;
        align-items: center;
        font-size: 12px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          margin-right: 2vw;
        }
      }
    }
  }

  .bottom {
    width: 100vw;
    height: 7vh;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;

    .trialReading {
      width: 50%;
      height: 7vh;
      display: flex;
      background-color: #fff;

      span {
        margin: auto;
      }
    }

    .subscribe {
      width: 50%;
      height: 7vh;
      display: flex;
      align-items: center;
      background-color: #0493ff;

      div {
        display: flex;
        margin: auto;
        color: #fff;
      }

      span {
        margin-right: 4vw;
      }
    }
  }
}
</style>