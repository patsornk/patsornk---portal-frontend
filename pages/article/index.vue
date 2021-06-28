<template>
  <div class="org-management-container">
    <article-list />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ArticleList from '~/components/organisms/article/ArticleList.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    ArticleList
  }
})
export default class Article extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('article.contentManagement').toString(),
        url: '/',
      },
      {
        title: this.$t('article.articlesList').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.$t('article.articlesList').toString()
    )
  }

  mounted() {
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
