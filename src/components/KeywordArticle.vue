<template>
  <div
    class="keyword"
    :style="{ backgroundColor: type == 'authors' ? '#f6f6f6' : '#fff' }"
  >
    <div
      class="authors-top"
      v-if="keyword[0]"
      :style="{ backgroundColor: type == 'authors' ? '#f6f6f6' : '' }"
    >
      <img src="../assets/img/P4.png" @click="goBack" />
      <div v-if="type == 'authors'">{{ keyword[0].authors[index].name }}</div>
      <div v-if="type == 'topics'">{{ keyword[0].topics[0].name }}</div>
    </div>
    <div>
      <div v-if="type == 'authors' && keyword[0]" class="authors">
        <div class="personal">
          <div class="personal-top">
            <div class="personal-top-left">
              <div class="name">{{ keyword[0].authors[index].name }}</div>
              <div class="frequency">
                <div>
                  {{ keyword[0].authors[index].articles_count + "篇文章" }}
                </div>
                <div class="line">|</div>
                <div>{{ "关注" }}</div>
              </div>
              <wd-button size="small" class="follow">关注</wd-button>
            </div>
            <img
              :src="keyword[0].authors[index].avatar"
              class="head-portrait"
            />
          </div>
          <div class="personal-bottom">
            <div>{{ keyword[0].authors[index].introduction }}</div>
          </div>
        </div>
      </div>
      <div class="topics" v-if="type == 'topics' && keyword[0]">
        <div>
          <div class="name">{{ keyword[0].topics[0].name }}</div>
          <div class="frequency">
            <div>{{ keyword[0].topics[0].articles_count + "篇文章" }}</div>
            <div class="line">|</div>
            <div>{{ "354人关注" }}</div>
          </div>
        </div>
        <wd-button size="small" class="follow">关注</wd-button>
      </div>
        <div class="topics" v-if="type == 'columns' && keyword[0]">
        <div>
          <div class="name">{{ keyword[0].column.name }}</div>
          <div class="frequency">
            <div>{{ keyword[0].column.articles_count + "篇文章" }}</div>
            <div class="line">|</div>
            <div>{{ "人关注" }}</div>
          </div>
        </div>
        <wd-button size="small" class="follow">关注</wd-button>
      </div>
      <div class="news">
        <ul>
          <li v-for="{ title, cover_url, id } in keyword" :key="id" @click="goToHomeArticle(id)">
            <div class="show-pic">
              <img :src="cover_url" class="cover-url" />
              <img src="" />
            </div>
            <span>{{ title }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: this.$route.query.keyword_type,
      id: this.$route.query.keyword_id,
      index: 0,
      keyword: {},
    };
  },
  watch: {
   "$route.query.keyword_id"(val){
      this.id=val
   },
    "$route.query.keyword_type"(val){
      this.type=val
   },
   id(a,b){
    if(a!=b&&a!=undefined){
      this.getKeywordArticle();
    }
   }
  },

  created() {
    this.getKeywordArticle();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
      this.keyword = {};
    },
    getKeywordArticle() {
      // console.log();
      this.$axios
        .get(
          `http://api2021.cbnweek.com/v4/${this.type}/${this.id}/articles?page=1&per=20`
        )
        .then(({ data }) => {
          this.keyword = data;
          // console.log(this.keyword);
          this.authorsIndex();
        });
    },
    authorsIndex() {
      this.index = this.keyword[0].authors.findIndex(({ id }) => id == this.id);
    },
     goToHomeArticle(a){
      this.$router.push(
        `/article?article_id=${a}`
      )
    }
  },
};
</script>

<style lang="scss" scoped>
.keyword {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;

  .authors-top {
    display: flex;
    position: sticky;
    top: 0;
    left: 0;
    padding: 2vh 5vw;
    z-index: 2;
    background-color: #fff;
    img {
      width: 8px;
      height: 16px;
      position: absolute;
      left: 5vw;
    }

    div {
      margin: auto;
    }
  }

  .authors {
    padding: 2vh 5vw 5vh 5vw;

    .personal {
      background-color: white;
      border-radius: 10px;

      .personal-top {
        padding: 6vh 6vw 4vh 6vw;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ededed;

        .head-portrait {
          width: 20vw;
          height: 20vw;
          border-radius: 999px;
        }

        .personal-top-left {
          display: flex;
          flex-direction: column;

          .name {
            font-size: 20px;
            font-weight: 700;
          }

          .frequency {
            display: flex;
            font-size: 12px;
            color: grey;
            margin-top: 2vh;

            .line {
              margin: 0 15px;
            }
          }

          .follow {
            width: 25vw;
            margin-top: 4vh;
            margin-left: 2vw;
            font-size: 17px;
          }
        }
      }

      .personal-bottom {
        padding: 2vh 8vw;
        font-size: 14px;
        color: grey;
      }
    }
  }

  .topics {
    padding: 3vh 10vw;
    display: flex;
    justify-content: space-between;

    .name {
      font-size: 16px;
      font-weight: 700;
    }

    .frequency {
      display: flex;
      font-size: 12px;
      color: grey;
      margin-top: 2vh;

      .line {
        margin: 0 15px;
      }
    }

    .follow {
      width: 72px;
    }
  }

  .news {
    padding: 2vh 6vw 2vh 4vw;
    background-color: white;
    border-radius: 10px;

    li {
      width: 100%;
      margin: 2vh 0;
      display: flex;

      .show-pic {
        position: relative;
        margin-right: 4vw;
        .cover-url {
          width: 30vw;
          border-radius: 3px;
        }
      }

      span {
        width: 55vw;
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>