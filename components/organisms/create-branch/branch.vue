<template>
  <div class="create-branch-container">
    <span class="header">Branch Information</span>
    <div class="input-section-2">
      <input-field
        v-model="$v.brandId.$model"
        title="Select Brand"
        required
        type="select"
        :options="brandList"
        :optionsReduce="(item) => item.brandId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.brandId"
      />
      <input-field
        v-model="$v.branchCode.$model"
        title="Branch Code"
        :maxlength="50"
        required
        :errorMessage="error.branchCode"
      />
      <input-field
        v-model="$v.branchNameTh.$model"
        title="Branch Name (TH)"
        :maxlength="50"
        required
        :errorMessage="error.branchNameTh"
      />
      <input-field
        v-model="$v.branchNameEn.$model"
        required
        title="Branch Name (EN)"
        :maxlength="50"
        :errorMessage="error.branchNameEn"
      />
      <input-field
        v-model="$v.siebelBranchCode.$model"
        title="Siebel Branch Code"
        required
        :errorMessage="error.siebelBranchCode"
      />
      <input-field
        v-model="$v.siebelBranchName.$model"
        title="Siebel Branch Name"
        required
        :errorMessage="error.siebelBranchName"
      />
      <input-field
        v-model="$v.email.$model"
        title="E-mail"
        :maxlength="100"
        required
        :errorMessage="error.email"
      />
      <phone-num-input
        v-model="$v.phoneNumber.$model"
        title="Phone No."
        required
        :errorMessage="error.phoneNumber"
        @prefix="onChangedPrefixNumber"
      />
      <input-field
        v-model="$v.partnerCodeId.$model"
        title="Partner Code"
        required
        type="select"
        :options="partnerCodeList"
        :optionsReduce="(item) => item.partnerCodeId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.partnerCodeId"
      />
    </div>

    <span class="header">Location</span>
    <div class="input-section-2">
      <input-field
        v-model="$v.branchTypeId.$model"
        title="Branch Type"
        required
        type="select"
        :options="branchTypeList"
        :optionsReduce="(item) => item.branchTypeId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.branchTypeId"
      />
      <input-field
        v-model="$v.mallId.$model"
        title="Mall"
        required
        type="select"
        :options="mallList"
        :optionsReduce="(item) => item.mallId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.mallId"
      />
    </div>
    <div class="input-section-3">
      <input-field
        v-model="$v.countryId.$model"
        title="Country"
        required
        type="select"
        :options="countryList"
        :optionsReduce="(item) => item.countryId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.countryId"
      />
      <input-field
        v-model="$v.provinceId.$model"
        title="Province"
        required
        type="select"
        :options="provinceList"
        :optionsReduce="(item) => item.provinceId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.provinceId"
      />
      <input-field
        v-model="$v.districtId.$model"
        title="District"
        required
        type="select"
        :options="districtList"
        :optionsReduce="(item) => item.districtId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.branchTypeId"
      />
      <input-field
        v-model="$v.subDistrictId.$model"
        title="Sub - district"
        required
        type="select"
        :options="subDistrictList"
        :optionsReduce="(item) => item.subDistrictId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.subDistrictId"
      />
      <input-field
        v-model="$v.postalCode.$model"
        title="Postal Code"
        :maxlength="50"
        required
        :errorMessage="error.postalCode"
      />
      <div></div>
      <input-field
        v-model="$v.latitude.$model"
        title="Latitude"
        :maxlength="50"
        required
        :errorMessage="error.latitude"
      />
      <input-field
        v-model="$v.longitude.$model"
        title="Longitude"
        :maxlength="50"
        required
        :errorMessage="error.longitude"
      />

      <button
        class="btn-map"
        :class="
          error.latitude ||
          error.longitude ||
          $v.latitude.$model === '' ||
          $v.longitude.$model === ''
            ? 'disable'
            : ''
        "
        @click="findInMap"
      >
        Find in map
      </button>
    </div>

    <google-map class="branch-map" :position="mapPosition" />

    <div class="submit-section">
      <button class="submit" @click="submit">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import GoogleMap from '~/components/atoms/GoogleMap.vue'
import { MapPosition } from '@/constants/types/GoogleMapTypes.js'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  numeric,
  decimal
} from 'vuelidate/lib/validators'

const validations = {
  brandId: {
    required
  },
  branchCode: {
    required
  },
  branchNameTh: {
    required,
    mustBe: (value: any) => /^([ก-๛0-9 ])*$/g.test(value),
    maxLength: maxLength(50)
  },
  branchNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value),
    maxLength: maxLength(50)
  },
  siebelBranchCode: {
    required
  },
  siebelBranchName: {
    required
  },
  email: {
    required,
    email,
    maxLength: maxLength(50)
  },
  phoneNumber: {
    required,
    numeric,
    minLength: minLength(9),
    maxLength: maxLength(13)
  },
  partnerCodeId: { required },
  branchTypeId: { required },
  mallId: { required },
  address: { required },
  countryId: { required },
  provinceId: { required },
  districtId: { required },
  subDistrictId: { required },
  postalCode: { required },
  latitude: { required, decimal },
  longitude: { required, decimal },

  validationGroup: [
    'brandId',
    'branchCode',
    'branchNameTh',
    'branchNameEn',
    'siebelBranchCode',
    'siebelBranchName',
    'email',
    'phoneNumber',
    'partnerCodeId',
    'branchTypeId',
    'mallId',
    'address',

    'countryId',
    'provinceId',
    'districtId',
    'subDistrictId',
    'postalCode',
    'latitude',
    'longitude'
  ]
}

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    InputField,
    PhoneNumInput,
    GoogleMap
  }
})
export default class CreateBranch extends Vue {
  $i18n: any

  brandId = ''
  branchCode = ''
  branchNameTh = ''
  branchNameEn = ''
  siebelBranchCode = ''
  siebelBranchName = ''
  email = ''
  companyPhonePrefix = '+66'
  phoneNumber = ''
  partnerCodeId = ''
  branchTypeId = ''
  mallId = ''
  address = ''
  countryId = ''
  provinceId = ''
  districtId = ''
  subDistrictId = ''
  postalCode = ''
  latitude = ''
  longitude = ''

  private error = {
    brandId: '',
    branchCode: '',
    branchNameTh: '',
    branchNameEn: '',
    siebelBranchCode: '',
    siebelBranchName: '',
    email: '',
    companyPhonePrefix: '',
    phoneNumber: '',
    partnerCodeId: '',
    branchTypeId: '',
    mallId: '',
    address: '',
    countryId: '',
    provinceId: '',
    districtId: '',
    subDistrictId: '',
    postalCode: '',
    latitude: '',
    longitude: ''
  }

  private brandList = []
  private partnerCodeList = []
  private branchTypeList = []
  private mallList = []
  private countryList = []
  private provinceList = []
  private districtList = []
  private subDistrictList = []

  get language(): any {
    return this.$i18n.locale
  }

  mapPosition: MapPosition = {
    lat: Number(13.7457381),
    lng: Number(100.5371002)
  }

  @Watch('brandId')
  checkBrandId(): void {
    this.error.brandId = !this.$v.brandId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('branchCode')
  checkBranchCode(): void {
    this.error.branchCode = !this.$v.branchCode.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('branchNameTh')
  checkBranchNameTh(): void {
    this.error.branchNameTh = !this.$v.branchNameTh.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.branchNameTh.mustBe
      ? this.$t('createCompany.thaiAndNumber').toString()
      : !this.$v.branchNameTh.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('branchNameEn')
  checkBranchNameEn(): void {
    this.error.branchNameEn = !this.$v.branchNameEn.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.branchNameEn.mustBe
      ? this.$t('createCompany.characterAndNumber').toString()
      : !this.$v.branchNameEn.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('siebelBranchCode')
  checkSiebelBranchCode(): void {
    this.error.siebelBranchCode = !this.$v.siebelBranchCode.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('siebelBranchName')
  checkSiebelBranchName(): void {
    this.error.siebelBranchName = !this.$v.siebelBranchName.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('email')
  checkEmail(): void {
    this.error.email = !this.$v.email.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.email.email
      ? this.$t('createCompany.characterAndNumber').toString()
      : !this.$v.email.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('phoneNumber')
  checkPhoneNumber(): void {
    this.error.phoneNumber = !this.$v.phoneNumber.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.phoneNumber.numeric
      ? this.$t('createCompany.number').toString()
      : !this.$v.phoneNumber.minLength
      ? this.$t('createCompany.minLength').toString()
      : !this.$v.phoneNumber.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('partnerCodeId')
  checkPartnerCodeId(): void {
    this.error.partnerCodeId = !this.$v.partnerCodeId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('branchTypeId')
  checkBranchTypeId(): void {
    this.error.branchTypeId = !this.$v.branchTypeId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('mallId')
  checkMallId(): void {
    this.error.mallId = !this.$v.mallId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('countryId')
  checkCountryId(): void {
    this.error.countryId = !this.$v.countryId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('provinceId')
  checkProvinceId(): void {
    this.error.provinceId = !this.$v.provinceId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('districtId')
  checkDistrictId(): void {
    this.error.districtId = !this.$v.districtId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('subDistrictId')
  checkSubDistrictId(): void {
    this.error.subDistrictId = !this.$v.subDistrictId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('postalCode')
  checkPostalCode(): void {
    this.error.postalCode = !this.$v.postalCode.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('latitude')
  checkLatitude(): void {
    this.error.latitude = !this.$v.latitude.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.latitude.decimal
      ? this.$t('decimal').toString()
      : ''
  }

  @Watch('longitude')
  checkLongitude(): void {
    this.error.longitude = !this.$v.longitude.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.longitude.decimal
      ? this.$t('decimal').toString()
      : ''
  }

  private onChangedPrefixNumber(value: string): void {
    this.companyPhonePrefix = value
  }

  private findInMap() {
    if (this.$v.latitude.$model && this.$v.longitude.$model) {
      console.log('findInMap')
      this.mapPosition.lat = Number(this.$v.latitude.$model)
      this.mapPosition.lng = Number(this.$v.longitude.$model)
    }
  }

  async getBrand(): Promise<any> {
    // try {
    //   let res = await this.$axios.$get(
    //     `${
    //       process.env.PORTAL_ENDPOINT
    //     }/brand?companyId=${window.sessionStorage.getItem(
    //       'createCompanyId'
    //     )}`,
    //     { data: null }
    //   )
    //   if (res.successful) {
    //     this.brandList = res.data.companySize
    //   }
    // } catch (error) {
    //   this.$toast.global.error(error.response.data.message)
    // }
  }

  async getPartnerCode(): Promise<any> {
    // try {
    //   let res = await this.$axios.$get(
    //     `${
    //       process.env.PORTAL_ENDPOINT
    //     }/partner_code?companyId=${window.sessionStorage.getItem(
    //       'createCompanyId'
    //     )}`,
    //     { data: null }
    //   )
    //   if (res.successful) {
    //     this.partnerCodeList = res.data.companyCategory
    //   }
    // } catch (error) {
    //   this.$toast.global.error(error.response.data.message)
    // }
  }

  async mounted(): Promise<void> {
    if (
      window.sessionStorage.getItem('branchFirstTime') &&
      window.sessionStorage.getItem('branchFirstTime') === 'no'
    ) {
      this.getBranch()
    }
    this.getBrand()
    this.getPartnerCode()
  }

  async getBranch(): Promise<void> {
    if (window.sessionStorage.getItem('createBranchId')) {
      try {
        // let res = await this.$axios.$get(
        //   `${
        //     process.env.PORTAL_ENDPOINT
        //   }/get_company?companyId=${window.sessionStorage.getItem(
        //     'createCompanyId'
        //   )}`,
        //   { data: null }
        // )
        // if (res.successful) {
        //   const data = res.data
        //   this.companyNameTh = data.companyNameTh
        //   this.companyNameEn = data.companyNameEn
        //   this.typeId = data.companyType.companyTypeId
        //   this.categoryId = data.companyCategory.companyCategoryId
        //   this.sizeId = data.companySize.companySizeId
        //   this.assignee = data.assignee
        //   this.email = data.companyEmail
        //   this.companyPhonePrefix = data.companyPhonePrefix
        //   this.phoneNumber = data.companyPhoneNumber
        // }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  async submit(): Promise<void> {
    if (this.$v.validationGroup.$invalid) {
      this.$toast.global.error(this.$t('createCompany.fieldError'))
      this.checkBrandId()
      this.checkBranchCode()
      this.checkBranchNameTh()
      this.checkBranchNameEn()
      this.checkSiebelBranchCode()
      this.checkSiebelBranchName()
      this.checkEmail()
      this.checkPhoneNumber()
      this.checkPartnerCodeId()
      this.checkBranchTypeId()
      this.checkMallId()
      this.checkCountryId()
      this.checkProvinceId()
      this.checkDistrictId()
      this.checkSubDistrictId()
      this.checkPostalCode()
      this.checkLatitude()
      this.checkLongitude()
    } else {
      const payload = {
        companyNameTh: this.$v.companyNameTh.$model,
        companyNameEn: this.$v.companyNameEn.$model,
        companyTypeId: this.$v.typeId.$model,
        companyCategoryId: this.$v.categoryId.$model,
        companySizeId: this.$v.sizeId.$model,
        assignee: this.$v.assignee.$model,
        companyEmail: this.$v.email.$model,
        companyPhonePrefix: this.companyPhonePrefix,
        companyPhoneNumber: this.$v.phoneNumber.$model
      }
      if (
        window.sessionStorage.getItem('companyFirstTime') &&
        window.sessionStorage.getItem('companyFirstTime') === 'no'
      ) {
        try {
          let response = await this.$axios.$post(
            `${process.env.PORTAL_ENDPOINT}/update_company`,
            {
              companyId: window.sessionStorage.getItem('createCompanyId'),
              ...payload
            }
          )
          if (response.successful) {
            this.$store.dispatch(
              'organizartion/setCompanyId',
              response.data.companyId
            )
            window.sessionStorage.setItem(
              'createCompanyId',
              response.data.companyId
            )
            this.$toast.global.success('Saved successfully')
            window.sessionStorage.setItem('createCompanyFirstTime', 'no')
          }
        } catch (error) {
          this.$toast.global.error(error.response.data.message)
        }
      } else {
        try {
          let response = await this.$axios.$post(
            `${process.env.PORTAL_ENDPOINT}/create_company`,
            payload
          )
          if (response.successful) {
            this.$store.dispatch(
              'organizartion/setCompanyId',
              response.data.companyId
            )
            window.sessionStorage.setItem(
              'createCompanyId',
              response.data.companyId
            )
            window.sessionStorage.setItem('companyFirstTime', 'no')
            this.$toast.global.success('Saved successfully')
            this.$router.push('/organizationManagement/create/partnercode')
          }
        } catch (error) {
          this.$toast.global.error(error.response.data.message)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-branch-container {
  padding-top: 60px;
  width: 100%;

  .header {
    font-size: 24px;
    font-weight: 700;
  }

  .input-section-2 {
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

  .input-section-3 {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-column-gap: 60px;
    grid-row-gap: 25px;
    padding: 30px 10% 30px 0px;

    .input-field {
      min-width: 260px;
    }

    .btn-map {
      cursor: pointer;
      justify-content: center;
      align-items: center;

      background: $mid-black;
      color: $white;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      width: 112px;
      height: 36px;
      margin-top: 35px;
      font-size: 14px;
      font-weight: bold;

      &.disable {
        cursor: initial;
        background: $gray-disable;

        &:focus {
          outline: none;
        }
      }
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

  .branch-map {
    width: 100%;
    height: 329px;
    margin-bottom: 30px;
  }
}
</style>
