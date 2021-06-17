<template>
  <header class="header-bar w-full">
    <p class="app-title">The 1 Portal</p>
    <div class="app-links">
      <change-lang />
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangeLang from '~/components/atoms/dropdown-lang/ChangeLang.vue'

@Component({
  components: {
    ChangeLang
  }
})
export default class HeaderNavbarWithTitle extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.header-bar {
  .app-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    font-size: 2rem;
    font-weight: bold;
  }
  .app-links {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }
}

header {
  display: flex;
  justify-content: space-between;
  box-shadow: 6px 6px 12px rgb(0 0 0 / 10%);
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
