<template>
  <div class="status-container">
    <div class="status-circle" :class="statusClass" />
    <div class="status-text" :class="statusClass">
      {{ status }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class CompanyStatus extends Vue {
  @Prop({
    type: String
  })
  readonly status!: string

  get statusClass(): string {
    if (this.status === 'Active') {
      return 'active'
    } else if (this.status === 'Inactive') {
      return 'inactive'
    } else if (this.status === 'Onhold') {
      return 'hold'
    } else {
      return ''
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.status-container {
  display: flex;
  align-items: flex-end;
}
.status-circle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-bottom: 8px;
  margin-right: 8px;

  &.active {
    background-color: $success;
  }
  &.inactive {
    background-color: $gray-disable;
  }
  &.hold {
    background-color: $warning;
  }
}
.status-text {
  font-size: 18px;
  &.active {
    color: $success;
  }
  &.inactive {
    color: $gray-disable;
  }
  &.hold {
    color: $warning;
  }
}
</style>
