<template>
  <div class="article-footer">
    <div class="commit">
      <input type="text" placeholder="我的观点..." />
    </div>
    <div class="btn">
      <i class="comments" @click.stop="goToComment"></i>
      <i class="collection"></i>
      <i class="like"></i>
      <i class="share" @click.stop="showShare = true"></i>
      <div class="comment-cout" v-if="article.comment_times > 0">
        {{ article.comment_times }}
      </div>
    </div>
    <van-popup
      v-model="showComment"
      position="right"
      :style="{ height: '100%' }"
    >
      <CommentView :commentId="article.id" @show-comment="goBackComment" />
    </van-popup>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { options } from "@/utils/ShareShowData";
import CommentView from "./CommentView.vue";
export default {
  components: { CommentView },
  props: ["article"],
  data() {
    return {
      showShare: false,
      showComment: false,
      shareOptions: options,
    };
  },
  methods: {
    goToComment() {
      if (sessionStorage.token) {
        this.showComment = true;
      } else {
        this.$router.push("/login");
      }

      // this.$router.push(`/comment?comment_id=${this.article.id}`);
    },
    onSelect() {
      this.showShare = false;
    },
    goBackComment(a) {
      this.showComment = a;
    },
  },
};
</script>
<style lang="scss" scoped>
.article-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 10px 3vw;
  border-top: 1px solid #eee;
  width: 100%;
  height: 45px;
  background-color: #fff;
  z-index: 999;

  .commit {
    display: flex;
    align-items: center;
    border-radius: 999px;
    width: 50vw;
    height: 100%;
    background-color: #eee;
    input {
      margin-left: 10px;
      width: 30vw;
      border: none;
      outline: none;
      background-color: #eee;
    }
  }
  .btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 35vw;
    height: 100%;
    i {
      width: 18px;
      height: 18px;
    }
    .comments {
      background: url(@/assets/img/lr.png) no-repeat;
      background-size: 100% 100%;
    }
    .collection {
      background: url(@/assets/img/Ip1.png) no-repeat;
      background-size: 100% 100%;
    }
    .like {
      background: url(@/assets/img/gQ.png) no-repeat;
      background-size: 100% 100%;
    }
    .share {
      background: url(@/assets/img/4Y.png) no-repeat;
      background-size: 100% 100%;
    }
    .comment-cout {
      position: absolute;
      top: -7px;
      left: 16px;
      border-radius: 999px;
      width: 13px;
      height: 13px;
      font-size: 12px;
      color: #fff;
      text-align: center;
      line-height: 13px;
      background-color: red;
    }
  }
}
</style>