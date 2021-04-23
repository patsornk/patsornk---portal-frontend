<template>
  <div class="create-company-container">
    <table-component
      :rawData="dataList"
      :columnDefs="columnDefs"
      isShowHeaderTable
      isShowCheckBox
      headerTitle="Partner code list"
      v-model="selectData"
      :isShowIconHold="false"
      :isShowInactive="false"
      :frameworkComponents="frameworkComponents"
      @clickDelete="clickDeleteList"
    />

    <siebel-partner
      v-if="isShowNewForm"
      v-model="newSiebelPartner"
      action="add"
      @clickAdd="clickAddNewSiebelPartner"
      @clickDelete="clickDeleteSiebelPartner"
    />
    <siebel-partner
      v-if="isShowEditForm"
      v-model="editSiebelPartner"
      action="edit"
      @clickAdd="clickAddNewSiebelPartner"
      @clickDelete="clickDeleteSiebelPartner"
    />

    <div class="add-container" @click="isShowNewForm = true">
      <span class="material-icons icon-add"> add </span>
      <span class="text-add"> Add Siebel Partner</span>
    </div>

    <div class="submit-section">
      <button class="submit" @click="clickSave">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  frameworkComponents = {
    agActionField: AgActionField
  }
  defaultSiebelPartner: SiebelPartnerType = {
    siebelPartnerCode: '',
    siebelPartnerName: ''
  }
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
      field: 'siebelPartnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                    ${params.data.siebelPartnerCode}
                  </div>`
      }
    },
    {
      headerName: 'Company Registration Code',
      field: 'siebelPartnerName',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                    ${params.data.siebelPartnerName}
                  </div>`
      }
    },
    {
      headerName: '',
      field: 'siebelPartnerCode',
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

  clickEditSiebelPartner(param: string) {
    if (this.isShowEditForm) return false
    this.isShowEditForm = true
    this.dataList.forEach((item) => {
      if (item.siebelPartnerCode === param) {
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

  clickAddNewSiebelPartner(event: any) {
    this.dataList.push({ ...event })
    this.clearData()
  }

  clickDeleteSiebelPartner() {
    this.clearData()
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
    this.selectData.forEach((itemSelect) => {
      this.dataList.forEach((item) => {
        if (item.siebelPartnerCode === itemSelect.siebelPartnerCode) {
          this.deleteItem(item)
        }
      })
    })
  }

  clickSave() {}
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
