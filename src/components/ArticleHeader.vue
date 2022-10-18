<template>
  <div class="article-header" ref="back">
    <img src="@/assets/img/SJ.png" alt="返回" class="back" @click="goBack"  ref="goback"/>
    <img src="@/assets/img/EN.png" alt="更多" class="gd" />
  </div>
</template>
<script>
export default {
    props:["scroll"],
    data(){
      return {
       src1:require('../assets/img/P4.png'),
       src2:require('../assets/img/SJ.png')
      }
    },
    watch:{
      scroll(a){
       if(a>233){
        // console.log(a);
        this.$refs.goback.src=this.src1
        this.$refs.back.style.backgroundColor="#fff"
       }else{
         this.$refs.goback.src=this.src2
         this.$refs.back.style.backgroundColor=''
       }
      }
    },
    methods: {
    goBack() {
      this.$router.go(-1);
      this.$emit('article-clear','')
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