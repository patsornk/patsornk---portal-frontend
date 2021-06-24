<template>
  <div class="create-conpany-step-container">
    <create-step :param="param" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CreateStep from '~/components/molecules/create-step/CreateStep.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    CreateStep
  }
})
export default class CreateCompanyStep extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  changeLanguage(): void {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.organiztionMng').toString(),
        url: '/'
      },
      {
        title: this.$t('common.createNewCompany').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.$t('common.createNewCompany').toString()
    )
  }

  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
    this.setupBreadcrumb()
  }

  get param() {
    return this.$route.params.currentStep
  }
}
</script>

<style lang="scss" scoped></style>
