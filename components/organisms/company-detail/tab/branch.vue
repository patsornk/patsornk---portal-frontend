<template>
  <div class="tab-branch-container">TabBranch</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TextInfo from '@/components/atoms/TextInfo.vue'
import Service from '@/components/atoms/service/service.vue'

@Component({
  components: { TextInfo, Service }
})
export default class TabBranch extends Vue {
  @Prop({
    required: true,
    type: String
  })
  private id?: string
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.tab-branch-container {
}
</style>
