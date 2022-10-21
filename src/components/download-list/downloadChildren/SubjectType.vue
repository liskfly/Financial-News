<template>
  <div class="subject">
    <ul class="subject-list" v-if="list[0]">
      <li v-for="({id,cover_url,name,display_time},index) in list" :key="id" @click="goMagazineData(id,ischeck,index)"
        :style='{marginRight: (index + 1) %3 != 0 ? "3vw":""}'>
        <img :src="cover_url">
        <span class="name">{{name}}</span>
        <span class="time">{{getTime(display_time)}}</span>
        <button class="check" type="button" v-show="!checkarr[index].check && ischeck"></button>
        <button class="isCheck" type="button" v-show="checkarr[index].check && ischeck"></button>
      </li>
    </ul>
    <div class="none" v-if="!list[0]">
      <img src="../../../assets/img/3T.png">
      <span>暂无离线数据</span>
    </div>
    <div class="arrangement" v-if="ischeck">
      <div class="allcheck" @click="all">
        <button type="button" class="button1" v-show="allcheck"></button>
        <button type="button" class="button2" v-show="!allcheck"></button>
        <span>全部选中</span>
      </div>
      <wd-button size="small" @click="remove">删除</wd-button>
    </div>
  </div>
</template>

<script>
import { getPointDate } from "@/assets/GetDate";
export default {
  props: ["ischeck"],
  data () {
    return {
      list: [],
      checkarr: [],
      allcheck: true,
      checknum: 0,
      tranarr: []
    }
  },
  created () {
    this.getSubjectData()
  },
  methods: {
    getTime (a) {
      return getPointDate(a);
    },
    getSubjectData () {

      this.list = JSON.parse(localStorage.getItem("SAVE_SUBJECT"))
      if (this.list[0]) {
        this.list.forEach(() => {
          this.checkarr.push({ check: false })
        })
      }

    },
    goMagazineData (id, ischeck, index) {
      if (!ischeck) {
        this.$router.push(
          `/magazineData?&magazineData_type=Theme&magazineData_id=${id}`
        )
      } else {
        this.checkarr[index].check = !this.checkarr[index].check
        this.checkarr.forEach(({ check }) => {
          this.checknum = check == true ? this.checknum + 1 : this.checknum
        })
        this.allcheck = this.checknum == (this.checkarr.length) ? false : true
      }
      this.checknum = 0
    },
    all () {
      if (!this.allcheck) {
        this.checkarr = this.checkarr.map(() => {
          this.allcheck = true
          return { check: false }
        })
      } else {
        this.checkarr = this.checkarr.map(() => {
          this.allcheck = false
          return { check: true }
        })
      }
    },
    remove () {
      console.log(this.list, this.checkarr);
      this.list = this.list.filter((t, index) => this.checkarr[index].check == false)
      this.tranarr = JSON.stringify(this.list)
      window.localStorage.setItem('SAVE_SUBJECT', this.tranarr)
    }
  }
}
</script>

<style lang="scss" scoped>
.subject-list {
  padding: 2vh 2vw;
  display: flex;
  flex-wrap: wrap;

  li {
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    img {
      width: 30vw;
    }

    .name {
      width: 30vw;
      font-weight: 700;
      white-space: nowrap;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-top: 10px;
    }

    .time {
      font-size: 12px;
      color: grey;
      margin-top: 10px;
    }

    .check {
      position: absolute;

      width: 14px;

      height: 14px;

      background-color: white;

      border-radius: 50%;

      border: 1px solid grey;

      margin: 1px;

      top: 3px;

      right: 3px;
    }

    .isCheck {
      position: absolute;

      width: 14px;

      height: 14px;

      background-color: #0091ff;

      border-radius: 50%;

      border: 1px solid white;

      margin: 1px;

      top: 3px;

      right: 3px;
    }
  }
}
.none {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50vw;
    height: 40vw;
  }
}

.arrangement {
  width: 100vw;
  padding: 15px 20px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .allcheck {
    display: flex;
    align-items: center;

    .button1 {
      width: 14px;

      height: 14px;

      background-color: white;

      border-radius: 50%;

      border: 1px solid grey;

      margin: 1px;
    }

    .button2 {
      width: 14px;

      height: 14px;

      background-color: #0091ff;

      border-radius: 50%;

      border: 1px solid white;

      margin: 1px;
    }
  }
}
</style>