<template>
  <div class="home">
    <HomeHead :banner="banner"></HomeHead>
  </div>
</template>

<script>
import HomeHead from './HomeHead'

export default {
    data() {
    return {
      banner: [],
    };
  },
  components: {
    HomeHead
  },
  created () {
    this.getData()
  },
  methods:{
    getData(){
      this.$axios
      .get("http://api2021.cbnweek.com/v4/banners?category=first")
      .then(({data}) => {
        this.banner = data
      })
    }
  }
}
</script>

<style lang="scss">
  .home {
    overflow: visible;
  }
</style>
