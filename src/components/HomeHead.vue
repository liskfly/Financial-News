<template>
  <div class="Head">
    <div>
      <wd-swipe>
        <wd-swipe-item v-for="item in banner" :key="item.title" duration="1000">
          <img
            :src="item.cover_url"
            class="swipe-img"
            @click="goToType(item.bannerable_type, item.bannerable_id)"
          />
        </wd-swipe-item>
      </wd-swipe>
    </div>
  </div>
</template>


<script>
export default {
  props: ["banner"],
  data() {
    return {};
  },
  methods: {
    goToType(a, b) {
      // console.log(a,b,this.$route.path);
      if (this.$route.path == "/home") {
        if (a != "Article") {
          this.$router.push(
            `/magazineData?magazineData_type=${a}&magazineData_id=${b}`
          );
        } else {
          this.$router.push(`/article?article_id=${b}`);
        }
      } else {
        if(b<10){
          this.$router.push(`${this.$route.path}/audio-series?audio_type=${a}&Arera_id=${b}`);
        }else{
           this.$router.push(
        `/audio-detail?detail_id=${b}`
      )
        }
        
      }
    },
  },
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