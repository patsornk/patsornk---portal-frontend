<template>
  <div>
    <div class="filter-container">
      <input-field
        :type="inputType"
        class="input-field-input"
        v-model="fillterData.keyword"
        placeholder="Search from Branch Code, Branch name  or Partner code"
        @blur="$emit('onBlur')"
        :required="false"
      />

      <div class="dropdown-container">
        <div class="dropdown-group">
          <v-select
            class="dropdown"
            v-model="fillterData.brandId"
            :options="brandList"
            :label="language === 'th' ? 'brandNameTh' : 'brandNameEn'"
            :reduce="(item) => item.brandId"
            placeholder="From which brand"
            :searchable="false"
          />
          <v-select
            class="dropdown"
            v-model="fillterData.compantStatus"
            :options="compantStatus"
            :label="'status'"
            :reduce="(item) => item.id"
            placeholder="Status"
            :searchable="false"
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
      isCreateNew
      createNewTitle="Create New Branch"
      @clickNew="clickNewBranch"
      headerTitle="Branch list"
      :pageCount="pageSize"
      v-model="selectData"
      :totalItem="totalItem"
      :totalPage="pageSize"
      :onRowClicked="onRowClicked"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      :rowHeight="80"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button
  }
})
export default class TabBranch extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private id?: string

  get language(): any {
    return this.$i18n.locale
  }

  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  fillterData = {
    keyword: '',
    brandId: 0,
    compantStatus: 0
  }
  private pagination: String = '10'
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
      field: 'brandCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.brandCode}
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
        return `<div class="custom-row-80">
                  ${params.data.branchType}
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

  private async search() {
    this.clickSearch = true
    this.filterBranches('1', this.pagination)
  }

  async changPageSize(pagination: String) {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterBranches('1', pagination)
    } else {
      this.getBranches('1', pagination)
    }
  }

  async mounted(): Promise<void> {
    this.getBrands()
    this.getBranches('1', '10')
  }

  changePage(page: number) {
    if (this.clickSearch) {
      this.filterBranches(page.toString(), this.pagination)
    } else {
      this.getBranches(page.toString(), this.pagination)
    }
  }

  async filterBranches(page: String, limit: String): Promise<void> {
    // let path: String = `/list_brand?companyId=${this.id}&page=${page}&limit=${limit}`
    // if (this.fillterData.keyword !== '') {
    //   path = path + `&keyword=${this.fillterData.keyword}`
    // }
    // if (this.fillterData.brandId) {
    //   path = path + `&companyTypeId=${this.fillterData.brandId}`
    // }
    // if (this.fillterData.compantStatus > 0) {
    //   path = path + `&statusId=${this.fillterData.compantStatus}`
    // }
    // try {
    //   let res = await this.$axios.$get(`${process.env.PORTAL_ENDPOINT}${path}`, {
    //     data: null
    //   })
    //   if (res.successful) {
    //     this.mappingBranch(res.data)
    //   }
    // } catch (error) {
    //   this.$toast.global.error(error.response.data.message)
    // }
  }

  async getBranches(page: String, limit: String): Promise<void> {
    try {
      // let res = await this.$axios.$get(
      //   `${process.env.PORTAL_ENDPOINT}/list_branch?companyId=${this.id}&page=${page}&limit=${limit}`,
      //   { data: null }
      // )
      // if (res.successful) {
      //   this.mappingBranch(res.data)
      // }
      // this.dataList = [{
      //   status: 'Active'
      // }]
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingBranch(data: any) {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.brand.map((item: any) => {
      return {
        brandId: item.brandId,
        brandNameTh: item.brandNameTh,
        brandNameEn: item.brandNameEn
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
    // TO DO
  }

  onRowClicked(row: any) {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '' )
    this.$router.push(`/organizationManagement/edit/branch/${row.data.partnerId}`)
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