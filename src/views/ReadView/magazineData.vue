<template>
  <div class="bookData" :style="{ backgroundImage: 'url(' + img + ')' }">
    <div class="Data-top-shadow">
      <div class="shadow"></div>
      <div class="white"></div>
    </div>
    <div class="Data-top">
        <img src="../../assets/img/gD.png" class="goBack">
        <span></span>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  data () {
    return {
      bookId: this.$route.query.id,
      img: this.$route.query.img,
      bookData:{},
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
            console.log(data);
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
  z-index: 10;
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

    .shadow {
      width: 100vw;
      height: 30vh;
      backdrop-filter: blur(5px);
      background-color: rgba(0,0,0,0.5);
    }

    .white {
      width: 100vw;
      height: 25vh;
      backdrop-filter: blur(2px);
      background-color: white;
    }
  }

  .Data-top {
    width: 90vw;
    margin: 5vh 5vw 0;
    position: absolute;
    top: 0;

    .goBack {
      width: 15px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>