<template>
  <div class="program">
    <div v-for="a in audioSeries" :key="a.id">
      <div v-for="(t, i) in a.articles" :key="t.id"  class="program-box" @click="goToAudioDetail(t.id)">
        <p class="count">{{ i >= 9 ?  (i + 1) : "0" +(i + 1) }}</p>
        <div class="prog-img">
          <img v-lazy="t.cover_url" class="lazyload-img" />
        </div>
        <div class="box-right">
          <div class="box-text">
            <p class="title">{{ t.title }}</p>
            <p class="summary">{{ t.summary }}</p>
          </div>
          <div class="visit_times">
            <div class="visit">
              <i></i>
              <span>{{ t.visit_times }}</span>
            </div>
            <div class="times">
              <i></i>
              <span>{{ audioTime(t.audio_duration) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["audioSeries"],
   methods: {
    audioTime(a) {
      let min = parseInt(a / 60);
      min = min >= 10 ? min : "0" + min;
      let sec = a % 60;
      sec = sec >= 10 ? sec : "0" + sec;
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
.program-box {
  padding: 13px 0;
  border-bottom: 1px solid #eee;
  width: 100%;
  height: 90px;
  overflow: hidden;
.count{
    float: left;
    margin-right: 10px;
    font-size: 14px;
    color: #888;
    line-height: 60px;
}
  .prog-img {
    float: left;
    margin-right: 4vw;
    border-radius: 8px;
    width: 64px;
    height: 64px;
    overflow: hidden;
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
</style>