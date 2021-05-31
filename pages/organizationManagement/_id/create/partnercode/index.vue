<template>
  <div class="partner-container">
    <partner-code :company-id-parent="id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType, CompanyType } from '~/constants'
import CreateEditPartnerCode from '~/components/organisms/create-edit-partner-code/createEditPartnerCode.vue'
import PartnerCode from '~/components/organisms/create-partner-code/partnerCode.vue'

@Component({
  components: {
    T1Button,
    OrganizationTable,
    CreateEditPartnerCode,
    PartnerCode
  }
})
export default class CompanyCreatePartnerCode extends Vue {
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

  get language(): any {
    return this.$i18n.locale
  }

  get id(): string {
    return this.$route.params.id
  }

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
        url: '/'
      },
      {
        title: 'Create partner code',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch('breadcrumb/setPageTitle', 'Create partner code')
  }

  async getCpmpany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.id}`,
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

  mounted(): void {
    this.$store.dispatch('company/setStatus', '')
    this.getCpmpany()
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.partner-container {
  padding: 0px 55px;
}
</style>
