<template>
  <div class="profile-nav">
    <div class="profile-img">
      <!-- get profile -->
      <img :src="img(this.$auth.user)" />
    </div>
    <div class="profile-content">
      <span class="name">{{ this.$auth.user.username }}</span>
      <span class="role"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAssetsPath, getImagePath } from '~/helper/images'

@Component
export default class ProfileNav extends Vue {
  img(user: any) {
    if (user && user.userProfile && user.userProfile.profileImg) {
      return getImagePath(user.userProfile.profileImg)
    } else {
      return getAssetsPath('common/temporary-profile.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-nav {
  display: flex;
  padding: 50px 23px;

  .profile-img {
    width: 42px;
    height: 42px;
    margin-right: 12px;

    img {
      object-fit: cover;
      border-radius: 50%;
      width: 42px;
      height: 42px;
    }
  }

  .profile-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .name {
      font-size: 14px;
      font-weight: 700;
      text-align: left;
    }

    .role {
      text-align: left;
      font-size: 12px;
    }
  }
}
</style>
