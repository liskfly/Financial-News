<template>
  <div class="home">
    <router-view />
    <div v-show="$route.meta.showfater">
      <div class="Headlines">
        <span>YiMagazine</span>
        <img src="../../assets/img/Yg.png" @click="gotoHomeSearch" />
      </div>
      <HomeHead :banner="banner"></HomeHead>
      <dir class="news-week">
        <NewsWeek
          :newsWeek="newsWeek"
          @sent-appId="sentAudioId"
          :playAudio="playAudio"
        />
      </dir>
      <div class="homo-news" @click="hide = false">
        <HomeContent :homeNews="homeNews" />
      </div>
      <wd-infinite-load
        ref="loadmore"
        @loadmore="loadmore"
        :loading="loading"
        v-if="homeNews.length"
      />
    </div>
  </div>
</template>

<script>
import HomeHead from "@/components/HomeHead";
import HomeContent from "./HomeContent.vue";
import { debounce } from "lodash-es";
import NewsWeek from "./NewsWeek.vue";

export default {
  props: ["playAudio"],
  data() {
    return {
      page: 0,
      loading: false,
      scorll: 0,
      banner: [],
      homeNews: [],
      newsWeek: [],
    };
  },
  created() {
    this.getData = debounce(this.getData);
    this.getHomeNewsData = debounce(this.getHomeNewsData);
    this.getNewsWeek = debounce(this.getNewsWeek);
    this.loadmore = debounce(this.loadmore);
  },
  mounted() {
    this.getData();
    this.getHomeNewsData();
    this.getNewsWeek();
  },
  methods: {
    gotoHomeSearch() {
      this.$router.push("/home/home-search");
    },
    getHomeNewsData() {
      this.page++;
      if (this.page < 10) {
        this.$axios
          .get(
            `http://api2021.cbnweek.com/v4/first_page_infos?page=${this.page}`
          )
          .then(({ data }) => {
            this.homeNews.push(...data);
            // console.log(this.homeNews);
            this.$nextTick(() => {
              this.loading = false;
            });
          })
          .catch(() => this.$refs.loadmore.loadEnd());
      }
    },
    getData() {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/banners?category=first")
        .then(({ data }) => {
          this.banner = data;
        });
    },
    getNewsWeek() {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/first_page_infos/audioNewsWeek")
        .then(({ data }) => {
          this.newsWeek = data[0].article;
        });
    },
    //下拉刷新
    loadmore() {
     if(this.$route.path=='/home'){
       this.loading = true;
       this.getHomeNewsData();
     }
      
    },
    sentAudioId({ audioid, isPlay, audioType }) {
      console.log(audioid, isPlay, audioType);
      this.$emit("sent-appId", { audioid, isPlay, audioType });
    },
  },
  components: {
    HomeHead,
    HomeContent,
    NewsWeek,
  },
};
</script>
<style lang="scss" scoped>
.home {
  // overflow: auto;
  .Headlines {
    width: 100vw;
    padding: 30px 10px 20px 30vw;
    font-family: "穿越寒冬拥抱你";
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: white;

    img {
      width: 18px;
      height: 18px;
    }
  }
  .homo-news {
    padding: 0 3vw;
  }
  .news-week {
    margin: 0;
    padding: 0 3vw;
  }
}
</style>
