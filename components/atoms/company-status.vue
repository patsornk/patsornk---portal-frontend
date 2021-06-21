<template>
  <div class="status-container">
    <div class="status-circle" :class="statusClass" />
    <div class="status-text" :class="statusClass">
      {{ dataStatus }}
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
    if (this.dataStatus === this.$t('table.contentTableStatus.active').toString()) {
      return 'active'
    } else if (
      this.dataStatus === this.$t('table.contentTableStatus.inactive').toString()
    ) {
      return 'inactive'
    } else if (
      this.dataStatus === this.$t('table.contentTableStatus.hold').toString()
    ) {
      return 'hold'
    } else {
      return ''
    }
  }

  get dataStatus(): string {
    if (this.status === 'Active') {
      return this.$t('common.active').toString()
    } else if (this.status === 'Inactive') {
      return this.$t('common.inActive').toString()
    } else if (this.status === 'Onhold') {
      return this.$t('common.onHold').toString()
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
  font-weight: 700;
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
