<template>
  <div>
    <div class="filter-container">
      <input-search
        v-model="filterData.search"
        :placeholder="$t('common.searchFromBrand')"
        :options="searchList"
      />
      <div class="dropdown-container">
        <div class="dropdown-group">
          <v-select
            v-model="filterData.compantStatus"
            class="dropdown"
            :options="compantStatus"
            :label="'status'"
            :reduce="(item) => item.id"
            :placeholder="$t('common.status')"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
        </div>
        <t1-button class="black" @click.native="search">{{
          $t('common.search')
        }}</t1-button>
      </div>
    </div>
    <table-component
      v-model="selectData"
      class="row-h-80"
      item-key="brandId"
      is-show-check-box
      is-create-new
      is-show-header-table
      is-show-paginate
      is-show-data-not-found-icon
      is-show-data-not-found-text
      :is-loading="isLoading"
      :data-not-found-text="$t('table.dataNotFound')"
      :raw-data="dataList"
      :column-defs="columnDefs"
      :current-page="currentPage"
      :create-new-title="$t('common.createBrand')"
      :header-title="$t('common.brandList')"
      :page-count="pageSize"
      :total-item="totalItem"
      :total-page="pageSize"
      :on-row-clicked="onRowClicked"
      :framework-components="frameworkComponents"
      :row-height="80"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      @clickNew="clickNewBrand"
      @clickActive="onTableIconClick"
      @clickHold="onTableIconClick"
      @clickInActive="onTableIconClick"
      @clickDelete="onTableIconClick"
    />
    <dialog-popup
      :display="dialogDisplay"
      :title="dialogTitle"
      :description="dialogDescription"
      :left-button-title="dialogLeftButtonText"
      :right-button-title="dialogRightButtonText"
      @onLeftButtonClick="onLeftDialogPopupClick"
      @onRightButtonClick="onRightDialogPopupClick"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import InputSearch from '~/components/atoms/InputSearch.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import AgBranchButton from '~/components/atoms/AgBranchButton.js'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import { getImagePath } from '~/helper/images'
import { OrganizationManagementStatus } from '~/constants'

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button,
    InputSearch,
    DialogPopup
  }
})
export default class TabBrand extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private id?: string

  @Prop({
    required: false,
    type: Function
  })
  private viewBranchCallBack?: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  changeSerchSelect(): void {
    this.searchList = [
      {
        id: 'company',
        label: `${this.$t('common.searchBy')} ${this.$t('common.brandTitle')}`
      },
      {
        id: 'partnerCode',
        label: `${this.$t('common.searchBy')} ${this.$t(
          'common.partnerCodeTitle'
        )}`
      }
    ]
  }

  dialogAction = ''
  dialogDisplay = false
  dialogTitle = ''
  dialogDescription = ''
  dialogLeftButtonText = ''
  dialogRightButtonText = ''

  isLoading = true

  selectData = []
  currentPage = 1
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  searchList = [
    {
      id: 'brand',
      label: 'Search by Brand'
    },
    {
      id: 'partnerCode',
      label: 'Search by PartnerCode'
    }
  ]

  filterData = {
    search: {
      searchBy: 'brand',
      keyword: ''
    },
    compantStatus: 0
  }

  private pagination = 10
  private compantStatus = [
    {
      id: -1,
      status: 'All'
    },
    {
      id: 2,
      status: 'Active'
    },
    {
      id: 3,
      status: 'Inactive'
    },
    {
      id: 4,
      status: 'Onhold'
    }
  ]

  frameworkComponents = {
    AgBranchButton
  }

  dataList = []
  readonly columnDefs = [
    {
      headerName: 'Brand Logo',
      field: 'additionalLogoImg',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  <img class="custom-row-img"
                  src="${params.data.additionalLogoImg}"
                />
                </div>`
      }
    },
    {
      headerName: 'Brand Name (TH)',
      field: 'brandNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.brandNameTh}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (EN)',
      field: 'brandNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.brandNameEn}
                </div>`
      }
    },
    {
      headerName: 'Number of branch',
      field: 'numberOfBranch',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.numberOfBranch}
                </div>`
      }
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: any) => {
        let strFormat = ''
        params.data.status === 'Active'
          ? (strFormat = 'active')
          : params.data.status === 'On hold'
          ? (strFormat = 'hold')
          : (strFormat = 'in-active')
        return `<div class="custom-row-80">
                  <span class='row-status ${strFormat}'>${params.data.status}</span>
                </div>`
      }
    },
    {
      headerName: '',
      field: 'brandId',
      cellRenderer: 'AgBranchButton',
      cellRendererParams: {
        clicked: (param: any) => {
          this.viewBranch(param)
        }
      }
    }
  ]

  viewBranch(param: any): void {
    this.viewBranchCallBack(param)
  }

  private search(): void {
    this.clickSearch = true
    this.filterBrands(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterBrands(1, this.pagination)
    } else {
      this.getBrands(1, this.pagination)
    }
  }

  mounted(): void {
    this.getBrands(1, 10)
  }

  changePage(page: number): void {
    if (this.clickSearch) {
      this.filterBrands(page, this.pagination)
    } else {
      this.getBrands(page, this.pagination)
    }
  }

  async filterBrands(page: number, limit: number): Promise<void> {
    this.isLoading = true
    let path = `/list_brand?companyId=${this.id}&page=${page}&limit=${limit}`

    if (this.filterData.search.searchBy !== '') {
      path = `${path}&keywordOf=${this.filterData.search.searchBy}`
    }
    if (this.filterData.search.keyword !== '') {
      path = `${path}&keyword=${this.filterData.search.keyword}`
    }
    if (this.filterData.compantStatus > 0) {
      path = `${path}&statusId=${this.filterData.compantStatus}`
    }

    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingBrand(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getBrands(page: number, limit: number): Promise<void> {
    this.isLoading = true
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_brand?companyId=${this.id}&page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingBrand(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  mappingBrand(data: any): void {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.brand.map((item: any) => {
      return {
        brandId: item.brandId,
        additionalLogoImg: getImagePath(item.brandAdditional.additionalLogoImg),
        brandNameTh: item.brandNameTh,
        brandNameEn: item.brandNameEn,
        numberOfBranch: item.numberOfBranches,
        status: item.statusDesc
      }
    })
  }

  clickNewBrand(): void {
    this.$router.push(`/organizationManagement/${this.id}/create/brand`)
  }

  onRowClicked(row: any): void {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '')
    this.$router.push(`/organizationManagement/edit/brand/${row.data.brandId}`)
  }

  async changeBrandStatus(brands: any, statusId: number): Promise<void> {
    const brandIds: number[] = []
    brands.forEach((brand: any) => {
      brandIds.push(brand.brandId)
    })
    const payload = {
      brandIds,
      statusId
    }
    try {
      const response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_brand_status`,
        payload
      )
      if (response.successful) {
        this.getBrands(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('common.changeStatusSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.message)
    }
  }

  async deleteBrand(brands: any): Promise<void> {
    const brandIds: any = []
    brands.forEach((brand: any) => {
      brandIds.push(brand.brandId)
    })
    const payload = { brandId: brandIds }
    try {
      const response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_brand`,
        { data: payload }
      )
      if (response.successful) {
        this.getBrands(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('common.deletedSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onTableIconClick(action: string): void {
    this.dialogDisplay = true
    this.dialogDescription = this.$t('table.dialogPopup.description').toString()
    this.dialogLeftButtonText = this.$t('table.dialogPopup.cancel').toString()
    let title = ''

    if (action === 'clickActive') {
      title = this.$t('table.status.active').toString()
      this.dialogAction = OrganizationManagementStatus.ACTIVE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
    } else if (action === 'clickInActive') {
      title = this.$t('table.status.inactive').toString()
      this.dialogAction = OrganizationManagementStatus.INACTIVE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
    } else if (action === 'clickHold') {
      title = this.$t('table.status.hold').toString()
      this.dialogAction = OrganizationManagementStatus.HOLD
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
    } else if (action === 'clickDelete') {
      title = this.$t('table.status.delete').toString()
      this.dialogAction = OrganizationManagementStatus.DELETE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.delete'
      ).toString()
    }
    this.dialogTitle = `${this.$t('table.dialogPopup.title1')} ${title} ${
      this.selectData.length
    } ${this.$t('table.dialogPopup.title2')}`
  }

  onLeftDialogPopupClick(): void {
    this.dialogDisplay = false
  }

  onRightDialogPopupClick(): void {
    if (this.dialogAction === OrganizationManagementStatus.ACTIVE) {
      this.changeBrandStatus(this.selectData, 2)
    } else if (this.dialogAction === OrganizationManagementStatus.INACTIVE) {
      this.changeBrandStatus(this.selectData, 3)
    } else if (this.dialogAction === OrganizationManagementStatus.HOLD) {
      this.changeBrandStatus(this.selectData, 4)
    } else if (this.dialogAction === OrganizationManagementStatus.DELETE) {
      this.deleteBrand(this.selectData)
    }
    this.selectData = [] // comment this line for continues select after status changed
    this.dialogDisplay = false
  }

  deleteHandler(map: any, vm: any): any {
    return {
      ...map,
      8: (e: any) => {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.filter-container {
  margin: 24px 24px 45px 24px;

  .input-field-input {
    font-size: 16px;
    border: 0px solid $gray-disable;
    border-radius: 4px;
    width: 100%;
  }

  .dropdown-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    .dropdown-group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .dropdown {
        padding: 0;
        width: 240px;
        height: 44px;
        margin-right: 28px;
        border: 0px;

        .dropdown-option {
          display: flex;
          width: 100%;
        }

        ::v-deep .vs__clear {
          display: none;
        }

        ::v-deep .vs__selected {
          position: inherit;
        }

        ::v-deep .vs__dropdown-toggle {
          height: 100%;
          border: 1px solid $gray-disable !important;
        }

        ::-webkit-input-placeholder {
          color: $gray-disable;
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.custom-row-80 {
  margin-top: 15px;

  .custom-row-img {
    object-fit: cover;
    width: 68px;
    height: 68px;
    margin-top: -10px;
  }
  .view-branch {
    width: 112px;
    font-size: 14px;
    line-height: 24px;
    font-weight: 700;
    color: $white;
    background: $mid-black;
    padding: 6px 16px;
    border-radius: 6px;
    height: 36px;
    margin-top: 22px;
  }
}
</style>
