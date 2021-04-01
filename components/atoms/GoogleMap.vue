<template>
  <div>
    <gmap-map
      :center="position"
      :zoom="zoom"
      class="custom-map"
    >
      <gmap-marker :position="position"></gmap-marker>
    </gmap-map>
  </div>
</template>


<script lang="ts">
import { MapPosition } from '@/constants/types/GoogleMapTypes.js'
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class GoogleMap extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  readonly position!: MapPosition

  @Prop({
    type: Number,
    default: 15
  })
  readonly zoom!: number

}
</script>

<style lang="scss">
.custom-map {
  width: 100%;
  height: 100%;
}
</style>
