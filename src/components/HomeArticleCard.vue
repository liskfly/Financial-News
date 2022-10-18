<template>
  <div class="item" @click="goToHomeArticle">
    <div class="text">
      <h2>{{ newsData.title }}</h2>
      <span
        >{{ getDate }}·阅读时长{{ newsData.read_time }}分钟·{{
          newsData.word_times
        }}字</span
      >
    </div>

    <div class="photo">
      <img v-lazy="newsData.cover_url" alt="img" />
      <i class="top" v-if="type == 'top_article'"></i>
    </div>

    <div class="item-bottom">
      <span
        class="text"
        :class="{ active: newsData.article_type == 'magazine' }"
        >{{ article_type }}</span
      >
      <div class="icon">
        <span class="like">{{ newsData.like_times }} <i></i></span>
        <span class="comment">{{ newsData.comment_times }} <i></i></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    newsData: Object,
    type: String,
    id:Number,
    articleType:String
  },
  computed: {
    getDate() {
      let date = new Date(this.newsData.display_time);
      let str = `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
      return str;
    },
    article_type() {
      let type = this.newsData.article_type;
      if (type == "normal") {
        return this.newsData.visit_times + " " + "阅读";
      } else {
        return this.newsData.magazine.name;
      }
    },
  },
  methods:{
     goToHomeArticle(){
      this.$router.push(
        `/article?article_id=${this.id}`
      )
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  .text {
    span {
      display: inline-block;
      margin-top: 10px;
      font-size: 13px;
      color: #888;
    }
  }
  .photo {
    position: relative;
    margin: 20px 0;
    border-radius: 5px;
    width: 100%;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
      height: 200px;
    }
    .top{
      position: absolute;
      right: 10px;
      bottom: 15px;
      border-radius: 999px;
      width: 23px;
      height: 23px;
      background-image: url(../assets/img/3f.png);
      background-size: 100% 100%;
    }
  }
  .item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .text {
      font-size: 13px;
      color: #888;
    }
    .active {
      color: rgb(23, 122, 244);
    }
    .icon {
      display: flex;
      span {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #888;
        i {
          display: inline-block;
          margin-left: 5px;
          width: 14px;
          height: 14px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }

      .like {
        i {
          background-image: url(../assets/img/gQ.png);
        }
      }
      .comment {
        margin-left: 10px;
        i {
          background-image: url(../assets/img/Tc.png);
        }
      }
    }
  }
}
</style>