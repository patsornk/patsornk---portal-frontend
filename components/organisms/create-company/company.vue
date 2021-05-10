<template>
  <div class="create-company-container">
    <span class="header">Company Information</span>
    <div class="input-section">
      <input-field
        v-model="$v.companyNameTh.$model"
        title="Company Name (TH)"
        :maxlength="50"
        required
        :errorMessage="error.companyNameTh"
      />
      <input-field
        v-model="$v.companyNameEn.$model"
        required
        title="Company Name (EN)"
        :maxlength="50"
        :errorMessage="error.companyNameEn"
      />
      <input-field
        v-model="$v.typeId.$model"
        title="Company type"
        required
        type="select"
        :options="companyTypeList"
        :optionsReduce="(item) => item.companyTypeId"
        :optionsLabel="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
        placeholder="Please select..."
        :errorMessage="error.typeId"
        @onBlur="checkTypeId()"
      />
      <input-field
        v-model="$v.categoryId.$model"
        title="Partner Category"
        required
        type="select"
        :options="companyTypeCategory"
        :optionsReduce="(item) => item.companyCategoryId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
        :errorMessage="error.categoryId"
      />
      <input-field
        v-model="$v.sizeId.$model"
        title="Business Size"
        required
        type="select"
        :options="companyTypeSize"
        :optionsReduce="(item) => item.companySizeId"
        :optionsLabel="language === 'th' ? 'companySizeTh' : 'companySizeEn'"
        placeholder="Please select..."
        :errorMessage="error.sizeId"
      />
      <input-field
        v-model="$v.assignee.$model"
        title="Assignee"
        required
        :errorMessage="error.assignee"
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
    </div>
    <div class="submit-section">
      <button class="submit" @click="submit">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
    mustBe: (value: any) => /^([ก-๛0-9 (),.])*$/g.test(value),
    maxLength: maxLength(50)
  },
  companyNameEn: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 (),.])*$/g.test(value),
    maxLength: maxLength(50)
  },
  typeId: {
    required
  },
  categoryId: {
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
    'typeId',
    'categoryId',
    'sizeId',
    'assignee',
    'email',
    'phoneNumber'
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
export default class CreateCompany extends Vue {
  $i18n: any

  companyNameTh = ''
  companyNameEn = ''
  typeId = ''
  categoryId = ''
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
    sizeId: '',
    assignee: '',
    email: '',
    companyPhonePrefix: '',
    phoneNumber: ''
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
    this.error.categoryId = !this.$v.categoryId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('sizeId')
  checkSizeId(): void {
    this.error.sizeId = !this.$v.sizeId.required
      ? this.$t('createCompany.error.require').toString()
      : ''
  }

  @Watch('assignee')
  checkAssignee(): void {
    this.error.assignee = !this.$v.assignee.required
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

  private onChangedPrefixNumber(value: string): void {
    this.companyPhonePrefix = value
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

  async mounted(): Promise<void> {
    if (
      window.sessionStorage.getItem('companyFirstTime') &&
      window.sessionStorage.getItem('companyFirstTime') === 'no'
    ) {
      this.getCompany()
    }
    this.getCompanyType()
    this.getCompanySize()
    this.getCompanyCategory()
  }

  async getCompany(): Promise<void> {
    if (window.sessionStorage.getItem('createCompanyId')) {
      try {
        let res = await this.$axios.$get(
          `${
            process.env.PORTAL_ENDPOINT
          }/get_company?companyId=${window.sessionStorage.getItem(
            'createCompanyId'
          )}`,
          { data: null }
        )
        if (res.successful) {
          const data = res.data
          this.companyNameTh = data.companyNameTh
          this.companyNameEn = data.companyNameEn
          this.typeId = data.companyType.companyTypeId
          this.categoryId = data.companyCategory.companyCategoryId
          this.sizeId = data.companySize.companySizeId
          this.assignee = data.assignee
          this.email = data.companyEmail
          this.companyPhonePrefix = data.companyPhonePrefix
          this.phoneNumber = data.companyPhoneNumber
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  async submit(): Promise<void> {
    if (this.$v.validationGroup.$invalid) {
      this.$toast.global.error(this.$t('createCompany.fieldError'))
      this.checkCompanyNameEn()
      this.checkCompanyNameTh()
      this.checkTypeId()
      this.checkCategoryId()
      this.checkSizeId()
      this.checkAssignee()
      this.checkEmail()
      this.checkPhoneNumber()
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

.create-company-container {
  padding-top: 60px;

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
