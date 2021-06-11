<template>
  <div class="edit-company-container">
    <span class="header">{{ $t('createCompany.companyInfo') }}</span>
    <div class="input-section">
      <input-field
        v-model="$v.companyNameTh.$model"
        :title="$t('createCompany.companyNameTh')"
        :placeholder="$t('createCompany.companyNameInput')"
        :maxlength="50"
        required
        :errorMessage="error.companyNameTh"
      />
      <input-field
        v-model="$v.companyNameEn.$model"
        required
        :title="$t('createCompany.companyNameEn')"
        :placeholder="$t('createCompany.companyNameInput')"
        :maxlength="50"
        :errorMessage="error.companyNameEn"
      />
      <input-field
        v-model="$v.typeId.$model"
        :title="$t('createCompany.companyType')"
        required
        type="select"
        :options="companyTypeList"
        :optionsReduce="(item) => item.companyTypeId"
        :optionsLabel="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.typeId"
        @onBlur="checkTypeId()"
      />
      <input-field
        :disable="$v.typeId.$model != 3"
        v-model="$v.categoryId.$model"
        :title="$t('createCompany.partnerCategory')"
        :required="this.typeId === 3"
        type="select"
        :options="companyTypeCategory"
        :optionsReduce="(item) => item.companyCategoryId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.categoryId"
      />
      <input-field
        :disable="$v.typeId.$model != 3"
        v-model="$v.sizeId.$model"
        :title="$t('createCompany.businessSize')"
        :required="this.typeId === 3"
        type="select"
        :options="companyTypeSize"
        :optionsReduce="(item) => item.companySizeId"
        :optionsLabel="language === 'th' ? 'companySizeTh' : 'companySizeEn'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.sizeId"
      />
      <input-field
        :disable="$v.typeId.$model != 3"
        v-model="$v.assignee.$model"
        :title="$t('createCompany.assignee')"
        :placeholder="$t('common.pleaseSelect')"
        :required="this.typeId === 3"
        :errorMessage="error.assignee"
      />
      <!-- Keep for restore in future -->
      <!-- <input-field
        v-model="$v.email.$model"
        :title="$t('createCompany.email')"
        :placeholder="$t('createCompany.emailInput')"
        :maxlength="100"
        required
        :errorMessage="error.email"
      />
      <phone-num-inpu
        v-model="$v.phoneNumber.$model"
        :title="$t('createCompany.phoneNo')"
        required
        :errorMessage="error.phoneNumber"
        @prefix="onChangedPrefixNumber"
      /> -->
      <input-field
        v-model="$v.companyStatus.$model"
        :title="$t('common.status')"
        required
        type="select"
        :options="companyStatusOption"
        :optionsReduce="(item) => item.id"
        :optionsLabel="'status'"
        :placeholder="$t('common.pleaseSelect')"
        :errorMessage="error.companyStatus"
      />
    </div>
    <div class="submit-section">
      <button class="submit" @click="submit">{{ $t('common.save') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  numeric
} from 'vuelidate/lib/validators'

const validations = {
  companyNameTh: {
    required,
    mustBe: (value: any) => /^([ก-๛0-9 (),.&+@])*$/g.test(value),
    maxLength: maxLength(50)
  },
  companyNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 (),.&+@])*$/g.test(value),
    maxLength: maxLength(50)
  },
  typeId: {
    required
  },
  categoryId: {
    required
  },
  companyStatus: {
    required
  },
  sizeId: {
    required
  },
  assignee: { required },
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

  validationGroup: [
    'companyNameTh',
    'companyNameEn',
    'companyStatus',
    'typeId'
    // 'email',
    // 'phoneNumber'
  ],

  validationPartnerGroup: [
    'companyNameTh',
    'companyNameEn',
    'typeId',
    'categoryId',
    'companyStatus',
    'sizeId',
    'assignee'
    // 'email',
    // 'phoneNumber'
  ]
}

@Component({
  mixins: [validationMixin],
  validations: validations,
  components: {
    InputField,
    PhoneNumInput
  }
})
export default class EditCompany extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: Object
  })
  readonly companyId!: number

  private companyStatusOption = [
    {
      id: 2,
      status: 'Active'
    },
    {
      id: 3,
      status: 'Inactive'
    },
    {
      id: 4,
      status: 'Onhold'
    }
  ]

  companyNameTh = ''
  companyNameEn = ''
  typeId = ''
  categoryId = ''
  companyStatus = ''
  sizeId = ''
  assignee = ''
  email = ''
  companyPhonePrefix = '+66'
  phoneNumber = ''

  private error = {
    companyNameEn: '',
    companyNameTh: '',
    typeId: '',
    categoryId: '',
    companyStatus: '',
    sizeId: '',
    assignee: ''
    // email: '',
    // companyPhonePrefix: '',
    // phoneNumber: ''
  }

  private companyTypeList = []
  private companyTypeSize = []
  private companyTypeCategory = []

  get language(): any {
    return this.$i18n.locale
  }

  @Watch('companyNameTh')
  checkCompanyNameTh(): void {
    this.error.companyNameTh = !this.$v.companyNameTh.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.companyNameTh.mustBe
      ? this.$t('createCompany.thaiAndNumber').toString()
      : !this.$v.companyNameTh.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('companyNameEn')
  checkCompanyNameEn(): void {
    this.error.companyNameEn = !this.$v.companyNameEn.required
      ? this.$t('createCompany.error.require').toString()
      : !this.$v.companyNameEn.mustBe
      ? this.$t('createCompany.characterAndNumber').toString()
      : !this.$v.companyNameEn.maxLength
      ? this.$t('createCompany.maxLength').toString()
      : ''
  }

  @Watch('typeId')
  checkTypeId(): void {
    this.error.typeId = !this.$v.typeId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('categoryId')
  checkCategoryId(): void {
    if (this.$v.typeId.$model === 3) {
      this.error.categoryId = !this.$v.categoryId.required
        ? this.$t('createCompany.error.require').toString()
        : ''
    }
  }

  @Watch('companyStatus')
  checkcompanyStatus(): void {
    this.error.companyStatus = !this.$v.companyStatus.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('sizeId')
  checkSizeId(): void {
    if (this.$v.typeId.$model === 3) {
      this.error.sizeId = !this.$v.sizeId.required
        ? this.$t('createCompany.error.require').toString()
        : ''
    }
  }

  @Watch('assignee')
  checkAssignee(): void {
    if (this.$v.typeId.$model === 3) {
      this.error.assignee = !this.$v.assignee.required
        ? this.$t('createCompany.error.require').toString()
        : ''
    }
  }

  @Watch('typeId')
  clearError(): void {
    if (parseInt(this.typeId) !== 3) {
      this.sizeId = ''
      this.categoryId = ''
      this.assignee = ''
    }
    this.error = {
      ...this.error,
      companyNameEn: '',
      companyNameTh: '',
      categoryId: '',
      sizeId: '',
      assignee: ''
    }
  }

  // @Watch('email')
  // checkEmail(): void {
  //   this.error.email = !this.$v.email.required
  //     ? this.$t('createCompany.error.require').toString()
  //     : !this.$v.email.email
  //     ? this.$t('createCompany.characterAndNumber').toString()
  //     : !this.$v.email.maxLength
  //     ? this.$t('createCompany.maxLength').toString()
  //     : ''
  // }

  // @Watch('phoneNumber')
  // checkPhoneNumber(): void {
  //   this.error.phoneNumber = !this.$v.phoneNumber.required
  //     ? this.$t('createCompany.error.require').toString()
  //     : !this.$v.phoneNumber.numeric
  //     ? this.$t('createCompany.number').toString()
  //     : !this.$v.phoneNumber.minLength
  //     ? this.$t('createCompany.minLength').toString()
  //     : !this.$v.phoneNumber.maxLength
  //     ? this.$t('createCompany.maxLength').toString()
  //     : ''
  // }

  private onChangedPrefixNumber(value: string): void {
    this.companyPhonePrefix = value
  }

  async mounted(): Promise<void> {
    this.getCompany()
    this.getCompanyType()
    this.getCompanySize()
    this.getCompanyCategory()
  }

  async getCompany(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company?companyId=${this.companyId}`,
        { data: null }
      )
      if (res.successful) {
        const data = res.data
        this.companyNameTh = data.companyNameTh
        this.companyNameEn = data.companyNameEn
        this.typeId = data.companyType.companyTypeId
        this.categoryId = data.companyCategory
          ? data.companyCategory.companyCategoryId
          : ''
        this.sizeId = data.companySize ? data.companySize.companySizeId : ''
        this.assignee = data.assignee ? data.assignee : ''
        // this.email = data.companyEmail
        // this.companyPhonePrefix = data.companyPhonePrefix
        // this.phoneNumber = data.companyPhoneNumber
        this.companyStatus = data.status
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanyType(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_type`,
        { data: null }
      )
      if (res.successful) {
        const list = res.data.companyType.filter(
          (item: any) => item.companyTypeId !== 1
        )
        this.companyTypeList = list
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanySize(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_size`,
        { data: null }
      )
      if (res.successful) {
        this.companyTypeSize = res.data.companySize
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCompanyCategory(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_company_category`,
        { data: null }
      )
      if (res.successful) {
        this.companyTypeCategory = res.data.companyCategory
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async submit(): Promise<void> {
    if (this.$v.typeId.$model == 3) {
      if (this.$v.validationPartnerGroup.$invalid) {
        this.$toast.global.error(this.$t('createCompany.fieldError'))
        this.checkCompanyNameEn()
        this.checkCompanyNameTh()
        this.checkTypeId()
        this.checkCategoryId()
        this.checkcompanyStatus()
        this.checkSizeId()
        this.checkAssignee()
      } else {
        const payload = {
          companyNameTh: this.$v.companyNameTh.$model,
          companyNameEn: this.$v.companyNameEn.$model,
          companyTypeId: this.$v.typeId.$model,
          companyCategoryId: this.$v.categoryId.$model,
          companySizeId: this.$v.sizeId.$model,
          assignee: this.$v.assignee.$model,
          statusId: this.$v.companyStatus.$model
        }
        try {
          const response = await this.$axios.$post(
            `${process.env.PORTAL_ENDPOINT}/update_company`,
            {
              companyId: this.companyId,
              ...payload
            }
          )
          if (response.successful) {
            this.$store.dispatch(
              'organizartion/setCompanyId',
              response.data.companyId
            )
            this.$store.dispatch('company/setStatus', response.data.statusDesc)
            window.sessionStorage.setItem(
              'createCompanyId',
              response.data.companyId
            )
            this.$toast.global.success(
              this.$t('common.successfully').toString()
            )
            window.sessionStorage.setItem('createCompanyFirstTime', 'no')
          }
        } catch (error) {
          this.$toast.global.error(error.response.data.message)
        }
      }
    } else {
      if (this.$v.validationGroup.$invalid) {
        this.$toast.global.error(this.$t('createCompany.fieldError'))
        this.checkCompanyNameEn()
        this.checkCompanyNameTh()
        this.checkTypeId()
        this.checkcompanyStatus()
      } else {
        const payload = {
          companyNameTh: this.$v.companyNameTh.$model,
          companyNameEn: this.$v.companyNameEn.$model,
          companyTypeId: this.$v.typeId.$model,
          statusId: this.$v.companyStatus.$model
        }
        try {
          let response = await this.$axios.$post(
            `${process.env.PORTAL_ENDPOINT}/update_company`,
            {
              companyId: this.companyId,
              ...payload
            }
          )
          if (response.successful) {
            this.$store.dispatch('company/setStatus', response.data.statusDesc)
            this.$store.dispatch(
              'organizartion/setCompanyId',
              response.data.companyId
            )
            window.sessionStorage.setItem(
              'createCompanyId',
              response.data.companyId
            )
            this.$toast.global.success(
              this.$t('common.successfully').toString()
            )
            window.sessionStorage.setItem('createCompanyFirstTime', 'no')
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

.edit-company-container {
  padding: 60px;

  .header {
    font-size: 24px;
    font-weight: 700;
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
</style>
