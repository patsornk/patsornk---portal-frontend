<template>
  <div>Create New Branch</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {}
})
export default class Main extends Vue {
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Company list',
        url: '/'
      },
      {
        title: 'Create New Branch',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch(
      'breadcrumb/setBreadcrumb',
      breadcrumb
    )

    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      'Create New Branch'
    )
  }

  mounted(): void {
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
