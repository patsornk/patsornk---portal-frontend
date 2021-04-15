<template>
  <div>
    <t1-button
      class="btn-create"
      @click.native="
        $router.push(
          `/organizationManagement/brand/create/${$route.params}`
        )
      "
    >
      Create Brand
    </t1-button>
    <t1-button
      class="btn-create"
      @click.native="
        $router.push(
          `/organizationManagement/branch/create`
        )
      "
    >
      Create Branch
    </t1-button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'
import T1Button from '@/components/atoms/button.vue'

@Component({
  components: { T1Button }
})
export default class Main extends Vue {
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Company List',
        url: '/'
      },
      {
        title: this.$route.params.id,
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
      'Company Details'
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
