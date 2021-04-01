<template>
  <div class="phone-num-input">
    <div class="flex w-full">
      <span class="title">{{ title }}</span>
      <span class="required" v-show="required"> *</span>
    </div>
    <div class="flex w-full">
      <div class="prefix">
        <v-select
          :searchable="false"
          :options="countryCodes"
          v-model="prefix"
          :reduce="(codes) => codes.label"
          label="text"
        >
          <template #selected-option="option">
            {{ option.label }}
          </template>
          <template v-slot:option="option">
            {{ option.text }}
          </template>
        </v-select>
      </div>
      <input
        class="input-text"
        v-model="dataValue"
        type="text"
        inputmode="tel"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Model,
  Watch
} from 'vue-property-decorator'
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

  .input-text,
  .prefix {
    font-size: 16px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
  }

  .input-text {
    padding: 10px;
  }

  .input-text:focus {
    outline: none !important;
  }

  .prefix {
    margin-right: 1rem;

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
}
</style>