<template>
  <div class="input-field relative">
    <div class="w-full" style="display: flex; align-items: center" v-if="title">
      <span class="input-title">{{ title }}</span>
      <span v-show="required" class="input-field-required"> *</span>
      <tooltip :numberOfLine="numberOfLine" :tooltipMessage="tooltipMessage" />
    </div>
    <div class="input-field-input-group w-full">
      <div :class="errorMessage ? 'input-field-input-error' : ''">
        <input
          v-model="dataValue"
          class="input-field-input"
          :class="disable ? 'disable' : errorMessage ? 'no-border' : ''"
          :placeholder="placeholder"
          maxlength="12"
          :disabled="disable"
          @blur="$emit('onBlur', dataValue)"
          @change="$emit('onChange', dataValue)"
        />
        <button class="generate-button" @click="generatePassword">
          {{ $t('profile.textGenerateBtn') }}
        </button>
      </div>
      <div class="validation-error-text">
        <span v-if="errorMessage" class="text-danger error-msg">
          {{ errorMessage }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'
import Tooltip from '~/components/atoms/Tooltip.vue'
@Component({
  components: {
    Tooltip
  }
})
export default class PasswordGenerator extends Vue {
  @Prop({
    required: false,
    type: String
  })
  private value!: string

  @Prop({
    default: '',
    type: String
  })
  private title!: string

  @Prop({
    default: false,
    type: Boolean
  })
  private required?: boolean

  @Prop({
    default: false,
    type: Boolean
  })
  private disable!: boolean

  @Prop({
    type: String,
    default: ''
  })
  private errorMessage?: string

  @Prop({
    type: String
  })
  private placeholder?: string

  @Prop({
    type: Number,
    default: 2
  })
  private numberOfLine?: Number

  @Prop({
    type: String,
    default:
      'The password must be 8-12 characters and contains (A-Z, a-z and 0-9)'
  })
  private tooltipMessage?: String

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  get language(): any {
    return this.$i18n.locale
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  @Watch('dataValue')
  changeDataValue() {
    this.$emit('onChange')
  }

  private generatePassword() {
    this.dataValue = this.password(
      Math.floor(8 + ((Math.random() * (12 - 8 + 1)) % 10))
    )
    this.$emit('onClickGen')
  }

  private upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  private lower = 'abcdefghijklmnopqrstuvwxyz'
  private digit = '0123456789'
  private special = '!@#$%.-_'
  private all = this.upper + this.lower + this.digit + this.special

  private password(length: number) {
    let result1 = this.generate(1, this.upper)
    let result2 = this.generate(1, this.lower)
    let result3 = this.generate(1, this.digit)
    let result4 = this.generate(1, this.special)
    let result5 = this.generate(length - 4, this.all)
    return this.shuffle(
      result1.concat(result2, result3, result4, result5)
    ).join('') // shuffle and make a string
  }
  private generate(length: number, set: string) {
    let result = []
    while (length--) result.push(this.random(set))
    return result
  }
  private random(set: string) {
    return set[this.rand(set.length - 1)]
  }
  private rand(max: number) {
    return Math.floor(Math.random() * max)
  }

  private shuffle(array: string[]) {
    var currentIndex = array.length,
      randomIndex

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ]
    }
    return array
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.input-field {
  display: flex;
  flex-direction: column;

  .input-title {
    font-size: 16px;
    font-weight: 700;
  }

  .input-field-required {
    margin-left: 0.25rem;
    color: $primary;
    font-weight: 700;
  }

  .input-field-input-group {
    margin: 0.5rem 0rem;
  }

  .text-error {
    font-size: 12px;
  }

  .input-field-input {
    font-size: 16px;
    padding: 9px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
    width: 100%;
  }

  .generate-button {
    position: absolute;
    height: 24px;
    width: 84px;
    top: 42px;
    color: $primary;
    background-color: $tritery-red;
    right: 36px;
    font-size: 14px;
    padding-bottom: 2px;
    text-align: center;
    border-radius: 6px;
  }

  .generate-button:focus {
    outline: none;
  }

  .input-field-input.disable {
    background: $disabled-for-textbox;
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

  .input-icon-validate-danger .input-icon-validate {
    background: none;
  }

  .con-text-validation {
    height: 0 !important;
  }

  .validation-error-text {
    color: $primary;
    top: 5px;
    position: relative;
    height: 24px;
  }

  .vs__dropdown-menu {
    width: 100% !important;

    .vs__dropdown-option:hover,
    .vs__dropdown-option--highlight {
      background: $secondary !important;
    }
  }
}
.error-msg {
  position: absolute;
  font-size: 0.75rem;
}
::placeholder {
  color: $gray-disable;
}
</style>
