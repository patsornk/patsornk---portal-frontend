<template>
  <header class="header-bar">
    <div
      class="drawer-toggle"
      role="button"
      @click="$store.dispatch('nav/toggleSidebar')"
    >
      <img src="@/assets/images/navbar/hamberger.png" />
    </div>

    <div class="app-links">
      <change-lang />
      <img
        class="ml-8 cursor-pointer"
        src="@/assets/images/navbar/menu-group.png"
        @click="onClickMenuApps"
      />
      <div
        class="menu-apps grid grid-cols-3 gap-4"
        v-show="toggleShowMenuApps"
      >
        <div
          class="flex flex-col items-center cursor-pointer"
          v-for="(app, index) in menuApps"
          :key="index"
          @click="onClickMenuAppItem(app.value)"
        >
          <div class="menu-apps-icon" />
          <span>{{ app.title }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangeLang from '~/components/atoms/dropdown-lang/ChangeLang.vue'
import { Organization } from '~/constants'

@Component({
  components: {
    ChangeLang
  }
})
export default class HeaderNav extends Vue {
  private toggleShowMenuApps: boolean = false

  private onClickMenuApps(): void {
    this.toggleShowMenuApps = !this.toggleShowMenuApps
  }

  private onClickMenuAppItem(value: string): void {
    this.$store.dispatch('nav/setOrganization', value)
    this.onClickMenuApps()
  }

  get menuApps() {
    //mock data should get by role
    return [
      {
        title: 'By feature',
        value: Organization.FEATURE
      },
      {
        title: 'By member',
        value: Organization.MAMBER
      },
      {
        title: 'By request',
        value: Organization.REQUEST
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.header-bar {
  .app-links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  .brand-name {
    margin: 0 10px;
    font-size: 1.3rem;
  }

  .brand-name a {
    text-decoration: none;
    color: white;
  }

  .drawer-toggle .bar {
    width: 90%;
    height: 2px;
    background-color: white;
  }

  .drawer-toggle {
    display: flex;
    justify-self: end;
    flex-direction: column;
    justify-content: space-around;
    height: 50%;
    width: 35px;
    padding-right: 16px;
    cursor: pointer;
  }

  .menu-apps {
    position: fixed;
    right: 24px;
    top: 70px;

    padding: 20px;
    background-color: $white;
    box-shadow: $box-shadow-black;
    border-radius: 9px;

    .menu-apps-icon {
      background-color: $grey-3;
      border-radius: 9px;
      width: 60px;
      height: 60px;
    }
  }
}

header {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  box-shadow: 10px 6px 12px rgba(0, 0, 0, 0.1);
  background-color: $white;
  height: 64px;
  z-index: 1;
}
@media (max-width: 767px) {
  header {
    padding: 0 16px;
  }
  header:nth-child {
    justify-self: end !important;
  }
  .header-bar {
    .app-links {
      display: none;
    }
  }
}
@media (min-width: 768px) {
  header {
    padding: 0 24px;
  }
  .header-bar {
    .app-links {
      display: flex;
    }
    .drawer-toggle {
      display: none;
    }
  }
}
</style>
