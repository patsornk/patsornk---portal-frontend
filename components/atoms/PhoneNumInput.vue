<template>
  <div class="phone-num-input">
    <div class="flex w-full">
      <span class="title">{{ title }}</span>
      <span v-show="required" class="required"> *</span>
    </div>
    <div class="input-group flex w-full">
      <div class="prefix">
        <v-select
          v-model="prefix"
          :searchable="false"
          :options="countryCodes"
          :reduce="(codes) => codes.label"
          label="text"
        >
          <template #selected-option="option">
            {{ option.label }}
          </template>
          <template #option="option">
            {{ option.text }}
          </template>
        </v-select>
      </div>
      <div class="flex flex-col phone">
        <input
          v-model="dataValue"
          class="input-number"
          :class="errorMessage !== '' ? 'input-error' : ''"
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
import { countryCodes } from '@/constants'

@Component
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

<style lang="scss" scoped>
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

    .phone{
      width: 100%;
    }
  }

  .input-number,
  .prefix {
    font-size: 16px;
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
    margin-right: 1rem;
    height: 46px;

    .v-select {
      padding: 5px;
    }

    ::v-deep .vs__clear {
      display: none;
    }

    ::v-deep .vs__selected {
      position: inherit;
    }

    ::v-deep .vs__dropdown-toggle {
      border: none;
    }

    ::v-deep .vs__dropdown-menu {
      box-shadow: $box-shadow-black;
      border: none;
      width: auto;
    }

    ::v-deep .vs__dropdown-option > span {
      width: 100%;
    }

    ::v-deep .vs__search {
      display: none;
    }
  }

  .error-message {
    color: $primary;
    font-size: 14px;
    margin-top: 0.4rem;
  }
}
</style>
