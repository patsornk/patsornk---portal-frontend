<template>
  <div>
    <t1-button
      class="btn-create"
      @click.native="
        $router.push(
          'organizManagement/create/'
        )
      "
    >
      <span class="material-icons icon-add"> add </span>
      Create new company
    </t1-button>
    <t1-button
      class="btn-create"
      @click.native="clickCompanyDetails"
    >
      Company Details
    </t1-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'
import T1Button from '@/components/atoms/button.vue'

@Component({
  components: { T1Button }
})
export default class Main extends Vue {
  private companyId = 1

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Company List',
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
      'Company List'
    )
  }

  private clickCompanyDetails() {
    this.$store.dispatch('nav/setNavbarMenu', {
      ref: 'organizationManagement',
      menu: '00000'
    })
    this.$router.push(
      `/organizationManagement/${this.companyId}`
    )
  }

  mounted(): void {
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.btn-create {
  width: 207px;

  .icon-add {
    font-size: 16px;
    margin-left: -5px;
    margin-right: 8px;
    align-items: center;
    display: flex;
  }
}
</style>
