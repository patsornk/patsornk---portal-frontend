<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'login'
  // layout: 'default'
})
export default class Home extends Vue {
  mounted() {
    this.$router.push('/login')
    // this.$router.push('/landing')
  }
}
</script>
