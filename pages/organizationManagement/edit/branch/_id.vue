<template>
  <div class="create-branch-container">
    <create-new-branch
      :parent-company-id="companyId"
      :set-branch="setBranch"
      componet-mode="edit"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CreateNewBranch from '@/components/organisms/create-branch/branch.vue'
import { BranchDataType, BreadcrumbType, CompanyDataType } from '~/constants'

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

  get companyId(): string | null {
    return window.sessionStorage.getItem('parentCompanyId')
  }

  get branchId(): string {
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

  private companyStatus = [
    {
      id: -1,
      status: `${this.$t('common.companyDropdownStatus.all')}`
    },
    {
      id: 2,
      status: `${this.$t('common.companyDropdownStatus.active')}`
    },
    {
      id: 3,
      status: `${this.$t('common.companyDropdownStatus.inActive')}`
    },
    {
      id: 4,
      status: `${this.$t('common.companyDropdownStatus.onHold')}`
    }
  ]

  @Watch('language')
  changeLanguage(): void {
    this.setupBreadcrumb()
  }

  setBranch(branch: any): void {
    this.branch = branch
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const branch =
      this.language === 'th'
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
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      `${this.$t('common.branchTitle').toString()} - ${branch}`
    )
  }

  async getCompany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
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
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_branch?branchId=${this.branchId}`,
        { data: null }
      )
      if (res.successful) {
        this.branch = res.data
        const statusStr = this.companyStatus.filter(
          (e) => e.id === res.data.status
        )[0].status
        this.$store.dispatch('company/setStatus', statusStr)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async checkBelongTo(): Promise<boolean | undefined> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/check_belong_to?companyId=${this.companyId}&branchId=${this.branchId}`,
        { data: null }
      )
      if (res.successful) {
        return res.data.belongTo
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  }

  async mounted(): Promise<void> {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
    this.$store.dispatch('company/setStatus', '')
    if (this.companyId && (await this.checkBelongTo())) {
      await this.getCompany()
      await this.getBranch()
      this.setupBreadcrumb()
    } else {
      this.$router.push('/landing')
    }
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
