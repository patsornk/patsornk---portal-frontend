<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'

@Component
export default class OrganizeCreate extends Vue {
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
    this.setupBreadcrumb()
    this.$router.push('/organizationManagement/create/company')
  }
}
</script>