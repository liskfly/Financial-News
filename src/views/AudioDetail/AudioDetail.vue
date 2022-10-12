<template>
  <div class="audiodetail">
    <div class="header">
      <img
        src="../../assets/img/P4.png"
        alt="返回"
        class="back"
        @click="goBack"
      />
      <span>{{ detail.audio_title }}</span>
      <img src="../../assets/img/OE.png" alt="更多" class="gd" />
    </div>
    <div class="detail" v-if="detail">
      <div class="detail-title">
        <p>{{ detail.title }}</p>
        <span>{{ detail.display_time }}</span>
      </div>
      <div class="detail-audio"></div>
      <div class="detail-text" v-html="detail.content"></div>
      <div class="text-bottom">
        <div class="text-ascription">
          <span>本文版权归本人开发者所有</span>
          <span>未经许可不得转载或翻译</span>
        </div>
        <div class="article-like">
          <div class="like-icon">
            <i class="collect"></i>
            <div class="fond"><img src="../../assets/img/_m.png" alt="" /></div>
            <i class="share"></i>
          </div>
          <span>{{ detail.favorite_times }}</span>
        </div>
      </div>
    </div>
    <div class="detail-bottom">
    
        <div class="commit">
          <input type="text" placeholder="我的观点..." />
        </div>
        <div class="btn">
          <i class="comments"></i>
          <i class="collection"></i>
          <i class="like"></i>
          <i class="share"></i>
        </div>
    
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      detail: {},
      detailId: this.$route.query.detail_id,
    };
  },
  watch: {
    "$route.query.detail_id"(val) {
      this.detailId = val;
    },
    detailId(a, b) {
      if (a != undefined && a != b && a !== "") {
        this.getAetail();
      }
    },
  },
  created() {
    this.getAetail = debounce(this.getAetail);
    this.getAetail();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.detailId = "";
      this.detail = "";
    },
    getAetail() {
      this.$axios
        .get(`http://api2021.cbnweek.com:80/v4/articles/${this.detailId}`)
        .then(({ data }) => {
          this.detail = data;
        });
    },
  },
};
</script>
<style lang="scss">
.audiodetail {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    background-color: #fff;
    .back {
      width: 10px;
      height: 20px;
    }
    .gd {
      width: 35px;
      height: 35px;
    }
  }
  .detail {
    padding: 15px 3vw 45px 3vw;
    .detail-title {
      margin-bottom: 10px;
      p {
        font-size: 18px;
        line-height: 24px;
        font-weight: bold;
      }
      span {
        color: #888;
        font-size: 13px;
      }
    }
    .detail-text {
      p {
        font-size: 16px;
        margin-bottom: 15px;
        line-height: 25px;
        span {
          strong {
            font-size: 14px;
          }
        }
        strong {
          font-weight: bold;
        }
      }
    }
    .text-bottom {
      margin: 25px 0;
      .text-ascription {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        span {
          font-size: 13px;
          line-height: 18px;
          color: #888;
        }
      }
      .article-like {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        // justify-content: center;
        // gap: 20px;
        .like-icon {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          i {
            width: 24px;
            height: 23px;
          }
          .fond {
            border-radius: 999px;
            width: 50px;
            height: 50px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .collect {
            background-image: url(@/assets/img/Ip1.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
          .share {
            background-image: url(@/assets/img/T5.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
        span {
          font-size: 13px;
          color: #888;
        }
      }
    }
  }
  .detail-bottom{
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px 3vw;
    border-top: 1px solid #eee;
    width: 100%;
    height: 45px;
    background-color: #fff;
    z-index: 999;
    
    .commit{
       display: flex;
        align-items: center;
        border-radius: 999px;
        width:50vw;
        height: 100%;
        background-color: #eee;
        input{
            margin-left: 10px;
            width: 30vw;
            border: none;
            outline: none;
            background-color: #eee;
        }
    }
    .btn{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:35vw ;
        height:100% ;
        i{
            width: 18px;
            height: 18px;
        }
        .comments{
            background: url(../../assets/img/lr.png) no-repeat;
            background-size: 100% 100%;
        }
         .collection{
            background: url(../../assets/img/Ip1.png) no-repeat;
             background-size: 100% 100%;
        }
         .like{
            background: url(../../assets/img/gQ.png) no-repeat;
             background-size: 100% 100%;
        }
         .share{
            background: url(../../assets/img/4Y.png) no-repeat;
             background-size: 100% 100%;
        }
    }
  }
}
</style>