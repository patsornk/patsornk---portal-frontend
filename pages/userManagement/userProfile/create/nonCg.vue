<template>
  <div>
    <user-profile-non-cg mode="create"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserProfileNonCg from '~/components/organisms/user-management/UserProfileNonCg.vue'

@Component({
  components: { UserProfileNonCg }
})
export default class UserProfileNonCgCreate extends Vue {
  
}
</script>

<style lang="scss" scoped>

</style>