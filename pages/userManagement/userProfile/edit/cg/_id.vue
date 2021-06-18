<template>
  <div>
    <user-profile-cg mode="edit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserProfileCg from '~/components/organisms/user-management/UserProfileCg.vue'

@Component({
  components: { UserProfileCg }
})
export default class UserProfileCgCreate extends Vue {
  
}
</script>

<style lang="scss" scoped>

</style>