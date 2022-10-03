<template>
  <div class="Head">
    <div>
      <wd-swipe>
        <wd-swipe-item v-for="item in banner" :key="item.title">
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
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.Head {
  .swipe-img {
    margin: 0 3vw;
    border-radius: 5px;
    width: 94vw;
    height: 45vw;
  }
}
</style>