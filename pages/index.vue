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
        window.history.pushState({}, '', `/`)
        window.location.reload()
        this.$nuxt.$loading.finish()
      }, 500)
    } else {
      if (this.$auth.loggedIn) {
        this.$auth
          .refreshTokens()
          .then((res) => {
            this.$router.push('/landing')
          })
          .catch((err) => {
            this.$router.push('/login')
          })
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
