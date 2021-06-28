<template>
  <div>
    <div class="filter-container">
      <input-search
        v-model="filterData.search"
        :placeholder="$t('common.searchFromCompany')"
        :options="searchList"
      />

      <div class="dropdown-container">
        <div class="dropdown-group">
          <v-select
            v-model="filterData.companyTypeId"
            class="dropdown"
            :options="companyType"
            :label="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
            :reduce="(item) => item.companyTypeId"
            :placeholder="$t('createCompany.companyType').toString()"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
          <v-select
            v-model="filterData.companyCategoryId"
            class="dropdown"
            :options="companyCategory"
            :label="
              language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
            "
            :reduce="(item) => item.companyCategoryId"
            :placeholder="$t('createCompany.partnerCategory').toString()"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
          <v-select
            v-model="filterData.companyStatus"
            class="dropdown"
            :options="companyStatus"
            :label="'status'"
            :reduce="(item) => item.id"
            :placeholder="$t('common.status').toString()"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
        </div>
        <t1-button class="black" @click.native="search">
          {{ $t('common.search').toString() }}
        </t1-button>
      </div>
    </div>
    <table-component
      v-model="selectData"
      item-key="companyId"
      :header-title="$t('common.companyList').toString()"
      :raw-data="dataList"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      is-show-data-not-found-icon
      is-show-data-not-found-text
      :is-loading="isLoading"
      :data-not-found-text="$t('table.dataNotFound')"
      :column-defs="columnDefs"
      :current-page="currentPage"
      :on-row-clicked="onRowClicked"
      :page-count="pageSize"
      :selected-item="selectData.length"
      :total-item="totalItem"
      :total-page="pageSize"
      @onChenagePage="changePage"
      @pagination="changPageSize"
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import CustomHeader from '~/components/atoms/AgCustomHeader'
import InputSearch from '~/components/atoms/InputSearch.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import { OrganizationManagementStatus } from '~/constants'

enum OrganizationTableCol {
  NameTh = 'companyNameTh',
  NameEn = 'companyNameEn',
  CompCat = 'companyCategoryId',
  CompType = 'companyTypeId',
  CompSize = 'companySizeId',
  CompStatus = 'status'
}

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
export default class OrganizationTable extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  changeSerchSelect(): void {
    this.searchList = [
      {
        id: 'company',
        label: `${this.$t('common.searchBy')} ${this.$t('common.companyTitle')}`
      },
      {
        id: 'partnerCode',
        label: `${this.$t('common.searchBy')} ${this.$t(
          'common.partnerCodeTitle'
        )}`
      }
    ]
  }

  frameworkComponents = {
    agColumnHeader: CustomHeader
  }

  dialogAction = ''
  dialogDisplay = false
  dialogTitle = ''
  dialogDescription = ''
  dialogLeftButtonText = ''
  dialogRightButtonText = ''

  isLoading = true

  tableOderField = ''
  tableOderBy = ''
  currentPage = 1
  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  clickSort = false
  searchList = [{}]

  filterData = {
    search: {
      searchBy: `${this.$t('common.searchBy')} ${this.$t(
        'common.companyTitle'
      )}`,
      keyword: ''
    },
    companyTypeId: 0,
    companyCategoryId: 0,
    companyStatus: 0
  }

  private pagination = 10
  private companyType: any = []
  private companySize: any = []
  private companyCategory: any = []
  private companyStatus = [
    {
      id: -1,
      status: `${this.$t('common.companyDropdownStatus.all')}`
    },
    {
      id: 1,
      status: `${this.$t('common.companyDropdownStatus.draft')}`
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

  dataList0 = []
  dataList = []
  columnDefs = [
    {
      headerValueGetter: (): string => {
        return this.$t('createCompany.companyNameTh').toString()
      },
      // headerName: this.$t('createCompany.companyNameTh').toString(),
      field: 'regioCompanyNameTh',
      headerComponentParams: {
        colKey: OrganizationTableCol.NameTh,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameTh}
                </div>`
      }
    },
    {
      headerName: this.$t('createCompany.companyNameEn').toString(),
      field: 'regioCompanyNameEn',
      headerComponentParams: {
        colKey: OrganizationTableCol.NameEn,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    },
    {
      headerName: this.$t('createCompany.partnerCategory').toString(),
      field: 'companyCategory',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompCat,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.companyCategory}
                </div>`
      }
    },
    {
      headerName: this.$t('createCompany.companyType').toString(),
      field: 'companyType',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompType,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.companyType}
                </div>`
      }
    },
    {
      headerName: this.$t('createCompany.businessSize').toString(),
      field: 'businessSize',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompSize,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.businessSize}
                </div>`
      }
    },
    {
      headerName: this.$t('common.status').toString(),
      field: 'status',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompStatus
      },
      cellRenderer: (params: any) => {
        let strFormat = ''
        params.data.status ===
        this.$t('table.contentTableStatus.active').toString()
          ? (strFormat = 'active')
          : params.data.status ===
            this.$t('table.contentTableStatus.hold').toString()
          ? (strFormat = 'hold')
          : (strFormat = 'in-active')
        return `<div class="custom-row">
                  <span class='row-status ${strFormat}'>${params.data.status}</span>
                </div>`
      }
    }
  ]

  private sortingList(data: any, order: any): void {
    this.clickSort = true
    this.clickSearch = false
    if (data.colKey === 'status') {
      return
    }
    if (this.tableOderField === data.colKey) {
      if (this.tableOderBy === 'asc') {
        this.tableOderBy = 'desc'
      } else {
        this.tableOderBy = 'asc'
      }
    } else {
      this.tableOderField = data.colKey
      this.tableOderBy = 'asc'
    }
    this.currentPage = 1
    this.selectData = []
    this.filterCompanies(
      1,
      this.pagination,
      this.tableOderField,
      this.tableOderBy
    )
  }

  private search(): void {
    this.clickSearch = true
    this.clickSort = false
    this.tableOderField = ''
    this.tableOderBy = ''
    this.currentPage = 1
    this.filterCompanies(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    this.currentPage = 1
    if (this.clickSearch || this.clickSort) {
      this.filterCompanies(1, pagination, this.tableOderField, this.tableOderBy)
    } else {
      this.getCompanies(1, pagination)
    }
  }

  onRowClicked(row: any): void {
    if (row.data.status === 'Draft' || row.data.status === 'แบบร่าง') {
      this.getOnboardStep(row.data.companyId)
    } else {
      this.$router.push(`/organizationManagement/${row.data.companyId}`)
    }
  }

  async getOnboardStep(id: number): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_onboard_step?companyId=${id}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        if (data.companyId) {
          window.sessionStorage.setItem(
            'createCompanyFirstTime',
            data.companyId
          )
          window.sessionStorage.setItem('createCompanyId', data.companyId)
          window.sessionStorage.setItem('companyFirstTime', 'no')
        }
        if (data.brandId) {
          window.sessionStorage.setItem('createBrandId', data.brandId)
          window.sessionStorage.setItem('createBrandFirstTime', 'no')
        }
        if (data.branchId) {
          window.sessionStorage.setItem('createBranchId', data.branchId)
          window.sessionStorage.setItem('createBranchFirstTime', 'no')
        }
        if (data.nextStep) {
          window.sessionStorage.setItem('maxStepbar', data.nextStep)
          this.$store.dispatch('stepbar/setMaxState', data.nextStep)
        }
        this.$router.push('/organizationManagement/create')
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async mounted(): Promise<void> {
    await this.getCompanyType()
    await this.getCompanySize()
    await this.getCompanyCategory()
    this.currentPage = 1
    this.getCompanies(1, 10)
    this.changeSerchSelect()
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch || this.clickSort) {
      this.filterCompanies(
        page,
        this.pagination,
        this.tableOderField,
        this.tableOderBy
      )
    } else {
      this.getCompanies(page, this.pagination)
    }
  }

  async filterCompanies(
    page: number,
    limit: number,
    sortBy?: string,
    sortDirection?: string
  ): Promise<void> {
    this.isLoading = true
    let path = `/list_company?page=${page}&limit=${limit}`

    if (this.filterData.search.searchBy !== '') {
      path = `${path}&keywordOf=${this.filterData.search.searchBy}`
    }
    if (sortBy) {
      path = `${path}&sortBy=${sortBy}`
    }
    if (sortDirection) {
      path = `${path}&sortDirection=${sortDirection}`
    }
    if (this.filterData.search.keyword !== '') {
      path = `${path}&keyword=${this.filterData.search.keyword}`
    }
    if (this.filterData.companyStatus > 0) {
      path = `${path}&statusId=${this.filterData.companyStatus}`
    }
    if (this.filterData.companyCategoryId > 0) {
      path = `${path}&companyCategoryId=${this.filterData.companyCategoryId}`
    }
    if (this.filterData.companyTypeId && this.filterData.companyTypeId !== 1) {
      path = `${path}&companyTypeId=${this.filterData.companyTypeId}`
    }

    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingCompany(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getCompanies(page: number, limit: number): Promise<void> {
    this.isLoading = true
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_company?page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingCompany(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getCompanyType(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_type`,
        { data: null }
      )
      if (res.successful) {
        this.companyType = res.data.companyType
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanySize(): Promise<any> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_size`,
        { data: null }
      )
      if (res.successful) {
        this.companySize = [
          {
            companySizeEn: 'All',
            companySizeTh: 'ทั้งหมด',
            companySizeId: -1
          },
          ...res.data.companySize
        ]
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanyCategory(): Promise<any> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_category`,
        { data: null }
      )
      if (res.successful) {
        this.companyCategory = [
          {
            companyCategoryEn: 'All',
            companyCategoryTh: 'ทั้งหมด',
            companyCategoryId: -1
          },
          ...res.data.companyCategory
        ]
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async changeCompanyStatus(companies: any[], statusId: number): Promise<void> {
    const companyIds: any[] = []
    companies.forEach((company: any) => {
      companyIds.push(company.companyId)
    })
    const payload = {
      companyIds,
      statusId
    }
    try {
      const response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_company_status`,
        payload
      )
      if (response.successful) {
        if (this.clickSearch)
          this.filterCompanies(this.currentPage, this.pagination)
        else this.getCompanies(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('table.changedStatusSuccessfully'))
      }
    } catch (error) {
      const code = error.response.data.code
      if (code === '12') {
        this.$toast.global.error(this.$t('error.errorCode.12'))
      } else {
        this.$toast.global.error(error.message)
      }
    }
  }

  async deleteCompany(companies: any[]): Promise<void> {
    const companyIds: any[] = []
    companies.forEach((company: any) => {
      companyIds.push(company.companyId)
    })
    try {
      const response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_company`,
        { data: { companyId: companyIds } }
      )
      if (response.successful) {
        this.getCompanies(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('table.deletedSuccessfully'))
        this.filterData = {
          search: {
            searchBy: `${this.$t('common.searchBy')} ${this.$t(
              'common.companyTitle'
            )}`,
            keyword: ''
          },
          companyTypeId: 0,
          companyCategoryId: 0,
          companyStatus: 0
        }
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingCompany(data: any): void {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.company.map((item: any) => {
      const cat = item.companyCategory
        ? this.language === 'th'
          ? item.companyCategory.companyCategoryTh
          : item.companyCategory.companyCategoryEn
        : '-'
      const type =
        this.language === 'th'
          ? item.companyType.companyTypeTh
          : item.companyType.companyTypeEn
      const size = item.companySize
        ? this.language === 'th'
          ? item.companySize.companySizeTh
          : item.companySize.companySizeEn
        : '-'
      const statusStr = this.companyStatus.filter(
        (e) => e.id === item.status
      )[0].status
      this.$store.dispatch('company/setStatus', statusStr)
      return {
        companyId: item.companyId,
        regioCompanyNameTh: item.companyNameTh,
        regioCompanyNameEn: item.companyNameEn,
        companyCategory: cat,
        companyType: type,
        businessSize: size,
        status: statusStr
      }
    })
  }

  deleteHandler(map: any, vm: any): any {
    return {
      ...map,
      8: (e: any) => {
        e.preventDefault()
      }
    }
  }

  onTableIconClick(action: string): void {
    this.dialogDisplay = true
    this.dialogLeftButtonText = this.$t('table.dialogPopup.cancel').toString()
    let title = ''

    if (action === 'clickActive') {
      title = this.$t('table.status.active').toString()
      this.dialogAction = OrganizationManagementStatus.ACTIVE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
      this.dialogDescription = this.$t(
        'table.dialogPopup.descriptionActive'
      ).toString()
    } else if (action === 'clickInActive') {
      title = this.$t('table.status.inactive').toString()
      this.dialogAction = OrganizationManagementStatus.INACTIVE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
      this.dialogDescription = this.$t(
        'table.dialogPopup.descriptionInActive'
      ).toString()
    } else if (action === 'clickHold') {
      title = this.$t('table.status.hold').toString()
      this.dialogAction = OrganizationManagementStatus.HOLD
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.confirm'
      ).toString()
      this.dialogDescription = this.$t(
        'table.dialogPopup.descriptionHold'
      ).toString()
    } else if (action === 'clickDelete') {
      title = this.$t('table.status.delete').toString()
      this.dialogAction = OrganizationManagementStatus.DELETE
      this.dialogRightButtonText = this.$t(
        'table.dialogPopup.delete'
      ).toString()
      this.dialogDescription = this.$t(
        'table.dialogPopup.description'
      ).toString()
    }
    if (action === 'clickDelete') {
      this.dialogTitle = `${this.$t('table.dialogPopup.title4')} ${
        this.selectData.length
      } ${this.$t('table.dialogPopup.title5')}`
    } else {
      this.dialogTitle = `${this.$t('table.dialogPopup.title1')} ${
        this.selectData.length
      } ${this.$t('table.dialogPopup.title2')} ${title}${this.$t(
        'table.dialogPopup.title3'
      )}`
    }
  }

  onLeftDialogPopupClick(): void {
    this.dialogDisplay = false
  }

  onRightDialogPopupClick(): void {
    if (this.dialogAction === OrganizationManagementStatus.ACTIVE) {
      this.changeCompanyStatus(this.selectData, 2)
    } else if (this.dialogAction === OrganizationManagementStatus.INACTIVE) {
      this.changeCompanyStatus(this.selectData, 3)
    } else if (this.dialogAction === OrganizationManagementStatus.HOLD) {
      this.changeCompanyStatus(this.selectData, 4)
    } else if (this.dialogAction === OrganizationManagementStatus.DELETE) {
      this.deleteCompany(this.selectData)
    }
    this.selectData = [] // comment this line for continues select after status changed
    this.dialogDisplay = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.filter-container {
  margin: 24px;

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
