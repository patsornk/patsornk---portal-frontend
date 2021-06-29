<template>
  <div>
    <div class="filter-container">
      <div class="search-container-the1" v-if="type === 'the1'">
        <input-field
          v-model="filterData.keyword"
          :placeholder="$t('userManagement.placeholder.searchBy').toString()"
          :shouldBeError="false"
        />
        <input-field
          v-model="filterData.userType"
          type="select"
          :placeholder="$t('userManagement.placeholder.userType').toString()"
          :options="userTypeList"
          :options-reduce="(item) => item.typeId"
          :shouldBeError="false"
          :options-label="language === 'th' ? 'typeNameEn' : 'typeNameEn'"
          class="search"
        />
        <input-field
          v-model="filterData.roleId"
          type="select"
          :placeholder="$t('userManagement.placeholder.userRole').toString()"
          :options="roleList"
          :options-reduce="(item) => item.id"
          :shouldBeError="false"
          options-label="name"
          class="search"
        />
      </div>

      <div class="search-container" v-else>
        <input-field
          v-model="filterData.keyword"
          :placeholder="$t('userManagement.placeholder.searchBy').toString()"
          :shouldBeError="false"
        />
        <input-field
          v-model="filterData.roleId"
          type="select"
          :placeholder="$t('userManagement.placeholder.userRole').toString()"
          :options="roleList"
          :options-reduce="(item) => item.id"
          :shouldBeError="false"
          options-label="id"
          class="search"
        />
      </div>

      <div class="dropdown-container">
        <div class="dropdown-group">
          <input-field
            v-model="filterData.companyId"
            class="dropdown"
            type="select"
            :options="companyList"
            :options-label="
              language === 'th' ? 'companyNameTh' : 'companyNameEn'
            "
            :options-reduce="(item) => item.companyId"
            :placeholder="$t('userManagement.placeholder.company').toString()"
            :shouldBeError="false"
          />
          <input-field
            v-model="filterData.brandId"
            class="dropdown"
            type="select"
            :disable="brandList.length === 0"
            :options="brandList"
            :options-label="language === 'th' ? 'brandNameTh' : 'brandNameEn'"
            :options-reduce="(item) => item.brandId"
            :placeholder="$t('userManagement.placeholder.brand').toString()"
            :shouldBeError="false"
          />
          <input-field
            v-model="filterData.branchId"
            class="dropdown"
            type="select"
            :disable="branchList.length === 0"
            :options="branchList"
            :options-label="language === 'th' ? 'branchNameTh' : 'branchNameEn'"
            :options-reduce="(item) => item.branchId"
            :placeholder="$t('userManagement.placeholder.branch').toString()"
            :shouldBeError="false"
          />
          <input-field
            v-model="filterData.status"
            class="dropdown"
            type="select"
            :options="statusList"
            :options-label="'status'"
            :options-reduce="(item) => item.id"
            :placeholder="$t('userManagement.placeholder.status').toString()"
            :shouldBeError="false"
          />
        </div>
        <div class="search">
          <div class="clear-all" @click="clearFilter">
            {{ $t('userManagement.clearAll') }}
          </div>
          <t1-button class="black btn-search" @click.native="search">
            {{ $t('userManagement.search').toString() }}
          </t1-button>
        </div>
      </div>
    </div>
    <table-component
      v-model="selectData"
      item-key="userId"
      :header-title="$t('userManagement.userList').toString()"
      :raw-data="dataList"
      is-show-paginate
      is-show-header-table
      is-show-check-box
      is-show-data-not-found-icon
      is-show-data-not-found-text
      :is-create-no-icon="tab !== 'cg'"
      :is-two-btn="tab === 'cg'"
      :is-loading="isLoading"
      :data-not-found-text="$t('table.dataNotFound')"
      :create-new-title="$t('userManagement.createNewUser')"
      :title-left="$t('userManagement.bulkAssignRoleToUser')"
      :title-right="$t('userManagement.assignRoleToNewUser')"
      :column-defs="columnDefs"
      :current-page="currentPage"
      :on-row-clicked="onRowClicked"
      :page-count="pageSize"
      :selected-item="selectData.length"
      :total-item="totalItem"
      :total-page="pageSize"
      @clickNew="clickNewUser"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      @clickActive="onTableIconClick"
      @clickHold="onTableIconClick"
      @clickInActive="onTableIconClick"
      @clickDelete="onTableIconClick"
      @clickBtnLeft="clickBulkAssign"
      @clickBtnRight="clickAssign"
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
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import CustomHeader from '~/components/atoms/AgCustomHeader'
import InputSearch from '~/components/atoms/InputSearch.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import { OrganizationManagementStatus } from '~/constants'

enum UserTableCol {
  firstName = 'firstName',
  lastName = 'lastName',
  userType = 'userType',
  company = 'company',
  brand = 'brand',
  userRole = 'userRole',
  status = 'status'
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
export default class UserList extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private type!: string

  @Prop({
    default: '',
    type: String
  })
  private tab?: string

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('tab')
  changeTab(): void {
    this.clearFilter()
    this.getUserList(1, 10)
  }

  @Watch('language')
  changeSerchSelect(): void {}

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

  filterData = {
    keyword: '',
    userType: 0,
    roleId: 0,
    companyId: 0,
    brandId: 0,
    branchId: 0,
    status: 0
  }

  private pagination = 10
  private userTypeList = []
  private roleList = []
  private companyList: any = []
  private brandList: any = []
  private branchList: any = []
  private statusList = [
    {
      id: -1,
      status: `${this.$t('common.companyDropdownStatus.all')}`
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

  dataList = []
  columnDefs = [
    {
      headerValueGetter: (): string => {
        return this.$t('userManagement.table.firstName').toString()
      },
      // headerName: this.$t('createCompany.companyNameTh').toString(),
      field: 'firstName',
      headerComponentParams: {
        colKey: UserTableCol.firstName,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.firstName}
                </div>`
      }
    },
    {
      headerName: this.$t('userManagement.table.lastName').toString(),
      field: 'lastName',
      headerComponentParams: {
        colKey: UserTableCol.lastName,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.lastName}
                </div>`
      }
    },
    {
      headerName: this.$t('userManagement.table.userType').toString(),
      field: 'userType',
      headerComponentParams: {
        colKey: UserTableCol.userType,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.userType}
                </div>`
      }
    },
    {
      headerName: this.$t('userManagement.table.company').toString(),
      field: 'company',
      headerComponentParams: {
        colKey: UserTableCol.company,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.company}
                </div>`
      }
    },
    {
      headerName: this.$t('userManagement.table.brand').toString(),
      field: 'brand',
      headerComponentParams: {
        colKey: UserTableCol.brand,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.brand}
                </div>`
      }
    },
    {
      headerName: this.$t('userManagement.table.userRole').toString(),
      field: 'userRole',
      headerComponentParams: {
        colKey: UserTableCol.userRole,
        sortingList: (param: any, order: any) => {
          this.sortingList(param, order)
        }
      },
      sortable: true,
      cellRenderer: (params: any): string => {
        return `<div class="custom-row">
                  ${params.data.userRole}
                </div>`
      }
    },
    {
      headerName: this.$t('common.status').toString(),
      field: 'status',
      headerComponentParams: {
        colKey: UserTableCol.status
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
    // this.filterUser(1, this.pagination, this.tableOderField, this.tableOderBy)
  }

  private search(): void {
    this.clickSearch = true
    this.clickSort = false
    this.tableOderField = ''
    this.tableOderBy = ''
    this.currentPage = 1
    this.filterUser(1, this.pagination)
    this.selectData = []
  }

  changPageSize(pagination: number): void {
    this.pagination = pagination
    this.currentPage = 1
    if (this.clickSearch || this.clickSort) {
      this.filterUser(1, pagination, this.tableOderField, this.tableOderBy)
    } else {
      this.getUserList(1, pagination)
    }
  }

  onRowClicked(row: any): void {
    if (row.data) {
      if (row.data.userGroup.groupId == 2) {
        this.$router.push(`/userManagement/userProfile/edit/nonCG/${row.data.userId}`)
      } else {
        this.$router.push(`/userManagement/userProfile/edit/cg/${row.data.userId}`)
      }
    } 
  }

  async mounted(): Promise<void> {
    await this.getUserType()
    await this.getRole()
    await this.getCompany()
    await this.getUserList(1, 10)
    this.currentPage = 1
  }

  changePage(page: number): void {
    this.currentPage = page
    if (this.clickSearch || this.clickSort) {
      this.filterUser(
        page,
        this.pagination,
        this.tableOderField,
        this.tableOderBy
      )
    } else {
      this.getUserList(page, this.pagination)
    }
  }

  async filterUser(
    page: number,
    limit: number,
    sortBy?: string,
    sortDirection?: string
  ): Promise<void> {
    this.isLoading = true
    let userGroup
    if (this.type === 'the1') {
      userGroup = this.tab === 'cg' ? 1 : 2
    } else if (this.type === 'partner') {
      userGroup = 1
    } else {
      userGroup = this.tab === 'cg' ? 1 : 2
    }
    let path = `/list_user?page=${page}&limit=${limit}&userGroup=${userGroup}`
    if (sortBy) {
      path = `${path}&sortBy=${sortBy}`
    }
    if (sortDirection) {
      path = `${path}&sortDirection=${sortDirection}`
    }
    if (this.filterData.keyword !== '') {
      path = `${path}&keyword=${this.filterData.keyword}`
    }
    if (this.filterData.userType > 0) {
      path = `${path}&userType=${this.filterData.userType}`
    }
    if (this.filterData.roleId > 0) {
      path = `${path}&userRole=${this.filterData.roleId}`
    }
    if (this.filterData.companyId) {
      path = `${path}&company=${this.filterData.companyId}`
    }
    if (this.filterData.brandId) {
      path = `${path}&brand=${this.filterData.brandId}`
    }
    if (this.filterData.branchId) {
      path = `${path}&branch=${this.filterData.branchId}`
    }
    if (this.filterData.status > 0) {
      path = `${path}&status=${this.filterData.status}`
    }

    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingUser(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  async getUserList(page: number, limit: number): Promise<void> {
    this.isLoading = true
    try {
      let userGroup
      if (this.type === 'the1') {
        userGroup = this.tab === 'cg' ? 1 : 2
      } else if (this.type === 'partner') {
        userGroup = 1
      } else {
        userGroup = this.tab === 'cg' ? 1 : 2
      }
      let path = `/list_user?page=${page}&limit=${limit}&userGroup=${userGroup}`
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingUser(res.data)
        this.currentPage = page
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    this.isLoading = false
  }

  @Watch('filterData.userType')
  async getRole(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_role?userType=${this.filterData.userType}`,
        { data: null }
      )
      if (res.successful) {
        this.roleList = res.data.roles.map((item: any) => {
          return {
            ...item,
            role: item.name
          }
        })
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }
  
  async getUserType(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_user_type`,
        { data: null }
      )
      if (res.successful) {
        this.userTypeList = res.data.userType
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompany(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_company?page=1&limit=1000`,
        { data: null }
      )
      if (res.successful) {
        this.companyList = res.data.company
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  @Watch('filterData.companyId')
  async getBrand(): Promise<any> {
    this.filterData.brandId = 0
    this.filterData.branchId = 0
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_brand?page=1&limit=1000&companyId=${this.filterData.companyId}`,
        { data: null }
      )
      if (res.successful) {
        this.brandList = res.data.brand
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  @Watch('filterData.companyId')
  @Watch('filterData.brandId')
  async getBranch(): Promise<any> {
    this.filterData.branchId = 0
    let path = `${process.env.PORTAL_ENDPOINT}/list_branch?page=1&limit=1000&companyId=${this.filterData.companyId}`
    if (this.filterData.brandId) {
      path = `${path}&brandId=${this.filterData.brandId}`
    }
    try {
      const res = await this.$axios.$get(path, { data: null })
      if (res.successful) {
        this.branchList = res.data.branch
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async changeUserStatus(users: any[], statusId: number): Promise<void> {
    // const usersId: any[] = []
    // users.forEach((company: any) => {
    //   usersId.push(company.companyId)
    // })
    // const payload = {
    //   usersId,
    //   statusId
    // }
    // try {
    //   const response = await this.$axios.$post(
    //     `${process.env.PORTAL_ENDPOINT}/update_user_status`,
    //     payload
    //   )
    //   if (response.successful) {
    //     if (this.clickSearch) this.filterUser(this.currentPage, this.pagination)
    //     else this.getUserList(this.currentPage, this.pagination)
    //   }
    // } catch (error) {
    //   const code = error.response.data.code
    //   if (code === '12') {
    //     this.$toast.global.error(this.$t('error.errorCode.12'))
    //   } else {
    //     this.$toast.global.error(error.message)
    //   }
    // }
  }

  async deleteUsers(users: any[]): Promise<void> {
    // const usersId: any[] = []
    // users.forEach((user: any) => {
    //   usersId.push(user.userId)
    // })
    // try {
    //   const response = await this.$axios.$delete(
    //     `${process.env.PORTAL_ENDPOINT}/delete_user`,
    //     { data: { userId: usersId } }
    //   )
    //   if (response.successful) {
    //     this.getUserList(this.currentPage, this.pagination)
    //   }
    // } catch (error) {
    //   this.$toast.global.error(error.response.data.message)
    // }
  }

  mappingUser(data: any): void {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.users.map((item: any) => {
      const type =
        this.language === 'th'
          ? item.userType.typeNameTh
          : item.userType.typeNameEn
      const company =
        this.language === 'th'
          ? item.userScope.company.companyNameTh
          : item.userScope.company.companyNameEn
      const brand =
        this.language === 'th'
          ? item.userScope.brand.brandNameTh
          : item.userScope.brand.brandNameEn
      const statusStr = this.statusList.filter((e) => e.id === item.status)[0]
        .status
      return {
        ...item,
        firstName: item.userProfile.firstName,
        lastName: item.userProfile.lastName,
        userType: type,
        company: company,
        brand: brand,
        userRole: item.role[0].roleTitle,
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
      this.changeUserStatus(this.selectData, 2)
    } else if (this.dialogAction === OrganizationManagementStatus.INACTIVE) {
      this.changeUserStatus(this.selectData, 3)
    } else if (this.dialogAction === OrganizationManagementStatus.HOLD) {
      this.changeUserStatus(this.selectData, 4)
    } else if (this.dialogAction === OrganizationManagementStatus.DELETE) {
      this.deleteUsers(this.selectData)
    }
    this.selectData = [] // comment this line for continues select after status changed
    this.dialogDisplay = false
  }

  clearFilter() {
    this.filterData = {
      keyword: '',
      userType: 0,
      roleId: 0,
      companyId: 0,
      brandId: 0,
      branchId: 0,
      status: 0
    }
  }

  clickNewUser() {
    this.$router.push('/userManagement/userProfile/create/nonCG')
  }

  clickAssign() {
    this.$router.push('/userManagement/userProfile/create/CG')
  }

  clickBulkAssign() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.filter-container {
  margin: 24px 24px 32px 24px;

  .input-field-input {
    font-size: 16px;
    border: 0px solid $gray-disable;
    border-radius: 4px;
    width: 100%;
  }

  .search-container {
    display: grid;
    grid-template-columns: 84% 16%;

    .search {
      padding-left: 15px;
    }
  }

  .search-container-the1 {
    display: grid;
    grid-template-columns: 68% 16% 16%;

    .search {
      padding-left: 15px;
    }
  }

  .dropdown-container {
    display: grid;
    grid-template-columns: 64% 36%;
    align-items: center;
    margin-top: 4px;

    .dropdown-group {
      display: grid;
      grid-template-columns: 25% 25% 25% 25%;
      align-items: center;

      .dropdown {
        padding: 0;
        width: 100%;
        height: 44px;
        padding-right: 15px;
        border: 0px;

        .dropdown-option {
          display: flex;
          width: 100%;
        }

        ::v-deep .vs__clear {
          display: none;
        }

        ::v-deep .vs__selected {
          display: block;
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

    .search {
      width: 100%;
      margin-top: 0px;
      display: flex;
      justify-content: flex-end;

      .clear-all {
        cursor: pointer;
        text-decoration: underline;
        color: $grey-text;
        font-weight: 700;
        font-size: 14px;
        margin-top: 25px;
        text-align: right;
      }

      .btn-search {
        width: 157px;
        margin-left: 27px;
        margin-top: 16px;
      }
    }
  }
}
</style>
