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
        :optionsLabel="language === 'th' ? 'brandNameTh' : 'brandNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        :disable="disableBrandId"
        :errorMessage="error.brandId"
      />
      <input-field
        v-model="$v.branchCode.$model"
        :title="$t('createBranch.branchInfo.branchCode')"
        :maxlength="25"
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
        :maxlength="50"
        required
        :errorMessage="error.siebelBranchCode"
      />
      <input-field
        v-model="$v.siebelBranchName.$model"
        :title="$t('createBranch.branchInfo.siebelBranchName')"
        :maxlength="50"
        required
        :errorMessage="error.siebelBranchName"
      />
      <input-field
        v-model="$v.email.$model"
        :title="$t('createBranch.branchInfo.email')"
        :maxlength="50"
        required
        :errorMessage="error.email"
      />
      <phone-num-input
        v-model="$v.phoneNumber.$model"
        :title="$t('createBranch.branchInfo.phoneNo')"
        :maxlength="13"
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
        :optionsReduce="(item) => item.id"
        optionsLabel="partnerCode"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.partnerCodeId"
        @onBlur="checkPartnerCode"
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
        :optionsLabel="language === 'th' ? 'branchTypeTh' : 'branchTypeEn'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.branchTypeId"
      />
      <input-field
        v-if="branchTypeId === 1"
        v-model="$v.mallId.$model"
        :title="$t('createBranch.location.mall')"
        required
        type="select"
        :options="mallList"
        :optionsReduce="(item) => item.mall.mallId"
        :optionsLabel="language === 'th' ? 'branchNameTh' : 'branchNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.mallId"
      />
    </div>

    <input-field
      type="textarea"
      :title="$t('createBranch.location.address')"
      required
      :maxlength="255"
      style="width: 100%"
      v-model="$v.address.$model"
      :errorMessage="error.address"
    />

    <div class="input-section-3">
      <input-field
        v-model="$v.countryId.$model"
        :title="$t('createBranch.location.country')"
        required
        type="select"
        :options="countryList"
        :optionsReduce="(item) => item.countryNameEn"
        :optionsLabel="language === 'th' ? 'countryNameTh' : 'countryNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.countryId"
      />
      <input-field
        v-model="$v.provinceId.$model"
        :title="$t('createBranch.location.province')"
        required
        type="select"
        :options="provinceList"
        :optionsReduce="(item) => item.provinceId"
        :optionsLabel="language === 'th' ? 'provinceNameTh' : 'provinceNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        @onChange="getDistrictList"
        :errorMessage="error.provinceId"
        :disable="provinceList.length === 0"
      />
      <input-field
        v-model="$v.districtId.$model"
        :title="$t('createBranch.location.district')"
        required
        type="select"
        :options="districtList"
        :optionsReduce="(item) => item.districtId"
        :optionsLabel="language === 'th' ? 'districtNameTh' : 'districtNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        @onChange="getSubDistrictList"
        :errorMessage="error.districtId"
        :disable="districtList.length === 0"
      />
      <input-field
        v-model="$v.subDistrictId.$model"
        :title="$t('createBranch.location.subDistrict')"
        required
        type="select"
        :options="subDistrictList"
        :optionsReduce="(item) => item.subDistrictId"
        :optionsLabel="
          language === 'th' ? 'subDistrictNameTh' : 'subDistrictNameEn'
        "
        :placeholder="$t('common.pleaseSelect')"
        @onChange="getPostalCode"
        :errorMessage="error.subDistrictId"
        :disable="subDistrictList.length === 0"
      />
      <input-field
        v-model="$v.postalCode.$model"
        :title="$t('createBranch.location.postalCode')"
        required
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.postalCode"
      />
      <div></div>
      <input-field
        v-model="$v.latitude.$model"
        :title="$t('createBranch.location.latitude')"
        :maxlength="13"
        :errorMessage="error.latitude"
      />
      <input-field
        v-model="$v.longitude.$model"
        :title="$t('createBranch.location.longitude')"
        :maxlength="14"
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

    <div v-if="branchTypeId === 3">
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
          @onBlur="checkLogo"
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
          @onBlur="checkCover"
          @removeUrl="onRemoveCover"
        >
        </upload-file>
      </div>

      <div>
        <input-field
          type="textarea"
          :title="$t('createBranch.mallPage.mallShortDescription')"
          :maxlength="255"
          style="width: 100%"
          v-model="$v.mallDescription.$model"
        />
        <div v-if="language === 'th'" class="mall-description">
          {{ $t('common.charaterLeftS') }}
          {{ 255 - $v.mallDescription.$model.length }}
          {{ $t('common.charaterLeftE') }}
        </div>
        <div v-else class="mall-description">
          {{ 255 - $v.mallDescription.$model.length }}
          {{ $t('common.charaterLeftS') }}
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
              <img class="icon-add" :src="assets('icon/add-red.png')" />
              <span class="text-add">{{
                $t('createBranch.mallInfo.addWebsite')
              }}</span>
            </div>
            <div class="icon-box">
              <img
                class="icon-edit"
                :src="assets('icon/edit.png')"
                @click="isViewWebsite = false"
                v-if="isViewWebsite && websiteList.length > 0"
              />
              <img
                class="icon-save"
                :src="assets('icon/save.png')"
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
              <img class="icon-add" :src="assets('icon/add-red.png')" />
              <span class="text-add">{{
                $t('createBranch.mallInfo.addSocialLink')
              }}</span>
            </div>
            <div class="icon-box">
              <img
                class="icon-edit"
                :src="assets('icon/edit.png')"
                @click="isViewSocial = false"
                v-if="isViewSocial && socialList.length > 0"
              />
              <img
                class="icon-save"
                :src="assets('icon/save.png')"
                @click="checkSocial"
                v-if="!isViewSocial && socialList.length > 0"
              />
            </div>
          </div>
          <div>
            <add-social-view
              v-if="isViewSocial"
              v-model="$v.socialList.$model"
            />
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
          :placeholder="$t('common.pleaseSelect')"
          :errorMessage="error.categoryId"
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
          :placeholder="$t('common.pleaseSelect')"
          :errorMessage="error.openingHourId"
        />
        <div class="open-daily-box" v-if="openingHourId === '1'">
          <input-field
            class="open-time"
            v-model="$v.openTime.$model"
            required
            type="select"
            :options="timeList"
            :optionsReduce="(item) => item.label"
            optionsLabel="label"
            :placeholder="$t('createBranch.openingHour')"
            :errorMessage="error.openTime"
            searchable
          />
          <input-field
            class="open-meridiem"
            v-model="$v.openMeridiem.$model"
            required
            type="select"
            :options="meridiemList"
            :optionsReduce="(item) => item.label"
            optionsLabel="label"
            :errorMessage="error.openMeridiem"
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
            :errorMessage="error.closeTime"
            searchable
          />
          <input-field
            class="open-meridiem"
            v-model="$v.closeMeridiem.$model"
            required
            type="select"
            :options="meridiemList"
            :optionsReduce="(item) => item.label"
            optionsLabel="label"
            :errorMessage="error.closeMeridiem"
          />
        </div>
        <div v-if="openingHourId === '2'">
          <open-hour-custom
            v-model="$v.openCusTomList.$model"
            @changeCusTomList="changeCusTomList"
          />
        </div>
      </div>
    </div>

    <div class="submit-section">
      <button class="submit" @click="clickSave">{{ $t('common.save') }}</button>
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
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
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
import { getAssetsPath } from '~/helper/images'
import { getImagePath } from '~/helper/images'
import { getDay } from '~/helper/date'
import {
  BrandInitialData,
  BranchTypeDataType,
  MallDataType,
  SiebelPartnerType,
  BranchDataType
} from '~/constants'
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
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  branchNameTh: {
    required,
    mustBe: (value: any) => /^([ก-๛0-9 ])*$/g.test(value)
  },
  branchNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  siebelBranchCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  siebelBranchName: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  email: {
    required,
    email
  },
  phoneNumber: {
    required,
    numeric,
    minLength: minLength(9)
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
  latitude: {
    mustBe: (value: any) => /^([\d]{1,3}(\.[\d]{1,10}))*$/g.test(value)
  },
  longitude: {
    mustBe: (value: any) => /^([\d]{1,3}(\.[\d]{1,10}))*$/g.test(value)
  },
  showDisplay: { required },
  logo: { required },
  cover: { required },
  mallDescription: {},
  websiteList: {},
  socialList: {},
  categoryId: { required },
  openingHourId: { required },
  openTime: { required },
  openMeridiem: { required },
  closeTime: { required },
  closeMeridiem: { required },
  openCusTomList: { required },

  validationBranchInfoGroup: [
    'brandId',
    'branchCode',
    'branchNameTh',
    'branchNameEn',
    'siebelBranchCode',
    'siebelBranchName',
    'email',
    'phoneNumber',
    'partnerCodeId'
  ],
  validationNotInMallGroup: [
    'branchTypeId',
    'address',
    'countryId',
    'provinceId',
    'districtId',
    'subDistrictId',
    'postalCode',
    'latitude',
    'longitude'
  ],
  validationInMallGroup: [
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
  ],
  validationMallGroup: [
    'branchTypeId',
    'address',
    'countryId',
    'provinceId',
    'districtId',
    'subDistrictId',
    'postalCode',
    'latitude',
    'longitude',
    'showDisplay',
    'mallDescription',
    'websiteList',
    'socialList',
    // 'categoryId',
    'openingHourId'
  ],
  validationMallOpenDailyGroup: [
    'branchTypeId',
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
    // 'categoryId',
    'openingHourId',
    'openTime',
    'openMeridiem',
    'closeTime',
    'closeMeridiem'
  ],
  validationMallOpenCustomizeGroup: [
    'branchTypeId',
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
    // 'categoryId',
    'openingHourId',
    'openCusTomList'
  ]
}

@Component({
  mixins: [validationMixin],
  validations,
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

  @Prop({
    type: String,
    required: false,
    default: ''
  })
  readonly parentCompantId!: string

  @Prop({
    type: String,
    required: false,
    default: 'onboard'
  })
  readonly componetMode!: string

  @Prop({
    type: Function,
    required: false
  })
  readonly setBranch?: Function

  brandId: any = ''
  branchCode = ''
  branchNameTh = ''
  branchNameEn = ''
  siebelBranchCode = ''
  siebelBranchName = ''
  email = ''
  phonePrefix = '+66'
  phoneNumber = ''
  partnerCodeId = ''
  branchTypeId: any = ''
  mallId: any = ''
  address = ''
  countryId = 'Thailand'
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
  websiteList = []
  socialList: { type: any; link: String }[] = []
  categoryId = ''
  openingHourId = ''
  openTime = ''
  openMeridiem = 'AM'
  closeTime = ''
  closeMeridiem = 'PM'
  OpenHourCustom = ''
  openCusTomList = [
    {
      dayOfWeek: 2,
      day: 'Monday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 3,
      day: 'Tuesday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 4,
      day: 'Wednesday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 5,
      day: 'Thursday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 6,
      day: 'Friday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 7,
      day: 'Saturday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    },
    {
      dayOfWeek: 1,
      day: 'Sunday',
      openTime: '',
      openMeridiem: 'AM',
      closeTime: '',
      closeMeridiem: 'PM',
      isDayOff: false,
      openError: '',
      openMeridiemError: '',
      closeError: '',
      closeMeridiemError: ''
    }
  ]

  private error = {
    brandId: '',
    branchCode: '',
    branchNameTh: '',
    branchNameEn: '',
    siebelBranchCode: '',
    siebelBranchName: '',
    email: '',
    phonePrefix: '',
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

  brandList: BrandInitialData[] = []
  partnerCodeList: SiebelPartnerType[] = []
  branchTypeList: BranchTypeDataType[] = []
  mallList: MallDataType[] = []
  countryList = [
    {
      countryNameEn: 'Thailand',
      countryNameTh: 'ไทย'
    }
  ]
  provinceList = []
  districtList = []
  subDistrictList: any = []

  categoryList = []
  openingHourList = [
    {
      id: '1',
      label: 'Open Daily'
    },
    {
      id: '2',
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

  disableBrandId = false

  isShowImage = false
  imageUrl = ''
  logoUrl? = ''
  coverUrl? = ''

  isViewWebsite = true
  isViewSocial = true

  isSetProvince = false
  isSetDistrict = false
  isSetSubDistrict = false
  isSetPostalCode = false

  get branchId() {
    return this.$route.params.id || ''
  }

  get language(): any {
    return this.$i18n.locale
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  mapPosition: MapPosition = {
    lat: parseInt(this.latitude) || 13.7457381,
    lng: parseInt(this.longitude) || 100.5371002
  }

  @Watch('language')
  switchOpeningHourList() {
    if (this.language === 'th') {
      this.openingHourList = [
        {
          id: '1',
          label: 'เปิดทุกวัน'
        },
        {
          id: '2',
          label: 'ปรับแต่งเอง'
        }
      ]
    } else {
      this.openingHourList = [
        {
          id: '1',
          label: 'Open Daily'
        },
        {
          id: '2',
          label: 'Customize'
        }
      ]
    }
  }

  @Watch('brandId')
  checkBrandId(): void {
    this.error.brandId = !this.$v.brandId.required
      ? this.$t('createBranch.selectBrand').toString()
      : ''
  }

  @Watch('branchCode')
  checkBranchCode(): void {
    this.error.branchCode = !this.$v.branchCode.required
      ? this.$t('createBranch.error.inputBranchCode').toString()
      : ''
  }

  @Watch('branchNameTh')
  checkBranchNameTh(): void {
    this.error.branchNameTh = !this.$v.branchNameTh.required
      ? this.$t('createBranch.error.inputBranchNameTh').toString()
      : !this.$v.branchNameTh.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('branchNameEn')
  checkBranchNameEn(): void {
    this.error.branchNameEn = !this.$v.branchNameEn.required
      ? this.$t('createBranch.error.inputBranchNameEn').toString()
      : !this.$v.branchNameEn.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('siebelBranchCode')
  checkSiebelBranchCode(): void {
    this.error.siebelBranchCode = !this.$v.siebelBranchCode.required
      ? this.$t('createBranch.error.inputSiebelBranchCode').toString()
      : !this.$v.branchNameEn.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('siebelBranchName')
  checkSiebelBranchName(): void {
    this.error.siebelBranchName = !this.$v.siebelBranchName.required
      ? this.$t('createBranch.error.inputSiebelBranchName').toString()
      : !this.$v.branchNameEn.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('email')
  checkEmail(): void {
    this.error.email = !this.$v.email.required
      ? this.$t('createCompany.emailInput').toString()
      : !this.$v.email.email
      ? this.$t('common.invalidEmailFormat').toString()
      : ''
  }

  @Watch('phoneNumber')
  checkPhoneNumber(): void {
    this.error.phoneNumber = !this.$v.phoneNumber.required
      ? this.$t('createCompany.phoneNoInput').toString()
      : !this.$v.phoneNumber.numeric
      ? this.$t('common.invalidPhoneFormat').toString()
      : !this.$v.phoneNumber.minLength
      ? this.$t('createBranch.error.minLength').toString()
      : ''
  }

  @Watch('partnerCodeId')
  checkPartnerCode(): void {
    this.error.partnerCodeId = !this.$v.partnerCodeId.required
      ? this.$t('createBranch.error.inputPartnerCode').toString()
      : ''
  }

  @Watch('branchTypeId')
  checkBranchTypeId(): void {
    this.error.branchTypeId = !this.$v.branchTypeId.required
      ? this.$t('createBranch.error.inputBranchType').toString()
      : ''
  }

  @Watch('mallId')
  checkMallId(): void {
    this.error.mallId = !this.$v.mallId.required
      ? this.$t('createBranch.error.inputMall').toString()
      : ''
  }

  @Watch('address')
  checkAddress(): void {
    this.error.address = !this.$v.address.required
      ? this.$t('createBranch.error.address').toString()
      : ''
  }

  checkCountryId(): void {
    this.error.countryId = !this.$v.countryId.required
      ? this.$t('createBranch.error.country').toString()
      : ''
  }

  checkProvinceId(): void {
    this.error.provinceId = !this.$v.provinceId.required
      ? this.$t('createBranch.error.province').toString()
      : ''
  }

  checkDistrictId(): void {
    this.error.districtId = !this.$v.districtId.required
      ? this.$t('createBranch.error.district').toString()
      : ''
  }

  checkSubDistrictId(): void {
    this.error.subDistrictId = !this.$v.subDistrictId.required
      ? this.$t('createBranch.error.subDistrict').toString()
      : ''
  }

  checkPostalCode(): void {
    this.error.postalCode = !this.$v.postalCode.required
      ? this.$t('createBranch.error.postalCode').toString()
      : ''
  }

  @Watch('latitude')
  checkLatitude(): void {
    this.error.latitude = !this.$v.latitude.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('longitude')
  checkLongitude(): void {
    this.error.longitude = !this.$v.longitude.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('categoryId')
  checkCategoryId(): void {
    this.error.categoryId = !this.$v.categoryId.required
      ? this.$t('createBranch.error.category').toString()
      : ''
  }

  @Watch('openingHourId')
  checkOpeningHourId(): void {
    this.error.openingHourId = !this.$v.openingHourId.required
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('openTime')
  checkOpenTime(): void {
    this.error.openTime = !this.$v.openTime.required
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('openMeridiem')
  checkOpenMeridiem(): void {
    this.error.openMeridiem = !this.$v.openMeridiem.required
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('closeTime')
  checkCloseTime(): void {
    this.error.closeTime = !this.$v.closeTime.required
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('closeMeridiem')
  checkCloseMeridiem(): void {
    this.error.closeMeridiem = !this.$v.closeMeridiem.required
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  changeCusTomList(item: any) {
    if (this.openCusTomList[item.index].isDayOff) {
      this.openCusTomList[item.index].openTime = ''
      this.openCusTomList[item.index].closeTime = ''
      this.openCusTomList[item.index].openMeridiem = 'AM'
      this.openCusTomList[item.index].closeMeridiem = 'PM'

      this.openCusTomList[item.index].openError = ''
      this.openCusTomList[item.index].openMeridiemError = ''
      this.openCusTomList[item.index].closeError = ''
      this.openCusTomList[item.index].closeMeridiemError = ''
    } else {
      if (
        item.time === 'open' &&
        this.openCusTomList[item.index].openTime === ''
      ) {
        this.openCusTomList[item.index].openError = this.$t(
          'common.pleaseSelect'
        ).toString()
      } else {
        this.openCusTomList[item.index].openError = ''
        this.openCusTomList[item.index].openMeridiemError = ''
      }
      if (
        item.time === 'close' &&
        this.openCusTomList[item.index].closeTime === ''
      ) {
        this.openCusTomList[item.index].closeError = this.$t(
          'common.pleaseSelect'
        ).toString()
      } else {
        this.openCusTomList[item.index].closeError = ''
        this.openCusTomList[item.index].closeMeridiemError = ''
      }
    }
  }

  checkTimeError(openType: string): void {
    if (openType === 'daily') {
      if (
        this.openTime === this.closeTime &&
        this.openMeridiem === this.closeMeridiem
      ) {
        this.error.openTime = this.$t('createBranch.error.timeError').toString()
        this.error.openMeridiem = this.$t(
          'createBranch.error.timeError'
        ).toString()
        this.error.closeTime = this.$t(
          'createBranch.error.timeError'
        ).toString()
        this.error.closeMeridiem = this.$t(
          'createBranch.error.timeError'
        ).toString()
      } else {
        this.error.openTime = ''
        this.error.openMeridiem = ''
        this.error.closeTime = ''
        this.error.closeMeridiem = ''
        this.checkOpenTime()
        this.checkCloseTime()
      }
    } else {
      this.openCusTomList.forEach((item) => {
        if (item.isDayOff) {
          item.openError = ''
          item.openMeridiemError = ''
          item.closeError = ''
          item.closeMeridiemError = ''
        } else {
          if (item.openTime === '') {
            item.openError = this.$t('common.pleaseSelect').toString()
          }
          if (item.closeTime === '') {
            item.closeError = this.$t('common.pleaseSelect').toString()
          }
          if (
            item.openTime === item.closeTime &&
            item.openMeridiem === item.closeMeridiem
          ) {
            item.openError = this.$t('createBranch.error.timeError').toString()
            item.openMeridiemError = this.$t(
              'createBranch.error.timeError'
            ).toString()
            item.closeError = this.$t('createBranch.error.timeError').toString()
            item.closeMeridiemError = this.$t(
              'createBranch.error.timeError'
            ).toString()
          }
        }
      })
    }
  }

  private changeIsModal(): void {
    this.isShowImage = false
  }

  viewFile(imageUrl: string) {
    this.isShowImage = true
    this.imageUrl = imageUrl
  }

  checkLogo(data: any) {
    if (data) {
      this.error.logo = ''
      if (data.imageUrl) {
        this.logoUrl = data.imageUrl

        if (data.file) {
          this.error.logo = ''
        } else {
          this.error.logo = this.$t(
            'createBrand.brandFeature.error.image'
          ).toString()
        }
      }
    } else {
      this.error.logo = this.$t(
        'createBrand.brandFeature.error.image'
      ).toString()
    }
  }

  checkCover(data: any) {
    if (data) {
      this.error.cover = ''
      if (data.imageUrl) {
        this.coverUrl = data.imageUrl

        if (data.file) {
          this.error.cover = ''
        } else {
          this.error.cover = this.$t(
            'createBrand.brandFeature.error.image'
          ).toString()
        }
      }
    } else {
      this.error.cover = this.$t(
        'createBrand.brandFeature.error.image'
      ).toString()
    }
  }

  onRemoveLogo() {
    this.logoUrl = undefined
  }

  onRemoveCover() {
    this.coverUrl = undefined
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

  private onChangedPrefixNumber(value: string): void {
    this.phonePrefix = value
  }

  private findInMap() {
    if (this.$v.latitude.$model && this.$v.longitude.$model) {
      this.mapPosition.lat = parseInt(this.$v.latitude.$model)
      this.mapPosition.lng = parseInt(this.$v.longitude.$model)
    }
  }

  addWebsite() {
    if (this.websiteList.length === 0) {
      this.websiteList = []
      this.isViewWebsite = false
    }
  }

  addSocial() {
    if (this.socialList.length === 0) {
      this.socialList = []
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
    const maxStepbar = parseInt(
      window.sessionStorage.getItem('maxStepbar') ?? '0'
    )
    if (this.componetMode == 'onboard' && maxStepbar && maxStepbar < 3) {
      return
    }
    const companyId = this.parentCompantId
      ? this.parentCompantId
      : window.sessionStorage.getItem('createCompanyId')
      ? window.sessionStorage.getItem('createCompanyId')
      : ''
    if (companyId) {
      try {
        let res = await this.$axios.$get(
          `${process.env.PORTAL_ENDPOINT}/list_brand?companyId=${companyId}`,
          { data: null }
        )
        if (res.successful) {
          if (this.componetMode == 'onboard') {
            this.brandList = res.data.brand
            this.brandId =
              parseInt(window.sessionStorage.getItem('createBrandId')) || ''
            this.disableBrandId = true
          } else {
            this.brandList = res.data.brand
            this.disableBrandId = false
          }
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  @Watch('brandId')
  async getPartnerCode(): Promise<any> {
    if (this.brandId) {
      try {
        let res = await this.$axios.$get(
          `${process.env.PORTAL_ENDPOINT}/partner_code?brandId=${this.brandId}`,
          { data: null }
        )
        if (res.successful) {
          this.partnerCodeList = res.data.partner.map((item: any) => {
            return {
              id: item.partnerId,
              partnerCode: item.partnerCode,
              partnerName: item.partnerName
            }
          })
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  async getBranchType(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_branch_type`,
        { data: null }
      )
      if (res.successful) {
        this.branchTypeList = res.data.branchType
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getMallList(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_mall`,
        { data: null }
      )
      if (res.successful) {
        this.mallList = res.data.mall

        const isMallInList =
          this.mallList.filter((item) => {
            item.mallId === this.mallId
          }).length > 0

        if (!isMallInList) {
          this.mallId = ''
        }
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getProvinceList(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_province`,
        { data: null }
      )
      if (res.successful) {
        this.provinceList = res.data.provinces
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getDistrictList(): Promise<any> {
    if (!this.provinceId) return
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_district?provinceId=${this.provinceId}`,
        { data: null }
      )
      if (res.successful) {
        this.districtList = res.data.districts
        if (!this.isSetDistrict) {
          this.isSetDistrict = true
        } else {
          this.subDistrictList = []
          this.districtId = ''
          this.subDistrictId = ''
          this.postalCode = ''
          this.error.provinceId = ''
          this.error.districtId = ''
          this.error.subDistrictId = ''
          this.error.postalCode = ''
        }
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getSubDistrictList(): Promise<any> {
    if (!this.districtId) return

    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_sub_district?districtId=${this.districtId}`,
        { data: null }
      )
      if (res.successful) {
        this.subDistrictList = res.data.subDistricts
        if (!this.isSetSubDistrict) {
          this.isSetSubDistrict = true
        } else {
          this.subDistrictId = ''
          this.postalCode = ''
          this.error.districtId = ''
          this.error.subDistrictId = ''
          this.error.postalCode = ''
        }
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  getPostalCode() {
    let data = []
    if (this.subDistrictList.length > 0) {
      data = this.subDistrictList.filter((item: any) => {
        return item.subDistrictId === this.subDistrictId
      })
    }
    if (data.length > 0) {
      this.postalCode = data[0].postalCode
    }
    this.error.subDistrictId = ''
    this.error.postalCode = ''
  }

  async mounted(): Promise<void> {
    this.switchOpeningHourList()
    await this.getBrand()
    await this.getPartnerCode()
    await this.getBranchType()
    await this.getMallList()
    await this.getProvinceList()
    if (
      window.sessionStorage.getItem('createBranchFirstTime') &&
      window.sessionStorage.getItem('createBranchFirstTime') === 'no'
    ) {
      this.getBranch()
    }
  }

  async getBranch(): Promise<void> {
    if (window.sessionStorage.getItem('createBranchId')) {
      try {
        let id = ''
        if (this.branchId) {
          id = this.branchId
        } else {
          id = window.sessionStorage.getItem('createBranchId') || ''
        }
        let res = await this.$axios.$get(
          `${process.env.PORTAL_ENDPOINT}/get_branch?branchId=${id}`,
          { data: null }
        )
        if (res.successful) {
          const data = res.data
          if (this.setBranch) {
            const branchData: BranchDataType = {
              branchId: data.branchNameEnId,
              branchNameEn: data.branchNameEn,
              branchNameTh: data.branchNameTh
            }
            this.setBranch(branchData)
          }
          this.brandId = data.brand.brandId
          this.branchCode = data.branchCode
          this.branchNameTh = data.branchNameTh
          this.branchNameEn = data.branchNameEn
          this.siebelBranchCode = data.siebelBranch.code
          this.siebelBranchName = data.siebelBranch.name
          this.email = data.branchEmail
          this.phonePrefix = data.branchPhonePrefix
          this.phoneNumber = data.branchPhoneNumber
          this.partnerCodeId = data.partners[0].partnerId
          this.branchTypeId = data.branchType.branchTypeId
          this.mallId = data.mall.mallId
          this.address = data.address.address
          this.countryId = data.address.country
          this.provinceId = data.address.province.provinceId
          this.districtId = data.address.district.districtId
          this.subDistrictId = data.address.subDistrict.subDistrictId
          this.postalCode = data.address.subDistrict.postalCode
          this.latitude = data.location.latitude
          this.longitude = data.location.longitude
          this.showDisplay = data.showInApp
          this.logoUrl = data.mall.mallLogoImg
            ? getImagePath(data.mall.mallLogoImg)
            : undefined
          this.coverUrl = data.mall.mallCoverPageImg
            ? getImagePath(data.mall.mallCoverPageImg)
            : undefined

          this.mallDescription = data.mall.mallShortDesc
            ? data.mall.mallShortDesc
            : ''
          this.websiteList = data.mall.mallInfo.websiteUrl
            ? data.mall.mallInfo.websiteUrl
            : []

          if (data.mall.mallInfo.facebook) {
            data.mall.mallInfo.facebook.forEach((link: string) => {
              if (link !== '')
                this.socialList.push({ type: 'Facebook', link: link })
            })
          }

          if (data.mall.mallInfo.instagram) {
            data.mall.mallInfo.instagram.forEach((link: string) => {
              if (link !== '')
                this.socialList.push({ type: 'Instagram', link: link })
            })
          }

          if (data.mall.mallInfo.line) {
            data.mall.mallInfo.line.forEach((link: string) => {
              if (link !== '')
                this.socialList.push({ type: 'Line', link: link })
            })
          }

          if (data.mall.mallInfo.twitter) {
            data.mall.mallInfo.twitter.forEach((link: string) => {
              if (link !== '')
                this.socialList.push({ type: 'Twitter', link: link })
            })
          }

          // this.categoryId  = data.mall.mallInfo.mallCategory.mallCategoryId
          if (data.mall.mallInfo.openingHour.length === 7) {
            this.openingHourId = '2'
            this.openCusTomList = this.mappingOpeningHour(
              data.mall.mallInfo.openingHour
            )
          } else if (data.mall.mallInfo.openingHour.length === 1) {
            this.openingHourId = '1'
            this.openTime = data.mall.mallInfo.openingHour[0].openingTime.split(
              '|'
            )[0]
            this.OpenHourCustom = data.mall.mallInfo.openingHour[0].openingTime.split(
              '|'
            )[1]
            this.closeTime = data.mall.mallInfo.openingHour[0].closingTime.split(
              '|'
            )[0]
            this.closeMeridiem = data.mall.mallInfo.openingHour[0].closingTime.split(
              '|'
            )[1]
          }

          this.mapPosition.lat = parseInt(this.latitude)
          this.mapPosition.lng = parseInt(this.longitude)
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  clickSave(): void {
    if (
      window.sessionStorage.getItem('createBranchFirstTime') &&
      window.sessionStorage.getItem('createBranchFirstTime') === 'no'
    ) {
      this.update()
    } else {
      this.save()
    }
  }

  get validateLogo() {
    return this.logoUrl ? true : false
  }

  get validateCover() {
    return this.coverUrl ? true : false
  }

  validateInfoAndLocation(): void {
    this.checkBrandId()
    this.checkBranchCode()
    this.checkBranchNameTh()
    this.checkBranchNameEn()
    this.checkSiebelBranchCode()
    this.checkSiebelBranchName()
    this.checkEmail()
    this.checkPhoneNumber()
    this.checkPartnerCode()
    this.checkBranchTypeId()
    this.checkAddress()
    this.checkCountryId()
    this.checkProvinceId()
    this.checkDistrictId()
    this.checkSubDistrictId()
    this.checkPostalCode()
    this.checkLatitude()
    this.checkLongitude()
  }

  validateMall(): void {
    // this.checkCategoryId()
    this.checkOpeningHourId()
  }

  validateOpenDaily(): void {
    this.checkOpenTime()
    this.checkCloseTime()
    this.checkTimeError('daily')
  }

  validateOpenCustomize(): void {
    this.checkTimeError('customize')
  }

  async setPayload() {
    switch (this.branchTypeId) {
      case 1:
        if (
          this.$v.validationBranchInfoGroup.$invalid ||
          this.$v.validationInMallGroup.$invalid
        ) {
          this.$toast.global.error(this.$t('createBranch.fieldError'))
          this.validateInfoAndLocation()
          this.checkBranchTypeId()
          this.checkMallId()
          return
        } else {
          return {
            brandId: this.$v.brandId.$model,
            branchCode: this.$v.branchCode.$model,
            branchNameEn: this.$v.branchNameEn.$model,
            branchNameTh: this.$v.branchNameTh.$model,
            partnerId: [this.$v.partnerCodeId.$model],
            siebelBranchCode: this.$v.siebelBranchCode.$model,
            siebelBranchName: this.$v.siebelBranchName.$model,
            branchTypeId: this.$v.branchTypeId.$model,
            address: this.$v.address.$model,
            subDistrictId: this.$v.subDistrictId.$model,
            districtId: this.$v.districtId.$model,
            provinceId: this.$v.provinceId.$model,
            postalCode: this.$v.postalCode.$model,
            country: this.$v.countryId.$model,
            latitude: this.$v.latitude.$model,
            longitude: this.$v.longitude.$model,
            branchPhonePrefix: this.phonePrefix,
            branchPhoneNumber: this.$v.phoneNumber.$model,
            branchEmail: this.$v.email.$model,
            showInApp: this.$v.showDisplay.$model,
            mallId: this.$v.mallId.$model
          }
          break
        }
      case 3:
        if (this.openingHourId === '1') {
          if (
            (this.$v.validationBranchInfoGroup.$invalid ||
              this.$v.validationMallOpenDailyGroup.$invalid) &&
            !this.validateLogo &&
            !this.validateCover
          ) {
            this.$toast.global.error(this.$t('createBranch.fieldError'))
            this.validateInfoAndLocation()
            this.validateMall()
            this.validateOpenDaily()

            return
          } else {
            this.checkWebsite()
            this.checkSocial()
            const getLogoBase64 = await this.getBase64(this.$v.logo.$model)
            const getCoverBase64 = await this.getBase64(this.$v.cover.$model)
            let mallFacebook: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Facebook') {
                mallFacebook.push(item.link)
              }
            })
            let mallInstagram: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Instagram') {
                mallInstagram.push(item.link)
              }
            })
            let mallLine: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Line') {
                mallLine.push(item.link)
              }
            })
            let mallTwitter: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Twitter') {
                mallTwitter.push(item.link)
              }
            })
            const openingHour = [
              {
                dayOfWeek: 0,
                openingTime: this.openTime + '|' + this.openMeridiem,
                closingTime: this.closeTime + '|' + this.closeMeridiem,
                dayOff: false,
                allDay: false
              }
            ]
            return {
              brandId: this.$v.brandId.$model,
              branchCode: this.$v.branchCode.$model,
              branchNameEn: this.$v.branchNameEn.$model,
              branchNameTh: this.$v.branchNameTh.$model,
              partnerId: [this.$v.partnerCodeId.$model],
              siebelBranchCode: this.$v.siebelBranchCode.$model,
              siebelBranchName: this.$v.siebelBranchName.$model,
              branchTypeId: this.$v.branchTypeId.$model,
              address: this.$v.address.$model,
              subDistrictId: this.$v.subDistrictId.$model,
              districtId: this.$v.districtId.$model,
              provinceId: this.$v.provinceId.$model,
              postalCode: this.$v.postalCode.$model,
              country: this.$v.countryId.$model,
              latitude: this.$v.latitude.$model,
              longitude: this.$v.longitude.$model,
              branchPhonePrefix: this.phonePrefix,
              branchPhoneNumber: this.$v.phoneNumber.$model,
              branchEmail: this.$v.email.$model,
              showInApp: this.$v.showDisplay.$model,

              mallLogoImg: getLogoBase64,
              mallCoverPageImg: getCoverBase64,
              mallShortDesc: this.$v.mallDescription.$model,
              mallWebsiteUrl: this.$v.websiteList.$model,
              mallFacebook,
              mallInstagram,
              mallLine,
              mallTwitter,
              openingHour,
              mallCategoryId: this.$v.categoryId.$model
                ? this.$v.categoryId.$model
                : null
            }
            break
          }
        } else if (this.openingHourId === '2') {
          if (
            (this.$v.validationBranchInfoGroup.$invalid ||
              this.$v.validationMallOpenCustomizeGroup.$invalid) &&
            !this.validateLogo &&
            !this.validateCover
          ) {
            this.$toast.global.error(this.$t('createBranch.fieldError'))
            this.validateInfoAndLocation()
            this.validateMall()
            this.validateOpenCustomize()

            return
          } else {
            this.checkWebsite()
            this.checkSocial()
            const getLogoBase64 = await this.getBase64(this.$v.logo.$model)
            const getCoverBase64 = await this.getBase64(this.$v.cover.$model)

            let mallFacebook: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Facebook') {
                mallFacebook.push(item.link)
              }
            })
            let mallInstagram: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Instagram') {
                mallInstagram.push(item.link)
              }
            })
            let mallLine: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Line') {
                mallLine.push(item.link)
              }
            })
            let mallTwitter: string[] = []
            this.$v.socialList.$model.forEach((item: any) => {
              if (item.type === 'Twitter') {
                mallTwitter.push(item.link)
              }
            })

            let openingHour: any = []
            this.$v.openCusTomList.$model.forEach((item: any) => {
              openingHour.push({
                dayOfWeek: item.dayOfWeek,
                openingTime: item.openTime + '|' + item.openMeridiem,
                closingTime: item.closeTime + '|' + item.closeMeridiem,
                dayOff: item.isDayOff,
                allDay: false
              })
            })

            return {
              brandId: this.$v.brandId.$model,
              branchCode: this.$v.branchCode.$model,
              branchNameEn: this.$v.branchNameEn.$model,
              branchNameTh: this.$v.branchNameTh.$model,
              partnerId: [this.$v.partnerCodeId.$model],
              siebelBranchCode: this.$v.siebelBranchCode.$model,
              siebelBranchName: this.$v.siebelBranchName.$model,
              branchTypeId: this.$v.branchTypeId.$model,
              address: this.$v.address.$model,
              subDistrictId: this.$v.subDistrictId.$model,
              districtId: this.$v.districtId.$model,
              provinceId: this.$v.provinceId.$model,
              postalCode: this.$v.postalCode.$model,
              country: this.$v.countryId.$model,
              latitude: this.$v.latitude.$model,
              longitude: this.$v.longitude.$model,
              branchPhonePrefix: this.phonePrefix,
              branchPhoneNumber: this.$v.phoneNumber.$model,
              branchEmail: this.$v.email.$model,
              showInApp: this.$v.showDisplay.$model,

              mallLogoImg: getLogoBase64,
              mallCoverPageImg: getCoverBase64,
              mallShortDesc: this.$v.mallDescription.$model,
              mallWebsiteUrl: this.$v.websiteList.$model,
              mallFacebook,
              mallInstagram,
              mallLine,
              mallTwitter,
              openingHour,
              mallCategoryId: this.$v.categoryId.$model
            }
            break
          }
        } else {
          if (
            (this.$v.validationBranchInfoGroup.$invalid ||
              this.$v.validationMallGroup.$invalid) &&
            !this.validateLogo &&
            !this.validateCover
          ) {
            this.$toast.global.error(this.$t('createBranch.fieldError'))
            this.validateInfoAndLocation()
            this.validateMall()
          }
          return
        }
      default:
        if (
          this.$v.validationBranchInfoGroup.$invalid ||
          this.$v.validationNotInMallGroup.$invalid
        ) {
          this.$toast.global.error(this.$t('createBranch.fieldError'))
          this.validateInfoAndLocation()
          this.checkBranchTypeId()

          return
        } else {
          return {
            brandId: this.$v.brandId.$model,
            branchCode: this.$v.branchCode.$model,
            branchNameEn: this.$v.branchNameEn.$model,
            branchNameTh: this.$v.branchNameTh.$model,
            partnerId: [this.$v.partnerCodeId.$model],
            siebelBranchCode: this.$v.siebelBranchCode.$model,
            siebelBranchName: this.$v.siebelBranchName.$model,
            branchTypeId: this.$v.branchTypeId.$model,
            address: this.$v.address.$model,
            subDistrictId: this.$v.subDistrictId.$model,
            districtId: this.$v.districtId.$model,
            provinceId: this.$v.provinceId.$model,
            postalCode: this.$v.postalCode.$model,
            country: this.$v.countryId.$model,
            latitude: this.$v.latitude.$model,
            longitude: this.$v.longitude.$model,
            branchPhonePrefix: this.phonePrefix,
            branchPhoneNumber: this.$v.phoneNumber.$model,
            branchEmail: this.$v.email.$model,
            showInApp: this.$v.showDisplay.$model
          }
        }
    }
  }

  async save(): Promise<void> {
    let payload = await this.setPayload()
    if (!payload) {
      return
    }

    try {
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/create_branch`,
        payload
      )
      if (response.successful) {
        this.$store.dispatch(
          'organizartion/setBranchId',
          response.data.branchId
        )
        window.sessionStorage.setItem('createBranchId', response.data.branchId)
        window.sessionStorage.setItem('createBranchFirstTime', 'no')
        this.$toast.global.success(this.$t('common.successfully').toString())
        this.$router.push('/organizationManagement/create/service')
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  getTime(value: string, index: number) {
    const time = value.split('|')
    return time[index] ? time[index] : ''
  }

  mappingOpeningHour(values: any[]) {
    return values.map((value: any) => {
      return {
        dayOfWeek: parseInt(value.dayOfWeek),
        day: getDay(value.dayOfWeek) || '',
        openTime: this.getTime(value.openingTime, 0),
        openMeridiem: this.getTime(value.openingTime, 1),
        closeTime: this.getTime(value.closingTime, 0),
        closeMeridiem: this.getTime(value.closingTime, 1),
        isDayOff: !!value.dayOff,
        openError: '',
        openMeridiemError: '',
        closeError: '',
        closeMeridiemError: ''
      }
    })
  }

  async update() {
    let payload = await this.setPayload()
    let branchId = ''

    if (this.branchId) {
      branchId = this.branchId
    } else {
      branchId = window.sessionStorage.getItem('createBranchId') || ''
    }

    if (payload) {
      Object.assign(payload, {
        branchId
      })
    } else {
      return
    }

    try {
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/update_branch`,
        payload
      )
      if (response.successful) {
        this.$toast.global.success(this.$t('common.successfully').toString())
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
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
    grid-template-columns: 45% 45%;
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
