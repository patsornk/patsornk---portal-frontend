<template>
  <div class="company-tab-container">
    <div class="tab-header">
      <div class="tab" :class="tab === 'brand' && 'select'" @click="tab = 'brand'">{{$t('common.brandTitle')}}</div>
      <div class="tab" :class="tab === 'branch' && 'select'" @click="tab = 'branch'">{{$t('common.branchTitle')}}</div>
      <div class="tab" :class="tab === 'partnerCode' && 'select'" @click="tab = 'partnerCode'">{{$t('common.partnerCodeTitle')}}</div>
    </div>
    <div class="tab-line">
      <div class="line" :class="tab === 'brand' && 'select'"></div>
      <div class="line" :class="tab === 'branch' && 'select'"></div>
      <div class="line" :class="tab === 'partnerCode' && 'select'"></div>
    </div>
    <tab-brand
      :id="id"
      v-if="tab === 'brand'"
      :viewBranchCallBack="viewBranchCallBack"
    />
    <tab-branch
      :id="id"
      v-if="tab === 'branch'"
      :brandIdSearch="brandIdSearch"
    />
    <tab-partner-code :id="id" v-if="tab === 'partnerCode'" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import TextInfo from '@/components/atoms/TextInfo.vue'
import Service from '@/components/atoms/service/service.vue'
import TabBrand from '@/components/organisms/company-detail/tab/brand.vue'
import TabBranch from '@/components/organisms/company-detail/tab/branch.vue'
import TabPartnerCode from '@/components/organisms/company-detail/tab/partnerCode.vue'
import { ServiceType } from '~/constants'

@Component({
  components: { TextInfo, Service, TabBrand, TabBranch, TabPartnerCode }
})
export default class TabDetail extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private id?: string

  get language(): any {
    return this.$i18n.locale
  }

  services: ServiceType[] = []
  tab: string = 'brand'
  brandIdSearch: number = 0

  @Watch('tab')
  changeTab() {
    if (this.tab !== 'branch') this.brandIdSearch = 0
  }

  viewBranchCallBack(data: any) {
    this.tab = 'branch'
    this.brandIdSearch = data
  }

  async getService(): Promise<void> {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_applied_service?companyId=${this.id}`,
        { data: null }
      )
      if (res.successful) {
        this.services = res.data.services
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  mounted() {
    this.getService()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.company-tab-container {
  .tab-header {
    width: 100%;
    display: grid;
    grid-template-columns: 33.33% 33.33% 33.33%;
    padding: 26px 26px 0px 26px;
    text-align: center;

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
    grid-template-columns: 33.33% 33.33% 33.33%;
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
