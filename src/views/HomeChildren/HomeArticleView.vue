<template>
  <div class="home-article">
    <div class="header">
      <ArticleHeader :article="article" />
    </div>

    <div>
      <ArticleContent
        :article="article"
        :articleType="articleType"
        :recommed="recommed"
      ></ArticleContent>
    </div>

    <div class="article" v-if="articleType == 'normal'">
      <ArticleFooter />
    </div>
    <div class="magazine" v-if="articleType !== 'normal'">
      <span>订阅</span>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
import ArticleContent from "./ArticleContent.vue";
import ArticleHeader from "../../components/ArticleHeader.vue";
import ArticleFooter from "../../components/ArticleFooter.vue";
export default {
  data() {
    return {
      articleId: this.$route.query.id,
      article: {},
      articleType: this.$route.query.article_type,
      recommed:[]
    };
  },
  watch: {
    "$route.query.id"(val) {
      this.articleId = val;
    },
    "$route.query.article_type"(val) {
      this.articleType = val;
    },
    articleId(a, b) {
      if (a != undefined && a != b && a != "") {
        this.getArticleData();
        this.getArticleRecommend()
      }
    },
  },
  created() {
    this.getArticleData = debounce(this.getArticleData);
    this.getArticleRecommend = debounce(this.getArticleRecommend);
    this.getArticleData();
    this.getArticleRecommend()
  },
  methods: {
    getArticleData() {
      this.$axios
        .get(`http://api2021.cbnweek.com/v4/articles/${this.articleId}`)
        .then(({ data }) => {
          this.article = data;
        });
    },
    getArticleRecommend(){
      this.$axios
        .get(`http://api2021.cbnweek.com:80/v4/articles/${this.articleId}/recommendations`)
        .then(({ data }) => {
          this.recommed = data;
        });
    }
  },
  components: { ArticleContent, ArticleHeader, ArticleFooter },
};
</script>
<style lang="scss" scoped>
.home-article {
  // position: relative;
  width: 100vw;

  .magazine {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3vw;
    border-top: 1px solid #eee;
    width: 100%;
    height: 45px;
    color: #fff;
    font-size: 16px;
    background-color: #0090f0;
    z-index: 999;
  }
}
</style>