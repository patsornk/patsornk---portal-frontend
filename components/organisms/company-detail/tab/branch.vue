<template>
  <div>
    <div class="filter-container">
      <input-search
        v-model="filterData.search"
        :placeholder="$t('common.search')"
        :options="searchList"
      />
      <div class="dropdown-container">
        <div class="dropdown-group">
          <v-select
            v-model="filterData.brandId"
            class="dropdown"
            :options="brandList"
            :label="language === 'th' ? 'brandNameTh' : 'brandNameEn'"
            :reduce="(item) => item.brandId"
            placeholder="From which brand"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
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
        <t1-button class="black" @click.native="search">
          {{ $t('common.search') }}
        </t1-button>
      </div>
    </div>
    <table-component
      v-model="selectData"
      :rawData="dataList"
      class="row-h-80"
      item-key="brandId"
      header-title="Branch list"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      is-create-new
      :create-new-title="$t('common.createBranch')"
      :raw-data="dataList"
      :column-defs="columnDefs"
      :current-page="currentPage"
      :page-count="pageSize"
      :total-item="totalItem"
      :total-page="pageSize"
      :on-row-clicked="onRowClicked"
      :row-height="80"
      @clickNew="clickNewBranch"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      @clickActive="clickActive"
      @clickHold="clickHold"
      @clickInActive="clickInActive"
      @clickDelete="clickDelete"
    />
    <dialog-popup
      :display="dialogDisplay"
      :title="dialogTitle"
      :description="dialogDescription"
      :left-button-title="$t('common.cancel')"
      :right-button-title="dialogRightButtonText"
      @onLeftButtonClick="dialogCancelAction"
      @onRightButtonClick="dialogAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import InputSearch from '~/components/atoms/InputSearch.vue'
import { OrganizationManagementStatus } from '~/constants'

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button,
    DialogPopup,
    InputSearch
  }
})
export default class TabBranch extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private id!: string

  @Prop({
    default: '',
    type: Number
  })
  private brandIdSearch?: number

  get language(): any {
    return this.$i18n.locale
  }

  listBranch = []

  @Watch('language')
  changeSerchSelect() {
    this.searchList = [
      {
        id: 'branch',
        label: `${this.$t('common.searchBy')} ${this.$t('common.branchTitle')}`
      },
      {
        id: 'partnerCode',
        label: `${this.$t('common.searchBy')} ${this.$t(
          'common.partnerCodeTitle'
        )}`
      }
    ]

    this.mappingBranch(this.listBranch)
  }

  status = ''
  dialogDisplay = false
  dialogTitle = ''
  dialogDescription = ''
  dialogLeftButtonText = 'Cancel'
  dialogRightButtonText = ''

  selectData = []
  currentPage = 1
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  searchList = [
    {
      id: 'branch',
      label: 'Search by Branch'
    },
    {
      id: 'partnerCode',
      label: 'Search by PartnerCode'
    }
  ]

  filterData = {
    search: {
      searchBy: 'branch',
      keyword: ''
    },
    brandId: 0,
    compantStatus: 0
  }

  private pagination = 10
  private brandId: any = []
  private compantStatus = [
    {
      id: -1,
      status: 'All'
    },
    {
      id: 1,
      status: 'Draft'
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

  dataList = []
  brandList = []
  readonly columnDefs = [
    {
      headerName: 'Branch name (TH)',
      field: 'branchNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.branchNameTh}
                </div>`
      }
    },
    {
      headerName: 'Branch name (EN)',
      field: 'branchNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.branchNameEn}
                </div>`
      }
    },
    {
      headerName: 'Branch code',
      field: 'branchCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.branchCode}
                </div>`
      }
    },
    {
      headerName: 'From which brand',
      field: 'fromWhichBrand',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.fromWhichBrand}
                </div>`
      }
    },
    {
      headerName: 'Partner Code',
      field: 'partnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.partnerCode}
                </div>`
      }
    },
    {
      headerName: 'Branch Type',
      field: 'branchType',
      cellRenderer: (params: any) => {
        const branchType =
          this.language === 'th'
            ? params.data.branchType.branchTypeTh
            : params.data.branchType.branchTypeEn

        return `<div class="custom-row-80">
                  ${branchType}
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
    }
  ]

  private search(): void {
    this.clickSearch = true
    this.filterBranches(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterBranches(1, pagination)
    } else {
      this.getBranches(1, pagination)
    }
  }

  async mounted(): Promise<void> {
    await this.getBrands()
    if (this.brandIdSearch !== 0) {
      await this.filterBranches(1, 10)
    } else {
      await this.getBranches(1, 10)
    }
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch) {
      this.filterBranches(page, this.pagination)
    } else {
      this.getBranches(page, this.pagination)
    }
  }

  async filterBranches(page: number, limit: number): Promise<void> {
    let path = `/list_branch?companyId=${this.id}&page=${page}&limit=${limit}`

    if (this.filterData.search.searchBy) {
      path = `${path}&keywordOf=${this.filterData.search.searchBy}`
    }
    if (this.filterData.search.keyword) {
      path = `${path}&keyword=${this.filterData.search.keyword}`
    }
    if (this.filterData.brandId) {
      path = `${path}&brandId=${this.filterData.brandId}`
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
        this.mappingBranch(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getBranches(page: number, limit: number): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_branch?companyId=${this.id}&page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.listBranch = res.data
        this.mappingBranch(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingBranch(data: any): void {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.branch.map((item: any) => {
      return {
        branchId: item.branchId,
        branchNameTh: item.branchNameTh,
        branchNameEn: item.branchNameEn,
        branchCode: item.branchCode,
        brand: item.brand,
        fromWhichBrand:
          this.language === 'th'
            ? item.brand.brandNameTh
            : item.brand.brandNameEn,
        partnerCode: item.partners[0] ? item.partners[0].partnerCode : '-',
        branchType: item.branchType,
        status: item.statusDesc
      }
    })
  }

  async getBrands(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_brand?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingBrand(res.data)
        this.filterData.brandId = this.brandIdSearch || 0
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingBrand(data: any) {
    this.brandList = data.brand.map((item: any) => {
      return {
        brandId: item.brandId,
        brandNameTh: item.brandNameTh,
        brandNameEn: item.brandNameEn
      }
    })
  }

  clickNewBranch() {
    this.$router.push(`/organizationManagement/${this.id}/create/branch`)
  }

  async changeStatus(event: any, statusId: number): Promise<void> {
    const branchIds: number[] = []

    event.forEach((item: any) => {
      branchIds.push(item.branchId)
    })

    const payload = {
      branchIds,
      statusId
    }

    try {
      const response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_branch_status`,
        payload
      )
      if (response.successful) {
        this.getBranches(1, this.pagination)
        this.$toast.global.success(this.$t('common.changeStatusSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.message)
    }
  }

  clickActive(): void {
    this.status = OrganizationManagementStatus.ACTIVE
    this.setDialogDisplay(true)
    this.dialogTitle = `Want to change ${this.selectData.length} items seletection status to active  ?`
    this.dialogDescription =
      'This account will be temporarity disabled. Are you sure you want to change account status?'
    this.dialogRightButtonText = 'Confirm'
  }

  clickHold(): void {
    this.status = OrganizationManagementStatus.HOLD
    this.setDialogDisplay(true)
    this.dialogTitle = `Want to change ${this.selectData.length} items seletection status to on hold  ?`
    this.dialogDescription =
      'This account will be temporarity disabled. Are you sure you want to change account status?'
    this.dialogRightButtonText = 'Confirm'
  }

  clickInActive(): void {
    this.status = OrganizationManagementStatus.INACTIVE
    this.setDialogDisplay(true)
    this.dialogTitle = `Want to change ${this.selectData.length} items seletection status to inctive   ?`
    this.dialogDescription =
      'This account will be disabled. Are you sure you want to change account status?'
    this.dialogRightButtonText = 'Confirm'
  }

  clickDelete(): void {
    this.status = OrganizationManagementStatus.DELETE
    this.setDialogDisplay(true)
    this.dialogTitle = `Want to delete ${this.selectData.length} items selection   ?`
    this.dialogDescription =
      'Please check the information before click to confirm button. The information will lose and never get back.'
    this.dialogRightButtonText = 'Delete'
  }

  dialogCancelAction(): void {
    this.setDialogDisplay(false)
  }

  dialogAction(): void {
    switch (this.status) {
      case OrganizationManagementStatus.ACTIVE:
        this.changeStatus(this.selectData, 2)
        break
      case OrganizationManagementStatus.HOLD:
        this.changeStatus(this.selectData, 4)
        break
      case OrganizationManagementStatus.INACTIVE:
        this.changeStatus(this.selectData, 3)
        break
      case OrganizationManagementStatus.DELETE:
        this.deleteBranchs(this.selectData)
        break
    }
    this.selectData = []
    this.setDialogDisplay(false)
  }

  setDialogDisplay(value: boolean): void {
    this.dialogDisplay = value
  }

  async deleteBranchs(branchs: any): Promise<void> {
    const branchId: number[] = []

    branchs.forEach((branch: any) => {
      branchId.push(branch.branchId)
    })

    const payload = {
      branchId
    }

    try {
      const response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_branch`,
        { data: payload }
      )
      if (response.successful) {
        this.getBranches(1, this.pagination)
        this.$toast.global.success(this.$t('common.deletedSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onRowClicked(row: any): void {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '')
    this.$router.push(
      `/organizationManagement/edit/branch/${row.data.branchId}`
    )
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
}
</style>