<template>
  <div class="t1-button" :class="type" @click="$emit('clickButton')">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class T1Button extends Vue {
  @Prop({
    required: true,
    type: String
  })
  readonly text!: string

  @Prop({
    type: String
  })
  readonly type!: string

  mounted(): void {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.t1-button {
  padding: 10px 16px;
  width: 160px;
  border: 2px solid $primary;
  border-radius: 6px;
  font-size: 14px;
  color: $white;
  background: $primary;
  justify-items: center;

  &:focus,
  &:hover {
    opacity: 0.8;
    cursor: pointer;
    outline: none;
  }
}

.transparent {
  border: 2px solid $primary;
  background: transparent;
  color: $primary;
}

.black-transparent {
  border: 2px solid $black-gray;
  background: transparent;
  color: $black-gray;
}

.black {
  border: 2px solid $black-gray;
  background: $black-gray;
}

.transparent-disable{
  border: 2px solid $gray;
  background: transparent;
  color: $gray;

  &:focus,
  &:hover {
    cursor: context-menu;
    opacity: 1;
  }
}

.disable{
  border: 2px solid $gray;
  background: $gray;
  color: $white;

  &:focus,
  &:hover {
    cursor: context-menu;
    opacity: 1;
  }
}
</style>
