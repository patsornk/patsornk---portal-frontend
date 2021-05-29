<template>
  <div class="login-container">
    <change-lang class="position-lang" />
    <Nuxt class="content" />
    <div class="version">Version {{ version }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ChangeLang from '~/components/atoms/dropdown-lang/ChangeLang.vue'

@Component({
  components: {
    ChangeLang
  }
})
export default class LoginLayout extends Vue {
  get version() {
    const pkgVersion = JSON.stringify(require('../package.json').version);
    return pkgVersion.replace(/["]/g, '')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  width: 100vw;
  height: 100vh;

  .version {
    position: fixed;
    right: 8px;
    bottom: 8px;
    color: $mid-black;
    text-align: center;
  }

  .position-lang {
    position: absolute;
    top: 20px;
    right: 50px;
  }

  .content {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
  }
}

@media screen and (max-width: 767px) {
  .login-container {
    .position-lang {
      right: 10px;
    }
  }
}
</style>