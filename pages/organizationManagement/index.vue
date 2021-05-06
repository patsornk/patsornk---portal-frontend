<template>
  <div class="org-management-container">
    <OrganizationTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Organization Management',
        url: '/'
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch('breadcrumb/setPageTitle', 'Organization Management')
  }

  mounted() {
    this.setupBreadcrumb()
  }

  onClickCreateCompany() {
    this.$router.push('/organizationManagement/create')
    window.sessionStorage.removeItem('createCompanyFirstTime')
    window.sessionStorage.removeItem('companyFirstTime')
    window.sessionStorage.removeItem('createCompanyId')
    window.sessionStorage.removeItem('createBrandFirstTime')
    window.sessionStorage.removeItem('createBrandId')
    window.sessionStorage.removeItem('maxStepbar')
    this.$store.dispatch('stepbar/setMaxState', 0)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>