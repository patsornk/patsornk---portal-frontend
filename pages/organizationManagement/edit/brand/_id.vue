<template>
  <div class="create-step-container">
    <div class="w-full h-full">
      <create-brand mode="edit" :company-id="companyId" :brand-id="brandId" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import CreateBrand from '@/components/organisms/create-brand/brand.vue'
import OrganizationTable from '~/components/organisms/table/OrganizationTable.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    T1Button,
    OrganizationTable,
    CreateBrand
  }
})
export default class CompanyEditBrand extends Vue {
  private brand: any = {
    nameEn: '',
    nameTh: ''
  }

  private company: any = {
    nameEn: '',
    nameTh: ''
  }

  private statusOption = [
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

  get language(): any {
    return this.$i18n.locale
  }

  get brandId(): string {
    return this.$route.params.id
  }

  get companyId(): string | null {
    return window.sessionStorage.getItem('parentCompanyId')
  }

  @Watch('language')
  setTitleBreadcrumb(): void {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const company =
      this.language === 'th' ? this.company.nameTh : this.company.nameEn

    const brand = this.language === 'th' ? this.brand.nameTh : this.brand.nameEn

    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.organiztionMng').toString(),
        url: '/'
      },
      {
        title: company,
        url: '/'
      },
      {
        title: `${this.$t('common.brandTitle').toString()} - ${brand}`,
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      `${this.$t('common.brandTitle').toString()} - ${brand}`
    )
  }

  async getBrand(): Promise<void> {
    try {
      const brandId = this.brandId
        ? this.brandId
        : window.sessionStorage.getItem('createBrandId')
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_brand?brandId=${brandId}&brandAdditional=true&partners=true`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        const statusStr = this.statusOption.filter(
          (e) => e.id === data.status
        )[0].status
        this.$store.dispatch('company/setStatus', statusStr)
        this.brand = {
          nameTh: data.brandNameTh,
          nameEn: data.brandNameEn
        }
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.companyId}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.company.nameEn = data.companyNameEn
        this.company.nameTh = data.companyNameTh
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async checkBelongTo(): Promise<boolean | undefined> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/check_belong_to?companyId=${this.companyId}&brandId=${this.brandId}`,
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
      await this.getBrand()
      this.setupBreadcrumb()
    } else {
      this.$router.push('/landing')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-step-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 50px;
  padding-top: 0px;

  .footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 34px;
    border-top: 1px solid $grey3;
    width: 100%;

    .t1-button {
      width: 200px;
    }

    .black-transparent {
      margin-right: 42px;
    }
  }
}
</style>
