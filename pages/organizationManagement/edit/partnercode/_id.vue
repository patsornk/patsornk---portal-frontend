<template>
  <div>
    <CreateEditPartnerCode
      :compantId="compantId"
      :componentMode="mode"
      :editId="id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType, CompanyType } from '~/constants'
import { PartnerCodeMode } from '~/constants/CreateEditPartnerCode'
import CreateEditPartnerCode from '~/components/organisms/create-edit-partner-code/createEditPartnerCode.vue'
import { partnerCode } from '~/locales/en/createBrand'

@Component({
  components: {
    T1Button,
    OrganizationTable,
    CreateEditPartnerCode
  }
})
export default class CompanyEditPartnerCode extends Vue {
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

  get mode() {
    return PartnerCodeMode.EDIT_MODE
  }

  get language(): any {
    return this.$i18n.locale
  }

  get compantId() {
    return window.sessionStorage.getItem('parentCompanyId')
  }

  get id() {
    return this.$route.params.id
  }

  private setupBreadcrumb(title: string, partnerCode?: string): void {
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
        title: `${this.$t('common.partnerCodeTitle').toString()} - ${partnerCode ?? 'Edit partner code'}`,
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch('breadcrumb/setPageTitle', `${this.$t('common.partnerCodeTitle').toString()} - ${partnerCode ?? 'Edit partner code'}`)
  }

  async getCpmpany(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.compantId}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data

        const partnerCode = await this.getPartnercode()

        this.setupBreadcrumb(
          this.language === 'th'
            ? this.company.companyNameTh
            : this.company.companyNameEn,
            partnerCode
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getPartnercode(): Promise<string | undefined> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_partner_code?partnerId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        return data.partnerCode
      }
    } catch (error) {
      return ''
    }
  }

  mounted() {
    this.getCpmpany()
  }
}
</script>