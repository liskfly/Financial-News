<template>
  <div>
    <div class="bookData" v-if="bookData[0] || bookData.articles" @scroll="scrollHieght">
      <div class="Data-top-shadow">
        <img v-if="type == 'magazines'" :src="bookData[0].magazine_cover_url">
        <img v-if="type == 'subjects'" :src="bookData.cover_url">
        <img v-if="type == 'themes'" :src="bookData.illustration">
        <div class="shadow"></div>
        <div class="white"></div>
      </div>
      <div class="flex top" ref="top">
        <img src="../assets/img/P4.png" class="goBack" @click="goBack">
        <span v-if="type == 'magazines'" class="title">{{bookData[0].magazine_summary}}</span>
        <span v-if="type == 'subjects'" class="title">{{bookData.name}}</span>
        <span v-if="type == 'themes'" class="title">{{bookData.name}}</span>
        <img src="../assets/img/35.png" class="share" v-if="type != 'magazines'">
        <span v-if="type == 'magazines'">{{' '}}</span>
      </div>
      <div class="Data-top">

        <div class="cover-shadow">
          <img class="cover" v-if="type == 'magazines'" :src="bookData[0].magazine_cover_url"
            style="box-shadow: 0px 3px 20px -1px;">
          <img class="cover" v-if="type == 'subjects'" :src="bookData.cover_url" style="box-shadow: 0px 3px 20px -1px;">
          <img class="cover" v-if="type == 'themes'" :src="bookData.illustration"
            style="box-shadow: 0px 3px 20px -1px;">
            <img src="../assets/img/4w.png" class="shadow-cover">
        </div>

        <span class="title-two" v-if="type == 'subjects'">{{bookData.name}}</span>
        <span v-if="type == 'magazines'" class="title-two">{{bookData[0].magazine_summary}}</span>
        <span class="title-two" v-if="type == 'themes'">{{bookData.name}}</span>

        <div class="date" v-if="type == 'magazines'">
          <span class="grey">{{bookData[0].magazine_summary}}</span>
          <span class="blue">NO.{{bookData[0].magazine_all_number}}</span>
        </div>

        <div class="date" v-if="type == 'subjects'">
          <span class="grey">{{time}}</span>
          <span class="blue">?????????</span>
        </div>

        <div class="date" v-if="type == 'themes'">
          <span class="grey">{{time}}</span>
          <span class="blue">?????????</span>
        </div>

        <div class="information" v-if="type == 'magazines'">
          <span class="info-dec">??????</span>
        </div>

        <span class="grey change" v-if="type != 'magazines'">?????????{{bookData.articles_count}}?????????</span>

      </div>

      <div v-if="type == 'magazines'">
        <Magazines :bookData="bookData"></Magazines>
      </div>

      <div v-if="type == 'subjects'">
        <Subjects :bookData="bookData"></Subjects>
      </div>

      <div v-if="type == 'themes'">
        <Themes :news="news"></Themes>
      </div>

    </div>
  </div>
</template>

<script>
import Magazines from "../views/ReadView/MagazineDataType/typeMagazines.vue";
import Subjects from "../views/ReadView/MagazineDataType/typeSubjects.vue";
import Themes from "../views/ReadView/MagazineDataType/typeThemes.vue";
import { debounce } from "lodash-es";
import { getDate } from "../assets/GetDate"
// import { ref } from 'vue';
export default {
  data () {
    return {
      type: this.$route.query.magazineData_type,
      bookId: this.$route.query.magazineData_id,
      bookData: {},
      suffix: 'articles',
      news: {},
      time: 0,
      scroll: 0
    }
  },
  watch: {
    "$route.query.magazineData_id" (val) {
      if (val != undefined) {
        this.bookId = val
      }
    },
    "$route.query.magazineData_type" (val) {
      if (val != undefined) {
        this.type = val
        this.getArticleData()
      }
    }
  },
  created () {
    this.getArticleData = debounce(this.getArticleData);
    this.getArticleData();
  },
  methods: {
    goBack () {
      this.$router.go(-1);
      this.bookData = {},
        this.type = ''
    },
    getArticleData () {
      if (this.type == 'Magazine') {
        this.type = 'magazines'
        this.suffix = 'articles'
      } else if (this.type == 'Subject') {
        this.type = 'subjects'
        this.suffix = ''
      } else {
        this.type = 'themes'
        this.suffix = ``
        this.$axios
          .get(`https://api2021.cbnweek.com/v4/${this.type}//${this.bookId}/articles?id=${this.bookId}&page=1&per=10`)
          .then(({ data }) => {
            this.news = data
          });
      }
      this.$axios
        .get(`https://api2021.cbnweek.com/v4/${this.type}//${this.bookId}/${this.suffix}`)
        .then(({ data }) => {
          this.bookData = data
          if (this.type != 'Magazine') {
            this.time = getDate(this.bookData.display_time)
          }
        });
    },
    scrollHieght (event) {
      this.scroll = parseInt(event.target.scrollTop)
      if (this.scroll >= 144) {
        this.$refs.top.style.backgroundColor = 'white'
      } else {
        this.$refs.top.style.backgroundColor = ''
      }
    }

  },
  components: {
    Magazines,
    Subjects,
    Themes
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
  overflow: auto;
  background-size: 100%;
  background-color: grey;

  .Data-top-shadow {
    height: 100vh;
    position: absolute;
    z-index: -1;
    background-size: 100%;

    img {
      width: 100vw;
      position: absolute;
      top: 0;
      z-index: -1;
    }

    .shadow {
      width: 100vw;
      height: 28vh;
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.2);
    }

    .white {
      width: 100vw;
      height: 100vh;
      background-color: white;
    }
  }

  .top {
    margin-top: 20px;
    position: sticky;
    padding: 10px 10px;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 999;
    justify-content: space-between;
    align-items: center;
  }

  .flex {
    display: flex;
  }

  .goBack {
    width: 8px;
    height: 16px;
  }

  .share {
    width: 16px;
    height: 16px;
  }

  .title {
    font-size: 20px;
  }

  .Data-top {
    width: 90vw;
    margin: 5vh 7vw 0;
    display: flex;
    flex-direction: column;
    align-items: center;


    .cover-shadow {
      position: relative;

      .shadow-cover {
        width: 30vw;
        position: absolute;
        height: 98%;
        top: 0;
        left: 0;
      }
    }

    .cover {
      width: 30vw;
      position: relative;
    }

    .title-two {
      font-size: 20px;
      margin-top: 2vh;
      font-weight: 700;
    }

    .change {
      margin-top: 2vh;
      font-size: 12px;
      color: grey;
    }

    .date {
      font-size: 12px;
      margin-top: 2vh;

      .grey {
        color: grey;
        margin-right: 3vw;
      }

      .blue {
        color: dodgerblue;
      }
    }

    .information {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 26vw;
      line-height: 5vh;
      margin: 2vh;
      background-color: #0091fe;
      border-radius: 4vw;
      box-shadow: 2px 2px 6px #06c;
      .info-dec {
        color: white;
        font-size: 14px;
      }
    }
  }
}
</style>