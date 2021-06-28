<template>
  <div class="article-container-grid">
    <div class="article-container-grid-column">
      <normal-article class="grid-item card"></normal-article>
      <div style="display: flex; flex-wrap: wrap;">
        <div style="width: 100%;"></div>
      </div>
    </div>
    <div class="article-container-grid-column fit-content">
      <normal-article-tag class="grid-item card"></normal-article-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import NormalArticle from "~/components/organisms/create-article/normalArticle.vue";
import NormalArticleTag from "~/components/organisms/create-article/normalArticleTag.vue"
@Component({
  components: {
    NormalArticle,
    NormalArticleTag
  }
})
export default class NormalArticleCreation extends Vue {

  get isHaveNormalTitle(): any {
    return this.$store.getters['article/isHaveNormalTitle']
  }
  set isHaveNormalTitle(value) {
    this.$store.dispatch('article/setIsHaveNormalTitle', value)
  }

  get isCategorySelected(): any {
    return this.$store.getters['article/isCategorySelected']
  }

  get isTopicSelected(): any {
    return this.$store.getters['article/isTopicSelected']
  }

  get isDisabled(): any {
    if (this.isHaveNormalTitle && this.isCategorySelected && this.isTopicSelected) {
      return ''
    }else {
      return 'disabled'
    }
  }

  @Watch('isDisabled')
  setIsDisabled(): void {
    this.$store.dispatch('article/setIsDisabled', `${this.isDisabled}`)
  }

}
</script>

<style lang="scss" scoped>
  .article-container-grid {
    background: none !important;
    display: grid;
    grid-template-rows: repeat(2,auto);
    grid-gap: 24px;

    .article-container-grid-column {
      display: grid;
      grid-template-columns: 13fr 7fr;
      grid-gap: 24px;
    }
    .fit-content {
      height: fit-content;
    }
    .card {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
  }
</style>
