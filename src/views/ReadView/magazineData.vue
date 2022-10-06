<template>
  <div class="bookData" :style="{ backgroundImage: 'url(' + img + ')' }">
    <div class="Data-top-shadow">
      <div class="shadow"></div>
      <div class="white"></div>
    </div>
    <div class="Data-top">
      <img src="../../assets/img/gD.png" class="goBack">
      <span class="title">{{summary}}</span>
      <img :src="img" style="box-shadow: 0px 3px 20px -1px;">
      <span class="title-two">{{summary}}</span>
      <div class="date">
        <span class="grey">{{name + '  '}}</span>
        <span class="blue">NO.{{bookId}}</span>
      </div>
      <wd-button class="subscribe">订阅</wd-button>
    </div>
    <div class="have">
      <div class="type" v-if="bookData[0]">
        <div class="cover-story flex">
          <img :src="bookData[0].column_icon">
          <div @click="dropDown(bookData[0])" class="article flex">
            <span>{{bookData[0].column_summary}}</span>
          </div>
        </div>
        <div class="research flex"></div>
        <div class="appetizer flex"></div>
        <div class="insight flex"></div>
        <div class="yuppie flex"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  data () {
    return {
      name: this.$route.query.name,
      summary: this.$route.query.summary,
      bookId: this.$route.query.id,
      img: this.$route.query.img,
      bookData: {},
    }
  },
  created () {
    this.getArticleData = debounce(this.getArticleData);
    this.getArticleData();
  },
  methods: {
    // goBack(){
    //    this.$router.go(-1);
    //    this.article=[]
    // },
    getArticleData () {
      this.$axios
        .get(`https://api2021.cbnweek.com/v4/magazines//${this.bookId}/articles`)
        .then(({ data }) => {
          console.log(data, this.summary, this.name);
          this.bookData = data
        });
    }
  },
}
</script>

<style lang="scss" scoped>
.bookData {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: 10;
  overflow: auto;
  background-size: 100%;

  .backgroundImage {
    width: 100vw;
    position: absolute;
    top: 0;
  }

  .Data-top-shadow {
    height: 55vh;
    position: absolute;
    z-index: -1;

    .shadow {
      width: 100vw;
      height: 25vh;
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.2);
    }

    .white {
      width: 100vw;
      height: 100vh;
      background-color: white;
    }
  }

  .Data-top {
    width: 90vw;
    margin: 5vh 5vw 0;
    // position: absolute;
    // top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .goBack {
      width: 13px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .title {
      color: #fff;
      font-size: 20px;
    }

    img {
      width: 30vw;
      margin-top: 2vh;
    }

    .title-two {
      font-size: 25px;
      margin-top: 2vh;
    }

    .date {
      font-size: 16px;
      margin-top: 2vh;

      .grey {
        color: grey;
      }

      .blue {
        color: dodgerblue;
      }
    }

    .subscribe {
      margin-top: 2vh;
    }
  }
  .have {
    width: 94vw;
    background-color: #fff;
    padding: 4vh 2vw 0;

    .flex {
      display: flex;
    }

    .type {
      padding: 4vh 2vw 0;

      .cover-story {
        width: 94VW;
        height: 24vw;

        img {
          width: 24vw;
        }

        .article {
          width: 40vw;
          flex-direction: column;
        }
      }
    }
  }
}
</style>