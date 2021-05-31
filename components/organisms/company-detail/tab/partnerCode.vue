<template>
  <div>
    <div class="filter-container">
      <input-field
        v-model="filterData.keyword"
        class="input-field-input"
        :required="false"
        :type="inputType"
        :placeholder="$t('common.searchFromPartner')"
        @blur="$emit('onBlur')"
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
        <t1-button class="black" @click.native="search">
          {{ $t('common.search') }}
        </t1-button>
      </div>
    </div>
    <table-component
      v-model="selectData"
      class="row-h-80"
      item-key="partnerId"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      is-create-new
      :raw-data="dataList"
      :create-new-title="$t('common.createPartnerCode')"
      :column-defs="columnDefs"
      :on-row-clicked="onRowClicked"
      :header-title="$t('common.partnerCodeList')"
      :page-count="pageSize"
      :total-item="totalItem"
      :total-page="pageSize"
      :row-height="80"
      :current-page="currentPage"
      @clickNew="clickNewPartnerCode"
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
import { Component, Prop, Vue } from 'vue-property-decorator'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'
import InputField from '@/components/atoms/InputField.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
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
export default class TabPartnerCode extends Vue {
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

  currentPage = 1
  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  filterData = {
    keyword: '',
    compantStatus: 0
  }

  private pagination = 10
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
  readonly columnDefs = [
    {
      headerName: 'Siebel Partner Code',
      field: 'partnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.partnerCode}
                </div>`
      }
    },
    {
      headerName: 'Siebel Partner Name',
      field: 'partnerName',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.partnerName}
                </div>`
      }
    },
    {
      headerName: 'Number of Brand',
      field: 'numberOfBrands',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.numberOfBrands}
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

  private search() {
    this.clickSearch = true
    this.filterPartnerCode(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterPartnerCode(1, pagination)
    } else {
      this.getPartnerCode(1, pagination)
    }
  }

  mounted(): void {
    this.getPartnerCode(1, 10)
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch) {
      this.filterPartnerCode(page, this.pagination)
    } else {
      this.getPartnerCode(page, this.pagination)
    }
  }

  async filterPartnerCode(page: number, limit: number): Promise<void> {
    let path = `/partner_code?companyId=${this.id}&page=${page}&limit=${limit}`
    if (this.filterData.keyword !== '') {
      path = `${path}&keyword=${this.filterData.keyword}`
    }
    if (this.filterData.compantStatus > 0) {
      path = `${path}&statusId=${this.filterData.compantStatus}`
    }
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        {
          data: null
        }
      )
      if (res.successful) {
        this.mappingPartnerCode(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getPartnerCode(page: number, limit: number): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/partner_code?companyId=${this.id}&page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingPartnerCode(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingPartnerCode(data: any): void {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.partner.map((item: any) => {
      return {
        ...item,
        status: item.statusDesc,
        partnerCode: item.partnerCode,
        partnerId: item.partnerId,
        partnerName: item.partnerName
      }
    })
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
        this.deletePartnerCode(this.selectData)
        break
    }
    this.selectData = [] // comment this line for continues select after status changed
    this.setDialogDisplay(false)
  }

  setDialogDisplay(value: boolean): void {
    this.dialogDisplay = value
  }

  async changeStatus(event: any, statusId: number): Promise<void> {
    const partnerIds: number[] = []

    event.forEach((item: any) => {
      partnerIds.push(item.partnerId)
    })

    const payload = {
      partnerIds,
      statusId
    }

    try {
      const response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_partner_code_status`,
        payload
      )
      if (response.successful) {
        this.getPartnerCode(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('common.changeStatusSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.message)
    }
  }

  async deletePartnerCode(event: any): Promise<void> {
    const partnerIds: any = []

    event.forEach((item: any) => {
      partnerIds.push(item.partnerId)
    })

    try {
      const response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_partner_code`,
        {
          data: { partnerId: partnerIds }
        }
      )
      if (response.successful) {
        this.getPartnerCode(this.currentPage, this.pagination)
        this.$toast.global.success(this.$t('common.deletedSuccessfully'))
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  clickNewPartnerCode(): void {
    this.$router.push(`/organizationManagement/${this.id}/create/partnercode`)
  }

  onRowClicked(row: any): void {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '')
    this.$router.push(
      `/organizationManagement/edit/partnercode/${row.data.partnerId}`
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

  .custom-row-img {
    object-fit: cover;
    width: 68px;
    height: 68px;
    margin-top: -10px;
  }
  .view-branch {
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
