<template>
  <div class="home-article">
    <div class="header">
      <img src="../../assets/img/SJ.png" alt="返回" class="back" @click="goBack" />
      <img src="../../assets/img/EN.png" alt="更多" class="gd" />
    </div>

    <div>
      <ArticleContent :article="article" :articleType="articleType"></ArticleContent>
    </div>

    <div class="article" v-if="articleType=='normal'">
      <div class="commit">
        <input type="text" placeholder="我的观点..."/>
      </div>
      <div class="btn">
        <i class="comments"></i>
        <i class="collection"></i>
        <i class="like"></i>
        <i class="share"></i>
      </div>
    </div>
    <div class="magazine" v-if="articleType!=='normal'">
      <span>订阅</span>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
import ArticleContent from './ArticleContent.vue';
export default {
 
  data(){
    return {
      articleId:this.$route.query.id,
      article:[],
      articleType:this.$route.query.article_type
    }
  },
  watch:{
    "$route.query.id"(val){
      this.articleId=val
    },
    "$route.query.article_type"(val){
      this.articleType=val
    },
    articleId(a,b){
      if(a!=undefined&&(a!=b)){
         this.getArticleData();
      }
    }
  },
  created() {
    this.getArticleData = debounce(this.getArticleData);
    this.getArticleData();
  },
  methods:{
    goBack(){
       this.$router.go(-1);
       this.article=[]
    },
    getArticleData(){
      // console.log(1);
      // console.log(this.articleId);
       this.$axios
        .get(`http://api2021.cbnweek.com/v4/articles/${this.articleId}`)
        .then(({ data }) => {
          this.article = data;
          // console.log(this.article);
        });
    }
  },
   components: { ArticleContent },
}
</script>
<style lang="scss" scoped>
.home-article {
  // position: relative;
  width: 100vw;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    z-index: 999;
    .back {
      width: 10px;
      height: 20px;
    }
    .gd {
      width: 20px;
      height: 5px;
    }
  }
  .article{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3vw;
    border-top: 1px solid #eee;
    width: 100%;
    height: 45px;
    background-color: #fff;
    z-index: 999;
    
    .commit{
       display: flex;
        align-items: center;
        border-radius: 999px;
        width:50vw;
        height: 100%;
        background-color: #eee;
        input{
            margin-left: 10px;
            width: 30vw;
            border: none;
            outline: none;
            background-color: #eee;
        }
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:35vw ;
        height:100% ;
        i{
            width: 18px;
            height: 18px;
        }
        .comments{
            background: url(../../assets/img/lr.png) no-repeat;
            background-size: 100% 100%;
        }
         .collection{
            background: url(../../assets/img/Ip1.png) no-repeat;
             background-size: 100% 100%;
        }
         .like{
            background: url(../../assets/img/gQ.png) no-repeat;
             background-size: 100% 100%;
        }
         .share{
            background: url(../../assets/img/4Y.png) no-repeat;
             background-size: 100% 100%;
        }
    }
  }
  .magazine{
    display: flex;
    align-items: center;
    justify-content:center;
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