<template>
  <div class="bookContent">
    <div
      v-for="(
        { column_icon, column_id, column_summary, articles }, index
      ) in bookData"
      :key="column_id"
      class="differentMagazines"
      :style="{ flexDirection: index % 2 != 0 ? 'row-reverse' : 'row' }"
    >
      <div
        :style="{ flexDirection: index < 2 ? 'row' : 'row-reverse' }"
        class="flex"
      >
        <img :src="column_icon" class="img" />
        <div
          class="article"
          :style="{
            backgroundColor: index % 2 == 0 ? '#d8eeff' : '#fff',
            height: stow[index].key ? '' : '23vw',
          }"
        >
          <div :class="stow[index].key ? '' : 'summary'">
            {{ column_summary }}
          </div>
          <div style="color: grey" v-show="stow[index].key">
            共{{ articles.length }}篇文章
          </div>
          <div
            v-for="{ id, title } in articles"
            :key="id"
            class="articles"
            v-show="stow[index].key"
            @click="goToArticle(id)"
          >
            {{ title }}
          </div>
          <div class="stow" v-show="stow[index].key" @click="isstow(index)">
            <img src="../../../assets/img/Nn.png" />
            <span>点击收起</span>
          </div>
          <div
            class="stow-false"
            v-show="!stow[index].key"
            @click="isstow(index)"
          >
            查看更多
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bookData"],
  data() {
    return {
      stow: [
        { key: false },
        { key: false },
        { key: false },
        { key: false },
        { key: false },
      ],
    };
  },
  methods: {
    isstow(i) {
      this.stow[i].key = !this.stow[i].key;
      // console.log(i, this.stow);
    },
     goToArticle(b){
       this.$router.push(
        `/article?article_id=${b}`
      )
    }
  },
};
</script>

<style lang="scss" scoped>
.bookContent {
  width: 100vw;
  background-color: white;
  margin-top: 2vh;

  .flex {
    display: flex;
  }

  .differentMagazines {
    display: flex;
    margin: 0 4vw;

    .img {
      width: 23vw;
      height: 23vw;
    }

    .article {
      box-sizing: border-box;
      width: 46vw;
      border: 1px solid #eeeeee;
      position: relative;

      .stow-false {
        position: absolute;
        right: 2vw;
        bottom: 0;
        color: #3893ff;
      }

      .summary {
        height: 12vw;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      div {
        margin: 2vh 2vw 0 3vw;
        padding-bottom: 2vh;
        font-size: 12px;
      }

      .articles {
        font-size: 15px;
        border-bottom: 1px solid #b0cade;
      }

      .stow {
        margin: 0;
        padding: 2vh 2vw 2vh 3vw;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        color: #3893ff;

        img {
          width: 12px;
          height: 5px;
          margin-left: 1vw;
        }
      }
    }
  }
}
</style>