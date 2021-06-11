<template>
  <div class="website-container">
    <div class="list-box" v-for="(item, index) in dataList" :key="index">
      <div class="icon-social">
        <img :src="assets('icon/link.png')" />
      </div>
      <div class="link-box">
        <div class="link">{{ item }}</div>
        <div class="type">{{ $t('createBranch.mallInfo.website') }}</div>
      </div>
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

  addInput() {
    this.dataList?.push('')
  }

  removeInput(index: number) {
    this.dataList?.splice(index, 1)
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.website-container {
  margin: 24px 0px 0px 30px;

  .list-box {
    display: flex;
    margin-bottom: 17px;

    .icon-social {
      width: 24px;
      height: 24px;
      margin-top: 4px;
    }

    .link-box {
      margin-left: 19px;
      font-size: 16px;
      line-height: 24px;

      .link {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 600px;
      }

      .type {
        font-size: 14px;
        color: $gray-disable;
      }
    }
  }
}
</style>
