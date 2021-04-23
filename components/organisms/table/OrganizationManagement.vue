<template>
  <div>
    <div class="filter-container">
      <input
        :type="type"
        class="input-field-input"
        :class="errorMessage ? 'no-border' : ''"
        v-model="dataValue"
        placeholder="placeholder"
        @blur="$emit('onBlur')"
      />

      <div class="dropdown-container">
        <div>
          <t1-dropdown
            class="dropdown"
            placeholder="Company Type"
            v-model="pagination"
            :lists="lists"
          />
          <t1-dropdown
            class="dropdown"
            placeholder="Business Type"
            v-model="pagination"
            :lists="lists"
          />
          <t1-dropdown
            class="dropdown"
            placeholder="Status"
            v-model="pagination"
            :lists="lists"
          />
        </div>
        <t1-button class="black" @click.native="Search">
          Search
        </t1-button>
      </div>
    </div>
    <table-component
      :rawData="dataList"
      :columnDefs="columnDefs"
      isShowPaginate
      isShowHeaderTable
      isShowCheckBox
      headerTitle="Create New Organization "
      :onRowClicked="onRowClicked"
      v-model="selectData"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'
import T1Dropdown from '@/components/atoms/dropdown.vue'
import T1Button from '@/components/atoms/button.vue'

@Component({
  components: {
    TableComponent,
    T1Dropdown,
    T1Button
  }
})
export default class Table extends Vue {
  selectData = []
  readonly dataList0 = []
  readonly dataList = [
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Inactive'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'On hold'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    },
    {
      companyCode: 'abc1234',
      companyRegistrationCode: '0123456789',
      regioCompanyNameTh: 'ท็อปส์ ซุปเปอร์มาร์เก็ต',
      regioCompanyNameEn: 'Tops Supermarket',
      companyType: 'BU',
      businessSize: 'L (ขนาดใหญ่)',
      status: 'Active'
    }
  ]
  readonly columnDefs = [
    {
      headerName: 'Company Code',
      field: 'companyCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.companyCode}
                </div>`
      }
    },
    {
      headerName: 'Company Registration Code',
      field: 'companyRegistrationCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.companyRegistrationCode}
                </div>`
      }
    },
    {
      headerName: 'Company Name (TH)',
      field: 'regioCompanyNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameTh}
                </div>`
      }
    },
    {
      headerName: 'Company Name (EN)',
      field: 'regioCompanyNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    },
    {
      headerName: 'Company Type',
      field: 'companyType',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.companyType}
                </div>`
      }
    },
    {
      headerName: 'Business Size',
      field: 'businessSize',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.businessSize}
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
        return `<div class="custom-row">
                  <span class='row-status ${strFormat}'>${params.data.status}</span>
                </div>`
      }
    }
  ]

  private Search() {}
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
.filter-container {
  margin: 24px;

  .input-field-input {
    font-size: 16px;
    padding: 9px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
    width: 100%;
  }

  .dropdown-container {
    display: flex;
    justify-content: space-between;
    margin-top: 14px;

    .dropdown {
      width: 200px;
      margin-right: 28px;
    }
  }
}
</style>