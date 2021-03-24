<template>
  <div class="breadcrumb flex">
    <div
      class="breadcrumb-item"
      v-for="(item, index) in breadcrumbs"
      :key="index"
    >
      <div class="flex items-center" v-if="!item.active">
        <span class="title-inactive">{{ item.title }}</span>
        <img
          src="@/assets/images/breadcrumb/arrow-right-grey.png"
        />
      </div>
      <div v-else>
        <span class="title-active">{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'

@Component
export default class Breadcrumb extends Vue {
  get breadcrumbs(): BreadcrumbType[] {
    return this.$store.getters['breadcrumb/breadcrumbs']
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.breadcrumb {
  .breadcrumb-item {
    .title-inactive,
    .title-active {
      font-size: 16px;
      color: $grey-1;
    }

    img {
      margin: 0rem 0.5rem;
      height: 10px;
      width: 5px;
    }

    .title-active {
      color: $primary;
      font-weight: 700;
    }
  }
}
</style>