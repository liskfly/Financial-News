<template>
  <div id="app">
    <keep-alive>
      <router-view @sent-appId="sentAudioId"/>
    </keep-alive>

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
  data(){
    return {
      src:''
    }
  },
  methods:{
    sentAudioId(n){
      console.log(n);
      this.src=n
    }
  }
}
</script>
<style lang="scss" scoped>

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
