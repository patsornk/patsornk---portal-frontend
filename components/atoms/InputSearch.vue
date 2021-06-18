<template>
  <div class="input-search-container">
    <v-select
      class="input-select"
      v-model="dataValue.searchBy"
      :options="options"
      :label="optionsLabel"
      :reduce="optionsReduce"
      :searchable="false"
      :map-keydown="deleteHandler"
    />
    <input
      class="input-search"
      v-model="dataValue.keyword"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InputSearch extends Vue {
  @Prop({
    required: false,
    type: Object
  })
  private value: any

  @Prop({
    type: String
  })
  private placeholder?: string

  @Prop({
    type: Array,
    default() {
      return []
    }
  })
  private options?: []

  @Prop({
    type: String,
    default: 'label'
  })
  private optionsLabel?: string

  @Prop({
    type: Function,
    default: (item: any) => item.id
  })
  private optionsReduce?: () => {}

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  deleteHandler(map: any) {
    return {
      ...map,
      8: (e: any) => {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.input-search-container {
  width: 100%;
  height: 42px;
  font-size: 14px;
  display: flex;

  .input-select {
    width: 255px;
    height: 100%;
    border: none;
    color: $gray-disable;

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
      border-right: none;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }

  .input-search {
    font-size: 16px;
    padding: 9px;
    border: 1px solid $gray-disable;
    border-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    width: 100%;
  }

  .input-search:focus {
    outline: none !important;
  }

  .no-border {
    border: none;
  }
  ::placeholder {
    color: $gray-disable;
  }
}
</style>
