<template>
  <div class="tag-search">
    <div class="fixed">
      <div class="header">
        <span @click="goBack">&lt;</span><span>全部标签</span>
      </div>
      <div class="input" @keydown.enter="keyDown">
        <i><img src="../../assets/search.svg" /></i>
        <input
          v-model="val"
          class="search-bar"
          placeholder="搜索"
          type="text"
        />
        <i @click="deleteVal" v-show="val"
          ><img src="../../assets/img/0K.png"
        /></i>
      </div>
    </div>

    <div class="tag-list" v-show="val">
      <wd-cell-group border>
        <wd-cell
          v-for="(item, index) in tag"
          :key="index"
          :title="item.text"
          center
          :clickable="true"
          @click="goKeyWordArticle(item.id)"
        >
          <wd-button size="small">关注</wd-button>
        </wd-cell>
      </wd-cell-group>

      <div class="empty" v-show="!tag.length">
        <i><img src="../../assets/img/3T.png" /></i>
        <div>暂无搜索结果，换个关键字试试吧</div>
      </div>
    </div>

    <div class="tag-list" v-show="!val">
      <wd-cell-group border>
        <wd-cell
          v-for="(item, index) in tag"
          :key="index"
          :title="item.text"
          center
          :clickable="true"
          @click="goKeyWordArticle(item.id)"
        >
          <wd-button size="small">关注</wd-button>
        </wd-cell>
      </wd-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: [],
      list: [],
      val: null,
    };
  },
  created() {
    this.getTagDate();
  },
  methods: {
    goKeyWordArticle(id) {
      this.$router.push(
        `/keyword-article?keyword_type=topics&keyword_id=${id}`
      );
    },
    keyDown() {
      this.$axios
        .get(
          `http://api2021.cbnweek.com:80/v4/pg_search_documents?page=1&per=23&query=${this.val}&query_type=topic&type=android`
        )
        .then(({ data }) => {
          this.tag = [];
          data.forEach((item) => {
            this.tag.push({
              text: "#" + item.content.name,
              id: item.content.id,
            });
          });

          console.log(this.tag);
        });
    },
    deleteVal() {
      this.val = null;
      this.tag = [];

      this.list.forEach((item) => {
        this.tag.push({
          text: "#" + item.content.name,
          id: item.content.id,
        });
      });

      console.log(this.list);
    },
    goBack() {
      this.$router.go(-1);
    },
    getTagDate() {
      this.$axios
        .get(
          "http://api2021.cbnweek.com:80/v4/pg_search_documents?page=1&per=23&query=&query_type=topic&type=android"
        )
        .then(({ data }) => {
          this.list = data;
          data.forEach((item) => {
            this.tag.push({
              text: "#" + item.content.name,
              id: item.content.id,
            });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-search {
  width: 100vw;
  .fixed {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    height: 12vh;
    width: 100vw;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .header {
      margin-left: 2vw;
      :nth-child(1) {
        font-size: 30px;
      }
      :nth-child(2) {
        display: inline-block;
        font-size: 26px;
        margin-left: 30vw;
      }
    }
    .input {
      margin-left: 2vw;
      width: 96vw;
      height: 4vh;
      background-color: rgba(119, 119, 119, 0.2);
      border-radius: 10vw;
      display: flex;
      i {
        margin-left: 4vw;
        margin-top: 1vh;
        margin-right: 1vw;
        img {
          width: 5vw;
          height: 5vw;
        }
      }
      .search-bar {
        outline: 0;
        border: 0;
        width: 75%;
        background-color: rgba(119, 119, 119, 0);
      }
    }
  }

  .tag-list {
    margin-top: 12.5vh;
    .empty {
      width: 100vw;
      display: flex;
      flex-direction: column;
      i {
        margin-left: 28vw;
        img {
          height: 40vw;
          width: 40vw;
        }
      }
      div {
        margin-left: 20vw;
      }
    }
  }
}
</style>