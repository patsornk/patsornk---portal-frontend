<template>
  <div class="create-company-container">
    <table-component
      :rawData="dataList"
      :columnDefs="columnDefs"
      isShowHeaderTable
      isShowCheckBox
      :headerTitle="$t('common.partnerCodeList')"
      v-model="selectData"
      :isShowIconHold="false"
      :isShowInactive="false"
      :frameworkComponents="frameworkComponents"
      @clickDelete="clickDeleteList"
      itemKey="partnerId"
    />

    <siebel-partner
      v-if="isShowEditForm"
      v-model="editSiebelPartner"
      action="edit"
      @clickAdd="clickEditNewSiebelPartner"
      @clickDelete="clickDeleteSiebelPartner(editSiebelPartner)"
    />
    <siebel-partner
      v-if="isShowNewForm"
      v-model="newSiebelPartner"
      action="add"
      :deleteAble="deleteAble"
      @clickAdd="clickAddNewSiebelPartner"
      @clickDelete="clearData"
      :partnerCodeError="partnerCodeError"
      @changePartnerCode="changePartnerCode"
    />

    <div class="add-container" @click="isShowNewForm = true">
      <span class="material-icons icon-add"> add </span>
      <span class="text-add"> {{$t('createPartnerCode.addSieabelPartner')}} </span>
    </div>

    <div class="submit-section">
      <button class="submit" @click="clickSave">{{$t('common.save')}}</button>
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

  companyId = window.sessionStorage.getItem('createCompanyId')

  deleteAble = false

  frameworkComponents = {
    agActionField: AgActionField
  }
  defaultSiebelPartner: SiebelPartnerType = {
    id: 0,
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

  isShowNewForm: boolean = true
  isShowEditForm: boolean = false
  selectData: SiebelPartnerType[] = []
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

  async mounted() {
    if (this.companyIdParent) {
      this.companyId = this.companyIdParent
      this.getPartnerList()
    } else if (
      this.$route.params.currentStep === 'partnercode' &&
      this.companyId
    ) {
      this.getPartnerList()
    }
  }

  async getPartnerList() {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/partner_code?companyId=${this.companyId}`,
        { data: null }
      )

      if (res.successful) {
        this.dataList = res.data.partner
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

  clickEditSiebelPartner(param: string) {
    if (this.isShowEditForm) return false
    this.isShowEditForm = true
    this.dataList.forEach((item) => {
      if (item.partnerCode === param) {
        this.editSiebelPartner = item
      }
    })
    this.deleteItem(this.editSiebelPartner)
  }

  deleteItem(item: SiebelPartnerType) {
    const index = this.dataList.indexOf(item)
    if (index > -1) {
      this.dataList.splice(index, 1)
    }
  }

  async clickEditNewSiebelPartner(event: any) {
    if (this.checkDuplicate(event)) {
      this.partnerCodeError = this.$t('createPartnerCode.duplicatePartnerCode').toString()
    } else {
      try {
        const payload = {
          partnerId: event.value.partnerId,
          partnerCode: event.value.partnerCode,
          partnerName: event.value.partnerName,
          companyId: this.companyId
        }

        let res = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/edit_partner_code`,
          payload
        )

        if (res.successful) {
          this.partnerCodeError = ''
          this.dataList.push({
            id: res.data.partnerId,
            partnerCode: res.data.partnerCode,
            partnerName: res.data.partnerName
          })
          this.clearData()
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
        if (error.response.data.code === '07') {
          this.partnerCodeError = this.$t('createPartnerCode.duplicatePartnerCode').toString()
        }
      }
    }
  }

  async clickAddNewSiebelPartner(data: any) {
    const event = data.value
    if (this.checkDuplicate(event)) {
      this.partnerCodeError = this.$t('createPartnerCode.duplicatePartnerCode').toString()
    } else {
      try {
        const payload = {
          partnerCode: this.newSiebelPartner.partnerCode,
          partnerName: this.newSiebelPartner.partnerName,
          companyId: this.companyId
        }

        let res = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/create_partner_code`,
          payload
        )

        if (res.successful) {
          this.partnerCodeError = ''
          this.dataList.push({
            id: res.data.partnerId,
            partnerCode: res.data.partnerCode,
            partnerName: res.data.partnerName
          })
          this.clearData()
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
        if (error.response.data.code === '07') {
          this.partnerCodeError = this.$t('createPartnerCode.duplicatePartnerCode').toString()
        }
      }
    }
    data?.callback()
  }

  checkDuplicate(event: SiebelPartnerType): boolean {
    return (
      this.dataList.filter(
        (item: SiebelPartnerType) => item.partnerCode === event.partnerCode
      ).length > 0
    )
  }

  changePartnerCode(event: SiebelPartnerType) {
    if (this.checkDuplicate(event)) {
      this.partnerCodeError = this.$t('createPartnerCode.duplicatePartnerCode').toString()
    } else {
      this.partnerCodeError = ''
    }
  }

  async clickDeleteSiebelPartner(data: any) {
    const partner = data.value
    try {
      const payload = {
        partnerCode: [partner.partnerCode]
      }

      let res = await this.$axios.$delete(
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

  clearData() {
    this.newSiebelPartner = JSON.parse(
      JSON.stringify(this.defaultSiebelPartner)
    )
    this.editSiebelPartner = JSON.parse(
      JSON.stringify(this.defaultSiebelPartner)
    )
    this.isShowNewForm = false
    this.isShowEditForm = false
  }

  clickDeleteList() {
    this.selectData.forEach((item) => {
      this.clickDeleteSiebelPartner(item)
    })
  }

  clickSave() {
    if (this.dataList.length === 0) {
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
