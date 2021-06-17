<template>
  <div class="nav-menu-item">
    <div :class="active ? 'content-active' : 'content'">
      <div class="icon-text flex items-center">
        <img class="mr-4" v-if="icon" :src="imageIcon" width="20" />
        <span :class="active ? 'title-active' : 'title'">{{ label }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'

@Component
export default class NavMenuItem extends Vue {
  private imagePreUrl: string = getAssetsPath('mages/navbar/')
  @Prop({
    type: String,
    default: undefined
  })
  readonly icon?: string

  @Prop({
    // required: true,
    type: String,
    default: ''
  })
  readonly label?: String

  @Prop({
    required: true,
    type: Boolean
  })
  readonly active!: boolean

  get imageIcon() {
    const image = getAssetsPath(`navbar/${this.icon}`)
    return image
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.nav-menu-item {
  .content,
  .content-active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    padding: 0px 23px;

    .title,
    .title-active {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
    }

    .title {
      color: $gray-disable;
      font-weight: normal;
    }

    .title-active {
      color: $primary;
      font-weight: bold;
    }
  }

  .content-active {
    background-color: $gray-bg-fade;
    border-left: 4px solid $primary;
    padding: 0px 19px;
  }
}
</style>
