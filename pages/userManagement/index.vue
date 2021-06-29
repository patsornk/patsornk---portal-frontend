<template>
  <div class="org-management-container">
    <user-list v-if="type === 'partner'" tab="ncg" :type="type" />
    <tab v-else :type="type" />
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

  get user(): any {
    return this.$auth.user
  }

  get type(): string {
    if (this.user.userType && this.user.userType.typeId) {
      switch (this.user.userType.typeId) {
        case 1:
          return 'the1'
        case 2:
          return 'bu'
        case 3:
          return 'partner'
        default:
          return 'the1'
      }
    } else {
      return 'the1'
    }
  }

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
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
</style>
