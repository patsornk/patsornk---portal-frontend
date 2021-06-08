<template>
  <div class="phone-num-input">
    <div class="flex w-full">
      <span class="title">{{ title }}</span>
      <span v-show="required" class="required"> *</span>
    </div>
    <div class="input-group flex w-full">
      <div class="prefix">
        <input-field
          class="input-prefix"
          v-model="prefix"
          type="select"
          :options="countryCodes"
          :optionsReduce="(item) => item.label"
          optionsLabel="label"
          :shouldBeError=false 
        />
      </div>
      <div class="flex flex-col phone">
        <input
          v-model="dataValue"
          class="input-number"
          :class="errorMessage !== '' ? 'input-error' : ''"
        :placeholder="$t('createCompany.phoneNoInput')"
          type="text"
          inputmode="tel"
          maxlength="13"
          minlength="9"
        />
        <span v-if="errorMessage" class="error-message">{{
          errorMessage
        }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import { countryCodes } from '@/constants'

@Component({
  components: {
    InputField
  }
})
export default class PhoneNumInput extends Vue {
  private prefix = '+66'

  @Prop({
    required: true,
    type: undefined
  })
  private value: undefined

  @Prop({
    required: true,
    type: String
  })
  private title!: string

  @Prop({
    type: Boolean,
    default: false
  })
  private required?: boolean

  @Prop({
    type: String,
    default: ''
  })
  private errorMessage?: string

  get countryCodes() {
    return countryCodes
  }

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  @Watch('prefix')
  onChangedPrefix(value: string): void {
    this.$emit('prefix', value)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.phone-num-input {
  .title {
    font-size: 16px;
    font-weight: 700;
  }

  .required {
    margin-left: 0.25rem;
    color: $primary;
    font-weight: 700;
  }

  .input-group {
    padding: 6px 0px;

    .phone {
      width: 100%;
      margin-top: 1px;
    }
  }

  .input-number {
    font-size: 16px;
    width: 120px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
  }

  .input-number {
    width: 100%;
    padding: 10px;
  }

  .input-error {
    border-color: $primary;
  }

  .input-number:focus {
    outline: none !important;
  }

  .prefix {
    width: 145px;
    margin-right: 1rem;
    height: 46px;

    .input-field.input-prefix {
      .input-field-input-group {
        margin: 2px !important;
      }
    }
  }

  .error-message {
    color: $primary;
    font-size: 14px;
    margin-top: 0.4rem;
  }
}
</style>
