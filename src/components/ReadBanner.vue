<template>
  <div class="ReadHead">
    <div>
      <wd-swipe>
        <wd-swipe-item v-for="item in banner" :key="item.summary">
          <div class="swipe">
            <div class="swipe-img">
              <img @click="getBookData(item.type,item.id,item.cover_url,item.name,item.summary)" v-lazy="item.cover_url" class="cover" />
              <div v-if="item.price" class="money">¥{{item.price}}</div>
              <img v-if="!item.price" class="download" src="../assets/img/X-.png">
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
    getBookData (type, id, img,name,summary) {
      console.log(name,summary);
      if (type == "Magazine") {
        this.$router.push(
          `/read/magazineData?&id=${id}&img=${img}&name=${name}&summary=${summary}`
        )
      } else {
        this.$router.push(
          `/read/subjectData?&id=${id}&img=${img}`
        )
      }

    }
  },
};
</script>

<style lang="scss" scoped>
.ReadHead {
  margin-top: 66px;
  padding-bottom: 2vh;
  border-bottom: 1vh solid #f5f5f5;



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
      margin-top: 12px;
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