<template>
  <div class="siebel-partner-container">
    <input-field
      class="sp-code"
      :maxlength="9"
      v-model="dataValue.partnerCode"
      :placeholder="$t('createPartnerCode.sieabelPartner')"
      :errorMessage="error.partnerCode ? error.partnerCode : undefined"
      @onChange="checkPartnerCode"
      required
    />

    <input-field
      class="sp-name"
      v-model="dataValue.partnerName"
      :maxlength="100"
      :placeholder="$t('createPartnerCode.sieabelPartnerName')"
      :errorMessage="error.partnerName ? error.partnerName : undefined"
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
      {{$t('common.add')}}
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
        :src="assets('table/delete.png')"
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

  assets(name: string) {
    return getAssetsPath(name)
  }

  isLoading = false

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
      this.error.partnerCode = this.$t('createPartnerCode.inputSieabelPartner').toString()
    } else if (this.dataValue?.partnerCode && this.dataValue?.partnerCode.length < 3) {
      this.error.partnerCode = 'minlength'
    } else {
      this.$emit('changePartnerCode', this.dataValue)
      this.error.partnerCode = this.partnerCodeError
    }
  }

  private checkPartnerName(): void {
    if (isRequiredEmpty(this.dataValue?.partnerName)) {
      this.error.partnerName = this.$t('createPartnerCode.inputSieabelPartnerName').toString()
    } else {
      this.error.partnerName = ''
    }
  }

  private clickAddSiebelPartner() {
    if(!this.isLoading) {
      this.isLoading = true
      if (
        this.dataValue?.partnerCode === '' ||
        this.dataValue?.partnerName === ''
      ) {
        return
      }
      this.checkPartnerCode()
      this.checkPartnerName()
      if (validateError(this.error)) {
        this.$emit('clickAdd', { value: this.dataValue, callback: ()=>{ this.isLoading = false}})
      } else {
        this.isLoading = false
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
