<template>
  <div class="audio">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div v-show="$route.meta.showfater">
      <div class="Headlines">
        <span>听</span>
        <img src="../../assets/img/Yg.png" />
      </div>
      <HomeHead :banner="banner"></HomeHead>
      <BoutiqueArea :area="area"></BoutiqueArea>
      <PopularRed :popular="popular"></PopularRed>
    </div>
  </div>
</template>
<script>
import HomeHead from "@/components/HomeHead";
import BoutiqueArea from "./BoutiqueArea.vue";
import { debounce } from "lodash-es";
import PopularRed from "./PopularRed.vue";
export default {
  data() {
    return {
      banner: [],
      area: [],
      popular: [],
    };
  },
  created() {
    this.getAudioBanner = debounce(this.getAudioBanner);
    this.getArea = debounce(this.getArea);
    this.getPopular = debounce(this.getPopular);
  },
  mounted() {
    this.getAudioBanner();
    this.getArea();
    this.getPopular();
  },
  methods: {
    getAudioBanner() {
      this.$axios
        .get("http://api2021.cbnweek.com/v4/audio_banners")
        .then(({ data }) => {
          this.banner = data;
        });
    },
    getArea() {
      this.$axios
        .get(
          "http://api2021.cbnweek.com/v4/audio/audio_index?page=1&per=20&year=2021"
        )
        .then(({ data }) => {
          this.area = data;
        });
    },
    getPopular() {
      this.$axios
        .get(
          "http://api2021.cbnweek.com/v4/audio_series/visits?page=1&per=20&type=android"
        )
        .then(({ data }) => {
          this.popular = data;
        });
    },
  },
  components: {
    HomeHead,
    BoutiqueArea,
    PopularRed,
  },
};
</script>
<style lang="scss" scoped>
.audio {
  margin-bottom: 65px;
  overflow: visible;
  .Headlines {
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    width: 100vw;
    padding: 10px 15px;
    font-family: "穿越寒冬拥抱你";
    font-size: 20px;
    font-weight: 900;
    top: 0;
    z-index: 999;
    background-color: white;
    img {
      position: absolute;
      right: 15px;
      width: 18px;
      height: 18px;
    }
  }
}
</style>