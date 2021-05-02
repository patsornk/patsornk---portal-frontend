<template>
  <div>
    <company-information class="content-box" :company="company" />
    <tab-detail class="content-box" :id="id" />
    <service class="content-box" :id="id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { BreadcrumbType, CompanyType } from '~/constants'
import CompanyInformation from '@/components/organisms/company-detail/companyInformation.vue'
import TabDetail from '@/components/organisms/company-detail/tabDetail.vue'
import Service from '@/components/organisms/company-detail/service.vue'

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
        title: 'Organization Management',
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

  async getCpmpanyType(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.THE_1_PORTAL}/get_company?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data

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
    this.getCpmpanyType()
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