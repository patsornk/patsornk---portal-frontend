<template>
  <div class="input-field">
    <div class="w-full" v-if="title">
      <span class="input-title" v-if="type !== 'switch'">{{ title }}</span>
      <span v-show="required" class="input-field-required"> *</span>
    </div>
    <div class="input-field-input-group w-full">
      <div :class="errorMessage ? 'input-field-input-error' : ''">
        <div
          v-if="type === 'textarea' || type === 'select' || type === 'switch'"
        >
          <v-select
            class="input-select"
            :class="errorMessage ? 'no-border' : ''"
            v-if="type === 'select'"
            v-model="dataValue"
            :options="options"
            :label="optionsLabel"
            :reduce="optionsReduce"
            :placeholder="placeholder"
            :searchable="false"
            @blur="$emit('onBlur')"
          />
          <div v-if="type === 'switch'" class="switch-container">
            <label class="switch">
              <input
                type="checkbox"
                :checked="dataValue ? true : false"
                @click="$emit('input', !dataValue)"
              />
              <span class="slider round"></span>
            </label>
            <span class="switch-title">{{ title }}</span>
          </div>
          <textarea
            v-if="type === 'textarea'"
            class="textarea"
            rows="4"
            cols="200"
            :inputmode="inputmode"
            :maxlength="maxlength"
            v-model="dataValue"
          ></textarea>
        </div>
        <input
          v-else
          v-model="dataValue"
          :type="type"
          class="input-field-input"
          :class="errorMessage ? 'no-border' : ''"
          :inputmode="inputmode"
          :placeholder="placeholder"
          :maxlength="maxlength"
          @blur="$emit('onBlur')"
        />
        <slot />
      </div>
      <span
        v-if="errorMessage"
        class="text-danger text-sm validation-error-text"
      >
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class InputField extends Vue {
  @Prop({
    required: true,
    type: undefined
  })
  private value: undefined

  @Prop({
    default: '',
    type: String
  })
  private title!: string

  @Prop({
    default: false,
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
      return [
        'text',
        'number',
        'select',
        'password',
        'textarea',
        'switch'
      ].includes(value)
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

  @Prop({
    type: String
  })
  private inputmode?: string

  @Prop({
    type: Number
  })
  private maxlength?: number | undefined

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  @Watch('dataValue')
  changeDataValue() {
    this.$emit('onChange')
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

    .textarea {
      width: 100%;
      border: 1px solid $gray-disable;
      border-radius: 4px;
      padding: 10px;
      :focus {
        outline: none !important;
      }
    }
    .textarea:focus {
      outline: none !important;
    }

    .input-select {
      height: 44.67px;
      border: none;

      &.no-border {
        border: none;

        ::v-deep .vs__dropdown-toggle {
          border: none !important;
        }
      }

      .dropdown-option {
        display: flex;
        width: 100%;
      }

      ::v-deep .vs__clear {
        display: none;
      }

      ::v-deep .vs__selected {
        position: inherit;
      }

      ::v-deep .vs__dropdown-toggle {
        height: 100%;
        border: 1px solid $gray-disable;
      }
    }

    .switch-container {
      .switch-title {
        font-size: 14px;
        color: $grey-text;
        margin-left: 17px;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 42px;
        height: 22px;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 2px;
        left: 2px;
        right: -2px;
        bottom: -2px;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      .slider:before {
        position: absolute;
        content: '';
        height: 17px;
        width: 17px;
        top: 2px;
        left: 2px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
      }

      input:checked + .slider {
        background-color: $success;
      }

      input:checked + .slider:before {
        -webkit-transform: translateX(21px);
        -ms-transform: translateX(21px);
        transform: translateX(21px);
      }

      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }

      .slider.round:before {
        border-radius: 50%;
      }
    }
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
