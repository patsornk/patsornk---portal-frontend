<template>
  <div>sss</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType, CompanyType } from '~/constants'

@Component({
  components: {
    T1Button,
    OrganizationTable
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

  mounted() {
  }

}
