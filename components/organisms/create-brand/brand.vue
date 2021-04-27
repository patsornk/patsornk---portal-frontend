<template>
  <v-app id="create-brand">
    <div class="create-company-container">
      <span class="header">{{ $t('createBrand.brandInformation') }}</span>
      <div>
        <input-field
          class="input-brand-code"
          :title="$t('createBrand.brandCode')"
          :required="true"
          v-model="$v.brandCode.$model"
          :errorMessage="error.brandCode"
        />
      </div>
      <div class="input-section">
        <input-field
          :title="$t('createBrand.brandNameTh')"
          :required="true"
          v-model="$v.brandNameTh.$model"
          :errorMessage="error.brandNameTh"
        />
        <input-field
          :title="$t('createBrand.brandNameEn')"
          :required="true"
          v-model="$v.brandNameEn.$model"
          :errorMessage="error.brandNameEn"
        />
        <input-field
          :title="$t('createBrand.email')"
          :required="true"
          v-model="$v.email.$model"
          :errorMessage="error.email"
        />
        <phone-num-input
          :title="$t('createBrand.phoneNo')"
          :required="true"
          v-model="$v.phoneNo.$model"
          @prefix="onChangedPrefixNumber"
          :errorMessage="error.phoneNo"
        />
      </div>
      <div class="brand-page">
        <div class="brand-head-box">
          <span class="brand-head">{{ $t('createBrand.brandPage') }}</span>
          <v-switch
            fluid
            class="toggle"
            inset
            :label="$t('createBrand.display')"
            v-model="$v.showDisplay.$model"
          ></v-switch>
        </div>
        <div class="brand-box">
          <div class="brand-upload-header">
            {{ $t('createBrand.brandLogo') }}
          </div>
          <upload-file
            id="logo"
            class="upload-file"
            v-model="$v.logo.$model"
            :errorMessage="error.logo"
            @viewFile="viewFile"
            @onBlur="onChangedLogo"
          >
            <!-- @onBlur="onChangedLogo" -->
          </upload-file>
        </div>
        <div class="brand-box">
          <div class="brand-upload-header">
            {{ $t('createBrand.brandBanner') }}
          </div>
          <upload-file
            id="banner"
            class="upload-file"
            v-model="$v.banner.$model"
          >
          </upload-file>
        </div>

        <div class="brand-box">
          <input-field
            type="textarea"
            :title="$t('createBrand.brandInfo')"
            :required="false"
            :maxlength="256"
            style="width: 100%"
            v-model="$v.brandInfo.$model"
          />
          <div class="info-description">
            {{ 256 - $v.brandInfo.$model.length }}
            {{ $t('createBrand.limitCharacters') }}
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
          :headerTitle="$t('createBrand.partnerCodeList')"
          v-model="$v.partnerCodeList.$model"
        />
      </div>
      <div class="submit-section">
        <button class="submit" @click="clickSave">Save</button>
      </div>
      <modal v-show="isShowImage" class="show-image">
        <template v-slot:header>
          <div class="show-image-header">
            <div>Example File</div>
            <div>
              <span class="material-icons close" @click="changeIsModal">
                close
              </span>
            </div>
          </div>
        </template>

        <template v-slot:body>
          <img class="show-image-view" v-if="imageUrl" :src="imageUrl" />
        </template>
      </modal>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  numeric
} from 'vuelidate/lib/validators'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import Modal from '@/components/atoms/Modal.vue'
import UploadFile from '@/components/molecules/UploadFile.vue'
import TableComponent from '~/components/molecules/table-component/TableComponent.vue'

const validations = {
  brandCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9])*$/g.test(value),
    maxLength: maxLength(50)
  },
  brandNameTh: {
    required,
    mustBe: (value: any) => /^([ก-๛0-9])*$/g.test(value),
    maxLength: maxLength(50)
  },
  brandNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9])*$/g.test(value),
    maxLength: maxLength(50)
  },
  email: {
    required,
    email,
    maxLength: maxLength(50)
  },
  phoneNo: {
    required,
    numeric,
    minLength: minLength(9),
    maxLength: maxLength(13)
  },
  showDisplay: {
    required
  },
  logo: {
    required
  },
  banner: {},
  brandInfo: {},
  partnerCodeList: {
    required
  },

  validationGroup: [
    'brandCode',
    'brandNameTh',
    'brandNameEn',
    'email',
    'phoneNo',
    'showDisplay',
    'logo'
  ]
}
@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    AgGridVue,
    InputField,
    PhoneNumInput,
    UploadFile,
    TableComponent,
    Modal
  }
})
export default class CreateBrand extends Vue {
  $i18n: any

  brandCode = ''
  brandNameTh = ''
  brandNameEn = ''
  email = ''
  phoneNo = ''
  phonePrefix = '+66'
  showDisplay = false
  logo = undefined
  banner = undefined
  brandInfo = ''
  partnerCodeList = []

  private error = {
    brandCode: '',
    brandNameTh: '',
    brandNameEn: '',
    email: '',
    phoneNo: '',
    logo: ''
  }

  state = {
    showDisplay: true
  }

  isShowImage = false
  imageUrl = ''

  private changeIsModal(): void {
    this.isShowImage = false
  }

  private onChangedPrefixNumber(value: string): void {
    this.phonePrefix = value
  }

  viewFile(imageUrl: string) {
    this.isShowImage = true
    this.imageUrl = imageUrl
  }

  async mounted(): Promise<void> {
    this.getListPartnerCode()
  }

  async getListPartnerCode(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${
          process.env.THE_1_PORTAL
        }/partner_code?companyId=${window.sessionStorage.getItem('companyId')}`,
        { data: null }
      )
      if (res.successful) {
        this.dataList = res.data.partner.map(
          (item: { partnerId: any; partnerCode: any; partnerName: any }) => {
            return {
              id: item.partnerId,
              siebelPartnerCode: item.partnerCode,
              siebelPartnerName: item.partnerName
            }
          }
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onChangedLogo(image: any) {
    if (image) {
      this.error.logo = ''
    } else {
      this.error.logo = this.$t('createBrand.error.require').toString()
    }
  }

  @Watch('brandCode')
  onChangedBrandCode(): void {
    this.error.brandCode = !this.$v.brandCode.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.brandCode.mustBe
      ? this.$t('createBrand.characterAndNumber').toString()
      : !this.$v.brandCode.maxLength
      ? this.$t('createBrand.maxLength').toString()
      : ''
  }

  @Watch('brandNameTh')
  onChangedBrandNameTh(): void {
    this.error.brandNameTh = !this.$v.brandNameTh.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.brandNameTh.mustBe
      ? this.$t('createBrand.thaiAndNumber').toString()
      : !this.$v.brandNameTh.maxLength
      ? this.$t('createBrand.maxLength').toString()
      : ''
  }

  @Watch('brandNameEn')
  onChangedBrandNameEn(): void {
    this.error.brandNameEn = !this.$v.brandNameEn.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.brandNameEn.mustBe
      ? this.$t('createBrand.characterAndNumber').toString()
      : !this.$v.brandNameEn.maxLength
      ? this.$t('createBrand.maxLength').toString()
      : ''
  }

  @Watch('email')
  onChangedEmail(): void {
    this.error.email = !this.$v.email.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.email.email
      ? 'email'
      : !this.$v.email.maxLength
      ? this.$t('createBrand.maxLength').toString()
      : ''
  }

  @Watch('phoneNo')
  onChangedPhoneNo(): void {
    this.error.phoneNo = !this.$v.phoneNo.required
      ? this.$t('createBrand.error.require').toString()
      : !this.$v.phoneNo.numeric
      ? 'numeric'
      : !this.$v.phoneNo.minLength
      ? 'minLength'
      : !this.$v.phoneNo.maxLength
      ? this.$t('createBrand.maxLength').toString()
      : ''
  }

  private dataList = []

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

  getBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(undefined)
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.onerror = (error) => {
          reject(error)
        }
      }
    })
  }

  async clickSave() {
    let validationGroup: boolean = false
    let partnerCodeList: boolean = false
    if (this.$v.validationGroup.$invalid) {
      validationGroup = false
      this.$toast.global.error(this.$t('createBrand.fieldError'))
      this.onChangedBrandCode()
      this.onChangedBrandNameTh()
      this.onChangedBrandNameEn()
      this.onChangedEmail()
      this.onChangedPhoneNo()
      this.onChangedLogo(this.$v.logo.$model)
    } else {
      validationGroup = true
    }
    if (!this.$v.partnerCodeList.required) {
      partnerCodeList = false
      this.$toast.global.error(this.$t('createBrand.partnerCode'))
    } else {
      partnerCodeList = true
    }
    if (validationGroup && partnerCodeList) {
      const partnerId = this.$v.partnerCodeList.$model.map(
        (item: { id: any }) => {
          return item.id
        }
      )

      const getLogoBase64 = await this.getBase64(this.$v.logo.$model)
      const getbannerBase64 = await this.getBase64(this.$v.banner.$model)

      const payload = {
        companyId: window.sessionStorage.getItem('companyId'),
        brandNameTh: this.$v.brandNameTh.$model,
        brandNameEn: this.$v.brandNameEn.$model,
        brandCode: this.$v.brandCode.$model,
        brandLogoImg: "getLogoBase64", // Wait for api
        brandBannerImg: "getbannerBase64", // Wait for api
        brandInfo: this.$v.brandInfo.$model,
        brandLink: this.$v.brandCode.$model,
        brandPhonePrefix: this.phonePrefix,
        brandPhoneNumber: this.$v.phoneNo.$model,
        brandEmail: this.$v.email.$model,
        showInApp: this.$v.showDisplay.$model,
        partnerId: partnerId
      }

      console.log(payload)

      try {
        let response = await this.$axios.$post(
          `${process.env.THE_1_PORTAL}/create_brand`,
          payload
        )
        if (response.successful) {
          this.$toast.global.success('Saved successfully')
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.create-company-container {
  padding-top: 60px;

  .show-image {
    .modal {
      width: 66%;
    }

    .show-image-header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .close {
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        color: $black;
      }
    }

    .show-image-view {
      width: 100%;
    }
  }

  .header {
    font-size: 24px;
    font-weight: 700;
  }

  .input-brand-code {
    width: 260px;
    margin-top: 30px;
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

      .error {
        background: none !important;
      }
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

.error {
  color: $primary;
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
.v-input--switch__track.theme--light.primary--text {
  color: $success !important;
}
.v-input--switch__thumb.theme--light.primary--text {
  color: $white !important;
}
</style>
