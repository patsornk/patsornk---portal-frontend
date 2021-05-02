<template>
  <div class="create-conpany-step-container">
    <create-step :param="param" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CreateStep from '~/components/molecules/create-step/CreateStep.vue'

@Component({
  components: {
    CreateStep
  }
})
export default class CreateCompanyStep extends Vue {
  get param() {
    return this.$route.params.currentStep
  }
}
</script>

<style lang="scss" scoped></style>
