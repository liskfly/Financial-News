<template>
  <div class="allView">
    <ReadBanner :banner="banner"></ReadBanner>
    <NewOne :book1="book1" :num="num"></NewOne>
    <wd-infinite-load
      ref="loadmore"
      @loadmore="loadmore"
      :loading="loading"
      v-if="book1.length"
    />
  </div>
</template>

<script>
import ReadBanner from "@/components/ReadBanner";
import NewOne from "@/components/newOne.vue";
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      arr: [],
      arrbook: [],
      banner: [],
      book: [],
      book1: [],
      year: new Date().getFullYear(),
      num: [],
      arrbook1: [],
      loading: false,
    };
  },
  created() {
    this.getBannerData = debounce(this.getBannerData);
    this.getHomeNewsData = debounce(this.getHomeNewsData);
  },
  mounted() {
    this.getBannerData();
    this.getHomeNewsData();
  },
  methods: {
    getBannerData() {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/magazines?year=2022&type=magazine")
        .then(({ data }) => {
          this.arr = data;
          this.arr.map(({ data }) => {
            if (data.length > 1) {
              data.map((item) => this.banner.push(item));
            } else {
              this.banner.push(data[0]);
            }
          });
        });
    },
    getHomeNewsData() {
      this.year--;
      this.num.push(this.year);
        this.$axios
          .get(
            `http://api2021.cbnweek.com/v4/magazines?year=${this.year}&type=magazine`
          )
          .then(({ data }) => {
            this.arrbook1 = data;
            this.arrbook1.map(({ data }) => {
              if (data.length > 1) {
                data.map((item) => this.book1.push(item));
              } else {
                this.book1.push(data[0]);
              }
            });
            this.$nextTick(() => {
              this.loading = false;
            });
          })
          .catch(() => this.$refs.loadmore.loadEnd());
    },
    loadmore() {
      // console.log(this.$route.path);
      if (this.$route.path == "/read/magazine") {
        this.loading = true;
        this.getHomeNewsData();
      }
    },
  },
  components: {
    ReadBanner,
    NewOne,
  },
};
</script>