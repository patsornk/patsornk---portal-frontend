<template>
  <div class="article-container-grid">
    <div class="article-container-grid-column">
      <normal-article class="grid-item card"></normal-article>
      <div style="display: flex; flex-wrap: wrap;">
        <div style="width: 100%;">
          <normal-article-publish-date class="grid-item card"></normal-article-publish-date>
          <normal-article-author class="group-item card" style="margin-top: 29px"></normal-article-author>
        </div>
      </div>
    </div>
    <div class="article-container-grid-column fit-content">
      <normal-article-tag class="grid-item card"></normal-article-tag>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'

import NormalArticle from "~/components/organisms/create-article/normalArticle.vue";
import NormalArticleTag from "~/components/organisms/create-article/normalArticleTag.vue"
import NormalArticlePublishDate from "~/components/organisms/create-article/normalArticlePublishDate.vue"
import NormalArticleAuthor from "~/components/organisms/create-article/normalArticleAuthor.vue";

@Component({
  components: {
    NormalArticle,
    NormalArticleTag,
    NormalArticlePublishDate,
    NormalArticleAuthor
  }
})
export default class NormalArticleCreation extends Vue {

  get isHaveNormalTitle(): any {
    return this.$store.getters['article/isHaveNormalTitle']
  }

  get isCategorySelected(): any {
    return this.$store.getters['article/isCategorySelected']
  }

  get isTopicSelected(): any {
    return this.$store.getters['article/isTopicSelected']
  }

  get isHavePublish(): any {
    return this.$store.getters['article/isHavePublish']
  }

  get isHaveExpire(): any {
    return this.$store.getters['article/isHaveExpire']
  }

  get isHaveAuthor(): any {
    return this.$store.getters['article/isHaveAuthor']
  }

  get isHaveThumbnail(): any {
    return this.$store.getters['article/isHaveThumbnail']
  }

  get isDisabled(): any {
    if (this.checkAllData()) {
      return ''
    } else {
      return 'disabled'
    }
  }

  get isSubmit(): string {
    return this.$store.getters['article/isSubmit']
  }

  mounted() {
    this.$store.dispatch('article/setIsDisabled', `${this.isDisabled}`)
  }


  @Watch('isDisabled')
  setIsDisabled(): void {
    this.$store.dispatch('article/setIsDisabled', `${this.isDisabled}`)
  }

  @Watch('isSubmit')
  onChangedSubmit(): void {

    if (this.checkAllData()) {
      setTimeout(() => {
        if (this.checkAllData()) {
          this.$store.dispatch('article/setIsCreateNewArticle', false)
          this.$router.push('/article')
        }
      }, 10)
    }
  }

  private checkAllData() {
    return !!(this.isHaveNormalTitle && this.isCategorySelected && this.isTopicSelected && this.isHavePublish && this.isHaveExpire && this.isHaveAuthor && this.isHaveThumbnail);
  }

}
</script>

<style lang="scss" scoped>
.article-container-grid {
  background: none !important;
  display: grid;
  grid-template-rows: repeat(2, auto);
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
