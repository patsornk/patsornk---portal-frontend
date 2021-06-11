<template>
  <div class="non-central-login">
    <div class="login-input w-full">
      <input-field
        :title="$t('login.titleUserName')"
        v-model="$v.username.$model"
        :errorMessage="error.username"
        :placeholder="$t('login.usernamePlaceHolder')"
        required
      />
      <input-field
        class="relative"
        :title="$t('login.titlePassword')"
        :type="stateMagicEyeType"
        v-model="formData.password"
        :errorMessage="error.password"
        :placeholder="$t('login.passwordPlaceHolder')"
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
      <t1-button class="btn-login" @click.native="submit">
        {{ $t('login.submitText') }}
      </t1-button>
      <div class="btn-forget">
        <span class="cursor-pointer">{{ $t('login.urlText') }}</span>
      </div>
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
  ErrorUserFormData,
  UserFormData
} from '~/constants'
import { validateError } from '~/helper'
import InputField from '~/components/atoms/InputField.vue'
import T1Button from '~/components/atoms/button.vue'
import { getAssetsPath } from '~/helper/images'
import { validationMixin } from 'vuelidate'
import {
  required,
} from 'vuelidate/lib/validators'

const validations = {
  username: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9.])*$/g.test(value),
  },
  password: {
    required,
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
export default class CentarlLogin extends Vue {
  $i18n: any

  private stateMagicEyeType = 'password'

  private formData: UserFormData = {
    username: '',
    password: ''
  }
  private error: ErrorUserFormData = {
    username: '',
    password: ''
  }

  get username(): string {
    return this.formData.username
  }
  set username(newValue: string) {
    this.formData.username = newValue
  }

  get password(): string {
    return this.formData.password
  }
  set password(newValue: string) {
    this.formData.password = newValue
  }

  get imageName(): string {
    return this.stateMagicEyeType === 'password'
      ? 'eye'
      : 'close-eye'
  }

  get language(): any {
    return this.$i18n.locale
  }

  private toggleMagicEye(): void {
    this.stateMagicEyeType =
      this.stateMagicEyeType === 'password'
        ? 'text'
        : 'password'
  }

  private imageIcon(name: string): any {
    const image = getAssetsPath(`login/${name}.png`)
    return image
  }

  @Watch('username')
  onChangedUsername(): void {
    this.error.username = !this.$v.username.required
      ? this.$t('login.emptyUsername').toString()
      : !this.$v.username.mustBe
      ? this.$t('login.invalidInputInformation').toString()
      : ''
  }

  @Watch('password')
  onChangedPassword(): void {
    this.error.password = !this.$v.password.required
      ? this.$t('login.emptyUserPassword').toString()
      : ''
  }

  @Watch('language')
  changeLanguage(): void {
    if(this.error.username){
      this.onChangedUsername()
    }
    if(this.error.password){
      this.onChangedPassword()
    }
  }

  private submit() {
    this.onChangedUsername()
    this.onChangedPassword()
    if (validateError(this.error)) {
      this.$router.push('/login/resetPassword')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.non-central-login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .login-input {
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

    .btn-login,
    .btn-forget {
      width: 100%;
      margin: 0.25rem 0rem;
    }
    .btn-login {
      color: $white;
      background-color: $primary;
      border-radius: 10px;
    }
    .btn-forget {
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      text-align: center;
      padding: 8px 16px;
      color: #221F20;
      text-decoration: underline;
      width: 100%;
    }
  }
}
</style>
