<template>
  <div class="central-reset-password">
    <div class="reset-password-input w-full">
      <p class="reset-password-header">{{ $t('login.headingsResetPassword') }}</p>
      <input-field
        class="relative"
        :title="$t('login.newPasswordTitle')"
        :type="stateMagicEyeTypeNew"
        v-model="formData.newPassword"
        :errorMessage="error.newPassword"
        :placeholder="$t('login.passwordNewPlaceHolder')"
        :minlength="8"
        :maxlength="12"
        :errorMessageHeight="32"
        required
      >
        <img
          :class="`magic-${imageNameNew}`"
          height="18"
          width="18"
          :src="imageIconNew(imageNameNew)"
          @click="toggleMagicEyeNew"
        />
      </input-field>
      <input-field
        class="relative"
        :title="$t('login.confirmNewPasswordTitle')"
        :type="stateMagicEyeType"
        v-model="formData.confirmPassword"
        :errorMessage="error.confirmPassword"
        :placeholder="$t('login.passwordConfirmPlaceHolder')"
        :minlength="8"
        :maxlength="12"
        :errorMessageHeight="32"
        required
      >
        <img
          :class="`magic-${imageName}`"
          height="18"
          width="18"
          :src="imageIcon(imageName)"
          @click="toggleMagicEye"
        />
      </input-field>
    </div>
    <div class="btn-section">
      <t1-button class="btn-login" :class="isDisabled" @click.native="submit">
        {{ $t('login.setNewPasswordBtn') }}
      </t1-button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
} from 'vue-property-decorator'
import {
  ResetPasswordFormData,
  ErrorResetPasswordFormData
} from '~/constants'
import { validateError } from '~/helper'
import InputField from '~/components/atoms/InputField.vue'
import T1Button from '~/components/atoms/button.vue'
import { getAssetsPath } from '~/helper/images'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators'

const validations = {
  newPassword: {
    required,
    mustBe: (value: any) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z_.!@#$%-]*$/g.test(value),
    minLength: minLength(8),
    maxLength: maxLength(12)
  },
  confirmPassword: {
    required,
    mustBe: (value: any) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z_.!@#$%-]*$/g.test(value),
    minLength: minLength(8),
    maxLength: maxLength(12)
  },
}
@Component({
  mixins: [validationMixin],
  validations,
  components: {
    InputField,
    T1Button
  }
})
export default class ResetPassword extends Vue {
  $i18n: any
  private stateMagicEyeTypeNew = 'password'
  private stateMagicEyeType = 'password'


  private formData: ResetPasswordFormData = {
    newPassword: '',
    confirmPassword: ''
  }
  private error: ErrorResetPasswordFormData = {
    newPassword: '',
    confirmPassword: ''
  }

  get newPassword(): string {
    return this.formData.newPassword
  }
  set newPassword(newValue: string) {
    this.formData.newPassword = newValue
  }

  get confirmPassword(): string {
    return this.formData.confirmPassword
  }
  set confirmPassword(newValue: string) {
    this.formData.confirmPassword = newValue
  }

  get imageNameNew(): string {
    return this.stateMagicEyeTypeNew === 'password'
      ? 'eye'
      : 'close-eye'
  }

  get imageName(): string {
    return this.stateMagicEyeType === 'password'
      ? 'eye'
      : 'close-eye'
  }

  get language(): any {
    return this.$i18n.locale
  }
  get isDisabled() : any {
    if(validateError(this.error) && (this.formData.newPassword && this.formData.confirmPassword)){
      return ""
    }
    else {
      return "disabled"
    }
  }

  private toggleMagicEyeNew(): void {
    this.stateMagicEyeTypeNew =
      this.stateMagicEyeTypeNew === 'password'
        ? 'text'
        : 'password'
  }

  private toggleMagicEye(): void {
    this.stateMagicEyeType =
      this.stateMagicEyeType === 'password'
        ? 'text'
        : 'password'
  }

  private imageIconNew(name: string): any {
    const image = getAssetsPath(`login/${name}.png`)
    return image
  }

  private imageIcon(name: string): any {
    const image = getAssetsPath(`login/${name}.png`)
    return image
  }

  @Watch('newPassword')
  onChangedNewPassword(): void {
    this.error.newPassword = !this.$v.newPassword.required
      ? this.$t('login.emptyUserNewPassword').toString()
      : !this.$v.newPassword.mustBe
      ? this.$t('login.lengthPassword').toString()
      : !this.$v.newPassword.minLength
      ? this.$t('login.lengthPassword').toString()
      : !this.$v.newPassword.maxLength
      ? this.$t('login.lengthPassword').toString()
      : ''
    if(this.error.confirmPassword === this.$t('login.passwordNotMatch').toString()){
      this.onChangedConfirmPassword()
    }
  }

  @Watch('confirmPassword')
  onChangedConfirmPassword(): void {
    this.error.confirmPassword = !this.$v.confirmPassword.required
      ? this.$t('login.emptyUserConfirmNewPassword').toString()
      : !this.$v.confirmPassword.mustBe
      ? this.$t('login.lengthPassword').toString()
      : !this.$v.confirmPassword.minLength
      ? this.$t('login.lengthPassword').toString()
      : !this.$v.confirmPassword.maxLength
      ? this.$t('login.lengthPassword').toString()
      : ''
  }

  @Watch('language')
  changeLanguage(): void {
    if(this.error.newPassword){
      this.onChangedNewPassword()
    }
    if(this.error.confirmPassword){
      this.onChangedConfirmPassword()
      if((this.error.confirmPassword === '') && (this.formData.confirmPassword !== this.formData.newPassword)){
        this.error.confirmPassword = this.$t('login.passwordNotMatch').toString()
      }
    }
  }

  private submit() {
    this.onChangedNewPassword()
    this.onChangedConfirmPassword()
    if(this.formData.confirmPassword !== this.formData.newPassword){
      this.error.confirmPassword = this.$t('login.passwordNotMatch').toString()
    }
    if (validateError(this.error)) {
      this.$router.push('/landing')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.central-reset-password {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .reset-password-header{
    color: $primary;
    font-size: 24px;
    line-height: 24px;
    font-weight: bold;
    margin-bottom: 22px;
  }

  .reset-password-input {
    display: flex;
    flex-direction: column;
    justify-content: center;

    ::v-deep .input-field-required {
      display: none;
    }

    ::v-deep .magic-eye,
    ::v-deep .magic-close-eye {
      position: absolute;
      top: 48px;
      right: 11px;
      cursor: pointer;
    }

    ::v-deep .magic-close-eye {
      top: 46px;
    }
  }

  .btn-section {
    margin-top: 0.5rem;

    .btn-login {
      width: 100%;
      max-width: 157px;
      margin: 0.25rem 0;
      float: right;
    }
    .btn-login {
      color: $white;
      background-color: $primary;
      border-radius: 10px;
    }
    .disabled {
      background-color: $gray-disable;
      border: 2px solid $gray-disable;
      pointer-events: none;
    }
  }
}
</style>
