<template>
  <div>
    <div class="filter-container">
      <input-field
        :type="inputType"
        class="input-field-input"
        v-model="fillterData.keyword"
        placeholder="placeholder"
        @blur="$emit('onBlur')"
        :required="false"
      />

      <div class="dropdown-container">
        <div class="dropdown-group">
          <v-select
            class="dropdown"
            v-model="fillterData.companyTypeId"
            :options="companyType"
            :label="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
            :reduce="(item) => item.companyTypeId"
            placeholder="Company Type"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
          <v-select
            class="dropdown"
            v-model="fillterData.companyCategoryId"
            :options="companyCategory"
            :label="
              language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
            "
            :reduce="(item) => item.companyCategoryId"
            placeholder="Partner Category"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
          <v-select
            class="dropdown"
            v-model="fillterData.compantStatus"
            :options="compantStatus"
            :label="'status'"
            :reduce="(item) => item.id"
            placeholder="Status"
            :searchable="false"
            :map-keydown="deleteHandler"
          />
        </div>
        <t1-button class="black" @click.native="search"> Search </t1-button>
      </div>
    </div>
    <table-component
      :rawData="dataList"
      :columnDefs="columnDefs"
      isShowPaginate
      isShowHeaderTable
      isShowCheckBox
      headerTitle="Create New Organization"
      :onRowClicked="onRowClicked"
      :pageCount="pageSize"
      v-model="selectData"
      :selectedItem="selectData.length"
      :totalItem="totalItem"
      :totalPage="pageSize"
      @onChenagePage="changePage"
      :frameworkComponents="frameworkComponents"
      @pagination="changPageSize"
      itemKey="companyId"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import CustomHeader from '~/components/atoms/AgCustomHeader'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'

enum OrganizationTableCol {
  NameTh = "companyNameTh",
  NameEn = "companyNameEn",
  CompCat = "companyCategoryId",
  CompType = "companyTypeId",
  CompSize = "companySizeId",
  CompStatus = "status"
}

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button
  }
})
export default class OrganizationTable extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  frameworkComponents = {
    agColumnHeader: CustomHeader
  }

  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  fillterData = {
    keyword: '',
    companyTypeId: 0,
    companyCategoryId: 0,
    compantStatus: 0
  }
  private pagination: String = '10'
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
  readonly columnDefs = [
    {
      headerName: 'Company Name (TH)',
      field: 'regioCompanyNameTh',
      headerComponentParams: {
        colKey: OrganizationTableCol.NameTh,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameTh}
                </div>`
      }
    },
    {
      headerName: 'Company Name (EN)',
      field: 'regioCompanyNameEn',
      headerComponentParams: {
        colKey: OrganizationTableCol.NameEn,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    },
    {
      headerName: 'Company Category',
      field: 'companyCategory',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompCat,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.companyCategory}
                </div>`
      }
    },
    {
      headerName: 'Company Type',
      field: 'companyType',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompType,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.companyType}
                </div>`
      }
    },
    {
      headerName: 'Business Size',
      field: 'businessSize',
      headerComponentParams: {
        colKey: OrganizationTableCol.CompSize,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.businessSize}
                </div>`
      }
    },
    {
      headerName: 'Status',
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
    this.filterCompanies('1',this.pagination,data.colKey,order)
    // switch(data.colKey) {
    //   case OrganizationTableCol.NameTh:
    //   break
    //   case OrganizationTableCol.NameEn:
    //     console.log(data, 'sss', order)
    //   break
    //   case OrganizationTableCol.CompCat:
    //     console.log(data, 'sss', order)
    //   break
    //   case OrganizationTableCol.CompType:
    //     console.log(data, 'sss', order)
    //   break
    //   case OrganizationTableCol.CompSize:
    //     console.log(data, 'sss', order)
    //   break
    //   case OrganizationTableCol.CompStatus:
    //     console.log(data, 'sss', order)
    //   break
    //   default :
    //   break
    // }
  }

  private async search() {
    this.clickSearch = true
    this.filterCompanies('1', this.pagination)
  }

  async changPageSize(pagination: String) {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterCompanies('1', pagination)
    } else {
      this.getCompanies('1', pagination)
    }
  }

  async onRowClicked(row: any) {
    this.$router.push(`/organizationManagement/${row.data.companyId}`)
  }

  async mounted(): Promise<void> {
    await this.getCompanyType()
    await this.getCompanySize()
    await this.getCompanyCategory()
    this.getCompanies('1', '10')
  }

  changePage(page: number) {
    if (this.clickSearch) {
      this.filterCompanies(page.toString(), this.pagination)
    } else {
      this.getCompanies(page.toString(), this.pagination)
    }
  }

  async filterCompanies(page: String, limit: String, sortBy?: String, sortDirection?: String): Promise<void> {
    let path: String = `/list_company?page=${page}&limit=${limit}`
    if (sortBy) {
      path = path + `&sortBy=${sortBy}`
    }
    if (sortDirection) {
      path = path + `&sortDirection=${sortDirection}`
    }
    if (this.fillterData.keyword !== '') {
      path = path + `&keyword=${this.fillterData.keyword}`
    }
    if (this.fillterData.compantStatus > 0) {
      path = path + `&statusId=${this.fillterData.compantStatus}`
    }
    if (this.fillterData.companyCategoryId > 0) {
      path = path + `&companyCategoryId=${this.fillterData.companyCategoryId}`
    }
    if (
      this.fillterData.companyTypeId &&
      this.fillterData.companyTypeId !== 1
    ) {
      path = path + `&companyTypeId=${this.fillterData.companyTypeId}`
    }
    try {
      let res = await this.$axios.$get(`${process.env.PORTAL_ENDPOINT}${path}`, {
        data: null
      })
      if (res.successful) {
        this.mappingCompany(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanies(page: String, limit: String): Promise<void> {
    try {
      let res = await this.$axios.$get(
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
      let res = await this.$axios.$get(
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

  mappingCompany(data: any) {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.company.map((item: any) => {
      const cat =
        this.language === 'th'
          ? item.companyCategory.companyCategoryTh
          : item.companyCategory.companyCategoryEn
      const type =
        this.language === 'th'
          ? item.companyType.companyTypeTh
          : item.companyType.companyTypeEn
      const size =
        this.language === 'th'
          ? item.companySize.companySizeTh
          : item.companySize.companySizeEn
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

  deleteHandler(map: any, vm: any) {
    return {
      ...map, 8: (e: any) => {
        e.preventDefault();
      },
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