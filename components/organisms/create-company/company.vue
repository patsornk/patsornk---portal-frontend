<template>
  <div class="create-company-container">
    <span class="header">Company Information</span>
    <div class="input-section">
      <input-field
        v-model="formData.companyNameTh"
        title="Company Name (TH)"
        :maxlength="100"
        :required="true"
        :error-message="
          formError.companyNameTh !== '' ? formError.companyNameTh : undefined
        "
        @onBlur="validateNameTH()"
      />
      <input-field
        v-model="formData.companyNameEn"
        :required="true"
        title="Company Name (EN)"
        :maxlength="100"
        :error-message="
          formError.companyNameEn !== '' ? formError.companyNameEn : undefined
        "
        @onBlur="validateNameEN()"
      />
      <input-field
        v-model="formData.companyTypeId"
        title="Company type"
        :required="true"
        type="select"
        :options="companyTypeList"
        :optionsReduce="(item) => item.companyTypeId"
        :optionsLabel="language === 'th' ? 'companyTypeTh' : 'companyTypeEn'"
        placeholder="Please select..."
      />
      <input-field
        v-model="formData.companyCategoryId"
        title="Partner Category"
        :required="true"
        type="select"
        :options="companyTypeCategory"
        :optionsReduce="(item) => item.companyCategoryId"
        :optionsLabel="
          language === 'th' ? 'companyCategoryTh' : 'companyCategoryEn'
        "
        placeholder="Please select..."
      />
      <input-field
        v-model="formData.companySizeId"
        title="Business Size"
        :required="true"
        type="select"
        :options="companyTypeSize"
        :optionsReduce="(item) => item.companySizeId"
        :optionsLabel="language === 'th' ? 'companySizeTh' : 'companySizeEn'"
        placeholder="Please select..."
      />
      <input-field
        v-model="formData.assignee"
        title="Assignee"
        :required="true"
      />
      <input-field
        v-model="formData.companyEmail"
        title="E-mail"
        :maxlength="100"
        :required="true"
        :error-message="
          formError.companyEmail !== '' ? formError.companyEmail : undefined
        "
        @onBlur="validateEmail()"
      />
      <phone-num-input
        v-model="formData.companyPhoneNumber"
        title="Phone No."
        :required="true"
        :error-message="
          formError.companyPhoneNumber !== ''
            ? formError.companyPhoneNumber
            : undefined
        "
        @prefix="onChangedPrefixNumber"
        @onBlur="validatePhoneNumber()"
      />
    </div>
    <div class="submit-section">
      <button class="submit" @click="submit">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import axios from 'axios'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'
import {
  isRequiredEmpty,
  validateEmail,
  validateEngCharacters,
  validateError,
  validateNumber,
  validateThaiCharacters
} from '~/helper'

@Component({
  components: {
    InputField,
    PhoneNumInput
  }
})
export default class CreateCompany extends Vue {
  private formData = {
    companyNameEn: '',
    companyNameTh: '',
    companyTypeId: 0,
    companyCategoryId: 0,
    companySizeId: 0,
    companyPhonePrefix: '+66',
    companyPhoneNumber: '',
    companyEmail: '',
    assignee: ''
  }

  private formError = {
    companyNameEn: '',
    companyNameTh: '',
    companyTypeId: '',
    companyCategoryId: '',
    companySizeId: '',
    companyPhoneNumber: '',
    companyEmail: '',
    assignee: ''
  }

  private companyTypeList = []
  private companyTypeSize = []
  private companyTypeCategory = []

  get language(): any {
    return this.$i18n.locale
  }

  private validateNameEN() {
    if (isRequiredEmpty(this.formData.companyNameEn)) {
      this.formError.companyNameEn = 'Input company name'
    } else if (!validateEngCharacters(this.formData.companyNameEn)) {
      this.formError.companyNameEn = 'Input invalid information'
    } else {
      this.formError.companyNameEn = ''
    }
  }

  private validateNameTH() {
    if (isRequiredEmpty(this.formData.companyNameTh)) {
      this.formError.companyNameTh = 'Input company name'
    } else if (!validateThaiCharacters(this.formData.companyNameTh)) {
      this.formError.companyNameTh = 'Input invalid information'
    } else {
      this.formError.companyNameTh = ''
    }
  }

  private validateEmail() {
    if (isRequiredEmpty(this.formData.companyEmail)) {
      this.formError.companyEmail = 'Input Email'
    } else if (!validateEmail(this.formData.companyEmail)) {
      this.formError.companyEmail = 'Input invalid e-mail format information'
    } else {
      this.formError.companyEmail = ''
    }
  }

  private validatePhoneNumber() {
    if (isRequiredEmpty(this.formData.companyPhoneNumber)) {
      this.formError.companyPhoneNumber = 'Input phone No.'
    } else if (!validateNumber(this.formData.companyPhoneNumber)) {
      this.formError.companyPhoneNumber =
        'Input invalid Phone No. format information'
    } else {
      this.formError.companyPhoneNumber = ''
    }
  }

  private onChangedPrefixNumber(value: string): void {
    this.formData.companyPhonePrefix = value
  }

  async getCpmpanyType(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.THE_1_PORTAL}/get_company_type`,
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

  async getCpmpanySize(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.THE_1_PORTAL}/get_company_size`,
        { data: null }
      )
      if (res.successful) {
        this.companyTypeSize = res.data.companySize
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getCpmpanyCategory(): Promise<any> {
    try {
      let res = await this.$axios.$get(
        `${process.env.THE_1_PORTAL}/get_company_category`,
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
    this.getCpmpanyType()
    this.getCpmpanySize()
    this.getCpmpanyCategory()
  }

  async submit(): Promise<void> {
    this.validateNameTH()
    this.validateNameEN()
    this.validateEmail()
    this.validatePhoneNumber()

    if (validateError(this.formError)) {
      const payload = {
        companyNameEn: this.formData.companyNameEn,
        companyNameTh: this.formData.companyNameTh,
        companyTypeId: this.formData.companyTypeId,
        companyCategoryId: this.formData.companyCategoryId,
        companySizeId: this.formData.companySizeId,
        companyPhonePrefix: this.formData.companyPhonePrefix,
        companyPhoneNumber: this.formData.companyPhoneNumber,
        companyEmail: this.formData.companyEmail,
        assignee: this.formData.assignee
      }

      try {
        let response = await this.$axios.$post(
          `${process.env.THE_1_PORTAL}/create_company`,
          payload
        )
        if (response.successful) {
          this.$toast.global.success('Saved successfully')
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    } else {
      this.$toast.global.error(
        'One or more field have an error. Please check and try again.'
      )
    }
  }

  @Watch('formData.companyNameTh')
  onChangeCompanyNameTH() {
    this.validateNameTH()
  }

  @Watch('formData.companyNameEn')
  onChangeCompanyNameEN() {
    this.validateNameEN()
  }

  @Watch('formData.companyEmail')
  onChangeCompanyEmail() {
    this.validateEmail()
  }

  @Watch('formData.companyPhoneNumber')
  onChangeCompanyPhoneNumber() {
    this.validatePhoneNumber()
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
