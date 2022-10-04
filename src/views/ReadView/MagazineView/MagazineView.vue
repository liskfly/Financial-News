<template>
  <div class="allView">
    <ReadBanner :banner="banner"></ReadBanner>
    <ReadBook :book="book"></ReadBook>
  </div>
</template>

<script>
import ReadBanner from "@/components/ReadBanner";
import ReadBook from "@/components/ReadBook";
import { debounce } from "lodash-es";

export default {
  data () {
    return {
      arr: [],
      arrbook:[],
      banner: [],
      book: []
    }
  },
  created () {
    this.getBannerData = debounce(this.getBannerData);
    this.getBookData = debounce(this.getBookData);
  },
  mounted () {
    this.getBannerData();
    this.getBookData()
  },
  methods: {
    getBannerData () {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/magazines?year=2022&type=magazine")
        .then(({ data }) => {
          this.arr = data;
          this.arr.map(({ data }) => {
            if (data.length > 1) {
              data.map(item => this.banner.push(item))
            } else {
              this.banner.push(data[0])
            }
          })
        });
    },
    getBookData () {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/magazines?year=2021&type=magazine")
        .then(({ data }) => {
          this.arrbook = data
          this.arrbook.map(({ data }) => {
            if (data.length > 1) {
              data.map(item => this.book.push(item))
            } else {
              this.book.push(data[0])
            }
          })
        });
    }
  },
  components: {
    ReadBanner,
    ReadBook,
  }
}
</script>