<template>
  <div class="company-service-container">
    <div class="header-box">
      <div class="text-header">Services</div>
      <img class="edit" :src="assets('company-detail/edit.png')" />
    </div>
    <div class="data-box">
      <div v-for="(item, index) in services" :key="index">
        <service
          :title="item.serviceName"
          :detail="item.serviceDesc"
          :logo="item.serviceLogo"
          isApply
          isActive
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TextInfo from '@/components/atoms/TextInfo.vue'
import Service from '@/components/atoms/service/service.vue'
import { ServiceType } from '~/constants'
import { getAssetsPath } from '~/helper/images'

@Component({
  components: { TextInfo, Service }
})
export default class CompanyInformation extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private id?: string

  get language(): any {
    return this.$i18n.locale
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  services: ServiceType[] = []

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

.company-service-container {
  padding: 38px 36px;
  .header-box {
    display: flex;
    justify-content: space-between;

    .text-header {
      font-size: 24px;
      font-weight: 700;
    }

    .edit {
      cursor: pointer;
      object-fit: contain;
    }
  }

  .data-box {
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-column-gap: 27px;
    grid-row-gap: 38px;
    padding: 15px 10% 0px 0px;
  }
}
</style>
