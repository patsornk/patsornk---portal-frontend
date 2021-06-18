<template>
  <div class="user-tab-container">
    <div class="tab-header">
      <div class="tab" :class="tab === 'cg' && 'select'" @click="tab = 'cg'">
        {{ $t('userManagement.tab.centralGroup') }}
      </div>
      <div class="tab" :class="tab === 'ncg' && 'select'" @click="tab = 'ncg'">
        {{ $t('userManagement.tab.nonCentralGroup') }}
      </div>
    </div>
    <div class="tab-line">
      <div class="line" :class="tab === 'cg' && 'select'"></div>
      <div class="line" :class="tab === 'ncg' && 'select'"></div>
    </div>
    <user-list :type="type" :tab="tab" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import UserList from '~/components/organisms/user-management/UserList.vue'

@Component({
  components: { UserList }
})
export default class TabDetail extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private type!: string

  get language(): any {
    return this.$i18n.locale
  }

  tab: string = 'cg'

  @Watch('tab')
  changeTab() {
    window.sessionStorage.setItem('userTab', this.tab)
  }

  mounted() {
    this.tab = window.sessionStorage.getItem('userTab') || 'cg'
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.user-tab-container {
  .tab-header {
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 26px 26px 0px 26px;
    text-align: center;
    font-size: 22px;
    line-height: 24px;

    .tab {
      cursor: pointer;
      padding-bottom: 20px;
      color: $gray-disable;
    }

    .select {
      color: $mid-black;
      font-weight: 700;
    }
  }

  .tab-line {
    display: grid;
    grid-template-columns: 50% 50%;
    padding: 0px 26px;
    margin-bottom: 27px;

    .line {
      border-bottom: 1px solid $grey3;
    }

    .select {
      border-top: 3px solid $primary;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }
  }
}
</style>
