<template>
  <div class="sidebar-content">
    <!-- Logo -->
    <div>
      <span class="logo">The 1 Portal</span>
      <profile-nav />
      <nav-menu-group />
    </div>
    <nav-menu-item
      class="logout"
      :label="$t('common.logout')"
      @click.native="onClickLogout"
      :active="true"
      icon="logout.png"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavMenuItem from '~/components/atoms/navbar/NavMenuItem.vue'
import NavMenuGroup from '~/components/molecules/navbar/NavMenuGroup.vue'
import ProfileNav from '~/components/molecules/navbar/ProfileNav.vue'

@Component({
  components: {
    NavMenuItem,
    NavMenuGroup,
    ProfileNav
  }
})
export default class SidebarMenuContent extends Vue {
  onClickLogout() {
    
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.sidebar-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;
  width: 260px;
  background-color: $white;
  padding: 30px 0px;

  .logo {
    padding: 0px 23px;
    font-size: 36px;
    font-weight: 700;
  }

  .logout {
    ::v-deep .title {
      color: $mid-black;
    }
  }
}
</style>
