<template>
  <div class="feature-tab-header-container">
    <feature-tab
      v-for="index in range"
      :key="index"
      :value="index.toString()"
      :active="index == activeIndex"
      @clickTab="$emit('selectBrandFeature', index)"
    />
    <feature-tab
      v-if="range < 8"
      :newTab="true"
      @clickTab="$emit('createBrandFeature')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import FeatureTab from '~/components/atoms/FeatureTab.vue'

@Component({
  components: {
    FeatureTab
  }
})
export default class BrandFeatureHeader extends Vue {
  @Prop({
    type: Number,
    required: true
  })
  readonly activeIndex!: number

  @Prop({
    type: Number,
    required: true
  })
  readonly range!: number

  mounted(): void {}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.feature-tab-header-container {
  display: flex;
  align-items: center;
  border-bottom-color: '#EFEFEF';
  border-bottom-width: 1px;
}
</style>
