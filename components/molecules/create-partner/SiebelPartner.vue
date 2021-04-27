<template>
  <div class="siebel-partner-container">
    <input-field
      class="sp-code"
      v-model="dataValue.partnerCode"
      placeholder="Siebel Partner code"
      :errorMessage="
        error.partnerCode ? error.partnerCode : undefined
      "
      @onChange="checkPartnerCode"
      required
    />

    <input-field
      class="sp-name"
      v-model="dataValue.partnerName"
      placeholder="Siebel Partner name"
      :errorMessage="
        error.partnerName ? error.partnerName : undefined
      "
      @onChange="checkPartnerName"
      required
    />
    <t1-button
      v-if="action === 'add'"
      class="submit"
      :class="
        error.partnerCode ||
        error.partnerName ||
        dataValue.partnerCode === '' ||
        dataValue.partnerName === ''
          ? 'disable'
          : ''
      "
      @click.native="clickAddSiebelPartner"
    >
      Add
    </t1-button>
    <img
      v-else
      class="icon"
      src="@/assets/images/partner-code/save.png"
      @click="clickAddSiebelPartner"
    />
    <img
      class="icon"
      src="@/assets/images/table/delete.png"
      @click="$emit('clickDelete')"
    />
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

@Component({
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
  private value: SiebelPartnerType | undefined

  @Prop({
    required: true,
    type: String
  })
  private action: string

  @Prop({
    default: '',
    type: String
  })
  private partnerCodeError: string | undefined

  get dataValue(): SiebelPartnerType | undefined {
    return this.value
  }

  set dataValue(value) {
    this.dataValue = value
  }

  @Watch('partnerCodeError')
  onChangePartnerCodeError(): void {
    this.error.partnerCode = this.partnerCodeError
  }

  private error: ErrorSiebelPartner = {
    partnerCode: '',
    partnerName: ''
  }

  private checkPartnerCode(): void {
    if (isRequiredEmpty(this.dataValue?.partnerCode)) {
      this.error.partnerCode = 'Empty'
    } else {
      this.$emit('changePartnerCode', this.dataValue)
      this.error.partnerCode = this.partnerCodeError
    }
  }

  private checkPartnerName(): void {
    if (isRequiredEmpty(this.dataValue?.partnerName)) {
      this.error.partnerName = 'Empty'
    } else {
      this.error.partnerName = ''
    }
  }

  private clickAddSiebelPartner() {
    if (
      this.dataValue?.partnerCode === '' ||
      this.dataValue?.partnerName === ''
    ) {
      return
    }
    this.checkPartnerCode()
    this.checkPartnerName()
    if (validateError(this.error)) {
      this.$emit('clickAdd', this.dataValue)
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
    margin: 15px;
    cursor: pointer;
  }
}
</style>
