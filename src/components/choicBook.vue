<template>
  <div class="choiceBook">
    <div class="top">
      <img src="../assets/img/P4.png" @click="goBack">
      <div class="type">{{typeChinese}}</div>
    </div>
    <ul class="book" v-if="book[0]">
      <li v-for="({cover_url,summary,display_time,id},index) in book" :key="index" @click="goMagazineData(id)">
        <img :src="cover_url">
        <span class="summary">{{summary}}</span>
        <span class="time">{{getTime(display_time)}}</span>
      </li>
    </ul>
    <div v-if="!book[0]" class="book">这期没有书</div>
  </div>
</template>

<script>
import { getPointDate } from "../assets/GetDate"
export default {
  data () {
    return {
      type: this.$route.query.choieBook_type,
      year: this.$route.query.choieBook_year,
      month: this.$route.query.choieBook_month,
      book: [],
      typeChinese: ''
    }
  },
  created () {
    this.showBook()
  },
  activated(){
    this.showBook()
  }
  ,
  watch: {
    "$route.query.choieBook_type" (val) {
      this.type = val
    },
    "$route.query.choieBook_year" (val) {
      this.year = val
    },
    "$route.query.choieBook_month" (val) {
      this.month = val
    }
  },
  methods: {
    showBook () {
      if (this.type) {
        this.$axios
          .get(`http://api2021.cbnweek.com/v4/magazines?year=${this.year}&month=${this.month}&type=${this.type}`)
          .then(({ data }) => {
            this.book = data[0] ? data[0].data : []
            if (this.type == 'magazine') {
              this.typeChinese = '杂志'
              this.type = 'Magazine'
            } else if (this.type == 'subject') {
              this.typeChinese = '单行本'
              this.type = 'Subject'
            }
          })
      }
    },
    getTime (time) {
      return getPointDate(time)
    },
    goBack () {
      this.$router.go(-1);
      this.book = [],
        this.typeChinese = ''
    },
    goMagazineData (id) {
      this.$router.push(
        `/magazineData?&magazineData_type=${this.type}&magazineData_id=${id}`
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.choiceBook {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 30px 0 0 4vw;

  .top {
    display: flex;
    position: relative;
    img {
      width: 9px;
      height: 18px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .type {
      font-size: 18px;
      margin: auto;
    }
  }

  .book {
    margin-top: 3vh;
    display: flex;

    li {
      width: 30vw;
      display: flex;
      flex-direction: column;
      margin-right: 4vw;
      align-items: center;
      img {
        width: 30vw;
      }

      .summary {
        width: 28vw;
        white-space: nowrap;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-top: 2vh;
      }

      .time {
        font-size: 12px;
        margin-top: 1vh;
      }
    }
  }
}
</style>