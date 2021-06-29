<template>
  <div>
    <div class="user-profile-header-container">
      <div class="header-text">
        {{ $t('userManagement.userProfile.userProfile') }}
      </div>
      <div class="header-status" v-if="mode === 'create'">
        <img
          class="icon-container icon"
          :src="assets('table/active-disable.png')"
        />
        <img
          class="icon-container icon"
          :src="assets('table/hold-disable.png')"
        />
        <img
          class="icon-container icon"
          :src="assets('table/inactive-disable.png')"
        />
        <img
          class="icon-container icon"
          :src="assets('table/delete-disable.png')"
        />
      </div>
      <div class="header-status" v-else>
        <div class="icon-container pointer">
          <img
            class="icon"
            :src="assets('table/active.png')"
            @click="clickAction('active')"
          />
          <span class="tooltiptext">{{ $t('common.active') }}</span>
        </div>
        <div class="icon-container pointer">
          <img
            class="icon"
            :src="assets('table/hold.png')"
            @click="clickAction('on hold')"
          />
          <span class="tooltiptext">{{ $t('common.onHold') }}</span>
        </div>
        <div class="icon-container pointer">
          <img
            class="icon"
            :src="assets('table/inactive.png')"
            @click="clickAction('inactive')"
          />
          <span class="tooltiptext">{{ $t('common.inActive') }}</span>
        </div>
        <div class="icon-container pointer">
          <img
            class="icon"
            :src="assets('table/delete.png')"
            @click="clickAction('delete')"
          />
          <span class="tooltiptext">{{ $t('common.delete') }}</span>
        </div>
      </div>
    </div>
    <div class="user-status-container">
      <company-status class="user-status" :status="status" />
    </div>
    <div class="user-profile-container">
      <div class="profile-image-container">
        <profile-picture @onChange="onChangeProfileImage" v-model="imageUrl" />
        <div class="account-detail-container">
          <div class="username" v-if="mode === 'edit'">{{ username }}</div>
          <span class="text-status"
            >{{ $t('userManagement.userProfile.accountStatus') }} :
          </span>
          <span class="status" :class="statusClass">{{ dataStatus }}</span>
        </div>
      </div>
      <div class="profile-detail-container">
        <div class="input-box">
          <input-field
            v-model="$v.username.$model"
            class="input-field left"
            required
            :maxlength="50"
            :disable="mode === 'edit'"
            :title="$t('userManagement.userProfile.username')"
            :placeholder="
              $t('userManagement.input') +
              $t('userManagement.userProfile.username')
            "
            @onBlur="onBlurUsername"
            :error-message="error.username"
          />
        </div>
        <div class="spector-line"></div>
        <div class="input-box">
          <input-field
            v-model="$v.firstName.$model"
            class="input-field left"
            required
            :maxlength="50"
            :title="$t('userManagement.userProfile.firstName')"
            :disable="mode === 'edit'"
            :placeholder="
              $t('userManagement.input') +
              $t('userManagement.userProfile.firstName')
            "
            :error-message="error.firstName"
          />
          <input-field
            v-model="$v.lastName.$model"
            class="input-field right"
            required
            :maxlength="50"
            :title="$t('userManagement.userProfile.lastName')"
            :disable="mode === 'edit'"
            :placeholder="
              $t('userManagement.input') +
              $t('userManagement.userProfile.lastName')
            "
            :error-message="error.lastName"
          />
          <input-field
            v-model="$v.userType.$model"
            class="left"
            :title="$t('userManagement.userProfile.userType')"
            required
            type="select"
            :options="userTypeList"
            :options-reduce="(item) => item.typeId"
            :options-label="language === 'th' ? 'typeNameTh' : 'typeNameEn'"
            :placeholder="$t('userManagement.pleaseSelect')"
            :error-message="error.userType"
          />
          <input-field
            v-model="$v.userScope.$model"
            class="right"
            :title="$t('userManagement.userProfile.userScope')"
            :disable="mode === 'edit'"
            required
            type="select"
            :options="userScopeList"
            :options-reduce="(item) => item.userLevelScopeId"
            :options-label="
              language === 'th' ? 'userLevelScopeTh' : 'userLevelScopeEn'
            "
            :placeholder="$t('userManagement.pleaseSelect')"
            :error-message="error.userScope"
          />
          <input-field
            v-model="$v.company.$model"
            class="left"
            :title="$t('userManagement.userProfile.company')"
            :disable="mode === 'edit' || companyList.length === 0"
            required
            type="select"
            :options="companyList"
            :options-reduce="(item) => item.companyId"
            :options-label="
              language === 'th' ? 'companyNameTh' : 'companyNameEn'
            "
            :placeholder="$t('userManagement.pleaseSelect')"
            :error-message="error.company"
          />
          <input-field
            v-model="$v.department.$model"
            class="input-field right"
            :title="$t('userManagement.userProfile.department')"
            :disable="mode === 'edit'"
            :placeholder="
              $t('userManagement.input') +
              $t('userManagement.userProfile.department')
            "
            :error-message="error.department"
          />
          <input-field
            v-model="$v.brand.$model"
            class="left"
            :title="$t('userManagement.userProfile.brand')"
            required
            :disable="brandList.length === 0"
            type="select"
            :options="brandList"
            :options-reduce="(item) => item.brandId"
            :options-label="language === 'th' ? 'brandNameTh' : 'brandNameEn'"
            :placeholder="$t('userManagement.pleaseSelect')"
            :error-message="error.brand"
          />
          <input-field
            v-model="$v.branch.$model"
            class="right"
            :title="$t('userManagement.userProfile.branch')"
            :disable="branchList.length === 0"
            type="select"
            :options="branchList"
            :options-reduce="(item) => item.branchId"
            :options-label="language === 'th' ? 'branchNameTh' : 'branchNameEn'"
            :placeholder="$t('userManagement.pleaseSelect')"
            :error-message="error.branch"
          />
        </div>
        <div class="spector-line"></div>
        <input-tag
          v-model="$v.userRole.$model"
          :option="userRoleList"
          required
          :title="$t('userManagement.userProfile.userRole')"
          :error-message="error.userRole"
        />
        <div class="input-box">
          <input-field
            v-model="$v.email.$model"
            class="input-field left"
            disable
            :title="$t('userManagement.userProfile.email')"
            :placeholder="$t('userManagement.userProfile.email')"
          />
        </div>
        <phone-num-input
          v-model="$v.phoneNo.$model"
          class="input-phone"
          :title="$t('userManagement.userProfile.phoneNo')"
          :maxlength="13"
          :errorMessage="error.phoneNo"
          @prefix="changedPrefixPhoneNo"
        />
        <phone-num-input
          v-model="$v.mobile.$model"
          class="input-phone"
          :title="$t('userManagement.userProfile.mobile')"
          :maxlength="13"
          :errorMessage="error.mobile"
          @prefix="changedPrefixmobile"
          :placeholder="
            $t('userManagement.input') + $t('userManagement.userProfile.mobile')
          "
        />
      </div>
    </div>
    <div class="footer-container">
      <t1-button
        class="footer-button"
        type="outline"
        @click.native="clickCancel"
      >
        {{ $t('userManagement.userProfile.cancel') }}
      </t1-button>
      <t1-button
        class="footer-button"
        :type="mode === 'edit' ? 'black' : ''"
        @click.native="submit"
      >
        {{
          mode === 'create'
            ? $t('userManagement.userProfile.assignRoleToUser')
            : $t('userManagement.userProfile.save')
        }}
      </t1-button>
    </div>

    <dialog-popup
      :display="dialogSave"
      :title="dialogSaveTitle"
      :left-button-title="$t('userManagement.dialog.cancel')"
      :right-button-title="$t('userManagement.dialog.confirm')"
      @onLeftButtonClick="dialogSaveCancelAction"
      @onRightButtonClick="dialogSaveAction"
    />

    <dialog-popup
      :display="dialogStatus"
      :title="dialogStatusTitle"
      :description="dialogStatusDescription"
      :left-button-title="$t('userManagement.dialog.cancel')"
      :right-button-title="$t('userManagement.dialog.confirm')"
      @onLeftButtonClick="dialogStatusCancelAction"
      @onRightButtonClick="dialogStatusAction"
    />

    <dialog-popup
      :display="dialogCancel"
      :title="$t('userManagement.dialog.clickCancelTitle')"
      :description="$t('userManagement.dialog.clickCancel')"
      :left-button-title="$t('userManagement.dialog.cancel')"
      :right-button-title="$t('userManagement.dialog.confirm')"
      @onLeftButtonClick="dialogCancelCancelAction"
      @onRightButtonClick="dialogCancelAction"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import InputTag from '~/components/atoms/InputTag.vue'
import InputField from '@/components/atoms/InputField.vue'
import T1Button from '@/components/atoms/button.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import CompanyStatus from '~/components/atoms/company-status.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import ProfilePicture from '@/components/molecules/ProfilePicture.vue'
import { BreadcrumbType } from '~/constants'
import { getAssetsPath } from '~/helper/images'
import { validationMixin } from 'vuelidate'
import { required, email, numeric, minLength } from 'vuelidate/lib/validators'
import { getImagePath } from '~/helper/images'
import { isEqual, sortBy } from 'lodash'

const validations = {
  username: {
    required,
    email,
    mustBe: (value: any) => /^([A-Za-z0-9@._-])*$/g.test(value)
  },
  firstName: {
    required,
    mustBe: (value: any) => /^([ก-๛A-Za-z0-9-])*$/g.test(value)
  },
  lastName: {
    required,
    mustBe: (value: any) => /^([ก-๛A-Za-z0-9 -])*$/g.test(value)
  },
  userType: { required },
  userScope: { required },
  company: { required },
  department: {},
  brand: { required },
  branch: { required },
  userRole: { required },
  email: {},
  phoneNo: {
    numeric,
    minLength: minLength(8)
  },
  mobile: {
    numeric,
    minLength: minLength(9)
  },

  validationGroup: [
    'username',
    'firstName',
    'lastName',
    'userType',
    'userScope',
    'company',
    'brand',
    'userRole'
  ],

  validationGroupScopeBranch: [
    'username',
    'firstName',
    'lastName',
    'userType',
    'userScope',
    'company',
    'brand',
    'branch',
    'userRole'
  ]
}

@Component({
  mixins: [validationMixin],
  validations,
  components: {
    InputTag,
    InputField,
    T1Button,
    PhoneNumInput,
    ProfilePicture,
    CompanyStatus,
    DialogPopup
  }
})
export default class UserProfileNonCg extends Vue {
  $i18n: any

  profileImg: any
  previewUrl: null | string = ''

  imageUrl = ''
  status = 'Active'

  username = ''
  firstName = ''
  lastName = ''
  userType = ''
  userScope = ''
  company = ''
  department = ''
  brand = ''
  branch = ''
  userRole = []
  email = ''
  phoneNo = ''
  phonePrefix = '+66'
  mobile = ''
  mobilePrefix = '+66'

  prevData = {
    username: '',
    firstName: '',
    lastName: '',
    userType: '',
    userScope: '',
    company: '',
    department: '',
    brand: '',
    branch: '',
    userRole: [],
    email: '',
    phoneNo: '',
    phonePrefix: '',
    mobile: '',
    mobilePrefix: '',
    imageUrl: ''
  }

  error = {
    username: '',
    firstName: '',
    lastName: '',
    userType: '',
    userScope: '',
    company: '',
    brand: '',
    userRole: '',
    phoneNo: '',
    mobile: ''
  }

  userTypeList = []
  userScopeList = []
  companyList = []
  brandList = []
  branchList = []
  userRoleList = []

  dialogSave = false
  dialogSaveTitle = ''

  statusAction = ''
  dialogStatus = false
  dialogStatusTitle = ''
  dialogStatusDescription = ''

  dialogCancel = false

  @Prop({
    required: true,
    type: String
  })
  private mode!: string

  @Prop({
    required: false,
    type: String,
    default: ''
  })
  private userId?: string

  get language(): any {
    return this.$i18n.locale
  }

  get dataStatus(): string {
    if (this.status === 'Active') {
      return this.$t('common.active').toString()
    } else if (this.status === 'Inactive') {
      return this.$t('common.inActive').toString()
    } else if (this.status === 'Onhold') {
      return this.$t('common.onHold').toString()
    } else {
      return ''
    }
  }

  get statusClass(): string {
    if (
      this.dataStatus === this.$t('table.contentTableStatus.active').toString()
    ) {
      return 'active'
    } else if (
      this.dataStatus ===
      this.$t('table.contentTableStatus.inactive').toString()
    ) {
      return 'inactive'
    } else if (
      this.dataStatus === this.$t('table.contentTableStatus.hold').toString()
    ) {
      return 'hold'
    } else {
      return ''
    }
  }

  @Watch('username')
  checkUsername(): void {
    this.error.username = !this.$v.username.required
      ? this.$t('userManagement.input').toString() +
        this.$t('userManagement.userProfile.username')
      : !this.$v.username.email || !this.$v.username.mustBe
      ? this.$t('userManagement.error.cgInvalidUsernameFormat').toString()
      : ''
  }

  @Watch('firstName')
  checkFirstName(): void {
    this.error.firstName = !this.$v.firstName.required
      ? this.$t('userManagement.input').toString() +
        this.$t('userManagement.userProfile.firstName')
      : !this.$v.firstName.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('lastName')
  checkLastName(): void {
    this.error.lastName = !this.$v.lastName.required
      ? this.$t('userManagement.input').toString() +
        this.$t('userManagement.userProfile.lastName')
      : !this.$v.lastName.mustBe
      ? this.$t('common.invalidInputInformation').toString()
      : ''
  }

  @Watch('userType')
  checkUserType(): void {
    this.error.userType = !this.$v.userType.required
      ? this.$t('userManagement.select').toString() +
        this.$t('userManagement.userProfile.userType')
      : ''
  }

  @Watch('userScope')
  checkUserScope(): void {
    this.error.userScope = !this.$v.userScope.required
      ? this.$t('userManagement.select').toString() +
        this.$t('userManagement.userProfile.userScope')
      : ''
  }

  @Watch('company')
  checkCompany(): void {
    this.error.company = !this.$v.company.required
      ? this.$t('userManagement.select').toString() +
        this.$t('userManagement.userProfile.company')
      : ''
  }

  @Watch('brand')
  watchBrand(): void {
    this.error.brand = ''
  }

  checkBrand(): void {
    this.error.brand = !this.$v.brand.required
      ? this.$t('userManagement.select').toString() +
        this.$t('userManagement.userProfile.brand')
      : ''
  }

  @Watch('userRole')
  checkUserRole(): void {
    this.error.userRole = !this.$v.userRole.required
      ? this.$t('userManagement.select').toString() +
        this.$t('userManagement.userProfile.userRole')
      : ''
  }

  @Watch('phoneNo')
  checkPhoneNo(): void {
    this.error.phoneNo = !this.$v.phoneNo.numeric
      ? this.$t('userManagement.error.invalidPhoneNo').toString()
      : !this.$v.phoneNo.minLength
      ? this.$t('userManagement.error.inputPhoneNoAtLeast8Digits').toString()
      : ''
  }

  @Watch('mobile')
  checkmobile(): void {
    this.error.mobile = !this.$v.mobile.numeric
      ? this.$t('userManagement.error.invalidMolile').toString()
      : !this.$v.mobile.minLength
      ? this.$t('userManagement.error.inputMobileAtLeast9Digits').toString()
      : ''
  }

  @Watch('language')
  changeLanguage(): void {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.userManagement').toString(),
        url: '/'
      },
      {
        title:
          this.mode === 'create'
            ? this.$t('userManagement.userProfile.assignRoleToUser').toString()
            : this.$t('userManagement.editCgUser').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.mode === 'create'
        ? this.$t('userManagement.userProfile.assignRoleToUser').toString()
        : this.$t('userManagement.editCgUser').toString()
    )
  }

  async mounted() {
    if (this.mode == 'edit') {
      await this.getUser()
    }
    this.setupBreadcrumb()
    this.getUserType()
    this.getUserScope()
  }

  async getUser(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_user?userId=${this.userId}`,
        { data: null }
      )
      if (res.successful && res.data) {
        const data = res.data
        this.username = data.username
        this.firstName = data.userProfile.firstName
        this.lastName = data.userProfile.lastName
        this.userType = data.userType.typeId
        await this.getUserRole()
        this.userScope = data.userScope.userScopeLevel
          ? data.userScope.userScopeLevel.scopeLevelId
          : undefined
        this.company = data.userScope.company
          ? data.userScope.company.companyId
          : undefined
        await this.getBrand()
        this.brand = data.userScope.brand
          ? data.userScope.brand.brandId
          : undefined
        await this.getBranch()
        this.branch = data.userScope.branch
          ? data.userScope.branch.branchId
          : undefined
        this.userRole = data.role.map((item: any) => {
          return {
            ...item,
            id: item.roleId,
            role: item.roleTitle
          }
        })
        this.email = data.userProfile.email
        this.phonePrefix = data.userProfile.phonePrefix
        this.phoneNo = data.userProfile.phoneNo
        this.mobilePrefix = data.userProfile.phonePrefix
        this.mobile = data.userProfile.phoneNo
        this.previewUrl = data.userProfile.profileImg
          ? getImagePath(data.userProfile.profileImg)
          : null
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getUserType(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_user_type`,
        { data: null }
      )
      if (res.successful && res.data) {
        this.userTypeList = res.data.userType.filter(
          (item: any) => item.typeId !== 3
        )
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getUserScope(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_user_level_scope`,
        { data: null }
      )
      if (res.successful) {
        this.userScopeList = res.data.userLevelScope
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  @Watch('userType')
  async getCompanyByType(): Promise<void> {
    if (this.userType == '1') {
      this.getCompany('')
    } else {
      this.getCompany(this.userType)
    }
  }

  @Watch('userType')
  async getUserRole(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_role?userType=${this.userType}`,
        { data: null }
      )
      if (res.successful) {
        this.userRoleList = res.data.roles.map((item: any) => {
          return {
            ...item,
            role: item.name
          }
        })
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompany(userType: string): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_company?keywordOf=Search%20by%20Company&page=1&limit=1000&statusId=2&companyTypeId=${userType}`,
        { data: null }
      )
      if (res.successful) {
        this.companyList = res.data.company
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  checkDataChange() {
    if (
      this.prevData.username !== this.username ||
      this.prevData.firstName !== this.firstName ||
      this.prevData.lastName !== this.lastName ||
      this.prevData.userType !== this.userType ||
      this.prevData.userScope !== this.userScope ||
      this.prevData.company !== this.company ||
      this.prevData.department !== this.department ||
      this.prevData.brand !== this.brand ||
      this.prevData.branch !== this.branch ||
      !isEqual(sortBy(this.prevData.userRole), sortBy(this.userRole)) ||
      this.prevData.email !== this.email ||
      this.prevData.phoneNo !== this.phoneNo ||
      this.prevData.phonePrefix !== this.phonePrefix ||
      this.prevData.mobile !== this.mobile ||
      this.prevData.mobilePrefix !== this.mobilePrefix ||
      this.prevData.imageUrl !== this.imageUrl
    ) {
      return true
    } else {
      return false
    }
  }

  setPrevData() {
    this.prevData.username = this.username
    this.prevData.firstName = this.firstName
    this.prevData.lastName = this.lastName
    this.prevData.userType = this.userType
    this.prevData.userScope = this.userScope
    this.prevData.company = this.company
    this.prevData.department = this.department
    this.prevData.brand = this.brand
    this.prevData.branch = this.branch
    this.prevData.userRole = this.userRole
    this.prevData.email = this.email
    this.prevData.phoneNo = this.phoneNo
    this.prevData.phonePrefix = this.phonePrefix
    this.prevData.mobile = this.mobile
    this.prevData.mobilePrefix = this.mobilePrefix
    this.prevData.imageUrl = this.imageUrl
  }

  @Watch('company')
  async getBrand(): Promise<any> {
    this.brand = ''
    this.branch = ''
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_brand?page=1&limit=1000&companyId=${this.company}`,
        { data: null }
      )
      if (res.successful) {
        this.brandList = res.data.brand
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  @Watch('brand')
  async getBranch(): Promise<any> {
    if (!this.brand) {
      return
    }
    this.branch = ''
    let path = `${process.env.PORTAL_ENDPOINT}/list_branch?page=1&limit=1000&brandId=${this.brand}`
    try {
      const res = await this.$axios.$get(path, { data: null })
      if (res.successful) {
        this.branchList = res.data.branch
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  onBlurUsername() {
    if (!this.$v.username.$invalid) {
      this.email = this.username
    } else {
      this.email = ''
    }
  }

  private changedPrefixPhoneNo(value: string): void {
    this.phonePrefix = value
  }

  private changedPrefixmobile(value: string): void {
    this.mobilePrefix = value
  }

  clickAction(action: string): void {
    //TODO
    this.statusAction = action
    if (action === 'delete') {
      this.dialogStatusTitle = this.$t(
        'userManagement.dialog.deleteTitle'
      ).toString()
      this.dialogStatusDescription = this.$t(
        'userManagement.dialog.delete'
      ).toString()
    } else {
      this.dialogStatusTitle =
        this.$t('userManagement.dialog.changeStatusTitlePrefix').toString() +
        action +
        this.$t('userManagement.dialog.changeStatusTitleSuffix').toString()
      this.dialogStatusDescription =
        this.$t('userManagement.dialog.changeStatusPrefix').toString() +
        (action === 'on hold' ? 'held' : action) +
        this.$t('userManagement.dialog.changeStatusSuffix').toString()
    }
    this.dialogStatus = true
  }

  dialogStatusCancelAction() {
    this.dialogStatus = false
  }

  dialogStatusAction() {
    //TODO
    if (this.statusAction === 'delete') {
      this.$router.push('/userManagement')
    } else {
      this.dialogStatus = false
    }
  }

  clickCancel() {
    const dataChange = this.checkDataChange()
    if (dataChange) {
      this.dialogCancel = true
    } else {
      this.dialogCancelAction()
    }
  }

  dialogCancelCancelAction() {
    this.dialogCancel = false
  }

  dialogCancelAction() {
    this.$router.push('/userManagement')
    this.dialogCancelCancelAction()
  }

  async submit() {
    if (this.$v.validationGroup.$invalid) {
      this.checkUsername()
      this.checkFirstName()
      this.checkLastName()
      this.checkUserType()
      this.checkUserScope()
      this.checkCompany()
      this.checkBrand()
      this.checkUserRole()
    } else {
      if (this.mode === 'create') {
        this.dialogSaveTitle = this.$t(
          'userManagement.dialog.assignUserRole'
        ).toString()
        this.dialogSave = true
      } else {
        this.$nuxt.$loading.start()
        let getLogoBase64: string | null = null
        if (this.profileImg) {
          getLogoBase64 = await this.getBase64(this.profileImg)
        }
        const roles = this.userRole.map((item: any) => {
          return item.id
        })
        try {
          const payload = {
            userId: parseInt(this.userId ?? ''),
            // password: this.password,
            // passwordMode: this.changePasswordMode,
            userTypeId: this.userType,
            role: roles,
            profile: {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              phonePrefix: this.phonePrefix,
              phoneNo: this.phoneNo,
              mobilePrefix: this.mobilePrefix,
              mobileNo: this.mobile,
              department: this.department,
              profileImg: getLogoBase64
            },
            scope: {
              companyId: this.company,
              brandId: this.brand,
              branchId: this.branch,
              userScopeLevelId: this.userScope
            }
          }
          let response = await this.$axios.$post(
            `${process.env.PORTAL_ENDPOINT}/update_user`,
            payload
          )
          this.$nuxt.$loading.finish()
          if (response.successful) {
            this.$nuxt.$loading.finish()
            this.$toast.global.success(
              this.$t('userManagement.toast.savedSuccessfully')
            )
          }
        } catch (error) {
          this.$nuxt.$loading.finish()
          this.$toast.global.error(error.response.data.message)
        }
      }
    }
  }

  async onChangeProfileImage(value: any) {
    this.previewUrl = null
    this.profileImg = value
  }

  getBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(undefined)
      } else {
        const reader = new FileReader()
        try {
          reader.readAsDataURL(file)
          reader.onload = () => {
            resolve(reader.result)
          }
          reader.onerror = (error) => {
            reject(error)
          }
        } catch (error) {
          reject(error)
        }
      }
    })
  }

  dialogSaveCancelAction() {
    this.dialogSave = false
  }

  async dialogSaveAction() {
    this.$nuxt.$loading.start()
    const getLogoBase64 = await this.getBase64(this.profileImg)
    const roles = this.userRole.map((item: any) => {
      return item.id
    })
    const payload = {
      username: this.username,
      userGroupId: 1,
      userTypeId: this.userType,
      roleIds: roles,
      profile: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phonePrefix: this.phonePrefix,
        phoneNo: this.phoneNo,
        mobilePrefix: this.mobilePrefix,
        mobileNo: this.mobile,
        department: this.department,
        profileImg: getLogoBase64
      },
      scope: {
        companyId: this.company,
        brandId: this.brand,
        branchId: this.branch,
        userScopeLevelId: this.userScope
      }
    }
    try {
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/create_user`,
        payload
      )
      this.$nuxt.$loading.finish()
      if (response.successful) {
        this.$router.push('/userManagement')
      }
    } catch (error) {
      this.$nuxt.$loading.finish()
      this.$toast.global.error(error.response.data.message)
    }
    this.dialogSaveCancelAction()
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.user-profile-header-container {
  display: flex;
  justify-content: space-between;
  padding: 29px 53px 30px 50px;
  // background: lightcyan;

  .header-text {
    font-size: 24px;
    line-height: 44px;
    font-weight: 700;
    color: $black;
    border-left: 4px solid $primary;
    padding-left: 14px;
  }

  .header-status {
    margin-top: 14px;

    .icon-container {
      position: relative;
      display: inline-block;
      margin-left: 24px;

      &.pointer {
        cursor: pointer;
      }

      &:hover &.tooltiptext {
        background: $grey-hover;
        border-radius: 50%;
      }

      &:hover .tooltiptext {
        visibility: visible;
      }

      .icon {
        align-items: center;
        width: 26px;
        height: 26px;
        padding: 5px;
      }
      .tooltiptext {
        visibility: hidden;
        width: 50px;
        background-color: $grey-text;
        color: $white;
        font-size: 12px;
        text-align: center;
        border-radius: 6px;

        position: absolute;
        z-index: 1;
        top: calc(100% + 4px);
        left: 50%;
        margin-left: -25px;
      }
    }
  }
}
.user-status-container {
  display: flex;
  justify-content: flex-end;

  .user-status {
    position: absolute;
    top: 129px;
  }
}

.user-profile-container {
  display: flex;
  flex-direction: row;

  .profile-image-container {
    border-right: 1px solid $grey-hover;
    padding: 13px 50px;

    .account-detail-container {
      font-size: 18px;
      line-height: 24px;
      margin-top: 48px;
      text-align: center;

      .username {
        line-height: 20px;
        font-weight: 700;
      }

      .text-status {
        font-size: 16px;
      }

      .active {
        color: $success;
      }
      .inactive {
        color: $gray-disable;
      }
      .hold {
        color: $warning;
      }
    }
  }

  .profile-detail-container {
    width: 100%;
    padding: 0px 50px;

    .input-phone {
      width: 50%;
      padding-right: 25px;
    }

    .input-box {
      display: grid;
      grid-template-columns: 50% 50%;
    }

    .input-field {
      font-size: 16px;
      border-radius: 4px;
      width: 100%;

      &.left {
        padding-right: 25px;
      }

      &.right {
        padding-left: 25px;
      }
    }

    .spector-line {
      border-top: 1px solid $grey-hover;
      margin-bottom: 24px;
    }
  }
}

.footer-container {
  margin: 34px 50px;
  padding-top: 34px;
  border-top: 1px solid $grey-hover;
  display: flex;
  justify-content: flex-end;

  .footer-button {
    width: 157px;
    margin-left: 15px;
  }
}
</style>
