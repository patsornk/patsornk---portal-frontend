<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'

@Component
export default class OrganizeCreate extends Vue {
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Organization Management',
        url: '/'
      },
      {
        title: 'Create new company',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch(
      'breadcrumb/setBreadcrumb',
      breadcrumb
    )

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      'Create new company'
    )
  }
  mounted() {
    this.setupBreadcrumb()
    this.$router.push('/organizManagement/create/company')
  }
}
</script>