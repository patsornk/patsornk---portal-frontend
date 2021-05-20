<template>
  <div class="website-container">
    <div class="input-box" v-for="(item, index) in dataList" :key="index">
      <input-field
        class="input-website"
        v-model="dataList[index]"
        placeholder="Website Link"
        :maxlength="255"
      />
      <img
        class="icon-close"
        :src="assets('icon/close.png')"
        @click="removeInput(index)"
      />
    </div>
    <div class="btn-add" @click="addInput">
      <span class="material-icons icon"> add </span>
      <span>{{ $t('createBranch.mallInfo.addWebsite') }} </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import InputField from '~/components/atoms/InputField.vue'
import { getAssetsPath } from '~/helper/images'

@Component({
  components: {
    InputField
  }
})
export default class AddWebsite extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  private value?: string[]

  get dataList() {
    return this.value
  }

  set dataList(value) {
    this.dataList = value
  }

  mounted() {
    if (this.dataList?.length === 0) {
      this.$emit('input', [''])
    }
  }

  addInput() {
    this.dataList?.push('')
  }

  removeInput(index: number) {
    console.log(index)
    console.log('dataList', this.dataList)
    this.dataList?.splice(index, 1)
    console.log('dataList', this.dataList)
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.website-container {
  margin-top: 20px;

  .input-box {
    display: flex;

    .input-website {
      width: 605px;
      margin: 0px 30px;

      &.input-field-input {
        font-size: 16px;
        padding: 9px;
        border: 1px solid $gray-disable;
        border-radius: 4px;
        width: 100%;
      }

      &.input-field-input:focus {
        outline: none !important;
      }

      &.input-field-input-error {
        border: 1px solid $primary !important;
        border-radius: 4px;
      }

      &.input-field-input-error .vs__dropdown-toggle {
        border: 1px solid $primary;
      }
    }

    .icon-close {
      cursor: pointer;
      width: 16px;
      height: 16px;
      margin-top: 22px;
    }
  }

  .btn-add {
    cursor: pointer;
    height: 36px;
    width: 118px;
    font-size: 14px;
    font-weight: 700;
    line-height: 22px;
    color: $primary;
    background: $primary-bg;
    border-radius: 6px;
    padding: 6px;
    margin: 19px 0px 0px 30px;

    .icon {
      font-size: 14px;
      font-weight: 700;
      padding-top: 2px;
    }
  }
}
</style>
