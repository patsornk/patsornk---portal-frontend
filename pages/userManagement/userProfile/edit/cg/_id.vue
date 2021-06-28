<template>
  <div>
    <user-profile-cg :userId="userId" mode="edit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserProfileCg from '~/components/organisms/user-management/UserProfileCg.vue'

@Component({
  components: { UserProfileCg }
})
export default class UserProfileCgEdit extends Vue {

  get userId(): string {
    return this.$route.params.id
  }

  mounted() {
    if (!this.$auth.loggedIn) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>