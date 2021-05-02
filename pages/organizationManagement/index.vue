<template>
  <div>
    Organiz Management
    <t-1-button @click.native="onClickCreateCompany"
      >Create</t-1-button
    >
    <OrganizationTable />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'

@Component({
  components: {
    T1Button,
    OrganizationTable
  }
})
export default class OrganizationManagement extends Vue {
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