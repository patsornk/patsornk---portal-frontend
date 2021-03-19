<template>
  <div class="sidenav-container">
    <div
      v-if="toggleSidebar"
      class="backdrop"
      @click="$store.dispatch('nav/toggleSidebar')"
    ></div>

    <transition name="slide-side">
      <div v-if="toggleSidebar" class="sidenav-mobile">
        <sidebar-menu-content />
      </div>
    </transition>

    <div v-if="!toggleSidebar" class="sidenav-desktop">
      <sidebar-menu-content />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SidebarMenuContent from '~/components/organisms/navbar/SidebarMenuContent.vue'

@Component({
  components: {
    SidebarMenuContent
  }
})
export default class SidebarNav extends Vue {
  get toggleSidebar() {
    return this.$store.getters['nav/toggleSidebar']
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.sidenav-container {
  height: 100%;
  width: 100%;
}

.sidenav-mobile,
.sidenav-desktop {
  height: 100%;
}

.sidenav-mobile {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
}

.backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
}

.slide-side-enter-active,
.slide-side-leave-active {
  transition: all 0.3s ease-out;
}

.slide-side-enter,
.slide-side-leave-to {
  transform: translateX(-100%);
}

@media screen and (max-width: 767px) {
  .sidenav-desktop {
    display: none;
  }
}
</style>
