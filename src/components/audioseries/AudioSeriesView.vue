<template>
  <div class="series">
    <div v-for="t in audioSeries" :key="t.id">
      <div class="head" >
        <img src="../../assets/img/P4.png" alt="返回" @click="goBack" />
        <p>{{t.name}}</p>
      </div>
      <div class="series-photo">
        <img v-lazy="t.cover_url_chang" alt="series-img">
      </div>
      <div class="series-content">
        <div class="nav">
          <div class="nav-item">
            <div
              class="nav-list"
              :class="{ active: audioActive == 1 }"
              @click="audioActive = 1"
            >
              节目
            </div>
            <div
              class="nav-list"
              :class="{ active: audioActive == 2 }"
              @click="audioActive = 2"
            >
              简介
            </div>
            <div
              class="nav-list"
              :class="{ active: audioActive == 3 }"
              @click="audioActive = 3"
            >
              评论
            </div>
          </div>
          <div v-if="audioActive == 1" class="count">共{{t.audio_serie_count}}集</div>
        </div>
        <div class="series-list">
          <component :is="chose" :audioSeries="audioSeries" :seriesId="seriesId"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AudioProgram from "./AudioProgram.vue";
import AudioIntroduction from "./AudioIntroduction.vue";
import AudioComment from "./AudioComment.vue";
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      audioActive: 1,
      seriesId: this.$route.query.Arera_id,
      audioSeries: {},
    };
  },
  watch: {
    "$route.query.Arera_id"(val) {
      this.seriesId = val;
    },
    seriesId(a, b) {
      if (a != undefined && a != b) {
        this.getAudioSeries();
      }
    },
  },
  computed: {
    chose() {
      if (this.audioActive == 1) {
        return "AudioProgram";
      } else if (this.audioActive == 2) {
        return "AudioIntroduction";
      } else {
        return "AudioComment";
      }
    },
  },
  created() {
    this.getAudioSeries = debounce(this.getAudioSeries);
    this.getAudioSeries();
  },
  methods: {
    getAudioSeries() {
      this.$axios
        .get(
          `http://api2021.cbnweek.com/v4/audio_series?id=${this.seriesId}&type=AudioCourse&equipment=android`
        )
        .then(({ data }) => {
          this.audioSeries = data;
        });
    },
    goBack() {
      this.$router.go(-1);
      this.audioSeries=''
    },
  },
  components: {
    AudioProgram,
    AudioIntroduction,
    AudioComment,
  },
};
</script>
<style lang="scss" scoped>
.series {
  width: 100vw;
  height: 100px;
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    z-index: 999;
    background-color: #fff;
    img {
      width: 10px;
      height: 20px;
    }
    p {
      margin: auto;
    }
  }
  .series-photo {
    margin-bottom: 25px;
    border-radius: 10px;
    padding: 0 3vw;
    width: 100%;
    height: 25vh;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .series-content {
    padding: 0 3vw;
    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: sticky;
      top: 40px;
      background-color: #fff;
      .nav-item {
        display: flex;
        justify-content: center;
        gap: 35px;
        .nav-list {
          padding: 10px 0;
          &.active {
            color: #0090f0;
            border-bottom: 1px solid #0090f0;
          }
        }
        .count {
          margin: auto;
        }
      }
    }
  }
}
</style>
