<template>
  <div class="content-management-container">
    <select-template />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SelectTemplate from '~/components/molecules/article-list/SelectTemplate.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    SelectTemplate
  }
})
export default class ContentManagement extends Vue {
  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  setTitleBreadcrumb(): void {
    this.setupBreadcrumb()
  }

  mounted() {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.contentManagement').toString(),
        url: '/'
      },
      {
        title: this.$t('contentManagement.articleList').toString(),
        url: '/'
      },
      {
        title: this.$t('contentManagement.createNewArticle').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      `${this.$t('contentManagement.createNewArticle').toString()}`
    )
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
