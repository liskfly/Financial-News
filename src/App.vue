<template>
  <div id="app">
    <keep-alive>
      <router-view
        @sent-appId="sentAudioId"
        @sent-play="sentPlay"
        @set-audioTime="setAudioTime"
        :playAudio="playAudio"
        :curr="curr"
        :audioCon="audioCon"
      />
    </keep-alive>
    <div class="audio-box" v-show="audioSrc" @click="goToAudioPlay">
      <audio :src="audioSrc" ref="audio" @timeupdate="getCurr" autoplay></audio>
      <img src="@/assets/img/Zg.png" alt="sh" @click.stop="clearAudio" />
      <p v-for="a in audioCon" :key="a.title">{{ a.title }}</p>
      <i></i>
      <div
        class="control"
        :class="{ showbox: playAudio }"
        @click.stop="stopAudio"
      ></div>
    </div>
    <div class="tab-bar" v-show="$route.meta.showfater">
      <router-link tag="div" class="tab-bar-item" to="/home">
        <div class="item home"></div>
        <span class="text">首页</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/audio">
        <div class="item audio"></div>
        <span class="text">音频</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/read">
        <div class="item read"></div>
        <span class="text">阅读</span>
      </router-link>
      <router-link tag="div" class="tab-bar-item" to="/user">
        <div class="item user"></div>
        <span class="text">我的</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      audioId: "",
      audioSrc: "",
      duration: 0,
      isData: false,
      playAudio: false,
      curr: 0,
      audioType: 1,
      audioArr: [],
      audioCon: [],
    };
  },
  watch: {
    audioType(a, b) {
      console.log(a, b);
      if (a != b) {
        this.isData = false;
        this.getAudioData();
      }
    },
    audioId(a, b) {
      if (a != b && a) {
        if (this.isData) {
          // console.log(this.isData);
          this.getNewAudio();
        }
      }
    },
    playAudio(a) {
      if (this.duration != 0) {
        if (a == true && a) {
          this.audioSrc = this.audioCon[0].audio_url;
          // this.$refs.audio.autoplay = "autoplay";
          if (this.$refs.audio.src) {
            this.$refs.audio.play();
          }
        } else {
          this.$refs.audio.autoplay = "";
          this.$refs.audio.pause();
        }
      }
    },
  },
  created(){
    this. getAudioData()
  },
  methods: {
    sentAudioId({ audioid, isPlay, audioType }) {
      this.audioId = audioid;
      this.playAudio = isPlay;
      this.audioType = audioType;
    },
    sentPlay({ audioid, isPlay }) {
      this.audioId = audioid;
      this.playAudio = isPlay;
    },
    getAudioData() {
      let audioArrDataStr = [];
      localStorage.setItem("AUDIO_DTATA_PROGRAM", audioArrDataStr);
      this.$axios
        .get(
          `http://api2021.cbnweek.com/v4/audio_series?id=${this.audioType}&type=AudioCourse&equipment=android`
        )
        .then(({ data }) => {
          this.isData = true;
          this.audioArr = data[0].articles;
          let audioArrDataStr = JSON.stringify(this.audioArr);
          localStorage.setItem("AUDIO_DTATA_PROGRAM", audioArrDataStr);
          if(this.audioId){
            this.getNewAudio();
          }
        });
    },
    getNewAudio() {
      this.audioCon = this.audioArr.filter((t) => {
        return t.id == this.audioId;
      });
      this.audioSrc = this.audioCon[0].audio_url;
      this.duration = this.audioCon[0].audio_duration;
      this.$nextTick(() => {
        this.$refs.audio.load();
        if (this.playAudio == true) {
          this.$refs.audio.autoplay = "autoplay";
        }
      });
    },
    clearAudio() {
      this.audioSrc = "";
      this.playAudio = false;
    },
    stopAudio() {
      this.playAudio = !this.playAudio;
    },
    goToAudioPlay() {
      this.$router.push(`/audio-play`);
    },
    getCurr() {
      this.curr = parseInt(this.$refs.audio.currentTime);
    },
    setAudioTime(a) {
      this.$refs.audio.currentTime = a;
    },
  },
};
</script>
<style lang="scss" scoped>
.audio-box {
  display: flex;
  gap: 10px;
  align-items: center;
  position: fixed;
  left: 3vw;
  bottom: 60px;
  border-radius: 5px;
  padding: 6px 10px;
  width: 94vw;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    flex: 1;
    color: #fff;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  i {
    width: 16px;
    height: 16px;
    background-image: url(@/assets/img/oK.png);
    background-size: contain;
  }
  .control {
    width: 28px;
    height: 28px;
    background-image: url(@/assets/img/ZR.png);
    background-size: contain;
  }
  .showbox {
    background-image: url(@/assets/img/x5.png);
  }
}
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  border-top: 1px solid #eee;
  background-color: #fff;
  // z-index: 999;
  .tab-bar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 13px;

    .item {
      width: 25px;
      height: 25.5px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    .home {
      background-image: url(./assets/img/F8.png);
    }
    .audio {
      background-image: url(./assets/img/b2.png);
    }
    .read {
      background-image: url(./assets/img/cB.png);
    }
    .user {
      background-image: url(./assets/img/uW.png);
    }
    &.router-link-active {
      .home {
        background-image: url(./assets/img/v_.png);
      }

      .audio {
        background-image: url(./assets/img/uM.png);
      }
      .read {
        background-image: url(./assets/img/et.png);
      }
      .user {
        background-image: url(./assets/img/_B.png);
      }
      .text {
        color: #0091ff;
      }
    }
  }
}
</style>
