<template>
  <div class="input-field">
    <div class="w-full">
      <span class="input-title">{{ title }}</span>
      <span class="input-field-required" v-show="required">
        *</span
      >
    </div>
    <div class="input-field-input-group w-full">
      <div
        :class="
          errorMessage ? 'input-field-input-error' : ''
        "
      >
        <v-select
          v-if="type === 'select'"
          :options="options"
          v-model="dataValue"
          :label="optionsLabel"
          :reduce="optionsReduce"
          :placeholder="placeholder"
          @blur="$emit('onBlur')"
        />
        <input
          :type="type"
          v-else
          class="input-field-input"
          :class="errorMessage ? 'no-border' : ''"
          v-model="dataValue"
          :placeholder="placeholder"
          @blur="$emit('onBlur')"
        />
        <slot />
      </div>
      <span
        class="text-danger text-sm validation-error-text"
        v-if="errorMessage"
      >
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component
export default class InputField extends Vue {
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
    required: true,
    type: Boolean
  })
  private required!: boolean

  @Prop({
    type: String,
    default: ''
  })
  private errorMessage?: string

  @Prop({
    type: String,
    default: 'text',
    validator(value) {
      return (
        ['text', 'number', 'select', 'password'].indexOf(
          value
        ) !== -1
      )
    }
  })
  private type?: string

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  private options?: []

  @Prop({
    type: String,
    default: 'id'
  })
  private optionsLabel?: string

  @Prop({
    type: Function,
    default: () => {}
  })
  private optionsReduce?: () => {}

  @Prop({
    type: String
  })
  private placeholder?: string

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
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
    color: $primary;
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
    border: 1px solid $ligth-grey;
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
  }

  .vs__dropdown-menu {
    width: 100% !important;

    .vs__dropdown-option:hover,
    .vs__dropdown-option--highlight {
      background: $secondary !important;
    }
  }
}
</style>