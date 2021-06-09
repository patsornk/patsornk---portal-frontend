<template>
  <div class="org-management-container">
    <user-list v-if="type === 'partner'" :type="type"/>
    <tab v-else :type="type"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import T1Button from '@/components/atoms/button.vue'
import Tab from '~/components/organisms/user-management/tab/index.vue'
import UserList from '~/components/organisms/user-management/UserList.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: {
    T1Button,
    Tab,
    UserList
  }
})
export default class UserManagement extends Vue {
  get language(): any {
    return this.$i18n.locale
  }

  // type = 'partner'
  type = 'the1'
  // type = 'bu'

  @Watch('language')
  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.userManagement').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.$t('home.landing.userManagement').toString()
    )
  }

  mounted() {
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
