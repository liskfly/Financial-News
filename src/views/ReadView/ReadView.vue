<template>
  <div class="read">
    <div class="read-head" v-show="$route.meta.showfater">
      <img @click="show = true" src="../../assets/img/3H.png">
      <wd-popup v-model="show" position="left">
        <PopupLeft></PopupLeft>
      </wd-popup>
      <div class="readType">
        <router-link tag="div" class="tab-bar-item" to="/read/">
          <span class="text">全部</span>
        </router-link>
        <router-link tag="div" class="tab-bar-item" to="/read/magazine">
          <span class="text">杂志</span>
        </router-link>
        <router-link tag="div" class="tab-bar-item" to="/read/Booklet">
          <span class="text">单行本</span>
        </router-link>
      </div>
      <img src="../../assets/img/Dh.png">
    </div>
    <!-- <keep-alive> -->
    <router-view />
    <!-- </keep-alive> -->
    <div class="bottom"></div>
  </div>
</template>

<script>
import PopupLeft from "@/views/ReadView/PopupLeft.vue";
export default {
  data(){
    return{
      show:false
    }
  },
  components:{
    PopupLeft
  }
}
</script>

<style lang="scss" scoped>
.read-head {
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 5vw 20px 5vw;
  background-color: white;

  img {
    width: 20px;
    height: 16px;
  }

  .readType {
    display: flex;

    .tab-bar-item {
      font-weight: 900;
      margin: 0 2vw;
      &.router-link-exact-active {
        .text {
          padding-bottom: 1vh;
          color: #0091ff;
          border-bottom: 2px solid #0091ff;
        }
      }
    }
  }
}
.bottom {
  width: 100vw;
  height: 50px;
  background-color: white;
}
</style>