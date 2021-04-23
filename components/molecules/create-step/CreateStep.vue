<template>
  <div class="create-step-container">
    <div class="w-full h-full">
      <stepbar :title="stepTitle" />
      <create-company v-show="param === step.COMPANY" />
      <create-partner-code v-show="param === step.PARTNERCODE" />
      <create-brand v-show="param === step.BRAND" />
    </div>
    <!-- for debug stepbar (action is next stepbar)-->
    <!-- <button
      @click="
        $store.dispatch(
          'stepbar/setNextState',
          $store.state.stepbar.nextState + 1
        )
      "
    >
      Save
    </button> -->
    <div class="footer">
      <t-1-button type="black-transparent"> Cancel </t-1-button>
      <t-1-button type="disable"> Create new company </t-1-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Stepbar from '@/components/molecules/create-step/Stepbar.vue'
import T1Button from '@/components/atoms/button.vue'
import CreateCompany from '@/components/organisms/create-company/company.vue'
import CreateBrand from '@/components/organisms/create-brand/brand.vue'
import { StepbarContent, CreateStepBar } from '~/constants'
import CreatePartnerCode from '@/components/organisms/create-partner-code/partnerCode.vue'

@Component({
  components: {
    Stepbar,
    T1Button,
    CreateCompany,
    CreateBrand,
    CreatePartnerCode
  }
})
export default class CreateStep extends Vue {
  @Prop({
    required: true,
    type: String
  })
  readonly param!: string

  private stepTitle = StepbarContent
  private step = CreateStepBar
}
</script>

<style lang="scss" scoped>
.create-step-container {
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
