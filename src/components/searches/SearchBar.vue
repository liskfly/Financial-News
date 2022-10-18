<template>
  <div class="search">
    <div class="fixed">
      <div class="header">
        <span @click="goBack">&lt;</span><span>全部音频</span>
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

    <div v-show="val" class="list-container">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <img :src="item.img" />
          <div>{{ item.text }}</div>
        </div>
      </div>
    </div>

    <div v-show="!val" class="list-container">
      <div class="list">
        <div v-for="(item, index) in list" :key="index" class="list-item">
          <img :src="item.img" />
          <div>{{ item.text }}</div>
        </div>
      </div>

      <wd-infinite-load
        finished-text
        ref="loadmore"
        @loadmore="loadmore"
        :loading="loading"
      ></wd-infinite-load>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      audio: [],
      val: null,
      list: [],
      num: 10,
      loading: false,
      time: 3,
    };
  },
  created() {
    this.getAudioData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    deleteVal() {
      this.val = null;
      this.list = [];
      this.audio.forEach((item) => {
        this.list.push({
          img: item.cover_url,
          text: item.title,
        });
      });
    },
    getAudioData() {
      this.$axios
        .get(
          `http://api2021.cbnweek.com:80/v4/article_alls?page=1&per=${this.num}&type=android`
        )
        .then(({ data }) => {
          console.log(data);
          this.audio = data;
          data.forEach((item) => {
            this.list.push({
              img: item.cover_url,
              text: item.title,
            });
          });
        });
    },
    keyDown() {
      this.$axios
        .get(
          `http://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=20&query=${this.val}&query_type=audio&type=android`
        )
        .then(({ data }) => {
          console.log(data);
          this.list = [];
          data.forEach((item) => {
            this.list.push({
              img: item.content.cover_url,
              text: item.content.title,
            });
          });
        });
    },
    loadmore() {
      this.loading = true;

      if (this.time) {
        this.num += 10;
        setTimeout(() => {
          this.$axios
            .get(
              `http://api2021.cbnweek.com:80/v4/article_alls?page=1&per=${this.num}&type=android`
            )
            .then(({ data }) => {
              this.audio = data;
              this.list = [];
              data.forEach((item) => {
                this.list.push({
                  img: item.cover_url,
                  text: item.title,
                });
              });
              this.loading = false;
              this.time--;
            });
        }, 1000);
      } else {
        this.$refs.loadmore.loadEnd();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  width: 100vw;
  .fixed {
    position: fixed;
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

  .list-container {
    margin-top: 12.5vh;
    margin-left: 2vw;
    .list {
      .list-item {
        display: flex;
        margin: 0.5vh 0;
        img {
          width: 20vw;
          height: 20vw;
          border-radius: 1.5vw;
          margin-right: 2vw;
        }
      }
    }
  }
}
</style>