<template>
  <div class="ReadBook">
    <div class="year">
      <div class="line"></div>
      <span>2021年</span>
      <div class="line"></div>
    </div>
    <div class="book">
      <ul>
        <li v-for="item in book" :key="item.summary" class="book-list">
          <div class="swipe-img">
            <img v-lazy="item.cover_url" class="cover">
            <div v-if="item.price" class="money">¥{{item.price}}</div>
            <img v-if="!item.price" class="download" src="../assets/img/X-.png">
          </div>
          <span class="title">{{item.type == "Magazine" ? item.summary : item.name}}</span>
          <span>{{item.display_time.match(/\d+/g)[0] + '.' +
            item.display_time.match(/\d+/g)[1] + '.' +
            item.display_time.match(/\d+/g)[2]}}</span>
        </li>
      </ul>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  props: ["book"],
  data () {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.ReadBook {
  padding: 4vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .fade-enter-active,
  .fade-leave-active {
    left: 0;
    // opacity: 1;
    transition: all 0.2s linear;
  }
  .fade-enter,
  .fade-leave-to {
    left: 100vw;
    // opacity: 0;
    transition: all 0.2s linear;
  }

  .year {
    display: flex;
    align-items: center;
    font-size: 15px;

    span {
      margin: 0 3vw;
    }

    .line {
      width: 6vw;
      border: 1px solid #a0a0a0;
    }
  }

  .book {
    width: 100vw;

    ul {
      width: 100vw;
      display: flex;
      flex-wrap: wrap;

      .book-list {
        width: 28vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 4vw;

        .swipe-img {
          width: 28vw;
          margin-top: 2vh;
          position: relative;

          .cover {
            width: 28vw;
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

        span {
          width: 28vw;
          margin-top: 1vh;
          white-space: nowrap;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .title {
          font-weight: 900;
        }
      }
    }
  }
}
</style>