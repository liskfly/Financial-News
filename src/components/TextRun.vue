<template>
  <div class="text-run">
    <div class="text-list" :class="{ animate: animateUp }">
      <p v-for="(t, i) in textList" :key="i">
        {{ t }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: ["textArr"],
  data() {
    return {
      textList: this.textArr,
      timer: null,
      animateUp: false,
    };
  },
  mounted() {
    this.timer = setInterval(this.scrollAnimate, 3000);
  },
  methods: {
    scrollAnimate() {
      this.animateUp = true;
      setTimeout(() => {
        this.textList.push(this.textList[0]);
        this.textList.push(this.textList[1]);
        this.textList.push(this.textList[2]);
        this.textList.shift();
        this.textList.shift();
        this.textList.shift();
        this.animateUp = false;
      }, 1000);
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="scss" scoped>
.text-run {
  width: 70vw;
  height: 48px;
  overflow: hidden;
  .text-list {
    p {
        font-size: 13px;
        line-height: 16px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .animate {
    transition: all .5s ease-in-out;
    transform: translateY(-48px);
  }
}
</style>