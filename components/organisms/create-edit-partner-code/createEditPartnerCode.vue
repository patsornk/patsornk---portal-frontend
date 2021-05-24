<template>
  <div class="create-company-container">
    <div class="partner-code-container">
      <span class="siebel-title"> Partner Code Information </span>
      <div class="siebel-container">
        <input-field
          :disable="true"
          :title="'Siebel Partner Code'"
          class="sp-code"
          :maxlength="50"
          v-model="$v.partnerCode.$model"
          :placeholder="$t('createPartnerCode.sieabelPartner')"
          :errorMessage="error.partnerCode ? error.partnerCode : undefined"
          @onChange="checkPartnerCode"
          required
        />
        <input-field
          :title="'Siebel Partner Name'"
          class="sp-name"
          v-model="$v.partnerName.$model"
          :maxlength="50"
          :placeholder="$t('createPartnerCode.sieabelPartnerName')"
          :errorMessage="error.partnerName ? error.partnerName : undefined"
          @onChange="checkPartnerName"
          required
        />
      </div>
      <div class="status-container">
        <input-field
          class="status-dropdown"
          v-model="$v.status.$model"
          title="Status"
          required
          type="select"
          :options="statusOption"
          :optionsReduce="(item) => item.id"
          optionsLabel="status"
          :placeholder="$t('common.pleaseSelect')"
          :errorMessage="error.status ? error.status : undefined"
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
      headerTitle="Brand List"
      v-model="selectData"
      :frameworkComponents="frameworkComponents"
      @clickDelete="clickDeleteList"
      :isCreateNew="true"
      :isShowAddIcon="false"
      :isShowIconHold="false"
      :isShowActive="false"
      :isShowInactive="false"
      createNewTitle="Assign More Brand"
      @clickNew="clickAssignNew"
      :totalItem="dataList.length"
      itemKey="brandId"
    />
    <div class="footer">
      <t-1-button class="black" @click.native="clickSave"> 
        {{$t('common.save')}}
      </t-1-button>
    </div>

    <div class="ass-brand-modal" v-if="isShowBrand">
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
              @onChange="chengeKeyword"
            />
            <table-component
              :rawData="modalDataList"
              :columnDefs="modalColumnDefs"
              v-model="modalSelectData"
              isShowHeaderTable
              isShowCheckBox
              isShowPaginate
              :isShowIconHold="false"
              :isShowActive="false"
              :isShowInactive="false"
              :isShowDelete="false"
              :frameworkComponents="modalFrameworkComponents"
              itemKey="brandId"
              :totalItem="modalDataList.length"
            />
          </div>
          <div class="modal-footer">
            <div class="footer">
              <t-1-button
                type="black-transparent"
                @click.native="clickCloseModel"
              >
                {{$t('common.cancel')}}
              </t-1-button>
              <t-1-button
                :class="modalSelectData.length === 0 ? 'disable' : ''"
                @click.native="clickSubmitModel"
              >
                {{$t('createCompany.assign')}}
              </t-1-button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '@/components/molecules/table-component/TableComponent.vue'
import SiebelPartner from '@/components/molecules/create-partner/SiebelPartner.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import Modal from '@/components/atoms/Modal.vue'
import { PartnerCodeMode } from '~/constants/CreateEditPartnerCode'
import T1Button from '@/components/atoms/button.vue'
import {
  ErrorSiebelPartner,
  SiebelPartnerType
} from '@/constants/types/PartnerCodeType'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

const validations = {
  partnerCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value),
    minLength: minLength(3)
  },
  partnerName: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  status: {
    required
  },

  editGroup: ['partnerCode', 'partnerName', 'status']
}

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    InputField,
    TableComponent,
    SiebelPartner,
    Modal,
    T1Button,
    DialogPopup
  }
})
export default class CreateEditPartnerCode extends Vue {
  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

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
      id: '2',
      status: 'Active'
    },
    {
      id: '3',
      status: 'Inactive'
    },
    {
      id: '4',
      status: 'Onhold'
    }
  ]

  private error = {
    partnerCode: '',
    partnerName: '',
    status: ''
  }

  value: SiebelPartnerType = {
    partnerId: 0,
    id: 0,
    partnerCode: '',
    partnerName: ''
  }

  partnerCode = ''
  partnerName = ''
  partnerId = 0
  companyId = 0
  status = ''
  keyword = ''
  keywordError = ''

  isShowBrand = false

  selectData = []
  dataList: any = []
  frameworkComponents = {}
  columnDefs = [
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

  dialogDisplay = false
  dialogTitle = ''
  dialogDescription =
    'Please check the information before click to confirm button. The information will lose and never get back.'
  dialogLeftButtonText = 'Cancel'
  dialogRightButtonText = 'Remove'

  mounted() {
    this.getPartnercode()
    this.getAssignedBrand('1', '10')
    this.getAssignBrand('1', '10')
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
        this.$toast.global.success('Saved successfully')
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
      let path: String = `/list_brand?page=${page}&limit=${limit}&companyId=${this.compantId}`

      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )

      if (res.successful) {
        const data = res.data
        this.modalDataList = data.brand.map(
          (item: {
            brandId: number
            brandCode: string
            brandNameTh: string
            brandNameEn: string
          }) => {
            return {
              brandId: item.brandId,
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
          (item: {
            brandId: number
            brandCode: any
            brandNameTh: any
            brandNameEn: any
          }) => {
            return {
              brandId: item.brandId,
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
      let path: String = `/list_brand_by_partner?page=${page}&limit=${limit}&partnerId=${
        this.editId
      }&assigned=${false}`
      if (this.keyword !== '') {
        path = path + `&keyword=${this.keyword}`
      }

      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}${path}`,
        { data: null }
      )

      if (res.successful) {
        this.modalDataList = res.data.brand.map(
          (item: {
            brandId: number
            brandCode: any
            brandNameTh: any
            brandNameEn: any
          }) => {
            return {
              brandId: item.brandId,
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
    this.error.partnerCode = !this.$v.partnerCode.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.partnerCode.mustBe
      ? this.$t('createBrand.error.characterAndNumber').toString()
      : !this.$v.partnerCode.minLength
      ? this.$t('createBrand.error.minLength').toString()
      : ''
  }

  @Watch('partnerName')
  checkPartnerName() {
    this.error.partnerName = !this.$v.partnerName.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.partnerName.mustBe
      ? this.$t('createBrand.error.characterAndNumber').toString()
      : ''
  }

  @Watch('status')
  checkStatus() {
    this.error.status = !this.$v.status.required
      ? this.$t('createBrand.error.require').toString()
      : ''
  }

  chengeKeyword(event: any) {
    this.getAssignBrand('1', '10')
  }

  cancleHandler() {
    this.$router.push(`/organizationManagement/${this.compantId}`)
  }

  dialogCancelAction() {
    this.dialogDisplay = false
  }

  clickDeleteList() {
    this.dialogDisplay = true
    this.dialogTitle = `Want to remove ${this.selectData.length} selected items from assigned partner code?`
  }

  async dialogAction() {
    const brandId = this.selectData.map((item: { brandId: any }) => {
      return item.brandId
    })
    const payload = {
      partnerId: this.editId,
      brandId
    }

    try {
      let res = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/unassign_partner_from_brand`,
        payload
      )
      if (res.successful) {
        await this.getBrandList('1', '10')
        await this.getAssignedBrand('1', '10')
        await this.getAssignBrand('1', '10')
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  clickAssignNew() {
    this.isShowBrand = true
  }

  setModalDefalut() {
    this.isShowBrand = false
    this.modalSelectData = []
    this.keyword = ''
  }

  clickCloseModel() {
    this.setModalDefalut()
  }

  async clickSubmitModel() {
    if (this.modalSelectData.length === 0) return

    const brandId = this.modalSelectData.map((item: { brandId: any }) => {
      return item.brandId
    })
    const payload = {
      partnerId: this.editId,
      brandId
    }

    try {
      let res = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/assign_partner_to_brand`,
        payload
      )
      if (res.successful) {
        await this.getBrandList('1', '10')
        await this.getAssignedBrand('1', '10')
        await this.getAssignBrand('1', '10')
        this.setModalDefalut()
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  clickSave() {
    if (this.$v.editGroup.$invalid) {
      this.$toast.global.error('Error')
      this.checkPartnerCode()
      this.checkPartnerName()
      this.checkStatus()
    } else {
      this.editPartnerCode()
    }
  }
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
      width: 157px;
    }

    .black-transparent {
      margin-right: 42px;
    }

    .btn-new-partner {
      width: 230px;
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
