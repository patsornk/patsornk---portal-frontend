<template>
  <div>
    Organiz Management
    <t-1-button
      @click.native="
        $router.push('/organizationManagement/create')
      "
      >Create</t-1-button
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'

@Component({
  components: {
    T1Button
  }
})
export default class OrganizationManagement extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>