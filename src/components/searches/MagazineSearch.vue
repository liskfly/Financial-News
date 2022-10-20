<template>
  <div class="magazine-search">
    <div class="fixed">
      <div class="header">
        <span @click="goBack">&lt;</span><span>全部杂志栏目</span>
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
      <wd-cell-group border v-for="item in list" :key="item.content.id">
        <wd-cell
          class="text"
          :title="'/' + item.content.name"
          center
          :clickable="true"
          @click="goColumnsArticle(item.content.id)"
        >
          <wd-button size="small">关注</wd-button>
        </wd-cell>
      </wd-cell-group>

      <div class="empty" v-show="status">
        <i><img src="../../assets/img/3T.png" /></i>
        <div>暂无搜索结果，换个关键字试试吧</div>
      </div>
    </div>

    <div class="tag-list" v-show="!val">
      <wd-cell-group border v-for="item in magazine" :key="item.id">
        <wd-cell :title="item.name">
          <i class="cell-icon" slot="icon">
            <img :src="item.icon" alt="icon" />
          </i>
        </wd-cell>
        <wd-cell
          class="text"
          v-for="(list, index) in item.child_columns"
          :key="index"
          :title="'/' + list.name"
          center
          :clickable="true"
          @click="goColumnsArticle(list.id)"
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
      magazine: [],
      val: null,
      list: [],
      status: false,
    };
  },
  created() {
    this.getMagazineDate();
  },
  methods: {
    goColumnsArticle(id) {
      if (id == 931) {
        return;
      } else {
        this.$router.push(
          `/keyword-article?keyword_type=columns&keyword_id=${id}`
        );
      }
    },
    keyDown() {
      console.log(this.val);

      this.$axios
        .get(
          `https://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=20&query=${this.val}&query_type=column&type=android`
        )
        .then(({ data }) => {
          console.log(data);
          this.list = data;
          console.log(this.list);
          if (this.list.length == 0) {
            this.status = true;
          } else {
            this.status = false;
          }
        });
    },
    deleteVal() {
      this.val = null;
      this.list = [];
      this.status = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    getMagazineDate() {
      this.$axios
        .get("http://api2021.cbnweek.com:80/v4/columns?page=1&per=20")
        .then(({ data }) => {
          console.log(data);
          this.magazine = data.parent_columns;
          console.log(this.magazine);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.magazine-search {
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
        margin-left: 25vw;
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
    .text {
      color: rgba(119, 119, 119, 0.6);
    }
    .cell-icon {
      display: block;
      width: 5vw;
      height: 5vw;
      margin-right: 2vw;
      img {
        width: 5vw;
        height: 5vw;
      }
    }
    div {
      font-weight: 800;
    }
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