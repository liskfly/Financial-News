<template>
  <div class="comment-view">
    <div class="header">
      <img
        src="../assets/img/P4.png"
        alt="返回"
        class="back"
        @click="goBack"
      />
      <span>全部评论</span>
    </div>
    <div class="comment">
      <div class="comment-box" v-for="c in commentArr" :key="c.id">
        <div class="comment-user">
          <img :src="c.user.avatar" alt="tx" />
          <div class="comment-user-dec">
            <span class="comment-user-name">{{ c.user.nickname }}</span>
            <span class="comment-time">{{ commentTime(c.display_time) }}</span>
          </div>
        </div>
        <div class="comment-text">{{ c.content }}</div>
        <div class="comment-like">
          <span>{{ c.like_times }} </span><i></i>
        </div>
      </div>
    </div>

    <div class="comment-footer">
      <div class="commit">
        <input type="text" v-model.trim="str" placeholder="我的观点..." />
      </div>
      <div class="sent-comment" @click="addText">发送</div>
    </div>
  </div>
</template>
<script>
import { getAllDate } from "@/utils/GetDate";
export default {
  props:['commentId'],
  data() {
    return {
      id:this.commentId,
      commentArr: [],
       userName:JSON.parse(sessionStorage.getItem("token")).user, 
      str: "",
    };
  },
 watch:{
  commentId(a){
    this.id=a
  },
  id(a,b){
    if(a!=b&&a){
       this.goCommentList();
    }
  }
 },
  created() {
    this.goCommentList();
  },
  activated(){
    this.userName=JSON.parse(sessionStorage.getItem("token")).user
  },
  methods: {
    goBack() {
      let a=false
      this.$emit('show-comment',a)
      // this.$router.go(-1);
    },
    goCommentList() {
      this.pageLoading=false
      this.$axios
        .get(
          `http://api2021.cbnweek.com:80/v4/articles/${this.id}/comments?order=newest&page=1&per=20`
        )
        .then(({ data }) => {
          this.commentArr = data;
           
          // console.log(data);
        });
    },
    commentTime(a) {
      return getAllDate(a);
    },
    addText() {
      if (this.str) {
        this.commentArr.unshift({
          id: Date.now() + 1,
          like_times: 0,
          display_time: Date.now(),
          thumbnail: null,
          content: this.str,
          is_like: false,
          user: {
            id: 543988,
            login_name: "15721489113",
            nickname:  '用户昵称__'+this.userName,
            avatar:
              "https://files.cbnweek.com/avatars/39E5BF66-FE73-4410-A680-18F88FD22358",
            is_vip: false,
          },
        });
      }
      this.str = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.comment-view {
  padding: 0 3vw;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: auto;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    left: 0;
    padding: 10px 3vw;
    width: 100%;
    height: 40px;
    background-color: #fff;
    .back {
      width: 10px;
      height: 20px;
    }
    span {
      margin: auto;
    }
  }
  .comment {
    margin-bottom: 50px;
    .comment-box {
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      border-bottom: 2px solid #eee;
      .comment-user {
        display: flex;
        gap: 10px;
        align-items: center;
        img {
          border-radius: 999px;
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
        margin: 10px 0;
        padding: 5px;
        border-radius: 5px;
        font-size: 14px;
        line-height: 18px;
        background-color: rgba(194, 194, 194, 0.673);
      }
      .comment-like {
        display: flex;
        justify-content: flex-end;
        span {
          font-size: 12px;
          color: #888;
        }
        i {
          display: block;
          margin-left: 20px;
          width: 14px;
          height: 14px;
          background-image: url(@/assets/img/gQ.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
      }
    }
  }
  .comment-footer {
    display: flex;
    align-items: center;
    justify-content: space-around;
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
      width: 65vw;
      height: 100%;
      background-color: #eee;
      input {
        margin-left: 10px;
        width: 60vw;
        border: none;
        outline: none;
        background-color: #eee;
      }
    }
    .sent-comment {
      color: #0090f0;
      font-weight: 500;
      &:hover {
        color: black;
      }
    }
  }
}
</style>