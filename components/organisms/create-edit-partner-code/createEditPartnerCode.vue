<template>
  <div class="create-company-container">
    <div class="partner-code-container">
      <span class="siebel-title"> Partner Code Information </span>
      <div class="siebel-container">
        <input-field
          :disable="editMode"
          :title="'Siebel Partner Code'"
          class="sp-code"
          :maxlength="9"
          v-model="$v.partnerCode.$model"
          placeholder="Siebel Partner code"
          :errorMessage="error.partnerCode ? error.partnerCode : undefined"
          @onChange="checkPartnerCode"
          required
        />
        <input-field
          :title="'Siebel Partner Name'"
          class="sp-name"
          v-model="$v.partnerName.$model"
          :maxlength="100"
          placeholder="Siebel Partner name"
          :errorMessage="error.partnerName ? error.partnerName : undefined"
          @onChange="checkPartnerName"
          required
        />
      </div>
      <div class="status-container" v-if="editMode">
        <input-field
          class="status-dropdown"
          v-model="$v.status.$model"
          title="Status"
          required
          type="select"
          :options="statusOption"
          :optionsReduce="(item) => item.id"
          :optionsLabel="'status'"
          placeholder="Please select..."
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
      @clickNew="clickAssignNew"
      itemKey="partnerId"
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
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
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  numeric
} from 'vuelidate/lib/validators'

const validations = {
  partnerCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value),
    maxLength: maxLength(50)
  },
  partnerName: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value),
    maxLength: maxLength(50)
  },
  status: {
    required
  },

  createGroup: ['partnerCode', 'partnerName'],
  editGroup: ['partnerCode', 'partnerName', 'status']
}

@Component({
  validations: validations,
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

  @Prop({
    required: true,
    default: 0
  })
  private compantId?: number

  @Prop({
    required: false,
    default: 0
  })
  private editId?: number

  private statusOption = [
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

  private error = {
    partnerCode: '',
    partnerName: ''
  }

  private value: SiebelPartnerType = {
    id: 0,
    partnerCode: '',
    partnerName: ''
  }

  partnerCode = ''
  partnerName = ''
  partnerId = 0
  companyId = 0
  status = 0

  get editMode(): boolean {
    if (this.componentMode == PartnerCodeMode.CREATE_MODE) {
      return false
    } else {
      return true
    }
  }

  keyword = ''
  keywordError = ''

  isShowBrand = false

  selectData = []
  dataList: any = []
  frameworkComponents = {}
  readonly columnDefs = [
    {
      headerName: 'Brand Code',
      field: 'brandCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandCode}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (TH)',
      field: 'brandNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandNameTh}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (EN)',
      field: 'brandNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandNameEn}
                </div>`
      }
    }
  ]

  modalSelectData = []
  modalDataList: any = []
  modalFrameworkComponents = {}
  readonly modalColumnDefs = [
    {
      headerName: 'Brand Code',
      field: 'brandCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandCode}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (TH)',
      field: 'brandNameTh',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandNameTh}
                </div>`
      }
    },
    {
      headerName: 'Brand Name (EN)',
      field: 'brandNameEn',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.brandNameEn}
                </div>`
      }
    }
  ]

  mounted() {
    if (this.editMode && this.editId) {
      this.getPartnercode()
      this.getAssignedBrand('1', '10')
      this.getAssignBrand('1', '10')
    } else {
      this.getBrandList('1', '10')
    }
  }

  async createPartnerCode() {
    try {
      const payload = {
        // partnerCode: this.newSiebelPartner.partnerCode,
        // partnerName: this.newSiebelPartner.partnerName,
        // companyId: this.companyId
      }

      let res = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/create_partner_code`,
        payload
      )

      if (res.successful) {
        // this.partnerCodeError = ''
        // this.dataList.push({
        //   id: res.data.partnerId,
        //   partnerCode: res.data.partnerCode,
        //   partnerName: res.data.partnerName
        // })
        // this.clearData()
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
      if (error.response.data.code === '07') {
        // this.partnerCodeError = 'Duplicate Siebel Partner code'
      }
    }
  }

  async editPartnerCode() {
    try {
      const payload = {
        partnerId: this.partnerId,
        partnerName: this.partnerName,
        companyId: this.companyId
      }
      let res = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/edit_partner_code`,
        payload
      )
      if (res.successful) {
        this.partnerCode = res.data.partnerCode
        this.partnerName = res.data.partnerName
        this.partnerId = res.data.partnerId
        this.status = res.data.status
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getPartnercode(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_partner_code?partnerId=${this.editId}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.partnerCode = data.partnerCode
        this.partnerName = data.partnerName
        this.partnerId = data.partnerId
        this.status = data.status
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getBrandList(page: string, limit: string) {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_brand?page=${page}&limit=${limit}&companyId=${this.compantId}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.modalDataList = data.brand.map(
          (item: { brandCode: any; brandNameTh: any; brandNameEn: any }) => {
            return {
              brandCode: item.brandCode,
              brandNameTh: item.brandNameTh,
              brandNameEn: item.brandNameEn
            }
          }
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getAssignedBrand(page: string, limit: string): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${
          process.env.PORTAL_ENDPOINT
        }/list_brand_by_partner?page=${page}&limit=${limit}&partnerId=${
          this.editId
        }&assigned=${true}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.dataList = data.brand.map(
          (item: { brandCode: any; brandNameTh: any; brandNameEn: any }) => {
            return {
              brandCode: item.brandCode,
              brandNameTh: item.brandNameTh,
              brandNameEn: item.brandNameEn
            }
          }
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getAssignBrand(page: string, limit: string): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${
          process.env.PORTAL_ENDPOINT
        }/list_brand_by_partner?page=${page}&limit=${limit}&partnerId=${
          this.editId
        }&assigned=${false}`,
        { data: null }
      )
      if (res.successful) {
        console.log(res.data)
        this.modalDataList = res.data.brand.map(
          (item: { brandCode: any; brandNameTh: any; brandNameEn: any }) => {
            return {
              brandCode: item.brandCode,
              brandNameTh: item.brandNameTh,
              brandNameEn: item.brandNameEn
            }
          }
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  @Watch('partnerCode')
  checkPartnerCode() {
    // this.error.brandNameEn = !this.$v.brandNameEn.required
    //   ? this.$t('createBrand.error.require').toString()
    //   : !this.$v.brandNameEn.mustBe
    //   ? this.$t('createBrand.error.characterAndNumber').toString()
    //   : !this.$v.brandNameEn.maxLength
    //   ? this.$t('createBrand.error.maxLength').toString()
    //   : ''
  }

  @Watch('partnerName')
  checkPartnerName() {
    // this.error.brandNameEn = !this.$v.brandNameEn.required
    //   ? this.$t('createBrand.error.require').toString()
    //   : !this.$v.brandNameEn.mustBe
    //   ? this.$t('createBrand.error.characterAndNumber').toString()
    //   : !this.$v.brandNameEn.maxLength
    //   ? this.$t('createBrand.error.maxLength').toString()
    //   : ''
  }

  cancleHandler() {
    this.$router.push(`/organizationManagement/${this.compantId}`)
  }

  createHandler() {
    if (this.editMode) {
      this.editPartnerCode()
    } else {
      this.createPartnerCode()
    }
  }

  clickDeleteList() {}

  clickAssignNew() {
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
  .status-container {
    display: flex;
    flex-direction: row;
    margin: 24px 0px 0px 0px;
    .status-dropdown {
      width: 23%;
      margin: 0px 59px 0px 0px;
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
