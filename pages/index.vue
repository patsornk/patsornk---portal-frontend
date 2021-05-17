<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  // layout: 'login'
  layout: 'landing'
})
export default class Home extends Vue {
  mounted() {
    // this.$router.push('/login')
    this.$router.push('/landing')
  }
}
</script>