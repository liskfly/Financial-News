<template>
  <div class="content">
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + article.cover_url + ')' }"
    >
      <div class="cover">
        <div class="cover-text">
          <h1>{{ article.title }}</h1>
          <span
            >{{ article.visit_times }}阅读·{{
              article.favorite_times
            }}收藏</span
          >
        </div>
      </div>
    </div>

    <div class="text-box">
      <div class="text">
        <div class="authors">
          <div class="authors-img">
            <img :src="article.authors[0].avatar" alt="authors-img" />
          </div>
          <div class="authors-megs">
            <p>
              {{ article.authors[0].name }}等<span class="count">{{
                article.authors.length
              }}</span
              >位作者
            </p>
            <span
              >{{ getDate }}·阅读时长{{ article.read_time }}分钟·{{
                article.word_times
              }}字</span
            >
          </div>
        </div>
        <div class="normal" v-if="article.article_type=='normal'">
          <div class="dec" v-for="a in article.topics" :key="a.id">
            <span class="dec-color">#{{ a.name }}</span>
            <span class="summary">{{ article.summary }}</span>
          </div>
          <div ref="textcontent" class="text-item"></div>
          
        </div>
        <div class="magazine"  v-if="article.article_type!=='normal'">
            <div class="dec">
            <div><span class="dec-color">#{{ article.column.name }}</span>  <span class="dec-color">#{{ article.column.parent_column.name }}</span></div>
            <span class="summary">{{ article.summary }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["article", "articleType"],
  updated() {
    // console.log(this.articleType);
    if (this.articleType !== "magazine") {
      this.addArticle();
    }
  },
  computed: {
    getDate() {
      let date = new Date(this.article.display_time);
      let str = `${date.getMonth() + 1}月${date.getDate()}日`;
      return str;
    },
  },
  methods: {
    addArticle() {
      this.$refs.textcontent.innerHTML = this.article.content;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100vw;
  margin-bottom: 60px;
  .bg {
    position: relative;
    width: 100vw;
    height: 35vh;
    background-size: 100% 100%;

    .cover {
      display: flex;
      align-items: flex-end;
      padding: 20px 3vw;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.1)
      );
      .cover-text {
        h1 {
          font-size: 18px;
          line-height: 25px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
  .text-box {
    padding: 0 3vw;
    .text {
      .authors {
        display: flex;
        margin-top: 15px;
        width: 100%;
        height: 40px;
        .authors-img {
          margin-right: 10px;
          border-radius: 999px;
          width: 40px;
          height: 40px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .authors-megs {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            font-size: 14px;
            .count {
              font-size: 14px;
              color: #0090f0;
            }
          }
          span {
            font-size: 12px;
            color: #888;
          }
        }
      }
      .dec {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 60px;
        font-size: 13px;
        .dec-color {
          margin-top: 5px;
          font-size: 13px;
          color: #0090f0;
        }
        .summary {
          color: #888;
        }
      }
      .text-item {
        overflow: hidden;
        img {
          width: 94vw;
          height: 35vh;
        }
      }
    }
  }
}
</style>