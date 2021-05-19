<template>
  <div class="create-branch-container">
    <create-new-branch
    :parentCompantId="companyId"
    componetMode="edit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BranchDataType, BreadcrumbType, CompanyDataType } from '~/constants'
import CreateNewBranch from '@/components/organisms/create-branch/branch.vue'
@Component({
  components: {
    CreateNewBranch
  }
})
export default class CreateBranch extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  get companyId(): any {
    return window.sessionStorage.getItem('parentCompanyId')
  }

  private company: CompanyDataType = {
    companyId: 0,
    companyNameEn: '',
    companyNameTh: ''
  }

  private branch: BranchDataType = {
    branchId: 0,
    branchNameEn: '',
    branchNameTh: ''
  }

  @Watch('language')
  changeLanguage(): void {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Organization Management',
        url: '/'
      },
      {
        title:
          this.language === 'th'
            ? this.company.companyNameTh
            : this.company.companyNameEn,
        url: '/'
      },
      {
        title:
          this.language === 'th'
            ? this.branch.branchNameTh
            : this.branch.branchNameEn,
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.language === 'th'
        ? this.branch.branchNameTh
        : this.branch.branchNameEn
    )
  }

  async getCompany(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${
          process.env.PORTAL_ENDPOINT
        }/get_company?companyId=${this.companyId}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getBranch(): Promise<void> {
    try {
      // let res = await this.$axios.$get(
      //   `${
      //     process.env.PORTAL_ENDPOINT
      //   }/get_company?companyId=${window.sessionStorage.getItem('companyId')}`,
      //   { data: null }
      // )
      // if (res.successful) {
      this.branch = {
        branchId: 1,
        branchNameEn: 'branchNameEn',
        branchNameTh: 'branchNameTh'
      }
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async mounted() {
    await this.getCompany()
    await this.getBranch()
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
.create-branch-container {
  padding: 0px 53px;

  .branch-container {
    padding-top: 38px !important;
  }
}
</style>