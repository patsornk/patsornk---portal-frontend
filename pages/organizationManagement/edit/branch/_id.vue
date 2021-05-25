<template>
  <div class="create-branch-container">
    <create-new-branch
    :parentCompantId="companyId"
    componetMode="edit"
    :setBranch="setBranch" />
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

  get branchId() {
    return this.$route.params.id
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

  setBranch(branch: any) {
    this.branch = branch
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const company = this.language === 'th'
      ? this.company.companyNameTh
      : this.company.companyNameEn

    const branch = this.language === 'th'
      ? this.branch.branchNameTh
      : this.branch.branchNameEn

    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.organiztionMng').toString(),
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
        title: `${this.$t('common.branchTitle').toString()} - ${branch}`,
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle', `${this.$t('common.branchTitle').toString()} - ${branch}`)
  }

  async getCompany(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.companyId}`,
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
    console.log('getBranch id')
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_branch?branchId=${this.branchId}`,
        { data: null }
      )
      if (res.successful) {
        this.branch = res.data
      }
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