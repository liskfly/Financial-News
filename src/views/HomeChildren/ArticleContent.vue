<template>
  <div class="content">
    <div
      class="bg"
      :style="{ backgroundImage: 'url(' + article.cover_url + ')' }"
    >
      <div class="cover">
        <div class="cover-text">
          <h1>{{ article.title }}</h1>
          <span
            >{{ article.visit_times }}阅读·{{
              article.favorite_times
            }}收藏</span
          >
        </div>
      </div>
    </div>

    <div class="text-box">
      <div class="text">
        <div class="authors">
          <div class="authors-img" v-if="article.authors">
            <img :src="article.authors[0].avatar" alt="authors-img" />
          </div>
          <div class="authors-megs" v-if="article.authors">
            <p>
              {{ article.authors[0].name }}等<span class="count">{{
                article.authors.length
              }}</span
              >位作者
            </p>
            <span
              >{{ getDate }}·阅读时长{{ article.read_time }}分钟·{{
                article.word_times
              }}字</span
            >
          </div>
        </div>
        <div class="normal" v-if="article.article_type != 'magazine'">
          <div class="dec" v-for="a in article.topics" :key="a.id">
            <span class="dec-color" @click="goKeyWordArticle(a.id)"
              >#{{ a.name }}</span
            >
          </div>
          <span class="summary">{{ article.summary }}</span>
          <div
            v-html="article.content"
            class="text-item"
            v-if="
              article.probation ||
              article.article_type == 'normal' ||
              article.article_type == 'theme'
            "
          ></div>
          <div
            class="text-bottom"
            v-if="
              article.probation ||
              article.article_type == 'normal' ||
              article.article_type == 'theme'
            "
          >
            <div class="text-ascription">
              <span>本文版权归本人开发者所有</span>
              <span>未经许可不得转载或翻译</span>
            </div>
            <div class="article-like">
              <div class="like-icon">
                <i class="collect"></i>
                <div class="fond">
                  <img src="../../assets/img/_m.png" alt="" />
                </div>
                <i class="share"></i>
              </div>
              <span>{{ article.favorite_times }}</span>
            </div>
          </div>
          <div
            class="recommend"
            v-if="
              (recommed && article.probation) ||
              article.article_type == 'normal' ||
              article.article_type == 'theme'
            "
          >
            <p class="recommend-text">相关文章</p>
            <div
              class="recommend-box"
              v-for="(r, index) in recommed"
              :key="index"
              @click="goToArticle(r.article_type, r.id)"
            >
              <div
                class="recommed-img"
                :style="{ backgroundImage: 'url(' + r.cover_url + ')' }"
              ></div>
              <p>{{ r.title }}</p>
            </div>
          </div>
        </div>

        <div class="magazine" v-if="article.article_type == 'magazine'">
          <div class="dec">
            <div v-if="article.column">
              <span
                class="dec-color"
                @click="goColumnsArticle(article.column.id)"
                >#{{ article.column.name }}</span
              >
              <span
                class="dec-color"
                @click="goColumnsArticle(article.column.parent_column.id)"
                >#{{ article.column.parent_column.name }}</span
              >
            </div>
            <span class="summary">{{ article.summary }}</span>
          </div>
          <div
            class="comment"
            v-for="c in article.editor_choice_comments"
            :key="c.user.id"
          >
            <p>评论</p>
            <div class="comment-box">
              <div class="comment-user">
                <img
                  src="https://files.cbnweek.com/a36d0b46bcc0f32dda03ec72c449d108_264x264"
                  alt="tx"
                />
                <div class="comment-user-dec">
                  <span class="comment-user-name">{{ c.user.nickname }}</span>
                  <span class="comment-time">{{
                    commentTime(c.display_time)
                  }}</span>
                </div>
              </div>
              <div class="comment-text">{{ c.content }}</div>
              <div class="comment-like">
                <span>{{ c.like_times }} <i></i></span>
              </div>
            </div>
          </div>
          <p class="more">查看更多 >></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllDate } from "@/utils/GetDate";
export default {
  props: ["article", "recommed"],
  data() {
    return {
      // bestComment: {},
    };
  },
  computed: {
    getDate() {
      let date = new Date(this.article.display_time);
      let str = `${date.getMonth() + 1}月${date.getDate()}日`;
      return str;
    },
  },
  methods: {
    commentTime(a) {
      return getAllDate(a);
    },
    goKeyWordArticle(id) {
      this.$router.push(
        `/keyword-article?keyword_type=topics&keyword_id=${id}`
      );
    },
    goColumnsArticle(id) {
      this.$router.push(
        `/keyword-article?keyword_type=columns&keyword_id=${id}`
      );
    },
    goToArticle(a, b) {
      if (a == "voice") {
         this.$router.push(
        `/audio-detail?detail_id=${b}`
      )
      } else {
        this.$router.push(`/article?article_id=${b}`);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 100vw;
  margin-bottom: 60px;
  .bg {
    position: relative;
    width: 100vw;
    height: 35vh;
    background-size: 100% 100%;

    .cover {
      display: flex;
      align-items: flex-end;
      padding: 20px 3vw;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      color: #fff;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.6),
        rgba(0, 0, 0, 0.1)
      );
      .cover-text {
        h1 {
          font-size: 18px;
          line-height: 25px;
        }
        span {
          font-size: 12px;
        }
      }
    }
  }
  .text-box {
    padding: 0 3vw;
    .text {
      .authors {
        display: flex;
        margin-top: 15px;
        margin-bottom: 20px;
        width: 100%;
        height: 40px;
        .authors-img {
          margin-right: 10px;
          border-radius: 999px;
          width: 40px;
          height: 40px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .authors-megs {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          p {
            font-size: 14px;
            .count {
              font-size: 14px;
              color: #0090f0;
            }
          }
          span {
            font-size: 12px;
            color: #888;
          }
        }
      }
      .dec {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 100%;
        height: 60px;
        font-size: 13px;
        .dec-color {
          margin-top: 5px;
          margin-right: 20px;
          font-size: 13px;
          color: #0090f0;
        }
      }
      .summary {
        color: #888;
        font-size: 12px;
      }
      .text-bottom {
        margin: 25px 0;
        .text-ascription {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          span {
            font-size: 13px;
            line-height: 18px;
            color: #888;
          }
        }
        .article-like {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          // justify-content: center;
          // gap: 20px;
          .like-icon {
            display: flex;
            gap: 20px;
            align-items: flex-end;
            i {
              width: 24px;
              height: 23px;
            }
            .fond {
              border-radius: 999px;
              width: 50px;
              height: 50px;
              overflow: hidden;
              img {
                width: 100%;
              }
            }
            .collect {
              background-image: url(@/assets/img/Ip1.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
            .share {
              background-image: url(@/assets/img/T5.png);
              background-repeat: no-repeat;
              background-size: 100% 100%;
            }
          }
          span {
            font-size: 13px;
            color: #888;
          }
        }
      }
      .recommend {
        border-top: 2px solid #eee;
        .recommend-text {
          padding: 10px 0;
        }
        .recommend-box {
          display: flex;
          gap: 20px;
          padding: 5px 0;
          align-items: flex-start;
          .recommed-img {
            border-radius: 5px;
            width: 110px;
            height: 60px;
            overflow: hidden;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }
          p {
            flex: 0 0 220px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
      .comment {
        border-bottom: 2px solid #eee;
        .comment-box {
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          .comment-user {
            display: flex;
            gap: 10px;
            align-items: center;
            img {
              width: 30px;
              height: 30px;
            }
            .comment-user-dec {
              display: flex;
              flex-direction: column;
              gap: 5px;
              .comment-user-name {
                font-size: 14px;
              }
              .comment-time {
                font-size: 12px;
                color: #888;
              }
            }
          }
          .comment-text {
            padding: 10px;
            font-size: 14px;
            line-height: 18px;
          }
          .comment-like {
            display: flex;
            justify-content: flex-end;
            span {
              font-size: 12px;
              color: #888;
              i {
                width: 14px;
                height: 14px;
                background-image: url(@/assets/img/gQ.png);
                background-size: 100% 100%;
                background-repeat: no-repeat;
              }
            }
          }
        }
      }
      .more {
        margin-top: 20px;
        float: right;
        font-size: 12px;
        color: #0090f0;
      }
    }
  }
}
</style>