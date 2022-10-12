<template>
  <div class="news" v-if="newsWeek" @click="showWeek = false">
    <div v-for="n in todayNews" :key="n.publish_at">
      <div class="choose-time">
        <div class="time">
          <span class="time-date">{{ day(n.publish_at, 1) }}</span>
          <span class="time-mon">{{ day(n.publish_at, 2) }}</span>
          <div class="calendar">
            <img
              src="@/assets/img/3w.png"
              alt="calendar"
              @click.stop="showWeek = !showWeek"
            />
            <div class="date" v-show="showWeek">
              <div
                v-for="t in newsWeek"
                :key="t.id"
                @click="chooseDate(t.publish_at)"
                class="date-text"
              >
                {{ showDate(t.publish_at) }}
              </div>
            </div>
          </div>
        </div>
        <div class="audio-img" :class="{playmg:false}" @click="sentAudioId(n.id)"></div>
      </div>
      <div class="news-box">
        <div class="new-img">
          <img v-lazy="n.audioserie_cover_url" alt="头条" />
        </div>
        <div class="news-textbox">
          <TextRun :textArr="newsText(n.summary)"></TextRun>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TextRun from "@/components/TextRun.vue";
import { getDate, monthEnList } from "@/utils/GetDate";

export default {
  components: { TextRun },
  props: ["newsWeek", "hide"],
  data() {
    return {
      dateTime: "",
      showWeek: false,
    };
  },
  computed: {
    todayNews() {
      if (this.dateTime == "") {
        return this.newsWeek.filter((t, index) => index == 0);
      } else {
        return this.newsWeek.filter(
          ({ publish_at }) => publish_at == this.dateTime
        );
      }
    },
  },
  methods: {
    showDate(a) {
      return getDate(a);
    },
    chooseDate(a) {
      this.dateTime = a;
      this.showWeek = false;
    },
    newsText(a) {
      let textArr = a.split("\n");
      return textArr;
    },
    day(a, b) {
      let date = new Date(a);
      if (b == 1) {
        return date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      } else {
        let mon = date.getMonth();
        let str = `${monthEnList[mon]}.${date.getFullYear()}`;
        return str;
      }
    },
  sentAudioId(a){
    console.log(a);
    this.$emit('sent-id',a)
  }

  },
};
</script>

<style lang="scss" scoped>
.news {
  .choose-time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    .time {
      display: flex;
      align-items: flex-end;
      .time-date {
        margin-right: 8px;
        font-size: 22px;
        font-weight: bolder;
      }
      .time-mon {
        margin-right: 6px;
        font-size: 12px;
        color: #666;
      }
      .calendar {
        position: relative;
        img {
          width: 16px;
          height: 16px;
        }
        .date {
          position: absolute;
          top: 24px;
          left: 0;
          border: 2px solid #eee;
          width: 120px;
          background-color: #fff;
          z-index: 1;
          font-size: 13px;
          .date-text {
            padding: 8px 6px;
          }
        }
      }
    }
    .audio-img{
      width: 16px;
      height: 16px;
      background-image: url(@/assets/img/FM.png);
      background-size: contain;
     
    }
     .playmg{
         background-image: url(@/assets/img/gX.png);
      }
    
  }
  .news-box {
    display: flex;
    justify-content: space-between;
    border: 1px solid #eee;
    box-shadow: 1px 1px 3px #eee;
    border-radius: 5px;
    width: 100%;
    height: 76px;
    padding: 12px 12px;
    .new-img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
  }
}
</style>