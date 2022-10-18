<template>
  <div class="home-search">
    <router-view />
    <div class="search">
      <div class="search-inp">
        <div class="input" @keydown.enter="keyDown">
          <i><img src="../../assets/search.svg" /></i>
          <input
            v-model="val"
            class="search-bar"
            placeholder="搜索文章、标签、栏目、单行本、音频"
            type="text"
          />
          <i @click="deleteVal" v-show="val"
            ><img src="../../assets/img/0K.png"
          /></i>
        </div>
        <div class="back">
          <router-link tag="span" to="/home">取消</router-link>
        </div>
      </div>

      <ul class="type" v-show="!show">
        <li
          v-for="(item, index) in typeArr"
          :id="item.type"
          :key="index"
          @click="chose($event)"
          :class="{ active: active == item.type }"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>

    <div class="list-container" v-show="!show">
      <div class="list" v-if="active === 'article'">
        <div v-for="(item, index) in infoArr" :key="index" class="list-item">
          <i class="icon"> <img :src="item.content.cover_url" /></i>
          <div class="text">
            <span>{{ item.content.title }}</span>
          </div>
          <div v-show="item.content.price" class="price">
            {{ item.content.price }}
          </div>

          <div class="empty" v-show="!infoArr.length">
            <i><img src="../../assets/img/3T.png" /></i>
            <div>暂无搜索结果，换个关键字试试吧</div>
          </div>
        </div>
      </div>

      <div class="list" v-if="active === 'topic'">
        <div v-for="(item, index) in infoArr" :key="index" class="list-item">
          <span>#{{ item.content.name }}</span>
          <wd-button size="small">关注</wd-button>
        </div>

        <div class="empty" v-show="!infoArr.length">
          <i><img src="../../assets/img/3T.png" /></i>
          <div>暂无搜索结果，换个关键字试试吧</div>
        </div>
      </div>

      <div class="list" v-if="active === 'column'">
        <div v-for="(item, index) in infoArr" :key="index" class="list-item">
          <i v-show="item.content.icon" class="column-icon">
            <img :src="item.content.icon"
          /></i>
          <i v-show="!item.content.icon" class="column-icon"><span>/</span></i>
          <div class="text">
            <span>{{ item.content.name }}</span>
          </div>
        </div>

        <div class="empty" v-show="!infoArr.length">
          <i><img src="../../assets/img/3T.png" /></i>
          <div>暂无搜索结果，换个关键字试试吧</div>
        </div>
      </div>

      <div class="list" v-if="active === 'subject'">
        <div v-for="(item, index) in infoArr" :key="index" class="list-item">
          <i class="subject-icon"> <img :src="item.content.cover_url" /></i>
          <div class="text">
            <span>{{ item.content.name }}</span>
          </div>
        </div>

        <div class="empty" v-show="!infoArr.length">
          <i><img src="../../assets/img/3T.png" /></i>
          <div>暂无搜索结果，换个关键字试试吧</div>
        </div>
      </div>

      <div class="list" v-if="active === 'audio'">
        <div v-for="(item, index) in infoArr" :key="index" class="list-item">
          <i class="audio-icon"> <img :src="item.content.cover_url" /></i>
          <div class="text">
            <span>{{ item.content.title }}</span>
          </div>
        </div>

        <div class="empty" v-show="!infoArr.length">
          <i><img src="../../assets/img/3T.png" /></i>
          <div>暂无搜索结果，换个关键字试试吧</div>
        </div>
      </div>
      
      <wd-infinite-load
        finished-text
        ref="loadmore"
        @loadmore="loadmore"
        :loading="loading"
      ></wd-infinite-load>
    </div>

    <div v-show="show" class="nav">
      <ul class="nav-bar">
        <router-link tag="li" class="nav-item" to="/home/home-search/tag">
          <i><img src="../../assets/img/OV.png" alt="标签" /></i>
          <span>标签</span>
        </router-link>

        <router-link tag="li" class="nav-item" to="/home/home-search/magazine">
          <i><img src="../../assets/img/dQ.png" alt="杂志栏目" /></i>
          <span>杂志栏目</span>
        </router-link>

        <router-link tag="li" class="nav-item" to="/home/home-search/singles">
          <i><img src="../../assets/img/jT.png" alt="单行本" /></i>
          <span>单行本</span>
        </router-link>

        <router-link tag="li" class="nav-item" to="/audio/search">
          <i><img src="../../assets/img/0q.png" alt="音频" /></i>
          <span>音频</span></router-link
        >
      </ul>
    </div>

    <!-- <div v-show="show" class="history-btn">
      <div class="history"><span>搜索历史</span><span>清空</span></div>
      <div class="btn">
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
        <wd-button plain size="small" type="info">主要按钮</wd-button>
      </div>
    </div> -->

    <!-- <div v-show="show" class="hot-btn">
      <div class="hot"><span>热门搜索</span></div>
      <div class="btn">
        <wd-button
          v-for="(item, index) in hotArr"
          :key="index"
          plain
          size="small"
          @click="hotSearch($event)"
          >{{ item }}</wd-button
        >
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: null,
      loading: false,
      time: 2,
      num: 20,
      infoArr: [],
      hotArr: [],
      active: "article",
      show: true,
      typeArr: [
        {
          text: "文章",
          type: "article",
        },
        {
          text: "标签",
          type: "topic",
        },
        {
          text: "杂志栏目",
          type: "column",
        },
        {
          text: "单行本",
          type: "subject",
        },
        {
          text: "音频",
          type: "audio",
        },
      ],
    };
  },
  created() {
    this.getHotInfo();
  },
  methods: {
    deleteVal() {
      this.val = null;
      this.show = true;
    },
    chose(e) {
      console.log(e.currentTarget.id);
      this.active = e.currentTarget.id;
      this.$axios
        .get(
          `https://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=${this.num}&query=${this.val}&query_type=${this.active}&type=android`
        )
        .then(({ data }) => {
          console.log(data, typeof data);
          this.infoArr = data;
        });
    },
    hotSearch(e) {
      console.log(typeof e.currentTarget.textContent);
      this.val = e.currentTarget.textContent;
      console.log(this.val);

      this.$axios
        .get(
          `https://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=${this.num}&query=${this.val}&query_type=${this.active}&type=android`
        )
        .then(({ data }) => {
          console.log(this.val);
          console.log(data);
          this.infoArr = data;
          this.show = false;
        });
    },
    loadmore() {
      this.loading = true;

      if (this.time) {
        setTimeout(() => {
          let list = [];
          this.num += 15;
          for (let i = this.num - 15; i < this.num; i++) {
            this.infoArr.forEach((item) => {
              list.push(item);
            });
          }
          console.log(this.infoArr);
          this.infoArr = this.infoArr.concat(list);
          this.loading = false;
          // 模拟请求，请求3次，3次结束后设置加载结束
          this.time--;
        }, 1000);
      } else {
        this.$refs.loadmore.loadEnd();
      }
    },
    getHotInfo() {
      this.$axios
        .get("http://api2021.cbnweek.com:80/v4/hotwords")
        .then(({ data }) => {
          this.hotArr = data;
          console.log(data);
        });
    },
    keyDown() {
      this.$axios
        .get(
          `https://api2021.cbnweek.com/v4/pg_search_documents?page=1&per=${this.num}&query=${this.val}&query_type=article&type=android`
        )
        .then(({ data }) => {
          console.log(data);
          this.infoArr = data;
          this.show = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.home-search {
  width: 100vw;
  .search {
    width: 100vw;
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: white;
    .search-inp {
      width: 100%;
      display: flex;
      .input {
        margin-top: 2vh;
        margin-left: 2vw;
        width: 80vw;
        height: 4vh;
        background-color: rgba(119, 119, 119, 0.1);
        border-radius: 10vw;
        display: flex;
        i {
          margin-left: 4vw;
          margin-top: 0.7vh;
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
      .back {
        margin-top: 1.8vh;
        margin-left: 6vw;
        height: 4vh;
        // background-color: aqua;
        line-height: 4vh;
        span {
          color: blue;
        }
      }
    }

    .type {
      margin-top: 1vh;
      margin-bottom: 1vh;
      display: flex;
      justify-content: space-around;
      .active {
        color: #0090f0;
        padding-bottom: 1vh;
        border-bottom: 1px solid #0090f0;
      }
    }
  }

  .list-container {
    margin-top: 12.5vh;
    margin-left: 2vw;
    .list {
      .list-item {
        display: flex;
        margin: 1.5vh 0;
        position: relative;
        .icon {
          width: 30vw;
          height: 20vw;
          margin-right: 3vw;
          img {
            width: 30vw;
            height: 20vw;
            border-radius: 1vw;
          }
        }
        .column-icon {
          width: 5vw;
          height: 5vw;
          img {
            width: 5vw;
            height: 5vw;
          }
        }
        .subject-icon {
          width: 20vw;
          height: 25vw;
          margin-right: 2vw;
          img {
            width: 20vw;
            height: 25vw;
          }
        }
        .audio-icon {
          width: 20vw;
          height: 20vw;
          margin-right: 2vw;
          img {
            width: 20vw;
            height: 20vw;
          }
        }
        span {
          line-height: 3.2vh;
        }
        .text {
          display: flex;
          flex-direction: column;
          span {
            font-weight: 600;
          }
        }
        .price {
          width: 8vw;
          height: 2vh;
          position: absolute;
          left: 0;
          top: 0.5vh;
          background-color: #c9ab79;
          z-index: 100;
          border-radius: 0 20px 20px 0;
          text-align: center;
          color: white;
          line-height: 2.2vh;
          font-size: 12px;
        }
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
  .nav {
    margin-top: 10vh;
    margin-bottom: 3vh;
    padding-bottom: 3vh;
    border-bottom: 1px solid rgba(119, 119, 119, 0.3);
    .nav-bar {
      width: 100vw;
      display: flex;
      justify-content: space-around;
      .nav-item {
        display: flex;
        flex-direction: column;
        text-align: center;
        i {
          margin-bottom: 1vh;
          img {
            width: 15vw;
            height: 15vw;
          }
        }
        span {
          color: rgba(119, 119, 119, 0.6);
        }
      }
    }
  }
  .history-btn {
    margin-bottom: 2vh;
    .history {
      display: flex;
      justify-content: space-between;
      margin: 1vh 2vw;
      span {
        color: rgba(119, 119, 119, 0.6);
      }
    }
    .btn {
      display: flex;
      margin-left: 2vw;
      flex-wrap: wrap;
      button {
        margin: 0.8vw;
        color: rgba(119, 119, 119, 0.6);
      }
    }
  }

  .hot-btn {
    .hot {
      margin: 1vh 2vw;
      span {
        color: rgba(119, 119, 119, 0.6);
      }
    }
    .btn {
      display: flex;
      margin-left: 2vw;
      flex-wrap: wrap;
      button {
        margin: 0.8vw;
      }
    }
  }
}
</style>