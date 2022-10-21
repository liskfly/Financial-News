<template>
  <div>
    <div class="ReadBook" v-for="(t,index) in num" :key="index">
      <div class="year">
        <div class="line"></div>
        <span>{{t}}年</span>
        <div class="line"></div>
      </div>
      <div class="book">
        <ul>
          <li v-for="(item,i) in book1" :key="i"
            :style="{marginLeft:item.maga_year == t || parseInt(item.display_time) == t ?'4vw':''}"
            @click="goMagazineData(item.type,item.id)">
            <div class="book-list" v-if="item.maga_year == t || parseInt(item.display_time) == t">

              <div class="swipe-img">
                <img v-lazy="item.cover_url" class="cover">
                <div v-if="item.price" class="money">¥{{item.price}}</div>
                <a :href="item.package_path" target="tempiframe" @click.stop="saveBook(item)">
                  <img v-if="item.is_jurisdiction && item.package_path !='https://files.cbnweek.com/'" class="download"
                    src="../assets/img/X-.png">
                </a>
                <iframe name="tempiframe" style="display:none;"></iframe>
              </div>
              <span class="title">{{item.type == "Magazine" ? item.summary : item.name}}</span>
              <span class="time">{{item.display_time.match(/\d+/g)[0] + '.' +
            item.display_time.match(/\d+/g)[1] + '.' +
            item.display_time.match(/\d+/g)[2]}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book1", "num"],
  data () {
    return {};
  },
  watch: {
  },
  methods: {
    goMagazineData (type, id) {
      this.$router.push(
        `/magazineData?&magazineData_type=${type}&magazineData_id=${id}`
      )
    },
    saveBook (item) {
      let isHave = true



      if (JSON.parse(localStorage.getItem("SAVE_SUBJECT"))) {
        JSON.parse(localStorage.getItem("SAVE_SUBJECT")).map(({ id }) => {
          if (id == item.id) {
            isHave = false
          }
        })
        if (isHave) {
          let arr = JSON.parse(localStorage.getItem("SAVE_SUBJECT"))
          arr.push(item)
          arr = JSON.stringify(arr)
          window.localStorage.setItem('SAVE_SUBJECT', arr)
        }
      } else {
        let arr=[]
        arr.push(item)
        arr = JSON.stringify(arr)
        window.localStorage.setItem('SAVE_SUBJECT', arr)
      }

      console.log(JSON.parse(localStorage.getItem("SAVE_SUBJECT")));
    }
  },
};
</script>

<style lang="scss" scoped>
.ReadBook {
  padding: 4vh 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1vh solid #f5f5f5;

  .fade-enter-active,
  .fade-leave-active {
    left: 0;
    // opacity: 1;
    transition: all 0.2s linear;
  }
  .fade-enter,
  .fade-leave-to {
    left: 100vw;
    // opacity: 0;
    transition: all 0.2s linear;
  }

  .year {
    display: flex;
    align-items: center;
    font-size: 15px;

    span {
      margin: 0 3vw;
    }

    .line {
      width: 6vw;
      border: 1px solid #a0a0a0;
    }
  }

  .book {
    width: 100vw;

    ul {
      width: 100vw;
      display: flex;
      flex-wrap: wrap;

      .book-list {
        display: flex;
        flex-direction: column;
        align-items: center;

        .swipe-img {
          width: 28vw;
          margin-top: 2vh;
          position: relative;

          .cover {
            width: 28vw;
            border-radius: 5px;
          }

          .money {
            width: 12vw;
            height: 4vh;
            position: absolute;
            left: 0;
            top: 0;
            background-color: #c9ab79;
            border-radius: 0 20px 20px 0;
            text-align: center;
            color: white;
            line-height: 4vh;
          }

          .download {
            width: 5vw;
            height: 5vw;
            position: absolute;
            bottom: 1vh;
            right: 1vw;
          }
        }

        span {
          width: 28vw;
          margin-top: 1vh;
          white-space: nowrap;
          text-align: center;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .time {
          font-size: 12px;
        }

        .title {
          font-weight: 900;
        }
      }
    }
  }
}
</style>