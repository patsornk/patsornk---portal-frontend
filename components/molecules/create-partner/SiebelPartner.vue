<template>
  <div class="siebel-partner-container">
    <input-field
      class="sp-code"
      :maxlength="9"
      v-model="$v.partnerCode.$model"
      :placeholder="$t('createPartnerCode.sieabelPartner')"
      :errorMessage="partnerCodeErrorValue"
      required
    />

    <input-field
      class="sp-name"
      v-model="$v.partnerName.$model"
      :maxlength="100"
      :placeholder="$t('createPartnerCode.sieabelPartnerName')"
      :errorMessage="partnerNameError"
      required
    />
    <t1-button
      v-if="action === 'add'"
      class="submit"
      :class="
        $v.validationGroup.$invalid || partnerCode === '' || partnerName === ''
          ? 'disable'
          : ''
      "
      @click.native="clickAddSiebelPartner"
    >
      {{ $t('common.add') }}
    </t1-button>
    <img
      v-else
      class="icon"
      :src="assets('partner-code/save.png')"
      @click="clickAddSiebelPartner"
    />
    <div v-if="deleteAble">
      <img
        class="icon"
        :src="assets(action === 'add' ? 'table/delete.png' : 'icon/close.png')"
        @click="$emit('clickDelete')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {
  ErrorSiebelPartner,
  SiebelPartnerType
} from '@/constants/types/PartnerCodeType'
import InputField from '~/components/atoms/InputField.vue'
import T1Button from '@/components/atoms/button.vue'
import { isRequiredEmpty, validateError } from '~/helper'
import { getAssetsPath } from '~/helper/images'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

const validations = {
  partnerCode: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9])*$/g.test(value),
    minLength: minLength(3)
  },
  partnerName: {
    required,
    mustBe: (value: any) => /^([A-Za-z0-9 ])*$/g.test(value)
  },
  validationGroup: ['partnerCode', 'partnerName']
}

@Component({
  mixins: [validationMixin],
  validations,
  components: {
    InputField,
    T1Button
  }
})
export default class CreatePartnerCode extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  private value!: SiebelPartnerType

  @Prop({
    required: true,
    type: String
  })
  private action?: string

  @Prop({
    required: false,
    type: Boolean,
    default: true
  })
  private deleteAble?: string

  @Prop({
    default: '',
    type: String
  })
  private partnerCodeError: string | undefined

  partnerNameError = ''
  isAddingPartner = false
  partnerCode = this.value.partnerCode
  partnerName = this.value.partnerName
  partnerId = this.value.partnerId

  assets(name: string) {
    return getAssetsPath(name)
  }

  get partnerCodeErrorValue() {
    return this.partnerCodeError
  }

  set partnerCodeErrorValue(value) {
    this.$emit('setErrorPartnerCode', value)
  }

  @Watch('partnerCode')
  checkPartnerCode(): void {
    this.partnerCodeErrorValue = !this.$v.partnerCode.required
      ? this.$t('createPartnerCode.inputSieabelPartner').toString()
      : !this.$v.partnerCode.mustBe
      ? this.$t(
          'createPartnerCode.inputSiebelPartnerCodeInEnglishLanguage'
        ).toString()
      : !this.$v.partnerCode.minLength
      ? this.$t(
          'createPartnerCode.inputSiebelPartnerCodeAtLeast3Digits'
        ).toString()
      : ''
  }

  @Watch('partnerName')
  checkPartnerName(): void {
    this.partnerNameError = !this.$v.partnerName.required
      ? this.$t('createPartnerCode.inputSieabelPartnerName').toString()
      : !this.$v.partnerName.mustBe
      ? this.$t(
          'createPartnerCode.inputSiebelPartnerNameInEnglishLanguage'
        ).toString()
      : ''
  }

  @Watch('value')
  updateValue(): void {
    this.partnerCode = this.value.partnerCode
    this.partnerName = this.value.partnerName
    this.partnerId = this.value.partnerId
  }

  private clickAddSiebelPartner() {
    const validate = !this.$v.validationGroup.$invalid
    if (!this.isAddingPartner && validate) {
      this.isAddingPartner = true

      if (
        validateError(this.partnerCodeErrorValue) &&
        validateError(this.partnerNameError)
      ) {
        this.$emit('clickAdd', {
          value: {
            partnerCode: this.$v.partnerCode.$model,
            partnerName: this.$v.partnerName.$model,
            partnerId: this.partnerId
          },
          callback: () => {
            this.isAddingPartner = false
          }
        })
      } else {
        this.isAddingPartner = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.siebel-partner-container {
  display: flex;

  .sp-code {
    width: 23%;
    margin: 0px 59px 0px 50px;
  }
  .sp-name {
    width: 37%;
    margin-right: 33px;
  }

  .submit {
    align-items: center;
    width: 73px;
    height: 26px;
    margin: 1rem 0rem;

    font-size: 12px;
    font-weight: bold;
  }

  .input-field-input {
    font-size: 16px;
    padding: 9px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
    width: 100%;
  }

  .input-field-input:focus {
    outline: none !important;
  }

  .no-border {
    border: none;
  }

  .input-field-input-error {
    border: 1px solid $primary !important;
    border-radius: 4px;
  }

  .input-field-input-error .vs__dropdown-toggle {
    border: 1px solid $primary;
  }

  .icon {
    width: 16px;
    height: 16px;
    margin: 20px 0px 0px 34px;
    cursor: pointer;
  }
}
</style>
