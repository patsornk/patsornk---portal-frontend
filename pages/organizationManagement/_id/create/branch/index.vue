<template>
  <div class="create-branch-container">
    <create-new-branch
    :parentCompantId="companyId"
    componetMode="create" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { BreadcrumbType, CompanyDataType } from '~/constants'
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
    return this.$route.params.id
  }

  private company: CompanyDataType = {
    companyId: 0,
    companyNameEn: '',
    companyNameTh: ''
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
        title: 'Create New Branch',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch('breadcrumb/setPageTitle', 'Create New Branch')
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

  async mounted() {
    await this.getCompany()
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