<template>
  <div class="loginpage">
    <div class="logintop">
      <img src="@/assets/img/P4.png" @click="goBack">
    </div>
    <span class="titlesmall">第一财经</span>
    <span class="titlebig">YiMagazine</span>
    <span v-show="pageShow == 1" class="title">登录</span>
    <span v-show="pageShow == 2" class="title">注册</span>
    <div class="input" v-show="pageShow == 1">
      <div class="inputdata">
        <img src="@/assets/img/cC.png">
        <input type="text" v-model="userName" placeholder="请输入账号" autocomplete="off">
      </div>
      <div class="inputdata">
        <img src="@/assets/img/YO.png">
        <input type="password" v-model="userPsd" placeholder="请输入密码" autocomplete="off">
      </div>
      <button @click="login">登录</button>
    </div>
    <div class="input" v-show="pageShow == 2">
      <div class="inputdata">
        <img src="@/assets/img/cC.png">
        <input type="text" v-model="userName" placeholder="请输入账号" autocomplete="off">
      </div>
      <div class="inputdata">
        <img src="@/assets/img/YO.png">
        <input type="password" v-model="userPsd" placeholder="请输入密码" autocomplete="off">
      </div>
      <button @click="register">注册</button>
    </div>
    <div class="choicepage">
      <span class="islogin" @click="change(1)">登录</span>
      <span>|</span>
      <span class="isregister" @click="change(2)">注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: "",
      userPsd: "",
      userInfo: [],
      key: "users",
      value: {},
      pageShow: 1,
    };
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem(this.key)) || [];
  },
  methods: {
    goBack () {
      this.$router.go(-1);
      this.userName = "";
      this.userPsd = "";
    },
    register () {
      let res;
      this.userInfo.forEach((item) => {
        if (item.user == this.userName) {
          return (res = true);
        }
      });

      if (res == true) {
        this.userName = "";
        this.userPsd = "";
        alert("账号已存在");
      } else {
        let user = this.userName;
        let psd = this.userPsd;
        this.userInfo.push({
          user,
          psd,
        });

        this.value = [...this.userInfo];
        window.localStorage.setItem(this.key, JSON.stringify(this.value));

        this.userName = "";
        this.userPsd = "";

        alert("账号注册成功");
      }
    },
    login () {
      let res;
      this.userInfo.forEach((item) => {
        console.log(item.psd == this.userPsd && item.user == this.userName);

        if (item.psd == this.userPsd && item.user == this.userName) {
          return (res = true);
        }
      });


      if (res == true) {
        this.$router.push(`/user?&Login_username=${this.userName}`);
        window.localStorage.setItem('token', JSON.stringify({ user: this.userName, psd: this.userPsd }))
        alert("成功");
      } else {
        alert("请注册账号");
      }

      this.userName = "";
      this.userPsd = "";
    },
    change (i) {
      this.pageShow = i
      this.userName = "";
      this.userPsd = "";
    }
  },
};
</script>

<style lang="scss" scoped>
.loginpage {
  box-sizing: border-box;
  padding: 4vh 15px;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-image: linear-gradient(to bottom right, #a9dccf, #709fd9);
  display: flex;
  flex-direction: column;
  align-items: center;

  .logintop {
    width: 100%;
    img {
      width: 10px;
    }
  }

  .titlesmall {
    font-size: 20px;
    margin-top: 3vh;
    color: #fff;
  }

  .titlebig {
    font-size: 30px;
    font-family: "穿越寒冬拥抱你";
    padding-bottom: 2vh;
    color: #fff;
  }

  .title {
    font-size: 20px;
    margin: 2vh 0;
    font-weight: 700;
    color: #fff;
  }

  .input {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2vh;

    .inputdata {
      display: flex;
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 30px;
      border: 1px solid white;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 15px;
      }

      input {
        background-color: transparent;
        border: none;
      }
    }
    button {
      margin: 1vh 0;
      padding: 10px 30px;
      background-color: transparent;
      border: 1px solid white;
      border-radius: 30px;
      color: #fff;
    }
  }

  .choicepage {
    display: flex;
    width: 50vw;
    justify-content: space-between;
    font-size: 14px;
    color: #fff;
    margin-top: 40vh;
  }
}
</style>