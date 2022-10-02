<template>
  <div class="home">
    <HomeHead></HomeHead>
    <div class="homo-news">
      <HomeContent :homeNews="homeNews" />
    </div>
    <wd-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading"  v-if="homeNews.length"/>
  </div>
</template>

<script>
import HomeHead from "./HomeHead";
import HomeContent from "./HomeContent.vue";
import { debounce } from "lodash-es";

export default {
  name: "HomeView",
  data() {
    return {
      page: 0,
      loading: false,
      homeNews: [],
    };
  },
  created() {
    this.getHomeNewsData = debounce(this.getHomeNewsData);
  },
  mounted() {
   this.getHomeNewsData();
  },
  methods: {
    getHomeNewsData() {
      this.page++
      this.$axios
        .get(`http://api2021.cbnweek.com/v4/first_page_infos?page=${this.page}`)
        .then(({ data }) => {
          this.homeNews.push(...data)
          // console.log(this.homeNews);
          this.$nextTick(()=>{
          this.loading = false;
          })
        })
        .catch(() => this.$refs.loadmore.loadEnd());
      
    },
    loadmore() {
      this.loading=true
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
  overflow: auto;
}
</style>
