<template>
  <div class="home">
    <div class="Headlines">
      <span>YiMagazine</span>
      <img src="../../assets/img/Yg.png" />
    </div>
       <HomeHead :banner="banner"></HomeHead>
  
    <div class="homo-news">
      <HomeContent :homeNews="homeNews" />
    </div>
    <wd-infinite-load
      ref="loadmore"
      @loadmore="loadmore"
      :loading="loading"
      v-if="homeNews.length"
    />
  </div>
</template>

<script>
import HomeHead from "@/components/HomeHead";
import HomeContent from "./HomeContent.vue";
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      page: 0,
      loading: false,
      banner: [],
      homeNews: [],
    };
  },
  created() {
    this.getData = debounce(this.getData);
    this.getHomeNewsData = debounce(this.getHomeNewsData);
  },
  mounted() {
    this.getData();
    this.getHomeNewsData();
  },
  methods: {
    getHomeNewsData() {
      this.page++;
      this.$axios
        .get(`http://api2021.cbnweek.com/v4/first_page_infos?page=${this.page}`)
        .then(({ data }) => {
          this.homeNews.push(...data);
          // console.log(this.homeNews);
          this.$nextTick(() => {
            this.loading = false;
          });
        })
        .catch(() => this.$refs.loadmore.loadEnd());
    },
    getData() {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/banners?category=first")
        .then(({ data }) => {
          this.banner = data;
        });
    },
    //下拉刷新
    loadmore() {
      this.loading = true;
      this.getHomeNewsData();
    },
  },
  components: {
    HomeHead,
    HomeContent,
  },
};
</script>
<style lang="scss" scoped>
.home {
  margin-bottom: 65px;
  overflow: visible;
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
}
</style>
