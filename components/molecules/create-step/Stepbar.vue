<template>
  <div class="step-bar-container">
    <div v-for="(item, index) in title" :key="index" class="step-bar">
      <div
        class="step"
        :class="{
          nomargin: index + 1 === title.length
        }"
      >
        <div
          class="status"
          :class="{
            active: index === currentState && index != title.length-1,
            disabled: index > maxState
          }"
          @click="onClickStep(index)"
        >
          <img
            v-if="showCompletedIcon(index)"
            :src="assets('common/check.png')"
          />
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span
          class="title"
          :class="{
            active: index <= maxState
          }"
        >
          {{ item.title }}
        </span>
      </div>
      <div
        v-if="index + 1 !== title.length"
        class="line"
        :class="{ disabled: index >= maxState }"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'

interface StepData {
  title: string
  value: string
}

@Component
export default class Stepbar extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  readonly title!: StepData[]

  assets(name: string) {
    return getAssetsPath(name)
  }

  get maxState() {
    return this.$store.state.stepbar.maxState
  }

  get currentState() {
    return this.$store.state.stepbar.currentState
  }

  set currentState(index: number) {
    this.$store.dispatch('stepbar/setCurrentState', index)
  }

  private showCompletedIcon(index: number): boolean {
    return (index < this.maxState && index != this.currentState) || index == this.title.length-1
  }

  private onClickStep(index: number): void {
    if (index <= this.maxState) {
      this.currentState = index
      this.$router.push(this.title[index].value)
    }
  }

  private initCurrentState() {
    const currentStateName = this.$route.params.currentStep
    if (this.title) {
      const index = this.title.findIndex(
        (item) => item.value === currentStateName
      )
      this.$store.dispatch('stepbar/setCurrentState', index)
      this.$store.dispatch('stepbar/setNextState', index)
    }
  }

  mounted() {
    this.initCurrentState()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.step-bar-container {
  display: flex;
  justify-content: center;
  width: 100%;

  .step-bar {
    position: relative;
    z-index: 1;

    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 60px;
      position: relative;
      z-index: 1;

      .status,
      .status-absolute {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 24px;
        font-weight: 400;

        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: $primary;
        color: $white;
        cursor: pointer;
      }

      .status-absolute {
        position: absolute;
        z-index: -1;
      }

      .title {
        font-size: 16px;
        font-weight: 400;
        color: $gray-disable;
      }

      .title.active {
        color: $primary;
      }

      .status.active,
      .status-absolute.active {
        background: $white;
        border: 2px solid $primary;
        color: $primary;
      }

      .status.disabled,
      .status-absolute.disabled {
        background: $gray-disable;
        cursor: context-menu;
      }
    }

    .line {
      position: absolute;
      top: 30%;
      left: 65px;
      z-index: 0;

      width: 170px;
      height: 4px;
      background-color: $primary;
    }

    .line.disabled {
      background: $gray-disable;
    }

    .nomargin {
      margin: 0px;
    }
  }
}
</style>
