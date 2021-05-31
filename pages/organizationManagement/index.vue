<template>
  <div class="org-management-container">
    <OrganizationTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    T1Button,
    OrganizationTable
  }
})
export default class OrganizationManagement extends Vue {
  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.organiztionMng').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.$t('home.landing.organiztionMng').toString()
    )
  }

  mounted() {
    window.sessionStorage.removeItem('createCompanyFirstTime')
    window.sessionStorage.removeItem('companyFirstTime')
    window.sessionStorage.removeItem('createCompanyId')
    window.sessionStorage.removeItem('createBrandFirstTime')
    window.sessionStorage.removeItem('createBrandId')
    window.sessionStorage.removeItem('createBranchFirstTime')
    window.sessionStorage.removeItem('createBranchId')
    window.sessionStorage.removeItem('maxStepbar')
    this.$store.dispatch('stepbar/setMaxState', 0)
    this.setupBreadcrumb()
  }

  onClickCreateCompany() {
    this.$router.push('/organizationManagement/create')
    window.sessionStorage.removeItem('createCompanyFirstTime')
    window.sessionStorage.removeItem('companyFirstTime')
    window.sessionStorage.removeItem('createCompanyId')
    window.sessionStorage.removeItem('createBrandFirstTime')
    window.sessionStorage.removeItem('createBrandId')
    window.sessionStorage.removeItem('createBranchFirstTime')
    window.sessionStorage.removeItem('createBranchId')
    window.sessionStorage.removeItem('maxStepbar')
    this.$store.dispatch('stepbar/setMaxState', 0)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
