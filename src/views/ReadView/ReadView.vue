<template>
  <div class="read">
    <div class="read-head">
      <img src="../../assets/img/3H.png">
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
    <keep-alive>
    <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
.read-head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 5vw 20px 5vw;
  background-color: #fff;
  z-index: 999;
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
</style>