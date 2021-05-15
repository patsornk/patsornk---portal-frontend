<template>
  <div class="services-selection-container">
    <span>Services Selection (Optional)</span>
    <div class="text-header">Applied Services</div>
    <div class="list-section">
      <div v-for="(item, index) in appliedServices" :key="index">
        <service
          :title="item.serviceName"
          :detail="item.serviceDesc"
          :logo="item.serviceLogo"
          isApply
          @unApply="unApply(item)"
        />
      </div>
    </div>
    <div class="text-header">Available Services</div>
    <div class="list-section">
      <div v-for="(item, index) in availableServices" :key="index">
        <service
          :title="item.serviceName"
          :detail="item.serviceDesc"
          :logo="item.serviceLogo"
          @onApply="apply(item)"
        />
      </div>
    </div>
    <div class="submit-section">
      <!-- <button class="submit" @click="clickSave">Save</button> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Service from '@/components/atoms/service/service.vue'
import { ServiceType } from '~/constants'

@Component({
  components: {
    Service
  }
})
export default class ServiceSelection extends Vue {
  appliedServices: ServiceType[] = []
  availableServices: ServiceType[] = []

  companyId = window.sessionStorage.getItem('createCompanyId')

  async mounted() {
    if (this.$route.params.currentStep === 'service' && this.companyId) {
      this.getAppliedServices()
      this.getAvailableServices()
    }
  }

  async getAppliedServices() {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_applied_service?companyId=${this.companyId}`,
        { data: null }
      )
      if (res.successful) {
        this.appliedServices = res.data.services
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async getAvailableServices() {
    try {
      let res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/list_available_service?companyId=${this.companyId}`,
        { data: null }
      )
      if (res.successful) {
        this.availableServices = res.data.services
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }

  async apply(item: ServiceType) {
    if (await this.applyService(item.serviceId)) {
      this.addItem(item, this.appliedServices)
      this.deleteItem(item, this.availableServices)
    }
  }

  async unApply(item: ServiceType) {
    if (await this.removeService(item.serviceId)) {
      this.addItem(item, this.availableServices)
      this.deleteItem(item, this.appliedServices)
    }
  }

  addItem(item: ServiceType, list: ServiceType[]) {
    list.push(...[item])
  }

  deleteItem(item: ServiceType, list: ServiceType[]) {
    const index = list.indexOf(item)
    if (index > -1) {
      list.splice(index, 1)
    }
  }

  async removeService(serviceId: number): Promise<boolean> {
    const payload = {
      companyId: parseInt(
        window.sessionStorage.getItem('createCompanyId') ?? ''
      ),
      serviceId: [serviceId]
    }
    try {
      let response = await this.$axios.$delete(
        `${process.env.PORTAL_ENDPOINT}/remove_service`,
        { data: payload }
      )
      if (response.successful) {
        this.$toast.global.success('Saved successfully')
        return true
      } else {
        return false
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
      return false
    }
  }

  async applyService(serviceId: number): Promise<boolean> {
    const payload = {
      companyId: parseInt(
        window.sessionStorage.getItem('createCompanyId') ?? ''
      ),
      serviceId: [serviceId]
    }
    try {
      let response = await this.$axios.$post(
        `${process.env.PORTAL_ENDPOINT}/apply_service`,
        payload
      )
      if (response.successful) {
        this.$toast.global.success('Saved successfully')
        return true
      } else {
        return false
      }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
      return false
    }
  }

  async clickSave() {
    // if (this.appliedServices.length === 0) {
    //   this.$toast.global.success('Saved successfully')
    //   return
    // }
    // const payload = {
    //   companyId: window.sessionStorage.getItem('createCompanyId'),
    //   serviceId: this.appliedServices.map((item: any) => item.serviceId)
    // }
    try {
      // let response = await this.$axios.$post(
      //   `${process.env.PORTAL_ENDPOINT}/apply_service`,
      //   payload
      // )
      // if (response.successful) {
      //   this.getAppliedServices()
      //   this.getAvailableServices()
      this.$toast.global.success('Saved successfully')
      // }
    } catch (error) {
      this.$toast.global.error(error.response.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.services-selection-container {
  padding-top: 60px;
  font-size: 24px;
  font-weight: 700;

  .text-header {
    border-left: 4px solid $primary;
    padding-left: 21px;
    margin: 60px 0px;
  }

  .list-section {
    display: grid;
    grid-template-columns: 30% 30% 30%;
    grid-column-gap: 27px;
    grid-row-gap: 38px;
  }

  .submit-section {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin: 70px 0px 35px 0px;

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;

      background: $mid-black;
      color: $white;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      width: 160px;
      height: 40px;

      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
