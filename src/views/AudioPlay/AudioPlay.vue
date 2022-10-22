<template>
  <div class="audio-play" v-if="audioCon">
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + audioArr[0].cover_url + ')' }"
    >
      <div class="audio-box">
        <div class="head">
          <img src="@/assets/img/KB.png" alt="goback" @click="goBack" />
          <img
            src="@/assets/img/35.png"
            alt="share"
            @click.stop="showShare = true"
          />
        </div>
        <van-share-sheet
          v-model="showShare"
          title="立即分享给好友"
          :options="shareOptions"
          @select="onSelect"
        />
        <div class="audio-title">
          <p>{{ audioCon[0].title }}</p>
        </div>
        <div class="audio-anime">
          <div class="run" ref="runAnim">
            <img :src="audioArr[0].cover_url" alt="tp" />
          </div>
        </div>
        <div class="download-speed">
          <img src="@/assets/img/Cf.png" alt="download" />
          <img
            src="@/assets/img/pz.png"
            alt="speed"
            @click="showSpeed = !showSpeed"
          />
          <van-popup
            v-model="showSpeed"
            position="bottom"
            closeable
            round
            :style="{ height: '30%' }"
          >
            <div class="speed-box">
              <div
                v-for="s in speedArr"
                :key="s.value"
                :class="{ speedc: speed == s.value }"
                @click="chooseSpeed(s.value)"
              >
                {{ s.text }}
              </div>
            </div>
          </van-popup>
          <div class="speed-count">{{ speed + "x" }}</div>
        </div>
        <div class="control">
          <van-slider
            v-model="progress"
            bar-height="2px"
            active-color="#fff"
            @change="changeLong"
          >
            <template #button>
              <div class="custom-button"></div>
            </template>
          </van-slider>
          <div class="audio-text-time">
            <span>{{ showDate(curr) }}</span
            ><span>{{ showDate(audioCon[0].audio_duration) }}</span>
          </div>
          <div class="audio-control">
            <img
              src="@/assets/img/eF.png"
              alt="dd"
              @click="showAllAudio = !showAllAudio"
            />
            <van-popup
              v-model="showAllAudio"
              position="bottom"
              :style="{ height: '50%' }"
            >
              <div class="progm">
                <div class="progm-top">
                  <p>节目</p>
                  <img
                    src="@/assets/img/UR.png"
                    alt="x"
                    @click.stop="showAllAudio = false"
                  />
                </div>
                <span>共{{ audioArr[0].audio_serie_count }}集</span>
              </div>
              <div class="progm-box" v-if="audioArr">
                <div
                  class="audio-item"
                  v-for="(a, i) in audioArr[0].articles"
                  :key="a.title"
                  @click="chooseAudio(a.id)"
                >
                  <span :class="{ play: activeAudio(audioCon[0].id) == i }">{{
                    i >= 9 ? i + 1 : "0" + (i + 1)
                  }}</span>
                  <p :class="{ play: activeAudio(audioCon[0].id) == i }">
                    {{ a.title }}
                  </p>
                  <span class="audio-time"
                    ><i></i>{{ showDate(a.audio_duration) }}</span
                  >
                </div>
              </div>
            </van-popup>
            <img
              src="@/assets/img/hA.png"
              alt="dd"
              @click.stop="preAudio(audioCon[0].id)"
            />
            <div
              class="audio-play-control"
              :class="{ play: isPlay }"
              @click.stop="sentPlay(audioCon[0].id)"
            ></div>
            <img
              src="@/assets/img/rY.png"
              alt="dd"
              @click="nextAudio(audioCon[0].id)"
            />
            <img
              src="@/assets/img/Wl.png"
              alt="xs"
              @click.stop="goToAudioDetail(audioCon[0].id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getTime } from "@/utils/GetDate";
import { debounce } from "lodash-es";
import { options } from "@/utils/ShareShowData";
export default {
  props: {
    playAudio: Boolean,
    audioCon: Array,
    curr: Number,
    audioArr: Array,
    speed: Number,
  },
  data() {
    return {
      progress: 0,
      speedArr: [
        { text: "0.75倍", value: 0.75 },
        { text: "正常", value: 1 },
        { text: "1.5倍", value: 1.5 },
        { text: "2倍", value: 2 },
      ],
      showShare: false,
      shareOptions: options,
      // audioArr: JSON.parse(localStorage.getItem("AUDIO_DTATA_PROGRAM")),
      showAllAudio: false,
      showSpeed: false,
      value: this.curr,
      isPlay: this.playAudio,
    };
  },
  watch: {
    playAudio(a) {
      this.isPlay = a;
      // console.log(a);
      if (a == true) {
        this.$refs.runAnim.style.animationPlayState = "running";
      } else {
        this.$refs.runAnim.style.animationPlayState = "paused";
      }
    },
    curr(a, b) {
      this.value = a;
      if (a != b) {
        this.showProgress();
      }
    },
    showAudioPlay(a) {
      this.hidePlay = a;
    },
  },
  created() {
    this.changeLong = debounce(this.changeLong);
  },
  methods: {
    goBack() {
      let hidePlay = false;
      this.$emit("hide-play", hidePlay);
    },
    sentPlay(a) {
      this.isPlay = !this.isPlay;
      this.$emit("sent-play", { audioid: a, isPlay: this.isPlay });
    },
    preAudio(id) {
      let a = this.audioArr[0].articles.findIndex((t) => t.id == id);
      if (a == 0) {
        alert("这是第一个Audio");
      } else {
        let preId = this.audioArr[0].articles[a - 1].id;
        this.$emit("sent-play", { audioid: preId, isPlay: this.isPlay });
      }
    },
    nextAudio(id) {
      let a = this.audioArr[0].articles.findIndex((t) => t.id == id);
      if (a == this.audioArr[0].articles.length - 1) {
        alert("这是最后一个Audio");
      } else {
        let preId = this.audioArr[0].articles[a + 1].id;
        this.$emit("sent-play", { audioid: preId, isPlay: this.isPlay });
      }
    },
    goToAudioDetail(a) {
      let hidePlay = false;
      this.$emit("hide-play", hidePlay);
      if (this.$route.query.detail_id != a) {
        this.$router.push(`/audio-detail?detail_id=${a}`);
      }
    },
    showProgress() {
      this.progress = (this.value / this.audioCon[0].audio_duration) * 100;
    },
    changeLong() {
      let ct = (this.progress * this.audioCon[0].audio_duration) / 100;
      this.$emit("set-audioTime", ct);
    },
    activeAudio(id) {
      let a = this.audioArr[0].articles.findIndex((t) => t.id == id);
      return a;
    },
    chooseAudio(a) {
      this.showAllAudio = !this.showAllAudio;
      this.$emit("sent-play", { audioid: a, isPlay: this.isPlay });
    },
    showDate(a) {
      return getTime(a);
    },
    chooseSpeed(a) {
      // console.log(a);
      this.showSpeed = !this.showSpeed;
      this.$emit("set-speed", a);
    },
    onSelect() {
      this.showShare = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.audio-play {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  width: 100vw;
  height: 100vh;
  .bg {
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    .audio-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      padding: 0 3vw;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 0, 0.3);
      .head {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        width: 100%;
        height: 48px;
        img {
          width: 18px;
          height: 18px;
        }
      }
      .audio-title {
        display: flex;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        p {
          margin: auto;
          line-height: 20px;
        }
      }
      .audio-anime {
        display: flex;
        width: 100%;
        height: 55vh;
        .run {
          margin: auto;
          border-radius: 999px;
          width: 50vw;
          height: 50vw;
          overflow: hidden;
          animation: turnAnimate 20s linear infinite;
          img {
            width: 100%;
          }
        }
      }
      .download-speed {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 60px;
        img {
          width: 24px;
          height: 20px;
        }
        .speed-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin-top: 52px;
        }
        .speedc {
          color: #0090ff;
          font-weight: bold;
        }
        .speed-count {
          position: absolute;
          top: -4px;
          left: 220px;
          padding: 1px;
          border-radius: 999px;
          color: #fff;
          font-size: 12px;
          font-weight: bold;
          line-height: 14px;
          background-color: red;
        }
      }
      .control {
        padding: 30px 0;

        .custom-button {
          border-radius: 999px;
          width: 10px;
          height: 10px;
          background-color: #fff;
        }
        .audio-text-time {
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          color: #eee;
          font-size: 12px;
        }
        .audio-control {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 60px;
          .audio-play-control {
            width: 45px;
            height: 45px;
            background-image: url(@/assets/img/EU.png);
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
          .play {
            background-image: url(@/assets/img/RI.png);
          }
          img {
            width: 22px;
            height: 22px;
          }
          .progm {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: sticky;
            top: 0;
            left: 0;
            padding: 0 4vw;
            background-color: #fff;
            .progm-top {
              width: 100%;

              display: flex;
              justify-content: flex-end;
              padding-top: 10px;
              img {
                width: 16px;
                height: 16px;
              }
              p {
                margin: auto;
              }
            }
            p {
              font-size: 16px;
            }
            span {
              margin: 7px 0;
              font-size: 13px;
              color: #888;
            }
          }
          .progm-box {
            padding: 0 4vw;
            .audio-item {
              display: flex;
              gap: 10px;
              align-items: flex-start;
              padding: 8px 0;
              font-size: 13px;
              border-bottom: 1px solid #eee;
              span {
                color: #888;
              }
              P {
                flex: 1;
              }
              .play {
                color: #0090ff;
              }
              .audio-time {
                display: flex;
                align-items: center;
                font-size: 12px;
                i {
                  display: inline-block;
                  margin-right: 10px;
                  width: 12px;
                  height: 12px;
                  background-image: url(@/assets/img/sH.png);
                  background-repeat: no-repeat;
                  background-size: 100% 100%;
                }
              }
            }
          }
        }
      }
    }
  }
  .move-enter {
    transform: translateY(100%);
  }
  .move-leave-to {
    transform: translateY(-100%);
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 10s linear;
  }

  .move-leave,
  .move-enter-to {
    transform: translateY(0);
  }
}
@keyframes turnAnimate {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>