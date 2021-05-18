<template>
  <div>
    <div class="filter-container">
      <input-field
        :type="inputType"
        class="input-field-input"
        v-model="fillterData.keyword"
        placeholder="Search from  Partner code"
        @blur="$emit('onBlur')"
        :required="false"
      />

      <div class="dropdown-container">
        <div class="dropdown-group">
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
      createNewTitle="Create New Partner Code"
      @clickNew="clickNewPartnerCode"
      :onRowClicked="onRowClicked"
      headerTitle="Partner Code List"
      :pageCount="pageSize"
      v-model="selectData"
      :totalItem="totalItem"
      :totalPage="pageSize"
      @onChenagePage="changePage"
      @pagination="changPageSize"
      :rowHeight="80"
      class="row-h-80"
      @clickHold="clickHold"
      @clickInactive="clickInactive"
      @clickDelete="clickDelete"
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

  selectData = []
  pageSize = 0
  totalItem = 0
  inputType = 'text'
  clickSearch = false
  fillterData = {
    keyword: '',
    compantStatus: 0
  }
  private pagination: String = '10'
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
      field: 'numberOfBrand',
      cellRenderer: (params: any) => {
        return `<div class="custom-row-80">
                  ${params.data.numberOfBrand}
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
    this.filterPartnerCode('1', this.pagination)
  }

  async changPageSize(pagination: String) {
    this.pagination = pagination
    if (this.clickSearch) {
      this.filterPartnerCode('1', pagination)
    } else {
      this.getPartnarCode('1', pagination)
    }
  }

  async mounted(): Promise<void> {
    this.getPartnarCode('1', '10')
  }

  changePage(page: number) {
    if (this.clickSearch) {
      this.filterPartnerCode(page.toString(), this.pagination)
    } else {
      this.getPartnarCode(page.toString(), this.pagination)
    }
  }

  async filterPartnerCode(page: String, limit: String): Promise<void> {
    let path: String = `/partner_code?companyId=${this.id}&page=${page}&limit=${limit}`
    if (this.fillterData.keyword !== '') {
      path = path + `&keyword=${this.fillterData.keyword}`
    }
    if (this.fillterData.compantStatus > 0) {
      path = path + `&statusId=${this.fillterData.compantStatus}`
    }
    try {
      let res = await this.$axios.$get(
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

  async getPartnarCode(page: String, limit: String): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/partner_code?companyId=${this.id}&page=${page}&limit=${limit}`,
        { data: null }
      )
      if (res.successful) {
        this.mappingPartnerCode(res.data)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mappingPartnerCode(data: any) {
    this.pageSize = data.totalPage
    this.totalItem = data.total
    this.dataList = data.partner.map((item: any) => {
      return {
        partnerCode: item.partnerCode,
        partnerId: item.partnerId,
        partnerName: item.partnerName
      }
    })
  }

  clickNewPartnerCode() {
    this.$router.push(`/organizationManagement/${this.id}/create/partnercode`)
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
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_partner_code_status`,
        payload
      )
      if (response.successful) {
        this.getPartnarCode('1', this.pagination)
      }
    } catch (error) {
      this.$toast.global.error(error.message)
    }
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
      payload.push(item.partnerId)
    })
    console.log('payload', payload)

    try {
      let response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_partner_code`,
        {
          data: { partnerId: payload }
        }
      )
      if (response.successful) {
        this.getPartnarCode('1', this.pagination)
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onRowClicked(row: any) {
    window.sessionStorage.setItem('parentCompanyId', this.id?.toString() ?? '')
    this.$router.push(
      `/organizationManagement/edit/partnercode/${row.data.partnerId}`
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