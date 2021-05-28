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
            class="dropdown"
            v-model="filterData.companyTypeId"
            :options="companyType"
            :label="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
            :reduce="(item) => item.companyTypeId"
            :placeholder="$t('createCompany.companyType').toString()"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
          <v-select
            class="dropdown"
            v-model="filterData.companyCategoryId"
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
            class="dropdown"
            v-model="filterData.compantStatus"
            :options="compantStatus"
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
      :header-title="$t('home.createNewOrganiztion').toString()"
      :raw-data="dataList"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      :column-defs="columnDefs"
      :current-page="currentPage"
      :on-row-clicked="onRowClicked"
      :page-count="pageSize"
      :selected-item="selectData.length"
      :total-item="totalItem"
      :total-page="pageSize"
      :framework-components="frameworkComponents"
      @onChenagePage="changePage"
      @pagination="changPageSize"
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
    InputSearch
  }
})
export default class OrganizationTable extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('language')
  changeSerchSelect() {
    this.searchList = [
      {
        id: 'company',
        label: `${this.$t('common.searchBy')} ${this.$t('common.companyTitle')}`
      },
      {
        id: 'partner',
        label: `${this.$t('common.searchBy')} ${this.$t(
          'common.partnerCodeTitle'
        )}`
      }
    ]
  }

  frameworkComponents = {
    agColumnHeader: CustomHeader
  }

  tableOderField = ''
  tableOderBy = ''
  currentPage = 1
  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  clickSort = false
  searchList = [
    {
      id: 'company',
      label: 'Search by Company'
    },
    {
      id: 'partner',
      label: 'Search by PartnerCode'
    }
  ]

  filterData = {
    search: {
      searchBy: 'company',
      keyword: ''
    },
    companyTypeId: 0,
    companyCategoryId: 0,
    compantStatus: 0
  }

  private pagination = '10'
  private companyType: any = []
  private companySize: any = []
  private companyCategory: any = []
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
        colKey: OrganizationTableCol.CompStatus,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        let strFormat = ''
        params.data.status === 'Active'
          ? (strFormat = 'active')
          : params.data.status === 'On hold'
          ? (strFormat = 'hold')
          : (strFormat = 'in-active')
        return `<div class="custom-row">
                  <span class='row-status ${strFormat}'>${params.data.status}</span>
                </div>`
      }
    }
  ]

  private async sortingList(data: any, order: any) {
    this.clickSort = true
    this.clickSearch = false
    if (data.colKey == 'status') {
      return
    }
    if (this.tableOderField == data.colKey) {
      if (this.tableOderBy == 'asc') {
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
      '1',
      this.pagination,
      this.tableOderField,
      this.tableOderBy
    )
  }

  // @Watch('language')
  // changeCollHeader() {
  //   this.columnDefs = [
  //     {
  //       headerName: this.$t('createCompany.companyNameTh').toString(),
  //       field: 'regioCompanyNameTh',
  //       cellRenderer: (params: any) => {
  //         return `<div class="custom-row">
  //                 ${params.data.regioCompanyNameTh}
  //               </div>`
  //       }
  //     },
  //     {
  //       headerName: this.$t('createCompany.companyNameEn').toString(),
  //       field: 'regioCompanyNameEn',
  //       cellRenderer: (params: any) => {
  //         return `<div class="custom-row">
  //                 ${params.data.regioCompanyNameEn}
  //               </div>`
  //       }
  //     },
  //     {
  //       headerName: this.$t('createCompany.partnerCategory').toString(),
  //       field: 'companyCategory',
  //       cellRenderer: (params: any) => {
  //         return `<div class="custom-row">
  //                 ${params.data.companyCategory}
  //               </div>`
  //       }
  //     },
  //     {
  //       headerName: this.$t('createCompany.companyType').toString(),
  //       field: 'companyType',
  //       cellRenderer: (params: any) => {
  //         return `<div class="custom-row">
  //                 ${params.data.companyType}
  //               </div>`
  //       }
  //     },
  //     {
  //       headerName: this.$t('createCompany.businessSize').toString(),
  //       field: 'businessSize',
  //       cellRenderer: (params: any) => {
  //         return `<div class="custom-row">
  //                 ${params.data.businessSize}
  //               </div>`
  //       }
  //     },
  //     {
  //       headerName: this.$t('common.status').toString(),
  //       field: 'status',
  //       cellRenderer: (params: any) => {
  //         let strFormat = ''
  //         params.data.status === 'Active'
  //           ? (strFormat = 'active')
  //           : params.data.status === 'On hold'
  //           ? (strFormat = 'hold')
  //           : (strFormat = 'in-active')
  //         return `<div class="custom-row">
  //                 <span class='row-status ${strFormat}'>${params.data.status}</span>
  //               </div>`
  //       }
  //     }
  //   ]
  // }

  private search() {
    this.clickSearch = true
    this.clickSort = false
    this.tableOderField = ''
    this.tableOderBy = ''
    this.currentPage = 1
    this.filterCompanies('1', this.pagination)
  }

  changPageSize(pagination: string): void {
    this.pagination = pagination
    this.currentPage = 1
    if (this.clickSearch || this.clickSort) {
      this.filterCompanies(
        '1',
        pagination,
        this.tableOderField,
        this.tableOderBy
      )
    } else {
      this.getCompanies('1', pagination)
    }
  }

  onRowClicked(row: any): void {
    if (row.data.status == 'Draft') {
      this.getOnboardStep(row.data.companyId)
    } else {
      this.$router.push(`/organizationManagement/${row.data.companyId}`)
    }
  }

  async getOnboardStep(id: number): Promise<void> {
    try {
      let res = await this.$axios.$get(
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
    this.getCompanies('1', '10')
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch || this.clickSort) {
      this.filterCompanies(
        page.toString(),
        this.pagination,
        this.tableOderField,
        this.tableOderBy
      )
    } else {
      this.getCompanies(page.toString(), this.pagination)
    }
  }

  async filterCompanies(
    page: string,
    limit: string,
    sortBy?: string,
    sortDirection?: string
  ): Promise<void> {
    let path = `/list_company?page=${page}&limit=${limit}`

    if (this.filterData.search.searchBy !== '') {
      path = path + `&keywordOf=${this.filterData.search.searchBy}`
    }
    if (sortBy) {
      path = path + `&sortBy=${sortBy}`
    }
    if (sortDirection) {
      path = path + `&sortDirection=${sortDirection}`
    }
    if (this.filterData.search.keyword !== '') {
      path = path + `&keyword=${this.filterData.search.keyword}`
    }
    if (this.filterData.compantStatus > 0) {
      path = path + `&statusId=${this.filterData.compantStatus}`
    }
    if (this.filterData.companyCategoryId > 0) {
      path = path + `&companyCategoryId=${this.filterData.companyCategoryId}`
    }
    if (this.filterData.companyTypeId && this.filterData.companyTypeId !== 1) {
      path = path + `&companyTypeId=${this.filterData.companyTypeId}`
    }

    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        {
          data: null
        }
      )
      if (res.successful) {
        this.mappingCompany(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanies(page: string, limit: string): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_company?page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingCompany(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
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
      let res = await this.$axios.$get(
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
      let res = await this.$axios.$get(
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

      return {
        companyId: item.companyId,
        regioCompanyNameTh: item.companyNameTh,
        regioCompanyNameEn: item.companyNameEn,
        companyCategory: cat,
        companyType: type,
        businessSize: size,
        status: item.statusDesc
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