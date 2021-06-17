<template>
  <div class="input-tag-container">
    <div class="title-box w-full" v-if="title">
      <span class="input-title">{{ title }}</span>
      <span v-show="required" class="input-field-required"> *</span>
    </div>
    <div class="tag-inline">
      <div class="tag-container" v-for="item in dataValue" :key="item.id">
        <div class="tag">
          {{ item.role }}
          <img
            class="icon"
            :src="assets('icon/close.png')"
            @click="removeItem(item)"
          />
        </div>
      </div>
    </div>
    <div class="multiselect" v-click-outside="closeDropdown">
      <div @click="showCheckboxes">
        <div class="select-role" :class="errorMessage ? 'error' : ''">
          {{ $t('userManagement.userProfile.selectUserRole') }}
          <img
            class="icon"
            :src="assets('icon/arrow-down.png')"
            @click="removeItem(item)"
          />
        </div>
      </div>
      <div v-if="expanded" class="checkboxes">
        <label class="item-please-select">
          {{ $t('common.pleaseSelect') }}
        </label>
        <label class="item-checkbox" v-for="item in option" :key="item.id">
          <input
            type="checkbox"
            @click="selectValue(item)"
            :checked="isCheckItemInSelectValue(item)"
          />
          <span class="checkbox-text">{{ item.role }}</span>
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
    <div class="error-message-box">
      <span v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'

@Component
export default class InputTag extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  private value!: Array<object>

  @Prop({
    required: true,
    type: Array
  })
  private option!: Array<object>

  @Prop({
    default: '',
    type: String
  })
  private title?: string

  @Prop({
    default: '',
    type: String
  })
  private errorMessage?: string

  @Prop({
    default: false,
    type: Boolean
  })
  private required?: boolean

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  expanded = false

  mounted() {}

  showCheckboxes() {
    this.expanded = !this.expanded
  }

  closeDropdown() {
    this.expanded = false
  }

  selectValue(itemCheck: any) {
    const isHave = this.isCheckItemInSelectValue(itemCheck)
    if (isHave) {
      this.removeItem(itemCheck)
    } else {
      this.dataValue.push(itemCheck)
    }
  }

  isCheckItemInSelectValue(item: any) {
    return this.dataValue.filter((data) => data === item).length > 0
  }

  removeItem(item: any) {
    this.dataValue = this.dataValue.filter((data) => data !== item)
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.input-tag-container {
  font-size: 16px;
  line-height: 20px;

  .title-box {
    margin-bottom: 8px;

    .input-title {
      font-size: 16px;
      font-weight: 700;
    }

    .input-field-required {
      margin-left: 0.25rem;
      color: $primary;
      font-weight: 700;
    }
  }

  .tag-inline {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 9px;

    .tag-container {
      display: inline;

      .tag {
        display: flex;
        border-radius: 30px;
        background: $tritery-red;
        color: $primary;
        padding: 5px 16px 5px 10px;
        margin: 0px 14px 8px 0px;

        .icon {
          cursor: pointer;
          width: 10px;
          height: 10px;
          margin-top: 6px;
          margin-left: 16px;
        }
      }
    }
  }

  .multiselect {
    width: 100%;

    .select-role {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      width: 100%;
      height: 42px;
      color: $gray-disable;
      border: 1px solid $gray-disable;
      border-radius: 4px;
      padding-left: 15px;
      padding: 9px 16px;

      .icon {
        height: 5.24px;
        width: 10.2px;
        margin-top: 9px;
      }

      &.error {
        border: 1px solid $primary;
      }
    }

    .checkboxes {
      height: 300px;
      overflow: auto;
      border: 1px #dadada solid;
      box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .item-please-select {
        font-size: 16px;
        line-height: 20px;
        color: $gray-disable;
        padding: 10px 16px;
        background-color: $grey-hover-dropdown;
      }

      .item-checkbox {
        color: $mid-black;
        padding: 10px 16px;
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
          position: absolute;
          cursor: pointer;
          opacity: 0;
          height: 0;
          width: 0;
        }

        .checkbox-text {
          font-size: 16px;
          line-height: 20px;
          margin-left: 8px;
        }

        .checkmark {
          position: absolute;
          top: 15px;
          left: 16px;
          height: 15px;
          width: 15px;
          background-color: $white;
          border: 1px solid $grey-text;
          border-radius: 3px;
        }
      }

      .item-checkbox input:checked ~ .checkmark {
        background-color: $primary;
        border: 1px solid $primary;
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }

      .item-checkbox input:checked ~ .checkmark:after {
        display: block;
      }

      .item-checkbox .checkmark:after {
        left: 4px;
        top: 1px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    .checkboxes label {
      display: block;
    }

    .checkboxes label:hover {
      background-color: $grey-hover-dropdown;
    }
  }

  .error-message-box {
    height: 24px;

    .error-message {
      color: $primary;
      font-size: 14px;
      margin-top: 0.4rem;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 18px;
    background: $scroll-bg;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 18px;
    background: $grey-text;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
