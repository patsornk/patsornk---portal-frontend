<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'login'
})
export default class Home extends Vue {
  mounted() {
    const query = this.$route.query
    if (query && query.code) {
      setTimeout(() => {
        window.history.pushState({},'',`/`)
        window.location.reload()
        this.$nuxt.$loading.finish()
      }, 500);
    } else {
      if (this.$auth.loggedIn) {
        this.$router.push('/landing')
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
