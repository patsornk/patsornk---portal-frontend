<template>
  <div>
    <user-profile mode="edit" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserProfile from '~/components/organisms/user-management/UserProfile.vue'

@Component({
  components: { UserProfile }
})
export default class UserProfileCreate extends Vue {}
</script>

<style lang="scss" scoped></style>
