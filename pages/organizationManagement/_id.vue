<template>
  <div>
    <company-information class="content-box" :company="company" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType, CompanyType } from '~/constants'
import CompanyInformation from '@/components/organisms/company-detail/companyInformation.vue'

@Component({
  components: {
    CompanyInformation
  }
})
export default class OrganizationManagementDetail extends Vue {
  company: CompanyType = {
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

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Organization Management',
        url: '/'
      },
      {
        title: 'Central Marketing Group',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch('breadcrumb/setPageTitle', 'Central Marketing Group')
  }

  async getCpmpanyType(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.THE_1_PORTAL}/get_company?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.company = res.data
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mounted() {
    this.setupBreadcrumb()
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