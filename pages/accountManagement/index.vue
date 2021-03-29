<template>
  <div>Account Management</div>
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
        title: 'Account Management',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch(
      'breadcrumb/setBreadcrumb',
      breadcrumb
    )

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      'Account Management'
    )
  }

  mounted(): void {
    this.setupBreadcrumb()
    this.$toast.show('Create company success', {
      icon: {
        name: 'check_circle',
        after: false
      }
    })
    this.$toast.success(`Create company success`, {
      icon: {
        name: 'check_circle',
        after: false
      }
    })
    this.$toast.error(`Create company success`, {
      icon: {
        name: 'cancel',
        after: false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
