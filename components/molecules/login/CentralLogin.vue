<template>
  <div class="central-login">
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
        <a
          class="cursor-pointer"
          href="https://myaccess.central.co.th/m/home"
          >{{ $t('login.urlText') }}</a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ErrorUserFormData, UserFormData } from '~/constants'
import { validateError } from '~/helper'
import InputField from '~/components/atoms/InputField.vue'
import T1Button from '~/components/atoms/button.vue'
import { getAssetsPath } from '~/helper/images'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

const validations = {
  username: {
    required,
    email,
    mustBe: (value: any) => /^([A-Za-z0-9@._-])*$/g.test(value)
  },
  password: {
    required
  }
}
import qs from 'qs'

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
    password: '',
    grant_type: 'password',
    client_id: 'public'
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
    return this.stateMagicEyeType === 'password' ? 'eye' : 'close-eye'
  }

  get language(): any {
    return this.$i18n.locale
  }

  private toggleMagicEye(): void {
    this.stateMagicEyeType =
      this.stateMagicEyeType === 'password' ? 'text' : 'password'
  }

  private imageIcon(name: string): any {
    const image = getAssetsPath(`login/${name}.png`)
    return image
  }

  @Watch('username')
  onChangedUsername(): void {
    this.error.username = !this.$v.username.required
      ? this.$t('login.emptyUsername').toString()
      : !this.$v.username.email
      ? this.$t('login.inputInvalidEmailFormat').toString()
      : !this.$v.username.mustBe
      ? this.$t('login.inputInvalidEmailFormat').toString()
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
    if (this.error.username) {
      this.onChangedUsername()
    }
    if (this.error.password) {
      this.onChangedPassword()
    }
  }

  private async submit() {
    this.onChangedUsername()
    this.onChangedPassword()
    const params = new URLSearchParams()
    params.append('username', this.username)
    params.append('password', this.password)
    params.append('type', 'cg')
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    try {
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/auth/token`,
        params,
        config
      )
      if (response && response.successful) {
        if (response.data) {
          this.$router.push('/landing')
        } else {
        }
      } else {
      }
    } catch (error) {
      if (error.response.data && error.response.data.code == '45') {
        this.$toast.global.error(this.$t('login.incorrectPassword').toString())
      } else {
        this.$toast.global.error(error)
      }
    }
    // if (validateError(this.error)) {
    //   try {
    //     this.$auth
    //       .loginWith('local', {
    //         data: qs.stringify(this.formData)
    //       })
    //       .then((resp) => {
    //         if (resp) {
    //           console.log(resp)
    //           this.$auth.setUserToken(
    //             resp.data.access_token,
    //             resp.data.refresh_token
    //           )
    //           this.$axios.setHeader(
    //             'Authorization',
    //             'Bearer ' + resp.data.access_token
    //           )
    //           this.$router.push('/landing')
    //           console.log(this.$auth.refreshTokens())
    //         }
    //       })
    //   } catch {
    //     this.$router.push('/login')
    //   }
    // }
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
      color: #221f20;
      text-decoration: underline;
      width: 100%;
    }
  }
}
</style>
