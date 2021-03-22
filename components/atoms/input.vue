<template>
  <input
    class="t1-input"
    :class="error ? 't1-input-error' : ''"
    :placeholder="placeholder"
    :inputmode="inputmode"
    :disabled="disabled"
  />
  <!-- :disable="disable ? 'disable' : ''" -->
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class T1Input extends Vue {
  @Prop({
    type: String,
    required: true
  })
  readonly value!: string

  @Prop({
    type: String
  })
  readonly placeholder!: string

  @Prop({
    type: Boolean
  })
  readonly disabled!: boolean

  @Prop({
    type: Boolean
  })
  readonly error!: boolean

  @Prop({
    type: String
  })
  readonly inputmode!: string

  mounted(): void {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.t1-input {
  padding: 9px 16px;
  border: 1px solid $ligth-gray;
  border-radius: 6px;

  &:focus {
    border-radius: 6px;
    border: 1px solid $ligth-gray;
    outline: none;
  }
}
.t1-input-error {
  border: 1px solid $primary;

  &:focus {
    box-shadow: red;
    border-radius: 6px;
    border: 1px solid $primary;
  }
}
</style>
