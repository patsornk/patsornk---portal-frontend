<template>
  <div class="input-field-container">
    <div class="input-field-title">{{ title }}</div>
    <t1-input
      :error="status === 'error' ? true : false"
      v-model="value"
      placeholder="placeholder"
      :disabled="status === 'disable' ? true : false"
    />
    <div v-if="status === 'error'" class="input-field-error">
      {{ errorText }}
    </div>
    <div v-else class="input-field-description">{{ description }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import T1Input from '@/components/atoms/input.vue'

@Component({ components: { T1Input } })
export default class T1TextField extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly value!: string

  @Prop({
    required: true,
    type: String
  })
  readonly title!: string

  @Prop({
    type: String
  })
  readonly description!: string

  @Prop({
    type: String
  })
  readonly placeholder!: string

  @Prop({
    type: String
  })
  readonly status!: string

  @Prop({
    type: String
  })
  readonly errorText!: string

  @Prop({
    type: String
  })
  readonly inputmode!: string

  mounted(): void {}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.input-field-container {
  text-align: left;

  .input-field-title {
    font-size: 16px;
    font-weight: 700;
  }

  .input-field-description {
    font-size: 12px;
  }

  .input-field-error {
    font-size: 12px;
    color: $primary;
  }
}
</style>
