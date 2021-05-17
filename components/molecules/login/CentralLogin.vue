<template>
  <div class="central-login">
    <div class="login-input w-full">
      <input-field
        title="ชื่อผู้ใช้"
        v-model="formData.username"
        :errorMessage="
          error.username ? 'กรุณากรอกข้อมูล' : undefined
        "
        @onBlur="validateUsername()"
        required
      />
      <input-field
        class="relative"
        title="รหัสผ่าน"
        :type="stateMagicEyeType"
        v-model="formData.password"
        :errorMessage="
          error.password ? 'กรุณากรอกข้อมูล' : undefined
        "
        @onBlur="validatePassword"
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
        เข้าสู่ระบบ
      </t1-button>
      <div class="btn-forget">
        <span class="cursor-pointer">ลืมรหัสผ่าน</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import {
  ErrorUserFormData,
  UserFormData
} from '~/constants'
import { isRequiredEmpty, validateError } from '~/helper'
import InputField from '~/components/atoms/InputField.vue'
import T1Button from '~/components/atoms/button.vue'

@Component({
  components: {
    InputField,
    T1Button
  }
})
export default class CentarlLogin extends Vue {
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

  get password(): string {
    return this.formData.password
  }

  get imageName(): string {
    return this.stateMagicEyeType === 'password'
      ? 'eye'
      : 'close-eye'
  }

  private validateUsername(): void {
    this.error.username = isRequiredEmpty(this.username) ? 'Username is empty' : ''
  }

  private validatePassword(): void {
    this.error.password = isRequiredEmpty(this.password) ? 'Password is empty' : ''
  }

  private toggleMagicEye(): void {
    this.stateMagicEyeType =
      this.stateMagicEyeType === 'password'
        ? 'text'
        : 'password'
  }

  private imageIcon(name: string): any {
    const image = require(`@/assets/images/login/${name}.png`)
    return image
  }

  @Watch('username')
  onChangedUsername(): void {
    this.validateUsername()
  }

  @Watch('password')
  onChangedPassword(): void {
    this.validatePassword()
  }

  private submit() {
    this.validateUsername()
    this.validatePassword()
    if (validateError(this.error)) {
      this.$router.push('/landing')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.central-login {
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
    margin-top: 2rem;

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
      font-weight: 700;
      font-size: 14px;
      text-align: center;
      padding: 8px 16px;
      color: $mid-black;
      text-decoration: underline;
      width: 100%;
    }
  }
}
</style>