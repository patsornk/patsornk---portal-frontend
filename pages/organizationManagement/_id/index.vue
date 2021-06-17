<template>
  <div>
    <company-information class="content-box" :company="company" />
    <tab-detail :id="id" class="content-box" />
    <service :id="id" class="content-box" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CompanyInformation from '@/components/organisms/company-detail/companyInformation.vue'
import TabDetail from '@/components/organisms/company-detail/tabDetail.vue'
import Service from '@/components/organisms/company-detail/service.vue'
import { BreadcrumbType, CompanyType } from '~/constants'

@Component({
  components: {
    CompanyInformation,
    TabDetail,
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

  get id(): string {
    return this.$route.params.id
  }

  private companyOption = [
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
  setTitleBreadcrumb(): void {
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
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch('breadcrumb/setPageTitle', title)
  }

  async getCpmpany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data
        const statusStr = this.companyOption.filter(
          (e) => e.id === this.company.status
        )[0].status
        this.$store.dispatch('company/setStatus', statusStr)

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

  mounted(): void {
    this.getCpmpany()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.content {
  background: none !important;
  box-shadow: none !important;
}

.content-box {
  background-color: $white;
  box-shadow: 0px 4px 8px rgb(0, 0, 0, 0.1);
  margin-bottom: 30px;
}
</style>
