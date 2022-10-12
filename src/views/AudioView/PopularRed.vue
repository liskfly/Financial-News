<template>
  <div class="popular">
    <h2>热门推荐</h2>
    <span class="text">最高人气·最热点播</span>
    <div class="box" v-for="p in popular" :key="p.id" @click="goToAudioDetail(p.id)">
      <div class="box-left">
        <img v-lazy="p.cover_url" class="lazyload-img" />
      </div>
      <div class="box-right">
        <div class="box-text">
          <p class="title">{{ p.title }}</p>
          <p class="summary">{{ p.summary }}</p>
        </div>
        <div class="visit_times">
          <div class="visit">
            <i></i>
            <span>{{ p.visit_times }}</span>
          </div>
          <div class="times">
            <i></i>
            <span>{{ audioTime(p.audio_duration) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    popular: Array,
  },
  methods: {
    audioTime(a) {
      let min = parseInt(a / 60);
      min = min > 10 ? min : "0" + min;
      let sec = a % 60;
      sec = sec > 10 ? sec : "0" + sec;
      return min + ":" + sec;
    },
     goToAudioDetail(a){
      this.$router.push(
        `/audio-detail?detail_id=${a}`
      )
    }
  },
};
</script>
<style lang="scss" scoped>
.popular {
  padding: 0 3vw;
  h2 {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .text {
    font-size: 12px;
    color: #888;
  }
  .box {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    width: 100%;
    height: 100px;
    overflow: hidden;
    .box-left {
      float: left;
      margin-right: 4vw;
      width: 70px;
      height: 70px;
      img {
        width: 100%;
      }
    }
    .box-right {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .box-text {
        width: 100%;
        P {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .title {
          font-size: 16px;
          font-weight: bold;
        }
        .summary {
          margin-top: 5px;
          font-size: 13px;
          color: #888;
        }
      }
    }
    .visit_times {
      display: flex;
      gap: 15px;
      i {
        display: inline-block;
        margin-right: 5px;
        width: 12px;
        height: 12px;
      }
      span {
        font-size: 12px;
        color: #888;
      }
      .visit {
        display: flex;
        align-items: center;
        i {
          background: url(../../assets/img/iQ.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .times {
        display: flex;
        align-items: center;
        i {
          background: url(../../assets/img/sH.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>