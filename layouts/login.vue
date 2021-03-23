<template>
  <div class="login-container">
    <change-lang class="position-lang" />
    <Nuxt class="content" />
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
export default class LoginLayout extends Vue {}
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
</style>