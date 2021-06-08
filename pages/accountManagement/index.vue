<template>
  <div>
    Account Management
    <input-field
      title="lat"
      v-model="infoData.lat"
      required
      :shouldBeError=false 
    /><input-field
      title="lng"
      v-model="infoData.lng"
      required
      :shouldBeError=false 
    />

    <google-map class="t1-map" :position="mapPosition" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreadcrumbType } from '~/constants'
import GoogleMap from '~/components/atoms/GoogleMap.vue'
import { MapPosition } from '@/constants/types/GoogleMapTypes.js'
import InputField from '~/components/atoms/InputField.vue'

@Component({
  components: { GoogleMap, InputField }
})
export default class Main extends Vue {
  private infoData = {
    lng: 100.5285094,
    lat: 13.7249499
  }

  get mapPosition(): MapPosition {
    return {
      lng: this.infoData.lng || 100.5285094,
      lat: this.infoData.lat || 13.7249499
    }
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: 'Account Management',
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch(
      'breadcrumb/setBreadcrumb',
      breadcrumb
    )

    //set Page title
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      'Account Management'
    )
  }

  mounted(): void {
    this.setupBreadcrumb()

    this.$toast.global.error('error')
    this.$toast.global.success('Create company success')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.t1-map {
  width: 100%;
  height: 100%;
}
</style>
