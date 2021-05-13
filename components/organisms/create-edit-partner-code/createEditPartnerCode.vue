<template>
  <div class="create-company-container">
    <div class="partner-code-container">
      <span class="siebel-title"> Partner Code Information </span>
      <div class="siebel-container">
        <input-field
          :title="'Siebel Partner Code'"
          class="sp-code"
          :maxlength="9"
          v-model="value.partnerCode"
          placeholder="Siebel Partner code"
          :errorMessage="error.partnerCode ? error.partnerCode : undefined"
          @onChange="checkPartnerCode"
          required
        />
        <input-field
          :title="'Siebel Partner Name'"
          class="sp-name"
          v-model="value.partnerName"
          :maxlength="100"
          placeholder="Siebel Partner name"
          :errorMessage="error.partnerName ? error.partnerName : undefined"
          @onChange="checkPartnerName"
          required
        />
      </div>
    </div>
    <div class="spector-line" />

    <table-component
      :rawData="dataList"
      :columnDefs="columnDefs"
      isShowHeaderTable
      isShowCheckBox
      isShowPaginate
      headerTitle="Brand list"
      v-model="selectData"
      :isShowIconHold="false"
      :isShowInactive="false"
      :frameworkComponents="frameworkComponents"
      @clickDelete="clickDeleteList"
      :isCreateNew="true"
      :isShowAddIcon="false"
      createNewTitle="Assign More Brand"
      @clickNew="clickNew"
    />
    <div class="footer">
      <t-1-button type="black-transparent" @click.native="cancleHandler">
        Cancel
      </t-1-button>
      <t-1-button @click.native="createHandler">
        Create new company
      </t-1-button>
    </div>

    <div class="ass-brand-modal" v-show="isShowBrand">
      <div class="modal-backdrop">
        <div class="modal">
          <div class="modal-header">
            <span class="title"> Assign more brand </span>
          </div>
          <div class="modal-body">
            <input-field
              class="input-keyword"
              v-model="keyword"
              placeholder="Social Link"
              :errorMessage="keywordError"
            />
            <table-component
              :rawData="modalDataList"
              :columnDefs="modalColumnDefs"
              v-model="modalSelectData"
              isShowHeaderTable
              isShowCheckBox
              isShowPaginate
              :isShowIconHold="false"
              :isShowInactive="false"
              :isShowDelete="false"
              :frameworkComponents="modalFrameworkComponents"
            />
          </div>
          <div class="modal-footer">
            <div class="footer">
              <t-1-button
                type="black-transparent"
                @click.native="clickCloseModel"
              >
                Cancel
              </t-1-button>
              <t-1-button @click.native="clickSubmitModel">
                Create new company
              </t-1-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '@/components/molecules/table-component/TableComponent.vue'
import SiebelPartner from '@/components/molecules/create-partner/SiebelPartner.vue'
import Modal from '@/components/atoms/Modal.vue'
import { PartnerCodeMode } from '~/constants/CreateEditPartnerCode'
import T1Button from '@/components/atoms/button.vue'
import {
  ErrorSiebelPartner,
  SiebelPartnerType
} from '@/constants/types/PartnerCodeType'

@Component({
  components: {
    InputField,
    TableComponent,
    SiebelPartner,
    Modal,
    T1Button
  }
})
export default class CreateEditPartnerCode extends Vue {
  @Prop({
    required: false,
    default: PartnerCodeMode.CREATE_MODE
  })
  private componentMode?: PartnerCodeMode

  private error: ErrorSiebelPartner = {
    partnerCode: '',
    partnerName: ''
  }

  private value: SiebelPartnerType = {
    partnerId: 0,
    partnerCode: '',
    partnerName: ''
  }

  keyword = ''
  keywordError = ''

  isShowBrand = false

  selectData = []
  dataList = []
  frameworkComponents = {}
  readonly columnDefs = [
    {
      headerName: 'Brand Code',
      field: 'brandCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (TH)',
      field: 'brandNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameTh}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (EN)',
      field: 'brandNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    }
  ]

  modalSelectData = []
  modalDataList = []
  modalFrameworkComponents = {}
  readonly modalColumnDefs = [
    {
      headerName: 'Brand Code',
      field: 'brandCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (TH)',
      field: 'brandNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameTh}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (EN)',
      field: 'brandNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.regioCompanyNameEn}
                </div>`
      }
    }
  ]

  checkPartnerCode() {}

  checkPartnerName() {}

  cancleHandler() {}

  createHandler() {}

  clickDeleteList() {}

  clickNew() {
    this.isShowBrand = true
  }

  clickCloseModel() {
    this.isShowBrand = false
  }

  clickSubmitModel() {}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.create-company-container {
  padding: 0px;
  .partner-code-container {
    margin: 42px 55px 0px 55px;
    .siebel-title {
      font-size: 24px;
      font-weight: 700;
    }
    .siebel-container {
      display: flex;
      flex-direction: row;
      margin: 24px 0px 0px 0px;

      .sp-code {
        width: 23%;
        margin: 0px 59px 0px 0px;
      }
      .sp-name {
        width: 37%;
        margin-right: 33px;
      }
    }
  }
  .spector-line {
    border-top: 1px solid $grey3;
    margin: 24px 38px 24px 38px;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 34px;
    border-top: 1px solid $grey3;
    margin: 24px 38px 24px 38px;

    .t1-button {
      width: 200px;
    }

    .black-transparent {
      margin-right: 42px;
    }
  }
  .ass-brand-modal {
    width: 100%;
    .modal-backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;
    }

    .modal {
      background: $white;
      border-radius: 6px;
      overflow-x: auto;
      display: flex;
      flex-direction: column;
      padding: 24px;
      width: 68%;
    }

    .modal-header {
      display: flex;
      .title {
        color: $black !important;
        font-size: 24px;
        font-weight: 700;
      }
      position: relative;
      color: $primary;
      font-weight: 700;
      justify-content: space-between;
    }

    .modal-body {
      position: relative;
      padding-top: 20px;
      font-size: 14px;
      .input-keyword {
        width: 100%;

        &.input-field-input {
          font-size: 16px;
          padding: 9px;
          border: 1px solid $gray-disable;
          border-radius: 4px;
          width: 100%;
        }

        &.input-field-input:focus {
          outline: none !important;
        }

        &.input-field-input-error {
          border: 1px solid $primary !important;
          border-radius: 4px;
        }

        &.input-field-input-error .vs__dropdown-toggle {
          border: 1px solid $primary;
        }
      }
    }

    .modal-footer {
      justify-content: flex-end;
      text-align: right;
      font-size: 16px;
      display: flex;
      .footer {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        padding-top: 34px;
        border-top: 1px solid $grey3;
        margin: 24px 38px 24px 38px;

        .t1-button {
          width: 200px;
        }

        .black-transparent {
          margin-right: 42px;
        }
      }
    }
  }
}
</style>
