<template>
  <div class="create-company-container">
    <span class="header">{{ $t('createBrand.brandInformation') }}</span>
    <div>
      <input-field
        class="input-brand-code"
        :title="$t('createBrand.brandCode')"
        :placeholder="$t('createBrand.brandCodeInput')"
        :required="true"
        :maxlength="25"
        v-model="$v.brandCode.$model"
        :errorMessage="error.brandCode"
        :disable="this.mode === 'edit'"
      />
    </div>
    <div class="input-section">
      <input-field
        :title="$t('createBrand.brandNameTh')"
        :placeholder="$t('createBrand.brandNameThInput')"
        :required="true"
        :maxlength="50"
        v-model="$v.brandNameTh.$model"
        :errorMessage="error.brandNameTh"
      />
      <input-field
        :title="$t('createBrand.brandNameEn')"
        :placeholder="$t('createBrand.brandNameEnInput')"
        :required="true"
        :maxlength="50"
        v-model="$v.brandNameEn.$model"
        :errorMessage="error.brandNameEn"
      />
      <input-field
        :title="$t('createBrand.email')"
        :placeholder="$t('createCompany.emailInput')"
        :required="true"
        :maxlength="50"
        v-model="$v.email.$model"
        :errorMessage="error.email"
      />
      <phone-num-input
        :title="$t('createBrand.phoneNo')"
        required
        v-model="$v.phoneNo.$model"
        @prefix="onChangedPrefixNumber"
        :errorMessage="error.phoneNo"
      />
    </div>
    <div class="brand-page">
      <div class="brand-head-box">
        <span class="brand-head">{{ $t('createBrand.brandPage') }}</span>

        <input-field
          type="switch"
          :title="$t('createBrand.display')"
          v-model="$v.showDisplay.$model"
          :errorMessage="error.showDisplay"
        />
      </div>
      <div class="brand-box">
        <div class="brand-upload-header">
          <div>
            {{ $t('createBrand.brandLogo') }} <span class="required"> *</span>
          </div>
        </div>
        <upload-file
          id="brandLogo"
          class="upload-file"
          :imageUrl="logoUrl"
          v-model="$v.logo.$model"
          :errorMessage="error.logo"
          @viewFile="viewFile"
          @onBlur="onChangedLogo"
          @removeUrl="onRemoveLogo"
        >
        </upload-file>
      </div>
      <div class="brand-box">
        <div class="brand-upload-header">
          <div>
            {{ $t('createBrand.brandBanner') }}
          </div>
        </div>
        <upload-file
          id="brandBanner"
          class="upload-file"
          :imageUrl="bannerurl"
          v-model="$v.banner.$model"
          @viewFile="viewFile"
          @onBlur="onChangedBanner"
          @removeUrl="onRemoveBanner"
        >
        </upload-file>
      </div>
      <div class="brand-box">
        <input-field
          type="textarea"
          :title="$t('createBrand.brandInfo')"
          :placeholder="$t('createBrand.inputBrandInfo')"
          :required="false"
          :maxlength="255"
          style="width: 100%"
          v-model="$v.brandInfo.$model"
        />
        <div v-if="language === 'th'" class="info-description">
          {{ $t('common.charaterLeftS') }}
          {{ 255 - $v.brandInfo.$model.length }}
          {{ $t('common.charaterLeftE') }}
        </div>
        <div v-else class="info-description">
          {{ 255 - $v.brandInfo.$model.length }}
          {{ $t('common.charaterLeftS') }}
        </div>
      </div>
      <div class="brand-feature-box">
        <span class="info-title">{{
          $t('createBrand.brandFeature.title')
        }}</span>
        <brand-feature-header
          class="feature-header"
          :activeIndex="currentBrandFeatureIndex"
          :range="brandFeatureList.length"
          @createBrandFeature="createBrandFeature"
          @selectBrandFeature="selectBrandFeature"
        />
        <brand-feature-body-rework
          :key="currentBrandFeatureKey"
          v-if="brandFeatureList.length"
          class="feature-body"
          :featureNo="currentBrandFeatureIndex"
          :initialData="brandFeatureList[currentBrandFeatureIndex - 1]"
          :canDelete="brandFeatureList.length > 1"
          :errorMessage="brandFeatureError"
          @viewFile="viewFile"
          @onBrandFeatureChange="onBrandFeatureChange"
          @deleteBrandFeature="deleteBrandFeature"
        />
      </div>
    </div>
    <div class="partner-code-list">
      <table-component
        :rawData="partnerCodeDataList"
        :columnDefs="columnDefs"
        :isShowIconHold="false"
        :isShowInactive="false"
        :isShowDelete="false"
        :isShowPaginate="false"
        isShowHeaderTable
        isShowCheckBox
        :headerTitle="$t('createBrand.partnerCodeList')"
        v-model="$v.partnerCodeList.$model"
        itemKey="id"
      />
    </div>
    <div class="submit-section">
      <button class="submit" @click="clickSave">{{$t('common.save')}}</button>
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
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import { validationMixin } from 'vuelidate'
import { SiebelPartnerType } from '@/constants/types/PartnerCodeType'
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
import BrandFeatureHeader from '~/components/molecules/brand-feature/BrandFeatureHeader.vue'
import BrandFeatureBody from '~/components/molecules/brand-feature/BrandFeatureBody.vue'
import BrandFeatureBodyRework from '~/components/molecules/brand-feature/BrandFeatureBodyRework.vue'
import { BreadcrumbType } from '~/constants'
import { getImagePath } from '~/helper/images'

const validations = {
  brandCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9])*$/g.test(value),
    maxLength: maxLength(50)
  },
  brandNameTh: {
    required,
    mustBe: (value: any) => /^([ก-๛0-9 ])*$/g.test(value),
    maxLength: maxLength(50)
  },
  brandNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value),
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
  ],
  validationGroupWithoutLogo: [
    'brandCode',
    'brandNameTh',
    'brandNameEn',
    'email',
    'phoneNo',
    'showDisplay'
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
    Modal,
    BrandFeatureHeader,
    BrandFeatureBody,
    BrandFeatureBodyRework
  }
})
export default class CreateBrand extends Vue {
  @Prop({
    type: String
  })
  mode!: string

  @Prop({
    type: String
  })
  companyId!: string

  @Prop({
    type: String
  })
  brandId!: string

  $i18n: any
  brandCode = ''
  brandName = {
    th: '',
    en: ''
  }
  brandNameTh = ''
  brandNameEn = ''
  email = ''
  phoneNo = ''
  phonePrefix = '+66'
  showDisplay = false
  logo = undefined
  banner = undefined
  brandInfo = ''
  partnerCodeList: SiebelPartnerType[] = []
  partnerCodeDataList: SiebelPartnerType[] = []

  brandFeatureError: any = ''
  currentBrandFeatureKey = 1
  currentBrandFeatureIndex = 1
  brandFeatureList: any = []

  logoUrl? = ''
  bannerurl? = ''

  oldLogourl = false
  oldBannerurl = false

  private error = {
    brandCode: '',
    brandNameTh: '',
    brandNameEn: '',
    email: '',
    phoneNo: '',
    logo: ''
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
    this.brandFeatureList = [
      {
        image: undefined,
        imageUrl: undefined,
        showDisplay: false,
        ctaLabel: '',
        ctaType: '',
        ctaFeature: '',
        isValid: true
      }
    ]

    if (!this.mode) {
      if (
        window.sessionStorage.getItem('createBrandFirstTime') &&
        window.sessionStorage.getItem('createBrandFirstTime') === 'no'
      ) {
        this.getBrand()
      }
      if (window.sessionStorage.getItem('createCompanyId')) {
        this.getListPartnerCode()
      }
    } else if (this.mode === 'create') {
      this.getListPartnerCode()
    } else if (this.mode === 'edit') {
      this.getBrand()
      this.getListPartnerCode()
    }
  }

  async getListPartnerCode(): Promise<void> {
    try {
      const companyId = this.companyId
        ? this.companyId
        : window.sessionStorage.getItem('createCompanyId')
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/partner_code?companyId=${companyId}`,
        { data: null }
      )
      if (res.successful) {
        this.partnerCodeDataList = res.data.partner.map(
          (item: { partnerId: any; partnerCode: any; partnerName: any }) => {
            return {
              id: item.partnerId,
              partnerCode: item.partnerCode,
              partnerName: item.partnerName
            }
          }
        )
      }
    } catch (error) {
      if (error.response.data.code !== '04') {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  get validateLogo() {
    return this.logoUrl ? true : false
  }

  onChangedLogo(data: any) {
    if (data) {
      this.error.logo = ''
      if (data.imageUrl) {
        this.logoUrl = data.imageUrl

        if (data.file) {
          this.error.logo = ''
        } else {
          this.error.logo = this.$t('createBrand.brandFeature.error.image').toString()
        }
      }
    } else {
      this.error.logo = this.$t('createBrand.brandFeature.error.image').toString()
    }
  }

  onChangedBanner(data: any) {
    this.bannerurl = data.imageUrl
  }

  @Watch('brandCode')
  onChangedBrandCode(): void {
    this.error.brandCode = !this.$v.brandCode.required
      ? this.$t('createBrand.brandCodeInput').toString()
      : !this.$v.brandCode.mustBe
      ? this.$t('createBrand.common.invalidInputInformation').toString()
      : !this.$v.brandCode.maxLength
      ? this.$t('createBrand.error.maxLength').toString()
      : ''
  }

  @Watch('brandNameTh')
  onChangedBrandNameTh(): void {
    this.error.brandNameTh = !this.$v.brandNameTh.required
      ? this.$t('createBrand.brandNameThInput').toString()
      : !this.$v.brandNameTh.mustBe
      ? this.$t('createBrand.common.invalidInputInformation').toString()
      : !this.$v.brandNameTh.maxLength
      ? this.$t('createBrand.error.maxLength').toString()
      : ''
  }

  @Watch('brandNameEn')
  onChangedBrandNameEn(): void {
    this.error.brandNameEn = !this.$v.brandNameEn.required
      ? this.$t('createBrand.brandNameEnInput').toString()
      : !this.$v.brandNameEn.mustBe
      ? this.$t('createBrand.common.invalidInputInformation').toString()
      : !this.$v.brandNameEn.maxLength
      ? this.$t('createBrand.error.maxLength').toString()
      : ''
  }

  @Watch('email')
  onChangedEmail(): void {
    this.error.email = !this.$v.email.required
      ? this.$t('createCompany.emailInput').toString()
      : !this.$v.email.email
      ? this.$t('createBrand.common.invalidEmailFormat').toString()
      : !this.$v.email.maxLength
      ? this.$t('createBrand.error.maxLength').toString()
      : ''
  }

  @Watch('phoneNo')
  onChangedPhoneNo(): void {
    this.error.phoneNo = !this.$v.phoneNo.required
      ? this.$t('createCompany.phoneNoInput').toString()
      : !this.$v.phoneNo.numeric
      ? this.$t('createBrand.common.invalidPhoneFormat').toString()
      : !this.$v.phoneNo.minLength
      ? this.$t('createBrand.error.minLength').toString()
      : !this.$v.phoneNo.maxLength
      ? this.$t('createBrand.error.maxLength').toString()
      : ''
  }

  private columnDefs = [
    {
      headerName: 'Siebel Partner code',
      field: 'partnerCode',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.partnerCode}
                </div>`
      }
    },
    {
      headerName: 'Siebel Partner Name',
      field: 'partnerName',
      cellRenderer: (params: any) => {
        return `<div class="custom-row">
                  ${params.data.partnerName}
                </div>`
      }
    }
  ]

  onRemoveLogo() {
    this.logoUrl = undefined
  }

  onRemoveBanner() {
    this.bannerurl = undefined
  }

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

  get language(): any {
    return this.$i18n.locale
  }

  async getBrand(): Promise<void> {
    this.currentBrandFeatureKey = 0
    this.brandFeatureList = []
    if (window.sessionStorage.getItem('createBrandId') || this.brandId) {
      try {
        const brandId = this.brandId
          ? this.brandId
          : window.sessionStorage.getItem('createBrandId')
        let res = await this.$axios.$get(
          `${process.env.PORTAL_ENDPOINT}/get_brand?brandId=${brandId}&brandAdditional=true&partners=true`,
          { data: null }
        )
        if (res.successful) {
          const data = res.data
          data.partners.forEach(
            (item: { partnerCode: any; partnerId: any; partnerName: any }) => {
              this.partnerCodeList.push({
                partnerCode: item.partnerCode,
                id: item.partnerId,
                partnerName: item.partnerName
              })
            }
          )
          if (data.brandAdditional) {
            if (this.mode === 'edit') {
              this.brandName.th = data.brandNameTh
              this.brandName.en = data.brandNameEn
            }
            const brandAddidtional = data.brandAdditional
            this.brandCode = data.brandCode
            this.brandNameTh = data.brandNameTh
            this.brandNameEn = data.brandNameEn
            this.email = data.brandEmail
            this.phoneNo = data.brandPhoneNumber
            this.phonePrefix = data.brandPhonePrefix
            this.showDisplay = data.showInApp
            this.logoUrl = brandAddidtional.additionalLogoImg
              ? getImagePath(brandAddidtional.additionalLogoImg)
              : undefined
            this.bannerurl = brandAddidtional.additionalBannerImg
              ? brandAddidtional.additionalBannerImg
              : undefined
            this.brandInfo = brandAddidtional.additionalInfo
              ? brandAddidtional.additionalInfo
              : ''
            this.oldLogourl = brandAddidtional.additionalLogoImg ? true : false
            this.oldBannerurl = brandAddidtional.additionalBannerImg
              ? true
              : false
            if (res.data.brandFeature.length) {
              this.brandFeatureList = res.data.brandFeature.map((brandFeature: any) => {
                return {
                  id: brandFeature.brandFeatureId,
                  image: undefined,
                  imageUrl: getImagePath(brandFeature.brandFeatureLogoImgLink),
                  showDisplay: brandFeature.showInApp,
                  ctaLabel: brandFeature.brandFeatureLabel,
                  ctaType: brandFeature.brandFeatureTypeId,
                  ctaFeature: brandFeature.brandFeatureValue,
                  isValid: true,
                }
              })
            }
          } else {
            this.brandCode = data.brandCode
            this.brandNameTh = data.brandNameTh
            this.brandNameEn = data.brandNameEn
            this.email = data.brandEmail
            this.phoneNo = data.brandPhoneNumber
            this.phonePrefix = data.brandPhonePrefix
            this.showDisplay = data.showInApp
            this.logo = undefined
            this.banner = undefined
            this.brandInfo = ''
          }
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
    this.currentBrandFeatureKey = 1
  }

  async clickSave() {
    if (!this.mode) {
      if (
        window.sessionStorage.getItem('createBrandFirstTime') &&
        window.sessionStorage.getItem('createBrandFirstTime') === 'no'
      ) {
        this.update()
      } else {
        this.save()
      }
    } else if (this.mode === 'create') {
      this.save()
    } else if (this.mode === 'edit') {
      this.update()
    }
  }

  async save() {
    const brandFeatureValidate = this.brandFeatureList.find(
      (brandFeature: any) => brandFeature.isValid == false
    )
      ? false
      : true

    let validationGroup: boolean = false
    let isPartnerCodeList: boolean = false
    if (this.$v.validationGroup.$invalid && !this.validateLogo) {
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
      if (!brandFeatureValidate) {
        this.$toast.global.error(this.$t('createBrand.fieldError'))
      }
    }

    if (!this.$v.partnerCodeList.required) {
      isPartnerCodeList = false
      this.$toast.global.error(this.$t('createBrand.partnerCode'))
    } else {
      isPartnerCodeList = true
    }

    if (validationGroup && isPartnerCodeList && brandFeatureValidate) {
      const partnerId = this.$v.partnerCodeList.$model.map(
        (item: { id: any }) => {
          return item.id
        }
      )
      const companyId = this.companyId
        ? this.companyId
        : window.sessionStorage.getItem('createCompanyId')

      const brandFeatureFormatedList: any[] = []
      for (const brandFeature of this.brandFeatureList) {
        brandFeatureFormatedList.push({
          brandFeatureLabel: brandFeature.ctaLabel,
          brandFeatureTypeId: brandFeature.ctaType,
          brandFeatureValue: brandFeature.ctaFeature,
          brandFeatureLogoImg: await this.getBase64(brandFeature.image),
          showInApp: brandFeature.showDisplay
        })
      }

      const getLogoBase64 = await this.getBase64(this.$v.logo.$model)
      const getbannerBase64 = await this.getBase64(this.$v.banner.$model)
      const payload = {
        companyId: companyId,
        brandNameTh: this.$v.brandNameTh.$model,
        brandNameEn: this.$v.brandNameEn.$model,
        brandCode: this.$v.brandCode.$model,
        brandLogoImg: getLogoBase64, // Wait for api
        brandBannerImg: getbannerBase64, // Wait for api
        brandInfo: this.$v.brandInfo.$model,
        brandLink: this.$v.brandCode.$model,
        brandPhonePrefix: this.phonePrefix,
        brandPhoneNumber: this.$v.phoneNo.$model,
        brandEmail: this.$v.email.$model,
        showInApp: this.$v.showDisplay.$model,
        partnerId: partnerId,
        feature: brandFeatureFormatedList
      }

      try {
        let response = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/create_brand`,
          payload
        )
        if (response.successful) {
          if (!this.mode) {
            window.sessionStorage.setItem('createBrandFirstTime', 'no')
            window.sessionStorage.setItem(
              'createBrandId',
              response.data.brandId
            )
            this.$toast.global.success(this.$t('common.successfully').toString())
            this.$router.push('/organizationManagement/create/branch')
          } else {
            this.$router.push(`/organizationManagement/${this.companyId}`)
            this.$toast.global.success('Created successfully')
          }
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  async update() {
    const brandFeatureValidate = this.brandFeatureList.find(
      (brandFeature: any) => brandFeature.isValid == false
    )
      ? false
      : true

    let validationGroup: boolean = false
    let isPartnerCodeList: boolean = false
    if (this.logoUrl) {
      if (this.$v.validationGroupWithoutLogo.$invalid) {
        validationGroup = false
        this.$toast.global.error(this.$t('createBrand.fieldError'))
        this.onChangedBrandCode()
        this.onChangedBrandNameTh()
        this.onChangedBrandNameEn()
        this.onChangedEmail()
        this.onChangedPhoneNo()
      } else {
        validationGroup = true
        if (!brandFeatureValidate) {
          this.$toast.global.error(this.$t('createBrand.fieldError'))
        }
      }
    } else {
      if (this.$v.validationGroup.$invalid && !this.validateLogo) {
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
        if (!brandFeatureValidate) {
          this.$toast.global.error(this.$t('createBrand.fieldError'))
        }
      }
    }
    if (!this.$v.partnerCodeList.required) {
      isPartnerCodeList = false
      this.$toast.global.error(this.$t('createBrand.partnerCode'))
    } else {
      isPartnerCodeList = true
    }

    if (validationGroup && isPartnerCodeList && brandFeatureValidate) {
      const partnerId = this.$v.partnerCodeList.$model.map(
        (item: { id: any }) => {
          return item.id
        }
      )
      const companyId = this.companyId
        ? Number(this.companyId)
        : window.sessionStorage.getItem('createCompanyId')
      const brandId = this.brandId
        ? Number(this.brandId)
        : window.sessionStorage.getItem('createBrandId')

      const brandFeatureFormatedList: any[] = []
      for (const brandFeature of this.brandFeatureList) {
        const imageUrl = await this.getBase64(brandFeature.image)
        brandFeatureFormatedList.push({
          brandFeatureId: brandFeature?.id,
          brandFeatureLogoImg: brandFeature.imageUrl ? imageUrl : '',
          brandFeatureLabel: brandFeature.ctaLabel,
          brandFeatureTypeId: brandFeature.ctaType,
          brandFeatureValue: brandFeature.ctaFeature,
          showInApp: brandFeature.showDisplay
        })
      }

      const getLogoBase64 = await this.getBase64(this.$v.logo.$model)
      const getbannerBase64 = await this.getBase64(this.$v.banner.$model)

      const payload = {
        companyId: companyId,
        brandId: brandId,
        brandNameTh: this.$v.brandNameTh.$model,
        brandNameEn: this.$v.brandNameEn.$model,
        brandCode: this.$v.brandCode.$model,
        brandLogoImg:
          this.oldLogourl && !this.logoUrl ? undefined : getLogoBase64, // Wait for api
        brandBannerImg:
          this.oldBannerurl && !this.bannerurl ? undefined : getbannerBase64, // Wait for api
        brandInfo: this.$v.brandInfo.$model,
        brandLink: this.$v.brandCode.$model,
        brandPhonePrefix: this.phonePrefix,
        brandPhoneNumber: this.$v.phoneNo.$model,
        brandEmail: this.$v.email.$model,
        showInApp: this.$v.showDisplay.$model,
        partnerId: partnerId,
        feature: brandFeatureFormatedList
      }
      try {
        let response = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/update_brand`,
          payload
        )
        if (response.successful) {
          if (!this.mode) {
            window.sessionStorage.setItem('createBrandFirstTime', 'no')
            window.sessionStorage.setItem(
              'createCompanyId',
              response.data.brandId
            )
            this.$toast.global.success(this.$t('common.successfully').toString())
          } else {
            this.$router.push(`/organizationManagement/${companyId}`)
            this.$toast.global.success(this.$t('common.successfully').toString())
          }
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  get createBrandFeatureValidate() {
    const currentIndex = this.currentBrandFeatureIndex - 1
    const validate =
      this.brandFeatureList[currentIndex].ctaLabel != '' ||
      this.brandFeatureList[currentIndex].ctaType != '' ||
      this.brandFeatureList[currentIndex].ctaFeature != '' ||
      (this.brandFeatureList[currentIndex].imageUrl != '' &&
        this.brandFeatureList[currentIndex].imageUrl != undefined)
    return validate
  }

  createBrandFeature() {
    if (this.createBrandFeatureValidate) {
      this.brandFeatureError = ''
      this.brandFeatureList.push({
        image: undefined,
        imageUrl: '',
        showDisplay: false,
        ctaLabel: '',
        ctaType: '',
        ctaFeature: '',
        isValid: true
      })
      this.currentBrandFeatureIndex += 1
    } else {
      this.brandFeatureError = this.$t(
        'createBrand.brandFeature.error.oneFieldRequired'
      )
      this.$toast.global.error(
        this.$t('createBrand.brandFeature.error.toastOneFieldRequired')
      )
    }
  }

  selectBrandFeature(index: number) {
    if (this.currentBrandFeatureIndex == index) {
      return false
    }

    if (this.createBrandFeatureValidate) {
      this.brandFeatureError = ''
      this.currentBrandFeatureIndex = index
    } else {
      this.brandFeatureError = this.$t(
        'createBrand.brandFeature.error.oneFieldRequired'
      )
      this.$toast.global.error(
        this.$t('createBrand.brandFeature.error.toastOneFieldRequired')
      )
    }
  }

  deleteBrandFeature(index: number) {
    if (this.currentBrandFeatureIndex === 1) {
      this.currentBrandFeatureIndex = 2
      setTimeout(() => {
        this.brandFeatureList.splice(index - 1, 1)
        this.currentBrandFeatureIndex = 1
      }, 100)
    } else {
      this.currentBrandFeatureIndex -= 1
      this.brandFeatureList.splice(index - 1, 1)
    }
  }

  onBrandFeatureChange(index: number, key: string, value: any) {
    if (value && key !== 'showDisplay' && key !== 'isValid') {
      this.brandFeatureError = ''
    }
    this.brandFeatureList[index][key] = value
  }

  @Watch('phoneNo')
  isBrandFeatureValid(): void {
    const brandFeature = this.brandFeatureList.find(
      (brandFeature: any) => brandFeature.isValid == false
    )
  }
}
</script>

<style lang="scss" scoped>
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
    border-top: 1px solid $grey3;
    padding: 30px 0px;

    .brand-head-box {
      display: flex;
      justify-content: space-between;

      .brand-head {
        font-size: 24px;
        font-weight: 700;
      }
    }

    .brand-box {
      padding: 8px 0px 36px 0px;

      .brand-upload-header {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .required {
        margin-left: 0.25rem;
        color: $primary;
        font-weight: 700;
      }

      .info-description {
        font-size: 14px;
        text-align: right;
      }
    }

    .brand-feature-box {
      padding: 40px 0px 36px 0px;
      border-top: 1px solid $grey3;
      .info-title {
        font-size: 16px;
        font-weight: 700;
      }

      .feature-header {
        margin-top: 15px;
      }
      .feature-body {
        margin-top: 47px;
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
    border-top: 1px solid $grey3;
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
</style>
