<template>
  <div class="branch-container">
    <span class="header">{{ $t('createBranch.branchInformation') }}</span>
    <div class="input-section-2">
      <input-field
        v-model="$v.brandId.$model"
        :title="$t('createBranch.branchInfo.selectBrand')"
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
        :title="$t('createBranch.branchInfo.branchCode')"
        :maxlength="50"
        required
        :errorMessage="error.branchCode"
      />
      <input-field
        v-model="$v.branchNameTh.$model"
        :title="$t('createBranch.branchInfo.branchNameTh')"
        :maxlength="50"
        required
        :errorMessage="error.branchNameTh"
      />
      <input-field
        v-model="$v.branchNameEn.$model"
        required
        :title="$t('createBranch.branchInfo.branchNameEn')"
        :maxlength="50"
        :errorMessage="error.branchNameEn"
      />
      <input-field
        v-model="$v.siebelBranchCode.$model"
        :title="$t('createBranch.branchInfo.siebelBranchCode')"
        required
        :errorMessage="error.siebelBranchCode"
      />
      <input-field
        v-model="$v.siebelBranchName.$model"
        :title="$t('createBranch.branchInfo.siebelBranchName')"
        required
        :errorMessage="error.siebelBranchName"
      />
      <input-field
        v-model="$v.email.$model"
        :title="$t('createBranch.branchInfo.email')"
        :maxlength="100"
        required
        :errorMessage="error.email"
      />
      <phone-num-input
        v-model="$v.phoneNumber.$model"
        :title="$t('createBranch.branchInfo.phoneNo')"
        required
        :errorMessage="error.phoneNumber"
        @prefix="onChangedPrefixNumber"
      />
      <input-field
        v-model="$v.partnerCodeId.$model"
        :title="$t('createBranch.branchInfo.partnerCode')"
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

    <span class="header">{{ $t('createBranch.locationHeader') }}</span>
    <div class="input-section-2">
      <input-field
        v-model="$v.branchTypeId.$model"
        :title="$t('createBranch.location.branchType')"
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
        :title="$t('createBranch.location.mall')"
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

    <input-field
      type="textarea"
      :title="$t('createBranch.location.address')"
      required
      :maxlength="256"
      style="width: 100%"
      v-model="$v.address.$model"
    />

    <div class="input-section-3">
      <input-field
        v-model="$v.countryId.$model"
        :title="$t('createBranch.location.country')"
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
        :title="$t('createBranch.location.province')"
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
        :title="$t('createBranch.location.district')"
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
        :title="$t('createBranch.location.subDistrict')"
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
        :title="$t('createBranch.location.postalCode')"
        :maxlength="50"
        required
        :errorMessage="error.postalCode"
      />
      <div></div>
      <input-field
        v-model="$v.latitude.$model"
        :title="$t('createBranch.location.latitude')"
        :maxlength="50"
        :errorMessage="error.latitude"
      />
      <input-field
        v-model="$v.longitude.$model"
        :title="$t('createBranch.location.longitude')"
        :maxlength="50"
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
        {{ $t('createBranch.location.findInMap') }}
      </button>
    </div>

    <google-map class="branch-map" :position="mapPosition" />

    <div class="mall-head-box">
      <span class="header">{{ $t('createBranch.mallPageHeader') }}</span>
      <input-field
        type="switch"
        :title="$t('createBranch.mallPage.display')"
        v-model="$v.showDisplay.$model"
        :errorMessage="error.showDisplay"
      />
    </div>

    <div class="mall-upload-box">
      <div class="mall-upload-header">
        <div>
          {{ $t('createBranch.mallPage.mallLogo') }}
          <span class="required"> *</span>
        </div>
      </div>
      <upload-file
        id="mallLogo"
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

    <div class="mall-upload-box">
      <div class="mall-upload-header">
        <div>
          {{ $t('createBranch.mallPage.mallCover') }}
          <span class="required"> *</span>
        </div>
      </div>
      <upload-file
        id="mallCover"
        class="upload-file"
        :imageUrl="coverUrl"
        v-model="$v.cover.$model"
        :errorMessage="error.cover"
        @viewFile="viewFile"
        @onBlur="onChangedCover"
        @removeUrl="onRemoveCover"
      >
      </upload-file>
    </div>

    <div>
      <input-field
        type="textarea"
        :title="$t('createBranch.mallPage.mallShortDescription')"
        :maxlength="256"
        style="width: 100%"
        v-model="$v.mallDescription.$model"
      />
      <div class="mall-description">
        {{ 256 - $v.mallDescription.$model.length }}
        {{ $t('createBrand.limitCharacters') }}
      </div>
    </div>

    <div class="mall-info">
      <div class="mall-upload-header">
        {{ $t('createBranch.mallInfoHeader') }}
      </div>
      <div>{{ $t('createBranch.mallInfoDescription') }}</div>

      <div class="add-container">
        <div class="add-header">
          <div class="add-box" @click="addWebsite">
            <img class="icon-add" src="@/assets/images/icon/add-red.png" />
            <span class="text-add">{{
              $t('createBranch.mallInfo.addWebsite')
            }}</span>
          </div>
          <div class="icon-box">
            <img
              class="icon-edit"
              src="@/assets/images/icon/edit.png"
              @click="isViewWebsite = false"
              v-if="isViewWebsite && websiteList.length > 0"
            />
            <img
              class="icon-save"
              src="@/assets/images/icon/save.png"
              @click="checkWebsite"
              v-if="!isViewWebsite && websiteList.length > 0"
            />
          </div>
        </div>
        <div>
          <add-website-view
            v-if="isViewWebsite"
            v-model="$v.websiteList.$model"
          />
          <add-website v-else v-model="$v.websiteList.$model" />
        </div>
      </div>

      <div class="add-container">
        <div class="add-header">
          <div class="add-box" @click="addSocial">
            <img class="icon-add" src="@/assets/images/icon/add-red.png" />
            <span class="text-add">{{
              $t('createBranch.mallInfo.addSocialLink')
            }}</span>
          </div>
          <div class="icon-box">
            <img
              class="icon-edit"
              src="@/assets/images/icon/edit.png"
              @click="isViewSocial = false"
              v-if="isViewSocial && socialList.length > 0"
            />
            <img
              class="icon-save"
              src="@/assets/images/icon/save.png"
              @click="checkSocial"
              v-if="!isViewSocial && socialList.length > 0"
            />
          </div>
        </div>
        <div>
          <add-social-view v-if="isViewSocial" v-model="$v.socialList.$model" />
          <add-social v-else v-model="$v.socialList.$model" />
        </div>
      </div>
    </div>

    <div class="time-container">
      <input-field
        class="category"
        v-model="$v.categoryId.$model"
        :title="$t('createBranch.category')"
        required
        type="select"
        :options="categoryList"
        :optionsReduce="(item) => item.id"
        optionsLabel="label"
        placeholder="Please select..."
        :errorMessage="error.brandId"
      />
      <input-field
        class="opening-box"
        v-model="$v.openingHourId.$model"
        :title="$t('createBranch.openingHour')"
        required
        type="select"
        :options="openingHourList"
        :optionsReduce="(item) => item.id"
        optionsLabel="label"
        placeholder="Please select..."
        :errorMessage="error.brandId"
      />
      <div class="open-daily-box" v-if="openingHourId === 1">
        <input-field
          class="open-time"
          v-model="$v.openTime.$model"
          required
          type="select"
          :options="timeList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :placeholder="$t('createBranch.openingHour')"
          :errorMessage="error.brandId"
        />
        <input-field
          class="open-meridiem"
          v-model="$v.openMeridiem.$model"
          required
          type="select"
          :options="meridiemList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :errorMessage="error.brandId"
        />
        <span class="to">to</span>
        <input-field
          class="open-time"
          v-model="$v.closeTime.$model"
          required
          type="select"
          :options="timeList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :placeholder="$t('createBranch.closingHour')"
          :errorMessage="error.brandId"
        />
        <input-field
          class="open-meridiem"
          v-model="$v.closeMeridiem.$model"
          required
          type="select"
          :options="meridiemList"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :errorMessage="error.brandId"
        />
      </div>
      <div v-if="openingHourId === 2">
        <open-hour-custom v-model="$v.openCusTomList.$model" />
      </div>
    </div>

    <div class="submit-section">
      <button class="submit" @click="submit">Save</button>
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
import { Component, Vue, Watch } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import GoogleMap from '~/components/atoms/GoogleMap.vue'
import Modal from '@/components/atoms/Modal.vue'
import UploadFile from '@/components/molecules/UploadFile.vue'
import AddWebsite from '@/components/molecules/create-branch/AddWebsite.vue'
import AddWebsiteView from '@/components/molecules/create-branch/AddWebsiteView.vue'
import AddSocial from '@/components/molecules/create-branch/AddSocial.vue'
import AddSocialView from '@/components/molecules/create-branch/AddSocialView.vue'
import OpenHourCustom from '@/components/molecules/create-branch/OpenHourCustom.vue'
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
  latitude: { decimal },
  longitude: { decimal },
  showDisplay: { required },
  logo: { required },
  cover: { required },
  mallDescription: {},
  websiteList: {},
  socialList: {},
  categoryId: {},
  openingHourId: {},
  openTime: {},
  openMeridiem: {},
  closeTime: {},
  closeMeridiem: {},
  openCusTomList: {},

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
    'longitude',
    'showDisplay',
    'logo',
    'cover',
    'mallDescription',
    'websiteList',
    'socialList',
    'categoryId',
    'openingHourId',
    'openTime',
    'openMeridiem',
    'closeTime',
    'closeMeridiem',
    'openCusTomList'
  ]
}

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    InputField,
    PhoneNumInput,
    GoogleMap,
    UploadFile,
    Modal,
    AddWebsite,
    AddWebsiteView,
    AddSocial,
    AddSocialView,
    OpenHourCustom
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
  showDisplay = false
  logo = ''
  cover = ''
  mallDescription = ''
  websiteList = ['']
  socialList = [{ type: 0, link: '' }]
  categoryId = ''
  openingHourId = ''
  openTime = ''
  openMeridiem = 'AM'
  closeTime = ''
  closeMeridiem = 'PM'
  OpenHourCustom = ''
  openCusTomList = [
    {
      day: 'Monday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Tuesday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',                             
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Wednesday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Thursday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Friday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Saturday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
    {
      day: 'Sunday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      closeError: '',
    },
  ]

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
    longitude: '',
    showDisplay: '',
    logo: '',
    cover: '',
    mallDescription: '',
    categoryId: '',
    openingHourId: '',
    openTime: '',
    openMeridiem: '',
    closeTime: '',
    closeMeridiem: ''
  }

  brandList = []
  partnerCodeList = []
  branchTypeList = []
  mallList = []
  countryList = []
  provinceList = []
  districtList = []
  subDistrictList = []

  categoryList = []
  openingHourList = [
    {
      id: 1,
      label: 'Open Daily'
    },
    {
      id: 2,
      label: 'Customize'
    }
  ]

  timeList = [
    {
      label: '12 : 00'
    },
    {
      label: '12 : 30'
    },
    {
      label: '01 : 00'
    },
    {
      label: '01 : 30'
    },
    {
      label: '02 : 00'
    },
    {
      label: '02 : 30'
    },
    {
      label: '03 : 00'
    },
    {
      label: '03 : 30'
    },
    {
      label: '04 : 00'
    },
    {
      label: '04 : 30'
    },
    {
      label: '05 : 00'
    },
    {
      label: '05 : 30'
    },
    {
      label: '06 : 00'
    },
    {
      label: '06 : 30'
    },
    {
      label: '07 : 00'
    },
    {
      label: '07 : 30'
    },
    {
      label: '08 : 00'
    },
    {
      label: '08 : 30'
    },
    {
      label: '09 : 00'
    },
    {
      label: '09 : 30'
    },
    {
      label: '10 : 00'
    },
    {
      label: '10 : 30'
    },
    {
      label: '11 : 00'
    },
    {
      label: '11 : 30'
    }
  ]

  meridiemList = [
    {
      label: 'AM'
    },
    {
      label: 'PM'
    }
  ]

  isShowImage = false
  imageUrl = ''
  logoUrl? = ''
  coverUrl? = ''

  isViewWebsite = false
  isViewSocial = false

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
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('branchCode')
  checkBranchCode(): void {
    this.error.branchCode = !this.$v.branchCode.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('branchNameTh')
  checkBranchNameTh(): void {
    this.error.branchNameTh = !this.$v.branchNameTh.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.branchNameTh.mustBe
      ? this.$t('createBranch.error.thaiAndNumber').toString()
      : !this.$v.branchNameTh.maxLength
      ? this.$t('createBranch.error.maxLength').toString()
      : ''
  }

  @Watch('branchNameEn')
  checkBranchNameEn(): void {
    this.error.branchNameEn = !this.$v.branchNameEn.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.branchNameEn.mustBe
      ? this.$t('createBranch.error.characterAndNumber').toString()
      : !this.$v.branchNameEn.maxLength
      ? this.$t('createBranch.error.maxLength').toString()
      : ''
  }

  @Watch('siebelBranchCode')
  checkSiebelBranchCode(): void {
    this.error.siebelBranchCode = !this.$v.siebelBranchCode.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('siebelBranchName')
  checkSiebelBranchName(): void {
    this.error.siebelBranchName = !this.$v.siebelBranchName.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('email')
  checkEmail(): void {
    this.error.email = !this.$v.email.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.email.email
      ? this.$t('createBranch.error.characterAndNumber').toString()
      : !this.$v.email.maxLength
      ? this.$t('createBranch.error.maxLength').toString()
      : ''
  }

  @Watch('phoneNumber')
  checkPhoneNumber(): void {
    this.error.phoneNumber = !this.$v.phoneNumber.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.phoneNumber.numeric
      ? this.$t('createBranch.error.number').toString()
      : !this.$v.phoneNumber.minLength
      ? this.$t('createBranch.error.minLength').toString()
      : !this.$v.phoneNumber.maxLength
      ? this.$t('createBranch.error.maxLength').toString()
      : ''
  }

  @Watch('partnerCodeId')
  checkPartnerCodeId(): void {
    this.error.partnerCodeId = !this.$v.partnerCodeId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('branchTypeId')
  checkBranchTypeId(): void {
    this.error.branchTypeId = !this.$v.branchTypeId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('mallId')
  checkMallId(): void {
    this.error.mallId = !this.$v.mallId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('countryId')
  checkCountryId(): void {
    this.error.countryId = !this.$v.countryId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('provinceId')
  checkProvinceId(): void {
    this.error.provinceId = !this.$v.provinceId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('districtId')
  checkDistrictId(): void {
    this.error.districtId = !this.$v.districtId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('subDistrictId')
  checkSubDistrictId(): void {
    this.error.subDistrictId = !this.$v.subDistrictId.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('postalCode')
  checkPostalCode(): void {
    this.error.postalCode = !this.$v.postalCode.required
      ? this.$t('createBranch.error.require').toString()
      : ''
  }

  @Watch('latitude')
  checkLatitude(): void {
    this.error.latitude = !this.$v.latitude.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.latitude.decimal
      ? this.$t('decimal').toString()
      : ''
  }

  @Watch('longitude')
  checkLongitude(): void {
    this.error.longitude = !this.$v.longitude.required
      ? this.$t('createBranch.error.require').toString()
      : !this.$v.longitude.decimal
      ? this.$t('decimal').toString()
      : ''
  }

  private changeIsModal(): void {
    this.isShowImage = false
  }

  viewFile(imageUrl: string) {
    this.isShowImage = true
    this.imageUrl = imageUrl
  }

  onChangedLogo(data: any) {
    console.log('onChangedLogo', data)
    this.logoUrl = data.imageUrl
    if (data.file) {
      this.error.logo = ''
    } else {
      this.error.logo = this.$t('createBranch.error.require').toString()
    }
    console.log('logoUrl', this.logoUrl)
  }

  onChangedCover(data: any) {
    this.coverUrl = data.imageUrl
    if (data.file) {
      this.error.cover = ''
    } else {
      this.error.cover = this.$t('createBranch.error.require').toString()
    }
  }

  onRemoveLogo() {
    this.logoUrl = undefined
  }

  onRemoveCover() {
    this.coverUrl = undefined
  }

  private onChangedPrefixNumber(value: string): void {
    this.companyPhonePrefix = value
  }

  private findInMap() {
    if (this.$v.latitude.$model && this.$v.longitude.$model) {
      this.mapPosition.lat = Number(this.$v.latitude.$model)
      this.mapPosition.lng = Number(this.$v.longitude.$model)
    }
  }

  addWebsite() {
    if (this.websiteList.length === 0) {
      this.websiteList = ['']
      this.isViewWebsite = false
    }
  }

  addSocial() {
    if (this.socialList.length === 0) {
      this.socialList = [{ type: 0, link: '' }]
      this.isViewSocial = false
    }
  }

  checkWebsite() {
    this.websiteList = this.websiteList.filter((item) => item !== '')
    this.isViewWebsite = true
  }

  checkSocial() {
    this.socialList = this.socialList.filter(
      (item) => item.type !== 0 && item.link !== ''
    )
    this.isViewSocial = true
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
      this.$toast.global.error(this.$t('createBranch.fieldError'))
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

.branch-container {
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

  .branch-map {
    width: 100%;
    height: 329px;
    margin-bottom: 30px;
  }

  .mall-head-box {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $grey3;
    padding-top: 24px;
  }

  .mall-upload-box {
    padding: 8px 0px 36px 0px;

    .mall-upload-header {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .required {
      margin-left: 0.25rem;
      color: $primary;
      font-weight: 700;
    }

    .upload-file {
      height: 360px;
    }
  }

  .mall-description {
    font-size: 14px;
    text-align: right;
  }

  .mall-info {
    .mall-upload-header {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .add-container {
      border-bottom: 1px solid $grey3;
      padding-bottom: 24px;

      .add-header {
        display: flex;
        justify-content: space-between;
        margin-top: 36px;

        .add-box {
          cursor: pointer;
          display: flex;

          .icon-add {
            width: 20px;
            height: 20px;
            margin-right: 10px;
          }

          .text-add {
            font-size: 14px;
            font-weight: 700;
          }
        }

        .icon-box {
          display: flex;
          justify-content: space-between;

          .icon-edit {
            cursor: pointer;
            width: 16px;
            height: 16px;
          }

          .icon-save {
            cursor: pointer;
            width: 16px;
            height: 16px;
            margin-left: 34px;
          }
        }
      }
    }
  }

  .time-container {
    margin-top: 26px;

    .category {
      width: 420px;
    }

    .opening-box {
      width: 260px;
      margin-top: 26px;
    }

    .open-daily-box {
      display: flex;
      margin-top: 10px;

      .open-time {
        width: 175px;
      }

      .open-meridiem {
        width: 86px;
        margin-left: 13px;
      }

      .to {
        margin: 17px 28px;
      }
    }
  }

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

  .submit-section {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 35px 0px;

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
</style>
