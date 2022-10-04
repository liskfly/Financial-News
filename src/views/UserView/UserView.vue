<template>
  <div class="user-page">
    <wd-navbar light>
      <div slot="left" class="middle">
        <wd-icon class="icon" name="arrow-left" />
      </div>
      <span slot="right">
        <wd-icon class="right icon" name="setting" />
      </span>
    </wd-navbar>

    <div class="header">
      <i class="image"><img src="../../assets/img/Gh.png" /></i>
      <span class="text">点击登录</span>
      <div class="information">
        <wd-icon class="info-dec" name="edit-outline"></wd-icon>
        <span class="info-dec">资料</span>
      </div>
    </div>

    <ul class="list">
      <li>
        <span class="list-num">0</span>
        <span class="list-text">收藏</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">关注</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">摘录</span>
      </li>
      <li>
        <span class="list-num">0</span>
        <span class="list-text">投票</span>
      </li>
    </ul>

    <div class="vip">
      <div class="v-left">
        <span class="v-span">VIP</span>
        <i><img src="../../assets/img/M4.png" alt="vip" /></i>
        <span class="subscribe">暂无订阅</span>
      </div>

      <div class="v-right">
        <span class="v-span">订阅/续费</span>
        <i><img src="../../assets/img/7b.png" alt="gt" /></i>
      </div>
    </div>

    <div class="vip-content">
      <div class="content-l">
        <span class="content-y">一财通杂志</span>
        <span class="content-w">会员尊享权益</span>
      </div>

      <div class="content-r">
        <div class="icon">
          <img class="image" src="../../assets/img/sD.png" alt="试用" />
          <div class="icon-text">付费产品试用</div>
        </div>

        <div class="icon">
          <img class="image" src="../../assets/img/qp.png" alt="试用" />
          <div class="icon-text">专属社区</div>
        </div>

        <div class="icon">
          <img class="image" src="../../assets/img/80.png" alt="试用" />
          <div class="icon-text">会员活动</div>
        </div>
      </div>
    </div>

    <div class="cell">
      <wd-cell-group border>
        <wd-cell title="夜间模式">
          <i class="cell-icon" slot="icon"></i>
          <wd-switch class="custom-value" v-model="value" />
        </wd-cell>
        <wd-cell title="最近阅读/音频" value="&gt;">
          <i class="cell-icon1" slot="icon"></i>
        </wd-cell>
        <wd-cell title="购买记录" value="&gt;">
          <i class="cell-icon2" slot="icon"></i>
        </wd-cell>
        <wd-cell title="激活订阅码" value="&gt;">
          <i class="cell-icon3" slot="icon"></i>
        </wd-cell>
        <wd-cell title="离线" value="&gt;">
          <i class="cell-icon4" slot="icon"></i>
        </wd-cell>
        <wd-cell title="使用帮助" value="&gt;">
          <i class="cell-icon5" slot="icon"></i>
        </wd-cell>
        <wd-cell title="意见反馈" value="&gt;">
          <i class="cell-icon6" slot="icon"></i>
        </wd-cell>
        <wd-cell title="领取订阅杂志" value="&gt;">
          <i class="cell-icon7" slot="icon"></i>
        </wd-cell>
        <wd-cell title="兑换中心" value="&gt;">
          <i class="cell-icon8" slot="icon"></i>
        </wd-cell>
      </wd-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-page {
  height: 100vh;
  .icon {
    font-size: 28px;
  }

  .header {
    margin-top: 1vw;
    display: flex;
    height: 8vh;
    line-height: 8vh;
    .image {
      display: block;
      flex: 0 0 inherit;
      width: 16vw;
      height: 16vw;
      margin-left: 2vw;
      img {
        width: 100%;
        height: 100%;
        background-size: cover;
      }
    }
    .text {
      display: block;
      flex: 0 0 25vw;
      font-size: 22px;
      font-weight: 700;
      margin-left: 3vw;
    }
    .information {
      display: flex;
      justify-content: space-evenly;
      width: 22vw;
      height: 4vh;
      margin: 2vh 0 2vh 25vw;
      line-height: 4vh;
      background-color: #0091fe;
      border-radius: 4vw;
      box-shadow: 2px 2px 10px #06c;
      .info-dec {
        color: white;
        font-size: 20px;
      }
    }
  }

  .list {
    margin-top: 2vh;
    display: flex;
    justify-content: space-around;
    li {
      display: flex;
      flex-direction: column;
      .list-num {
        text-align: center;
        font-size: 25px;
        font-weight: 700;
      }
      .list-text {
        margin-top: 1vh;
        color: #aaa;
      }
    }
  }

  .vip {
    width: 98vw;
    height: 10vh;
    margin: 1vh auto;
    background-image: url("../../assets/img/Ot.png");
    background-size: cover;
    box-sizing: border-box;
    display: flex;
    line-height: 10vh;
    justify-content: space-around;

    .v-left {
      display: flex;
      i {
        margin-left: 2vw;
        display: block;
        width: 4vw;
        height: 4vw;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .subscribe {
        margin-left: 4vw;
        color: rgba(170, 170, 170, 0.8);
      }
    }

    .v-right {
      display: flex;
      i {
        display: block;
        width: 3vw;
        height: 4vw;
        margin-left: 2vw;
        margin-top: 0.5vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .v-span {
      color: white;
      font-size: 20px;
    }

    .v-gt {
      color: white;
      font-size: 20px;
      margin-left: 1vw;
    }
  }

  .vip-content {
    width: 98vw;
    height: 12vh;
    margin: 0 auto;
    background-image: url("../../assets/img/Ot.png");
    background-size: 100% 120%;
    display: flex;
    .content-l {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      .content-y {
        margin-left: 9vw;
        color: yellow;
      }
      .content-w {
        margin-top: 1vw;
        color: white;
        margin-left: 7vw;
      }
    }
    .content-r {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 6vw;
      .icon {
        margin: 0 2vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .image {
          width: 6vw;
          height: 6vw;
        }
        .icon-text {
          font-size: 10px;
          color: white;
        }
      }
    }
  }

  .cell {
    margin-top: 2vh;
    height: 55vh;
    overflow: auto;
    .cell-icon {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/2l.png") no-repeat;
      background-size: cover;
      .custom-value {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
        white-space: nowrap;
      }
    }
    .cell-icon1 {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/vx.png") no-repeat;
      background-size: cover;
    }
    .cell-icon2 {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/Qb.png") no-repeat;
      background-size: cover;
    }
    .cell-icon3 {
      display: block;
      width: 20px;
      height: 16px;
      margin-right: 15px;
      background: url("../../assets/img/zJ.png") no-repeat;
      background-size: cover;
    }

    .cell-icon4 {
      display: block;
      width: 20px;
      height: 16px;
      margin-right: 15px;
      background: url("../../assets/img/Dh.png") no-repeat;
      background-size: cover;
    }
    .cell-icon5 {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/Yg.png") no-repeat;
      background-size: cover;
    }
    .cell-icon6 {
      display: block;
      width: 19px;
      height: 16px;
      margin-right: 15px;
      background: url("../../assets/img/hd.png") no-repeat;
      background-size: cover;
    }
    .cell-icon7 {
      display: block;
      width: 16px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/Ma.png") no-repeat;
      background-size: cover;
    }
    .cell-icon8 {
      display: block;
      width: 20px;
      height: 20px;
      margin-right: 15px;
      background: url("../../assets/img/tU.png") no-repeat;
      background-size: cover;
    }
  }
}
</style>