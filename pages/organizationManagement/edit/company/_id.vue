<template>
  <EditCompany :companyId="id" />
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BreadcrumbType, CompanyType } from '~/constants'
import CompanyInformation from '@/components/organisms/company-detail/companyInformation.vue'
import EditCompany from '@/components/organisms/edit-company/company.vue'
import Service from '@/components/organisms/company-detail/service.vue'

@Component({
  components: {
    CompanyInformation,
    EditCompany,
    Service
  }
})
export default class OrganizationManagementDetail extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  private company: CompanyType = {
    assignee: '',
    companyCategory: {
      companyCategoryEn: '',
      companyCategoryId: 0,
      companyCategoryTh: ''
    },
    companyEmail: '',
    companyId: 0,
    companyNameEn: '',
    companyNameTh: '',
    companyPhoneNumber: '',
    companyPhonePrefix: '',
    companySize: {
      companySizeEn: '',
      companySizeId: 0,
      companySizeTh: ''
    },
    companyType: {
      companyTypeEn: '',
      companyTypeId: 0,
      companyTypeTh: ''
    },
    createdAt: '',
    createdBy: '',
    status: 0,
    statusDesc: '',
    updatedAt: '',
    updatedBy: ''
  }

  get id() {
    return this.$route.params.id
  }

  @Watch('language')
  setTitleBreadcrumb() {
    this.setupBreadcrumb(
      this.language === 'th'
        ? this.company.companyNameTh
        : this.company.companyNameEn
    )
  }

  private setupBreadcrumb(title: string): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.organiztionMng').toString(),
        url: '/'
      },
      { 
        title,
        url: '/'
      },
      {
        title: this.$t('home.editCompany').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch('breadcrumb/setPageTitle', this.$t('home.editCompany').toString())
  }

  async getCompany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data
        this.$store.dispatch('company/setStatus', this.company.statusDesc)

        this.setupBreadcrumb(
          this.language === 'th'
            ? this.company.companyNameTh
            : this.company.companyNameEn
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mounted() {
    this.getCompany()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>