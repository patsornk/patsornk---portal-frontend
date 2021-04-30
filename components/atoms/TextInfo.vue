<template>
  <div class="text-info">
    <!-- <vs-col vs-type="flex"> -->
    <span class="flex-1 text-info-title">{{ title }} : </span>
    <span class="flex-1 text-info-value">
      {{ value }}
    </span>
    <!-- </vs-col> -->
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class TextInfo extends Vue {
  @Prop({
    required: true,
    type: String
  })
  private title?: string

  @Prop({
    required: true,
    type: String
  })
  private value?: string
}
</script>

<style lang="scss">
.text-info {
  font-size: 16px;
  display: grid;
  grid-template-columns: 180px auto;

  .text-info-title {
    font-weight: 700;
  }

  .text-info-value {
    color: #6d7588;
    font-weight: 400;
    word-wrap: break-word;
  }
}
</style>
