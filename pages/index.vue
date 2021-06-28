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
          .then(async (res) => {
            try {
              const verify = await this.$axios.$post(
                `${process.env.PORTAL_ENDPOINT}/verify_user`,
                { data: null }
              )
              if (verify.successful && verify.data) {
                const res = await this.$axios.$get(
                  `${process.env.PORTAL_ENDPOINT}/get_profile`,
                  { data: null }
                )
                if (res.successful && res.data) {
                  this.$auth.setUser(res.data)
                  this.$router.push('/landing')
                }
              }
            } catch (error) {
              this.$toast.global.error(error.response.data.message)
            }
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
