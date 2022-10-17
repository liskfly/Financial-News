<template>
  <div class="introduction">
      <div v-html="aText">
      </div>
  </div>
</template>
<script>
export default {
  props: ["audioSeries"],
  data(){
    return {
        aText:''
    }
  },
   created (){
    this.textReEL()
  },
  methods:{
    textReEL(){
        this.audioSeries.forEach((t)=>{
            this.aText=t.content
        })
       
    }
  }
};
</script>
<style lang="scss">
.introduction{
  margin-top: 20px;
    p{
        font-size: 14px;
        line-height: 20px;
        margin-top: 10px;
    }
}
</style>