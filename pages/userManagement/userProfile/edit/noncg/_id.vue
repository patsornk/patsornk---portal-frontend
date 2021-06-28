<template>
  <div>
    <user-profile-non-cg :userId="userId" mode="edit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserProfileNonCg from '~/components/organisms/user-management/UserProfileNonCg.vue'

@Component({
  components: { UserProfileNonCg }
})
export default class UserProfileNonCgEdit extends Vue {

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