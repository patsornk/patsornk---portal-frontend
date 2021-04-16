<template>
  <div class="create-company-container">
    <span class="header">Company Information</span>
    <div class="input-section">
      <input-field
        v-model="formData.company_name_th"
        title="Company Name (TH)"
        :maxlength="100"
        :required="true"
        :error-message="
          formError.company_name_th !== ''
            ? formError.company_name_th
            : undefined
        "
        @onBlur="validateNameTH()"
      />
      <input-field
        v-model="formData.company_name_en"
        :required="false"
        title="Company Name (EN)"
        :maxlength="100"
        :error-message="
          formError.company_name_en !== ''
            ? formError.company_name_en
            : undefined
        "
        @onBlur="validateNameEN()"
      />
      <input-field
        v-model="formData.company_type_id"
        title="Company type"
        :required="true"
      />
      <input-field
        v-model="formData.company_category_id"
        title="Partner Category"
        :required="true"
      />
      <input-field
        v-model="formData.company_size_id"
        title="Business Size"
        :required="true"
      />
      <input-field
        v-model="formData.assignee"
        title="Assignee"
        :required="true"
      />
      <input-field
        v-model="formData.company_email"
        title="E-mail"
        :maxlength="100"
        :required="true"
        :error-message="
          formError.company_email !== '' ? formError.company_email : undefined
        "
        @onBlur="validateEmail()"
      />
      <phone-num-input
        v-model="formData.company_phone_number"
        title="Phone No."
        :required="true"
        :error-message="
          formError.company_phone_number !== ''
            ? formError.company_phone_number
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
    company_name_en: '',
    company_name_th: '',
    company_type_id: 0,
    company_category_id: 0,
    company_size_id: 0,
    company_phone_prefix: '+66',
    company_phone_number: '',
    company_email: '',
    assignee: ''
  }

  private formError = {
    company_name_en: '',
    company_name_th: '',
    company_type_id: '',
    company_category_id: '',
    company_size_id: '',
    company_phone_number: '',
    company_email: '',
    assignee: ''
  }

  private validateNameEN() {
    if (!validateEngCharacters(this.formData.company_name_en)) {
      this.formError.company_name_en = 'Input invalid information'
    } else {
      this.formError.company_name_en = ''
    }
  }

  private validateNameTH() {
    if (isRequiredEmpty(this.formData.company_name_th)) {
      this.formError.company_name_th = 'Input company name'
    } else if (!validateThaiCharacters(this.formData.company_name_th)) {
      this.formError.company_name_th = 'Input invalid information'
    } else {
      this.formError.company_name_th = ''
    }
  }

  private validateEmail() {
    if (isRequiredEmpty(this.formData.company_email)) {
      this.formError.company_email = 'Input Email'
    } else if (!validateEmail(this.formData.company_email)) {
      this.formError.company_email = 'Input invalid e-mail format information'
    } else {
      this.formError.company_email = ''
    }
  }

  private validatePhoneNumber() {
    if (isRequiredEmpty(this.formData.company_phone_number)) {
      this.formError.company_phone_number = 'Input phone No.'
    } else if (!validateNumber(this.formData.company_phone_number)) {
      this.formError.company_phone_number =
        'Input invalid Phone No. format information'
    } else {
      this.formError.company_phone_number = ''
    }
  }

  private onChangedPrefixNumber(value: string): void {
    this.formData.company_phone_prefix = value
  }

  private submit() {
    this.validateNameTH()
    this.validateNameEN()
    this.validateEmail()
    this.validatePhoneNumber()
    if (validateError(this.formError)) {
      this.$toast.global.success('Saved successfully')
      setTimeout(() => {
        this.$router.push('/organizManagement/create/partnercode')
      }, 1000)
    } else {
      this.$toast.global.error(
        'One or more field have an error. Please check and try again.'
      )
    }
  }

  @Watch('formData.company_name_th')
  onChangeCompanyNameTH() {
    this.validateNameTH()
  }

  @Watch('formData.company_name_en')
  onChangeCompanyNameEN() {
    this.validateNameEN()
  }

  @Watch('formData.company_email')
  onChangeCompanyEmail() {
    this.validateEmail()
  }

  @Watch('formData.company_phone_number')
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
