<template>
  <div class="profile-nav">
    <div class="profile-img">
      <!-- get profile -->
      <img :src="assets('navbar/profile.jpg')" />
    </div>
    <div class="profile-content">
      <span class="name">robert.s@email.com</span>
      <span class="role">Admin The 1</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'

@Component
export default class ProfileNav extends Vue {
  assets(name: string) {
    return getAssetsPath(name)
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