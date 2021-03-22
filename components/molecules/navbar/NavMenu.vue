<template>
  <div class="nav-menu">
    <nav-menu-item
      :active="activeMenu"
      :label="menu.title"
      :icon="menu.icon"
    >
      <img
        src="@/assets/images/navbar/arrow-right.png"
        v-if="menu.subMenu"
      />
    </nav-menu-item>
    <div class="sub-menu" v-show="activeMenu">
      <nav-menu-item
        v-for="(item, index) in menu.subMenu"
        :key="index"
        :active="activeSubMenu === index"
        :label="item.title"
        @click.native="onClickMenu(index)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch
} from 'vue-property-decorator'
import NavMenuItem from '~/components/atoms/navbar/NavMenuItem.vue'

@Component({
  components: {
    NavMenuItem
  }
})
export default class NavMenu extends Vue {
  private activeSubMenu: number = -1

  @Prop({
    required: true,
    type: Boolean,
    default: false
  })
  readonly activeMenu!: boolean

  @Prop({
    required: true,
    type: Object,
    default: undefined
  })
  readonly menu!: object

  private onClickMenu(index: number, link: string): void {
    this.activeSubMenu = index
    // this.$router.push(link)
  }

  @Watch('activeMenu')
  onChangedActiveMenu() {
    this.activeSubMenu = -1
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.nav-menu {
  .sub-menu {
    padding-left: 36px;

    .nav-menu-item {
      .content-active {
        border: 4px solid $red;
        border-image: linear-gradient(
          to bottom,
          rgba(108, 219, 141, 0) 25%,
          $red 25%,
          $red 75%,
          rgba(108, 219, 141, 0) 75%
        ) !important;
        border-image-slice: 1 !important;
        border-right: none;
        border-bottom: none;
        border-top: none;
        background-color: $white;
      }
    }
  }
}
</style>
