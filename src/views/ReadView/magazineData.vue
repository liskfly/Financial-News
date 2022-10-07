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
          <div class="article flex blue" :class="stow[0].key ? '':'short'">
            <span :class="stow[0].key ? '':'hide'">{{bookData[0].column_summary}}</span>
            <span>共{{bookData[0].articles.length}}文章</span>
            <span v-for="item in bookData[0].articles" :key="item.title" class="borderLine">{{item.title}}</span>
            <span @click="dropDown(0)">点击收起</span>
          </div>
          <div class="up" @click="dropDown(0)" v-show="!stow[0].key">></div>
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
      stow: [{key:false}, false, false, false, false]
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
    },
    dropDown (index) {
      this.stow[index].key = !this.stow[index].key
      console.log(this.stow);
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
      padding: 0 2vw 0;

      .cover-story {
        width: 72vw;
        background-color: rgb(191, 240, 255);
        position: relative;

        .up {
          position: absolute;
          right: 2vw;
          bottom: 2vw;
          transform:rotate(90deg);
        }

        img {
          width: 24vw;
          height: 24vw;
        }

        .short {
          height: 12vw;
          overflow: hidden;
        }

        .article {
          box-sizing: border-box;
          width: 48vw;
          flex-direction: column;
          font-size: 12px;
          background-color: rgb(191, 240, 255);

          span {
            margin: 2vh 4vw 0;
            padding-bottom: 2vh;
          }

          .borderLine {
            border-bottom: 1px solid black;
          }

          .hide {
            height: 12vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>