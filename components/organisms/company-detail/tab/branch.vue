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
      @clickActive="clickActive"
      @clickHold="clickHold"
      @clickInactive="clickInactive"
      @clickDelete="clickDelete"
      itemKey="brandId"
    />

    <dialog-popup
      :display="dialogDisplay"
      :title="dialogTitle"
      :description="dialogDescription"
      :leftButtonTitle="dialogLeftButtonText"
      :rightButtonTitle="dialogRightButtonText"
      @onLeftButtonClick="dialogCancelAction"
      @onRightButtonClick="dialogAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import { OrganizationManagementStatus } from '~/constants'

@Component({
  components: {
    TableComponent,
    InputField,
    T1Dropdown,
    T1Button,
    DialogPopup
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

  status = ''
  dialogDisplay = false
  dialogTitle = ''
  dialogDescription = ''
  dialogLeftButtonText = 'Cancel'
  dialogRightButtonText = ''

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
        let branchType =
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
    await this.getBrands()
    await this.getBranches('1', '10')
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
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_branch?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingBranch(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingBranch(data: any) {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.branch.map((item: any) => {
      return {
        branchId: item.branchId,
        branchNameTh: item.branchNameTh,
        branchNameEn: item.branchNameEn,
        branchCode: item.branchCode,
        fromWhichBrand: item.brandId,
        partnerCode: item.partners[0].partnerCode,
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

  async changeStatus(event: any, statusId: number) {
    let partnerId: number[] = []

    event.forEach((item: any) => {
      partnerId.push(item.partnerId)
    })

    const payload = {
      partnerId,
      statusId
    }

    try {
      // let response = await this.$axios.$post(
      //   `${process.env.PORTAL_ENDPOINT}/update_partner_code_status`,
      //   payload
      // )
      // if (response.successful) {
      //   this.getPartnarCode('1', this.pagination)
      // }
    } catch (error) {
      this.$toast.global.error(error.message)
    }
  }

  async clickActive(event: any) {
    await this.changeStatus(event, 2)
  }

  async clickHold(event: any) {
    await this.changeStatus(event, 4)
  }

  async clickInactive(event: any) {
    await this.changeStatus(event, 3)
  }

  async clickDelete(event: any) {
    let payload: any = []

    event.forEach((item: any) => {
      payload.push(item.branchId)
    })

    try {
      // let response = await this.$axios.$delete(
      //   `${process.env.PORTAL_ENDPOINT}/delete_partner_code`,
      //   {
      //     data: { partnerId: payload }
      //   }
      // )
      // if (response.successful) {
      //   this.getPartnarCode('1', this.pagination)
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  dialogCancelAction() {
    this.setDialogDisplay(false)
  }

  dialogAction() {
    switch (this.status) {
      case OrganizationManagementStatus.HOLD:
        this.changeStatus(this.selectData, 4)
        break
      case OrganizationManagementStatus.INACTIVE:
        this.changeStatus(this.selectData, 3)
        break
      case OrganizationManagementStatus.DELETE:
        this.deletePartnerCode(this.selectData)
        break
    }
  }

  setDialogDisplay(value: boolean) {
    this.dialogDisplay = value
  }

  async deletePartnerCode(event: any) {
    let payload: any = []

    event.forEach((item: any) => {
      payload.push(item.partnerId)
    })

    try {
      // let response = await this.$axios.$delete(
      //   `${process.env.PORTAL_ENDPOINT}/delete_partner_code`,
      //   {
      //     data: { partnerId: payload }
      //   }
      // )
      // if (response.successful) {
      //   this.getPartnarCode('1', this.pagination)
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onRowClicked(row: any) {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '')
    this.$router.push(
      `/organizationManagement/edit/branch/${row.data.partnerId}`
    )
  }

  deleteHandler(map: any, vm: any) {
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