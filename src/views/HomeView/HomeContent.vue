<template>
  <div class="new-list">
    <HomeArticleCard 
    v-for="(c) in homeNews"
    :key="c.data[0].id"
    :newsData="c.data[0]"
    :type="c.type">
    </HomeArticleCard>
  </div>
</template>
<script>
import HomeArticleCard from '@/components/HomeArticleCard.vue'
export default {
  props: ['homeNews'],
  components: {
    HomeArticleCard
  },
};
</script>