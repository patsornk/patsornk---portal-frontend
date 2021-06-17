<template>
  <div>
    <div class="tab-container" @click="$emit('clickTab')">
      <div v-if="!newTab">{{ value }}</div>
      <span v-else class="material-icons">add</span>
    </div>
    <div :class="{ 'active-bar': active }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class FeatureTab extends Vue {
  @Prop({
    type: String
  })
  readonly value!: string

  @Prop({
    type: Boolean
  })
  readonly active!: boolean

  @Prop({
    type: Boolean
  })
  readonly newTab!: boolean

  mounted(): void {}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.tab-container {
  width: 37px;
  height: 37px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus,
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    outline: none;
  }
}
.active-bar {
  position: absolute;
  width: 37px;
  height: 3px;
  background-color: $primary;
  border-radius: 4px 4px 0px 0px;
  margin-top: -3px;
}
</style>
