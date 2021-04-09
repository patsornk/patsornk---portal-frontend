<template>
  <div class="create-conpany-step-container">
    <create-company />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CreateCompany from '@/components/molecules/create-step/CreateCompany.vue'

@Component({
  components: {
    CreateCompany
  }
})
export default class CreateCompanyStep extends Vue {}
</script>

<style lang="scss" scoped>
</style>