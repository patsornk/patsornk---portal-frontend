<template>
  <div class="create-step-container">
    <div class="w-full h-full">
      <stepbar :title="stepTitle" />
      <create-company v-show="param === step.COMPANY" />
      <create-partner-code v-show="param === step.PARTNERCODE" />
      <create-brand v-show="param === step.BRAND" />
      <create-branch v-show="param === step.BRANCH" />
      <service-selection v-show="param === step.SERVICE" />
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
      {{$t('common.save')}}
    </button> -->
    <div class="footer">
      <t-1-button type="black-transparent" @click.native="cancleOrgHandler">
        {{ $t('common.cancel') }}
      </t-1-button>
      <t-1-button :type="btnStatus" @click.native="createNewCompany">
        {{ $t('common.createNewCompany') }}
      </t-1-button>
    </div>

    <dialog-popup
      :display="dialogDisplay"
      title="Want to Create New Organization  ?"
      description="To make sure, Please check the information before click ‘Create New Organization’ "
      leftButtonTitle="Cancel"
      rightButtonTitle="Create New Organization "
      @onLeftButtonClick="dialogCancelAction"
      @onRightButtonClick="dialogAction"
      leftStyle="width: 120px;"
      rightStyle="width: 210px;"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Stepbar from '@/components/molecules/create-step/Stepbar.vue'
import T1Button from '@/components/atoms/button.vue'
import CreateCompany from '@/components/organisms/create-company/company.vue'
import CreateBrand from '@/components/organisms/create-brand/brand.vue'
import CreateBranch from '@/components/organisms/create-branch/branch.vue'
import CreatePartnerCode from '@/components/organisms/create-partner-code/partnerCode.vue'
import ServiceSelection from '~/components/organisms/services-selection/serviceSelection.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'
import { StepbarContent, CreateStepBar } from '~/constants'

@Component({
  components: {
    Stepbar,
    T1Button,
    CreateCompany,
    CreateBrand,
    CreateBranch,
    CreatePartnerCode,
    ServiceSelection,
    DialogPopup
  }
})
export default class CreateStep extends Vue {
  @Prop({
    required: true,
    type: String
  })
  readonly param!: string

  $i18n: any

  get language(): any {
    return this.$i18n.locale
  }

  get stepTitle() {
    return [
      {
        title: this.$t('createCompany.createCompany').toString(),
        value: 'company'
      },
      {
        title: this.$t('common.createPartnerCode').toString(),
        value: 'partnercode'
      },
      { title: this.$t('common.createBrand').toString(), value: 'brand' },
      { title: this.$t('common.createBranch').toString(), value: 'branch' },
      { title: this.$t('common.serviceSelection').toString(), value: 'service' }
    ]
  }
  private step = CreateStepBar
  private dialogDisplay = false

  get btnStatus() {
    return this.isEnableSubmit && this.isMaxState ? '' : 'disable'
  }

  get isEnableSubmit() {
    return this.$store.getters['stepbar/enableSubmit'] == 1 ? true : false
  }

  get isMaxState() {
    return this.$store.getters['stepbar/maxState'] == 4 ? true : false
  }

  cancleOrgHandler() {
    this.$router.push('/organizationManagement')
  }

  async createOrgHandler() {
    if (window.sessionStorage.getItem('maxStepbar') == '4') {
      const compId = parseInt(
        window.sessionStorage.getItem('createCompanyId') ?? '-1'
      )
      try {
        if (compId < 0) {
          throw 'Invalid company id'
        }
        let response = await this.$axios.$post(
          `${process.env.PORTAL_ENDPOINT}/submit_company`,
          { companyId: compId }
        )
        if (response.successful) {
          this.$router.push('/organizationManagement')
        }
      } catch (error) {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  createNewCompany() {
    if (this.isEnableSubmit && this.isMaxState) {
      this.dialogDisplay = true
    }
  }

  dialogCancelAction() {
    this.dialogDisplay = false
  }

  dialogAction() {
    this.dialogDisplay = false
    this.createOrgHandler()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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
    border-top: 1px solid $grey3;
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
