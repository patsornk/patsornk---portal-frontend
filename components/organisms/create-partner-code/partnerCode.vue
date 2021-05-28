<template>
  <div class="create-company-container">
    <table-component
      v-model="selectData"
      item-key="partnerId"
      is-show-header-table
      is-show-check-box
      :is-show-icon-hold="false"
      :is-show-inactive="false"
      :is-show-active="false"
      :raw-data="dataList"
      :column-defs="columnDefs"
      :header-title="$t('common.partnerCodeList')"
      :framework-components="frameworkComponents"
      @clickDelete="clickDeleteList"
    />

    <siebel-partner
      v-if="isShowEditForm"
      v-model="editSiebelPartner"
      :action="$t('common.edit')"
      @clickAdd="clickEditNewSiebelPartner"
      @clickDelete="clickCancelSiebelPartner"
    />
    <siebel-partner
      v-if="isShowNewForm"
      v-model="newSiebelPartner"
      :action="$t('common.add')"
      :delete-able="deleteAble"
      :partner-code-error="partnerCodeError"
      @clickAdd="clickAddNewSiebelPartner"
      @clickDelete="clearData"
      @changePartnerCode="changePartnerCode"
    />

    <div class="add-container" @click="clickAdd">
      <span class="material-icons icon-add"> add </span>
      <span class="text-add">
        {{ $t('createPartnerCode.addSieabelPartner') }}
      </span>
    </div>

    <div class="submit-section">
      <button class="submit" @click="clickSave">{{ $t('common.save') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import TableComponent from '@/components/molecules/table-component/TableComponent.vue'
import SiebelPartner from '@/components/molecules/create-partner/SiebelPartner.vue'
import AgActionField from '~/components/atoms/AgActionField.js'
import { SiebelPartnerType } from '~/constants/types/PartnerCodeType'

@Component({
  components: {
    InputField,
    TableComponent,
    SiebelPartner
  }
})
export default class CreatePartnerCode extends Vue {
  @Prop({
    type: String
  })
  companyIdParent!: string
  
  @Prop({
    required: false,
    type: String,
    default: "onboard"
  })
  private stepMode?: string

  companyId = window.sessionStorage.getItem('createCompanyId')

  deleteAble = false

  frameworkComponents = {
    agActionField: AgActionField
  }

  defaultSiebelPartner: SiebelPartnerType = {
    id: 0,
    partnerId: 0,
    partnerCode: '',
    partnerName: ''
  }

  partnerCodeError = ''
  newSiebelPartner: SiebelPartnerType = JSON.parse(
    JSON.stringify(this.defaultSiebelPartner)
  )

  editSiebelPartner: SiebelPartnerType = JSON.parse(
    JSON.stringify(this.defaultSiebelPartner)
  )

  isShowNewForm = true
  isShowEditForm = false
  selectData: SiebelPartnerType[] = []
  refList: SiebelPartnerType[] = []
  dataList: SiebelPartnerType[] = []
  columnDefs = [
    {
      headerName: 'Company Code',
      field: 'partnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                    ${params.data.partnerCode}
                  </div>`
      }
    },
    {
      headerName: 'Company Registration Code',
      field: 'partnerName',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                    ${params.data.partnerName}
                  </div>`
      }
    },
    {
      headerName: '',
      field: 'partnerCode',
      cellRenderer: 'agActionField',
      cellRendererParams: {
        rendererImage: 'rain.png',
        clicked: (param: any) => {
          this.clickEditSiebelPartner(param)
        }
      },
      minWidth: 150
    }
  ]

  mounted(): void {
    if (window.sessionStorage.getItem('maxStepbar') && window.sessionStorage.getItem('maxStepbar') == '4') {
      this.$store.dispatch('stepbar/setEnableSubmit', 1)
    }
    if (this.companyIdParent) {
      this.companyId = this.companyIdParent
      // TO DO
      // this.getPartnerList()
    } else if (
      this.$route.params.currentStep === 'partnercode' &&
      this.companyId
    ) {
      this.getPartnerList()
    }
  }

  async getPartnerList(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/partner_code?companyId=${this.companyId}`,
        { data: null }
      )

      if (res.successful) {
        this.dataList = res.data.partner
        this.refList = [...res.data.partner]
        if (this.dataList.length > 0) {
          this.deleteAble = true
          this.isShowNewForm = false
          this.isShowEditForm = false
        }
      }
    } catch (error) {
      if (error.response.data.code !== '04') {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  clickEditSiebelPartner(param: string): boolean | void {
    if (this.isShowNewForm) {
      this.$toast.global.error(
        'Please finish current action before click another.'
      )
      return
    }
    this.isShowEditForm = true
    this.dataList.forEach((item: any) => {
      if (item.partnerCode === param) {
        this.editSiebelPartner = item
      }
    })
    this.dataList = [...this.refList]
    this.deleteItem(this.editSiebelPartner)
  }

  clickAdd(): void | boolean {
    if (this.isShowEditForm) {
      this.$toast.global.error(
        'Please finish current action before click another.'
      )
      return
    }
    this.isShowNewForm = true
  }

  deleteItem(item: SiebelPartnerType): void {
    const index = this.dataList.indexOf(item)
    this.refList = [...this.dataList]
    if (index > -1) {
      this.dataList.splice(index, 1)
    }
  }

  async clickEditNewSiebelPartner(event: any): Promise<void> {
    const data = event.value
    if (this.checkDuplicate(data)) {
      this.partnerCodeError = this.$t(
        'createPartnerCode.duplicatePartnerCode'
      ).toString()
    } else {
      try {
        const payload = {
          partnerId: data.partnerId,
          partnerCode: data.partnerCode,
          partnerName: data.partnerName,
          companyId: this.companyId
        }

        const res = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/edit_partner_code`,
          payload
        )

        if (res.successful) {
          this.partnerCodeError = ''
          this.dataList.push({
            id: res.data.partnerId,
            partnerId: res.data.partnerId,
            partnerCode: res.data.partnerCode,
            partnerName: res.data.partnerName
          })
          this.dataList.sort((a, b) => {
            return a.partnerId - b.partnerId
          })
          this.clearData()
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
        if (error.response.data.code === '07') {
          this.partnerCodeError = this.$t(
            'createPartnerCode.duplicatePartnerCode'
          ).toString()
        }
      }
    }
  }

  async clickAddNewSiebelPartner(event: any): Promise<void> {
    const data = event.value
    if (this.checkDuplicate(data)) {
      this.partnerCodeError = this.$t(
        'createPartnerCode.duplicatePartnerCode'
      ).toString()
    } else {
      try {
        const payload = {
          partnerCode: data.partnerCode,
          partnerName: data.partnerName,
          companyId: this.companyId
        }

        const res = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/create_partner_code`,
          payload
        )

        if (res.successful) {
          this.partnerCodeError = ''
          this.dataList.push({
            id: res.data.partnerId,
            partnerId: res.data.partnerId,
            partnerCode: res.data.partnerCode,
            partnerName: res.data.partnerName
          })
          this.dataList.sort((a, b) => {
            return a.partnerId - b.partnerId
          })
          this.refList = [...this.dataList]
          this.clearData()
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
        if (error.response.data.code === '07') {
          this.partnerCodeError = this.$t(
            'createPartnerCode.duplicatePartnerCode'
          ).toString()
        }
      }
    }
    event?.callback()
  }

  checkDuplicate(event: SiebelPartnerType): boolean {
    return (
      this.dataList.filter(
        (item: SiebelPartnerType) => item.partnerCode === event.partnerCode
      ).length > 0
    )
  }

  changePartnerCode(event: SiebelPartnerType): void {
    if (this.checkDuplicate(event)) {
      this.partnerCodeError = this.$t(
        'createPartnerCode.duplicatePartnerCode'
      ).toString()
    } else {
      this.partnerCodeError = ''
    }
  }

  clickCancelSiebelPartner(): void {
    this.dataList = this.refList
    this.clearData()
  }

  async clickDeleteSiebelPartner(data: any) {
    const partner = data
    try {
      const payload = {
        partnerId: [partner.partnerId]
      }
      const res = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/delete_partner_code`,
        { data: payload }
      )

      if (res.successful) {
        this.getPartnerList()
        this.clearData()
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
    data?.callback()
  }

  clearData(): void {
    this.newSiebelPartner = JSON.parse(
      JSON.stringify(this.defaultSiebelPartner)
    )
    this.editSiebelPartner = JSON.parse(
      JSON.stringify(this.defaultSiebelPartner)
    )
    this.isShowNewForm = false
    this.isShowEditForm = false
  }

  clickDeleteList(): void {
    this.selectData.forEach((item) => {
      this.clickDeleteSiebelPartner(item)
    })
  }

  clickSave(): void {
    if (this.dataList.length === 0) {
      this.$store.dispatch('stepbar/setEnableSubmit', 0)
      this.$toast.global.error(
        'One or more field have an error. Please check and try again.'
      )
      return
    }
    if (this.companyIdParent) {
      this.$router.push(`/organizationManagement/${this.companyIdParent}`)
    } else {
      this.$router.push('/organizationManagement/create/brand')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.create-company-container {
  padding-top: 60px;

  .header {
    font-size: 24px;
    font-weight: 700;
  }

  .add-container {
    cursor: pointer;
    display: flex;
    margin-top: 32px;

    .icon-add {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: $primary;
      color: $white;
      font-size: 20px;
      margin-right: 17px;
    }

    .text-add {
      font-size: 14px;
      font-weight: 700;
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
.btn-edit {
  margin-top: 10px;
  width: 15px;
  height: 15px;
}
</style>
