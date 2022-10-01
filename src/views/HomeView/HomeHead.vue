<template>
  <div class="Head">
    <div class="Headlines">
      <span>YiMagazine</span>
      <img src="../../assets/img/Yg.png">
    </div>
    <div>
      <wd-swipe>
        <wd-swipe-item v-for="item in banner" :key="item">
          <img :src="item.cover_url" class="swipe-img" />
        </wd-swipe-item>
      </wd-swipe>
    </div>
  </div>
</template>


<script>
export default {
  props: ["banner"],
  data () {
    return {

    };
  },
  methods: {

  }
};
</script>

<style lang="scss">
.Head {
  .Headlines {
    width: 100vw;
    padding: 30px 10px 20px 30vw;
    font-family: "穿越寒冬拥抱你";
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    font-weight: 900;
    align-items: center;

    span {
    }

    img {
      width: 18px;
      height: 18px;
    }
  }

  .swipe-img {
    width: 100vw;
    height: 45vw;
  }
}
</style>