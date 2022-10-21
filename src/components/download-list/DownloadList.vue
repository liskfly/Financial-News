<template>
  <div class="download">
    <div class="top">
      <div class="download-top">
        <img src="../../assets/img/P4.png" @click="goBack">
        <span>离线</span>
        <span class="blue" @click="arrangement">整理</span>
      </div>
      <div class="type-switch">
        <router-link tag="div" class="type" to="/download-list">
          <span>杂志</span>
        </router-link>
        <router-link tag="div" class="type" to="/download-list/subject-type">
          <span>单行本</span>
        </router-link>
        <router-link tag="div" class="type" to="/download-list/audio-type">
          <span>音频</span>
        </router-link>
      </div>
    </div>

    <router-view :ischeck="ischeck" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      ischeck: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1);
      this.keyword = {};
      this.ischeck = false
    },
    arrangement () {
      this.ischeck = !this.ischeck
    }
  }
}
</script>

<style lang="scss" scoped>
.download {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;

  .top {
    position: sticky;
    top: 0;
    background-color: white;

    .download-top {
      padding: 20px 4vw;
      display: flex;
      align-items: center;
      justify-content: space-between;

      img {
        width: 8px;
        height: 16px;
      }

      .blue {
        color: dodgerblue;
      }
    }

    .type-switch {
      padding: 2vh 25vw;
      display: flex;
      justify-content: space-between;

      .type {
        font-size: 16px;

        span {
          color: grey;
          padding-bottom: 10px;
        }

        &.router-link-exact-active {
          span {
            font-weight: 700;
            color: #0083f1;
            padding-bottom: 8px;
            border-bottom: 2px solid #0083f1;
          }
        }
      }
    }
  }
}
</style>