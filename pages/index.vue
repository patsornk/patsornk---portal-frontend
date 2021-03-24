<template></template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'login'
})
export default class Home extends Vue {
  mounted() {
    this.$router.push('/login')
  }
}
</script>