<template>
  <div class="article-header">
    <img src="@/assets/img/SJ.png" alt="返回" class="back" @click="goBack" />
    <img src="@//assets/img/EN.png" alt="更多" class="gd" />
  </div>
</template>
<script>
export default {
    props:['article'],
    methods: {
    goBack() {
      this.$router.go(-1);
    //   this.article = {};
    },
  },
};
</script>
<style lang="scss" scoped>
 .article-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    z-index: 999;
    .back {
      width: 10px;
      height: 20px;
    }
    .gd {
      width: 20px;
      height: 5px;
    }
  }
</style>