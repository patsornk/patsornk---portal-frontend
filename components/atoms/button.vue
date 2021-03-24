<template>
  <div class="t1-button" :class="type">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Prop,
  Component
} from 'vue-property-decorator'

@Component({})
export default class T1Button extends Vue {
  @Prop({
    type: String
  })
  readonly type!: string

  mounted(): void {}
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
  font-weight: 700;
  color: $white;
  background: $primary;
  display: flex;
  justify-content: center;

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
  border: 2px solid $black-grey;
  background: transparent;
  color: $black-grey;
}

.black {
  border: 2px solid $black-grey;
  background: $black-grey;
}

.transparent-disable {
  border: 2px solid $grey;
  background: transparent;
  color: $grey;

  &:focus,
  &:hover {
    cursor: context-menu;
    opacity: 1;
  }
}

.disable {
  border: 2px solid $grey;
  background: $grey;
  color: $white;

  &:focus,
  &:hover {
    cursor: context-menu;
    opacity: 1;
  }
}
</style>
