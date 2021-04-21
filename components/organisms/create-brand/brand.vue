<template>
  <div class="create-company-container">
    <span class="header">Brand Information</span>
    <div>
      <input-field
        class="input-brand-code"
        title="Brand Code"
        :required="true"
        v-model="formData.brandCode"
      />
    </div>
    <div class="input-section">
      <input-field
        title="Brand Name (TH)"
        :required="true"
        v-model="formData.brandNameTh"
      />
      <input-field
        title="Brand Name (EN)"
        :required="true"
        v-model="formData.brandNameEn"
      />
      <input-field
        title="E-mail"
        :required="true"
        v-model="formData.email"
      />
      <phone-num-input
        title="Phone No."
        :required="true"
        v-model="formData.phoneNo"
      />
    </div>
    <div class="brand-page">
      <div class="brand-head-box">
        <span class="brand-head">Brand Page</span>
        <span class="display-toggle" fluid>
          <v-switch
            class="toggle"
            inset
            :label="`Display on The 1 App ${formData.showDisplay}`"
            v-model="formData.showDisplay"
          >
          </v-switch>
        </span>
      </div>
      <div class="brand-box">
        <div class="brand-upload-header">Brand Logo</div>
        <upload-file
          class="upload-file"
          v-model="formData.logo"
        >
        </upload-file>
      </div>
      <div class="brand-box">
        <div class="brand-upload-header">Brand Banner</div>
        <upload-file
          class="upload-file"
          v-model="formData.banner"
        >
        </upload-file>
      </div>

      <div class="brand-box">
        <input-field
          type="textarea"
          title="Brand Info"
          :required="true"
          style="width: 100%"
          v-model="formData.brandInfo"
        />
        <div class="info-description">
          70 characters left
        </div>
      </div>
    </div>
    <div class="partner-code-list">
      <table-component
        :rawData="dataList"
        :columnDefs="columnDefs"
        :isShowIconHold="false"
        :isShowInactive="false"
        :isShowDelete="false"
        :isShowPaginate="false"
        isShowHeaderTable
        isShowCheckBox
        headerTitle="Brand Page"
        v-model="formData.brandPage"
      />
    </div>
    <div class="submit-section">
      <button class="submit" @click="clickSave">
        Save
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import UploadFile from '@/components/molecules/UploadFile.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'

@Component({
  components: {
    AgGridVue,
    InputField,
    PhoneNumInput,
    UploadFile,
    TableComponent
  }
})
export default class CreateBrand extends Vue {
  private formData = {
    brandCode: '',
    brandNameTh: '',
    brandNameEn: '',
    email: '',
    phoneNo: '',
    showDisplay: true,
    logo: undefined,
    banner: undefined,
    brandInfo: '',
    brandPage: []
  }
  private showDisplay = true
  private switch1 = true
  private dataList = [
    {
      siebelPartnerCode: 'abc1234',
      siebelPartnerName: '0123456789'
    },
    {
      siebelPartnerCode: 'abc1234',
      siebelPartnerName: '0123456789'
    }
  ]
  private columnDefs = [
    {
      headerName: 'Siebel Partner code',
      field: 'siebelPartnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.siebelPartnerCode}
                </div>`
      }
    },
    {
      headerName: 'Siebel Partner Name',
      field: 'siebelPartnerName',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.siebelPartnerName}
                </div>`
      }
    }
  ]
  private gridOptions: any = {
    rowHeight: 40
  }
  private defaultColDef = {
    resizable: true
  }

  clickSave() {
    console.log('formData >>', this.formData)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/agGridStyleOverride.scss';

.create-company-container {
  padding-top: 60px;

  .header {
    font-size: 24px;
    font-weight: 700;
  }

  .input-brand-code {
    width: 260px;
  }

  .input-section {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 60px;
    grid-row-gap: 25px;
    padding: 30px 10% 30px 0px;

    .input-field,
    .phone-num-input {
      min-width: 420px;
    }
  }

  .brand-page {
    border-top: 1px solid #efefef;
    padding: 30px 0px;

    .brand-head-box {
      display: flex;
      justify-content: space-between;

      .brand-head {
        font-size: 24px;
        font-weight: 700;
      }

      .display-toggle {
        font-size: 14px;
        text-align: right;
        margin-top: -12px;
      }
    }

    .brand-box {
      padding: 8px 0px 36px 0px;

      .brand-upload-header {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .info-description {
        font-size: 14px;
        text-align: right;
      }
    }

    .upload-file {
      height: 360px;
    }
  }

  .partner-code-list {
    border-top: 1px solid #efefef;
    padding: 30px 0px;
    .ag-grid-table {
      height: 200px !important;
    }
  }

  .submit-section {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 35px;

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;

      background: $mid-black;
      color: $white;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      width: 160px;
      height: 40px;

      font-size: 16px;
      font-weight: bold;
    }
  }
}

.v-input--switch .v-input--switch__track {
  width: 42px;
  height: 21px;
  margin-top: 5px;
}

.v-input--switch .v-input--switch__thumb {
  width: 15px;
  height: 15px;
  margin-top: 4px;
  margin-left: -1px;
}

.v-input--selection-controls__ripple {
  display: none;
}
.v-input--switch--inset .v-input--switch__track {
  opacity: 1;
}
.v-input--switch .v-input--switch__track {
  color: $gray-disable;
}
</style>
