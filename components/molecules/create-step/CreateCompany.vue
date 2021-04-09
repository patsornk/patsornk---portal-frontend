<template>
  <div class="create-company-container">
    <div class="w-full">
      <stepbar :title="stepTitle" />
      <slot></slot>
    </div>
    <button
      @click="
        $store.dispatch(
          'stepbar/setNextState',
          $store.state.stepbar.nextState + 1
        )
      "
    >
      Save
    </button>
    <div class="footer">
      <t-1-button type="black-transparent"
        >Cancel</t-1-button
      >
      <t-1-button type="disable"
        >Create new company</t-1-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Stepbar from '@/components/molecules/create-step/Stepbar.vue'
import T1Button from '@/components/atoms/button.vue'
import { StepbarContent } from '~/constants'

@Component({
  components: {
    Stepbar,
    T1Button
  }
})
export default class CreateCompany extends Vue {
  private stepTitle = StepbarContent
}
</script>

<style lang="scss" scoped>
.create-company-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 50px;

  .footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 34px;
    border-top: 1px solid #efefef;
    width: 100%;

    .t1-button {
      width: 200px;
    }

    .black-transparent {
      margin-right: 42px;
    }
  }
}
</style>
