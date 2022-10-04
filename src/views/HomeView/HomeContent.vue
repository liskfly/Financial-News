<template>
  <div class="new-list">
    <HomeArticleCard 
    v-for="(c) in homeNews"
    :key="c.data[0].id"
    :newsData="c.data[0]"
    :type="c.type"
    :id="c.data[0].id"
    :articleType="c.data[0].article_type">
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