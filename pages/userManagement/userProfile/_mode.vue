<template>
  <div>
    <input-tag style="margin: 20px;" v-model="userRole" :option="userRoleList"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import InputTag from '~/components/atoms/InputTag.vue'
import { BreadcrumbType } from '~/constants'

@Component({
  components: { InputTag }
})
export default class UserProfile extends Vue {
  $i18n: any

  userRole = []

  userRoleList = [
    {
      id: 1,
      role: 'The 1 Admin'
    },
    {
      id: 2,
      role: 'Business Unit Admin'
    },
    {
      id: 3,
      role: 'Partner Admin'
    },
    {
      id: 4,
      role: 'Organization Approver'
    },
    {
      id: 5,
      role: 'Organization'
    },
    {
      id: 6,
      role: 'Content Approver'
    },
    {
      id: 7,
      role: 'Content Manager'
    },
    {
      id: 8,
      role: 'Content Staff'
    },
    {
      id: 9,
      role: 'Offer Approver'
    },
    {
      id: 10,
      role: 'Offer Manager'
    },
  ]

  get language(): any {
    return this.$i18n.locale
  }

  get mode() {
    return this.$route.params.mode
  }

  @Watch('language')
  changeLanguage(): void {
    this.setupBreadcrumb()
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.userManagement').toString(),
        url: '/'
      },
      {
        title:
          this.mode === 'create'
            ? this.$t('userManagement.createNewUser').toString()
            : this.$t('userManagement.editUser').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      this.mode === 'create'
        ? this.$t('userManagement.createNewUser').toString()
        : this.$t('userManagement.editUser').toString()
    )
  }

  mounted() {
    this.setupBreadcrumb()
  }
}
</script>

<style lang="scss" scoped>
</style>