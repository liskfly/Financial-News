<template>
  <div class="read">
    <div class="read-head">
      <img src="../../assets/img/3H.png">
      <div class="readType">
        <router-link tag="div" class="tab-bar-item" to="/read">
          <div class="item home"></div>
          <span class="text">全部</span>
        </router-link>
        <router-link tag="div" class="tab-bar-item" to="/read/magazine">
          <div class="item home"></div>
          <span class="text">杂志</span>
        </router-link>
        <router-link tag="div" class="tab-bar-item" to="/read/Booklet">
          <div class="item home"></div>
          <span class="text">单行本</span>
        </router-link>
      </div>
      <img src="../../assets/img/Dh.png">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.read-head {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 5vw 20px 5vw;

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