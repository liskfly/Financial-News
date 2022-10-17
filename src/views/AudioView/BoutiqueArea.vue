<template>
  <div class="area">
    <h2>精品专区</h2>
    <span class="text">大家都在听</span>
    <div class="list">
      <div class="box" v-for="t in area" :key="t.id" @click="goToAudioSeries(t.audio_type,t.id)">
        <div class="area-img">
          <img v-lazy="t.cover_url" />
          <div class="visit_times"><i></i> <span>{{t.visit_times}}</span></div>
        </div>
        <div class="area-text">
          <p>{{ t.name }}</p>
          <span>{{ t.summary }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    area: Array,
  },
  methods:{
    goToAudioSeries(audio_type,id){
      this.$router.push(
         `/audio-series?audio_type=${audio_type}&Arera_id=${id}`
      )
    }
  }
};
</script>
<style lang="scss" scoped>
.area {
  padding: 20px 3vw;
  h2{
    font-size: 18px;
    font-weight: bold;
  }
  .text{
     font-size: 12px;
      color: #888;
  }
  .list {
    display: flex;
    gap: 10px;
    overflow: auto;
    &::-webkit-scrollbar { display: none; }
    .box {
      flex: 0  0 31% ;
      .area-img {
        position: relative;
        margin: 10px 0;
        width: 100%;
        height: 30vw;
        img {
          width: 100%;
        }
        .visit_times{
          display: flex;
          align-items: center;
          border-radius: 999px;
          position: absolute;
          left: 8px;
          bottom: 10px;
          width: 62px;
          height: 18px;
          font-size: 12px;
          line-height: 18px;
          color: #fff;
          background-color: rgba(0,0,0,.6);
          i{
            display: inline-block;
            margin: auto 6px;
            width: 10px;
            height: 12px;
            background-image: url(../../assets/img/Jf.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .area-text {
        display: flex;
        flex-direction: column;
        width: 30vw;
        p {
          font-size: 14px;
          font-weight: bold;
          line-height: 20px;
           white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        span {
          flex:0 30vw auto;
          display: inline-block;
          width: 100%;
          font-size: 12px;
          line-height: 16px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          color: #888;
        }
      }
    }
  }
}
</style>