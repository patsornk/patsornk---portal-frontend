<template>
  <div class="siebel-partner-container">
    <input-field
      class="sp-code"
      v-model="dataValue.siebelPartnerCode"
      placeholder="Siebel Partner code"
      :errorMessage="error.siebelPartnerCode ? 'กรุณากรอกข้อมูล' : undefined"
      @onBlur="validateSiebelPartnerCode()"
      required
    />

    <input-field
      class="sp-name"
      v-model="dataValue.siebelPartnerName"
      placeholder="Siebel Partner name"
      :errorMessage="error.siebelPartnerName ? 'กรุณากรอกข้อมูล' : undefined"
      @onBlur="validateSiebelPartnerName()"
      required
    />
    <t1-button
      v-if="action === 'add'"
      class="submit"
      :class="
        error.siebelPartnerCode ||
        error.siebelPartnerName ||
        dataValue.siebelPartnerCode === '' ||
        dataValue.siebelPartnerName === ''
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
      @click="this.$emit('clickDelete')"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
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

  private error: ErrorSiebelPartner = {
    siebelPartnerCode: '',
    siebelPartnerName: ''
  }

  get dataValue(): SiebelPartnerType | undefined {
    return this.value
  }

  set dataValue(value) {
    this.dataValue = value
  }

  private validateSiebelPartnerCode(): void {
    if (isRequiredEmpty(this.dataValue?.siebelPartnerCode)) {
      this.error.siebelPartnerCode = 'Empty'
    } else {
      this.error.siebelPartnerCode = ''
    }
  }

  private validateSiebelPartnerName(): void {
    if (isRequiredEmpty(this.dataValue?.siebelPartnerName)) {
      this.error.siebelPartnerName = 'Empty'
    } else {
      this.error.siebelPartnerName = ''
    }
  }

  private clickAddSiebelPartner() {
    if (
      this.dataValue?.siebelPartnerCode === '' ||
      this.dataValue?.siebelPartnerName === ''
    ) {
      return
    }
    this.validateSiebelPartnerCode()
    this.validateSiebelPartnerName()
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
