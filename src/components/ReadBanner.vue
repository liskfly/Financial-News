<template>
  <div class="ReadHead">
    <div>
      <wd-swipe>
        <wd-swipe-item v-for="item in banner" :key="item.summary">
          <div class="swipe">
            <div class="swipe-img">
              <img @click="goMagazineData(item.type,item.id)" v-lazy="item.cover_url" class="cover" />
              <img src="../assets/img/4w.png" class="shadow">
              <div v-if="item.price" class="money">¥{{item.price}}</div>
              <a :href="item.package_path">
                <img v-if="item.is_jurisdiction" class="download" src="../assets/img/X-.png">
              </a>
            </div>
            <span class="title">{{item.type == "Magazine" ? item.summary : item.name}}</span>
            <span class="time">{{item.display_time.match(/\d+/g)[0] + '.' +
            item.display_time.match(/\d+/g)[1] + '.' +
            item.display_time.match(/\d+/g)[2]}}</span>
          </div>
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
    goMagazineData(type,id){
        this.$router.push(
          `/magazineData?&magazineData_type=${type}&magazineData_id=${id}`
        )
    }
  },
};
</script>

<style lang="scss" scoped>
.ReadHead {
  padding-bottom: 2vh;

  .swipe {
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      width: 60vw;
      font-size: 20px;
      margin-top: 2vh;
      font-weight: 900;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .time {
      font-size: 12px;
      margin-top: 18px;
    }

    .swipe-img {
      width: 60vw;
      margin: auto;
      position: relative;

      .cover {
        width: 60vw;
        height: 42vh;
        margin: auto;
        border-radius: 5px;
      }

      .shadow {
        width: 30vw;
        height: 42vh;
        border-radius: 5px 0 0 5px;
        position: absolute;
        top: 0;
        left: 0;
      }

      .money {
        width: 12vw;
        height: 4vh;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #c9ab79;
        border-radius: 0 20px 20px 0;
        text-align: center;
        color: white;
        line-height: 4vh;
      }

      .download {
        width: 5vw;
        height: 5vw;
        position: absolute;
        bottom: 1vh;
        right: 1vw;
      }
    }
  }
}
</style>