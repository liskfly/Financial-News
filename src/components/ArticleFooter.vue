<template>
    <div class="article-footer">
      <div class="commit">
        <input type="text" placeholder="我的观点..." />
      </div>
      <div class="btn">
        <i class="comments"></i>
        <i class="collection"></i>
        <i class="like"></i>
        <i class="share"></i>
      </div>
    </div>
</template>
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
    }
  }
</style>