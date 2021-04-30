<template>
  <div class="service-container">
    <div class="logo-container">
      <div class="logo-img">
        <img class="logo" src="@/assets/images/navbar/profile.jpg" />
      </div>
      <img
        v-if="isApply && !isActive"
        class="close"
        src="@/assets/images/service/close.png"
        @click="$emit('unApply')"
      />
      <div class="active" v-if="isActive">Active</div>
    </div>
    <div class="title-box">
      <div>{{ title }}</div>
      <img class="view-detail" src="@/assets/images/service/view-detail.png" />
    </div>
    <div class="detail">{{ detail }}</div>
    <div class="footer">
      <button class="apply" v-if="!isApply" @click="$emit('onApply')">
        Apply
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Service extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly logo!: string

  @Prop({
    type: String,
    required: true
  })
  readonly title!: string

  @Prop({
    type: String,
    required: true
  })
  readonly detail!: string

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isApply!: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  readonly isActive!: boolean
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.service-container {
  padding: 10px 27px 16px 27px;
  box-shadow: $box-shadow-black;

  .logo-container {
    display: flex;
    justify-content: space-between;

    .logo-img {
      width: 44px;
      height: 44px;

      img {
        object-fit: cover;
        border-radius: 50%;
        width: 44px;
        height: 44px;
      }
    }

    .close {
      cursor: pointer;
      object-fit: contain;
    }

    .active {
      height: 22px;
      background: $white;
      border: 2px solid $success;
      color: $success;
      border-radius: 16px;
      font-size: 12px;
      padding: 0px 12px;
      margin-top: 11px;
    }
  }

  .title-box {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $primary;
    margin-top: 18px;
    padding-bottom: 10px;
    font-size: 36px;

    .view-detail {
      width: 8px;
      height: 16px;
      margin-top: 22px;
      cursor: pointer;
    }
  }

  .detail {
    font-size: 12px;
    font-weight: 400;
    margin-top: 12px;
  }

  .footer {
    margin-top: 20px;
    height: 36px;
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .apply {
      display: flex;
      justify-content: center;
      align-items: center;

      background: $mid-black;
      color: $white;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      width: 112px;
      height: 36px;

      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>