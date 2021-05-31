<template>
  <div>
    <CreateEditPartnerCode
      :compant-id="compantId"
      :component-mode="mode"
      :edit-id="id"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType, CompanyType } from '~/constants'
import { PartnerCodeMode } from '~/constants/CreateEditPartnerCode'
import CreateEditPartnerCode from '~/components/organisms/create-edit-partner-code/createEditPartnerCode.vue'

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

  get mode(): string {
    return PartnerCodeMode.EDIT_MODE
  }

  get language(): any {
    return this.$i18n.locale
  }

  get compantId(): string | null {
    return window.sessionStorage.getItem('parentCompanyId')
  }

  get id(): string {
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
        title: `${this.$t('common.partnerCodeTitle').toString()} - ${
          partnerCode ?? 'Edit partner code'
        }`,
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      `${this.$t('common.partnerCodeTitle').toString()} - ${
        partnerCode ?? 'Edit partner code'
      }`
    )
  }

  async getCpmpany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
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
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_partner_code?partnerId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.$store.dispatch('company/setStatus', res.data.statusDesc)
        return data.partnerCode
      }
    } catch (error) {
      return ''
    }
  }

  async checkBelongTo(): Promise<boolean | undefined> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/check_belong_to?companyId=${this.compantId}&partnerId=${this.id}`,
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
    this.$store.dispatch('company/setStatus', '')
    if (this.compantId && (await this.checkBelongTo())) {
      this.getCpmpany()
    } else {
      this.$router.push('/landing')
    }
  }
}
</script>
