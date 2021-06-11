<template>
  <div class="tooltip">
    <img
      class="information-icon"
      :src="assets('icon/information.png')"
    />
    <span class="tooltip-text" :class="sizeOfTooltip"> {{tooltipMessage}} </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'
@Component
export default class Tooltip extends Vue {
  @Prop({
    type: String,
    default: 'The password must be 8-12 characters and contains (A-Z, a-z and 0-9)'
  })
  private tooltipMessage?: String

  @Prop({
    type: Number,
    default: 2
  })
  private numberOfLine?: Number

  get sizeOfTooltip() {
    if(this.numberOfLine == 2) return ""
    else if(this.numberOfLine === 3) return "height-three"
    else return "height-one"
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
  
}

</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.tooltip {
  position: relative;
  display: inline-block;
  margin-left: 9px;
  }

  .information-icon{
    width: 14px;
    height: 14px;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    width: max-content;
    max-width: 150px;
    background: #5C5C5C;
    color: #fff;
    border-radius: 6px;
    padding: 5px 7px;
    position: absolute;
    z-index: 1;
    bottom: -50%;
    left: 630%;
    margin-left: -60px;
    transition: opacity 0.3s;
    font-size: 8px;
    line-height: 10px;
    opacity: 0;
  }
  .tooltip .tooltip-text::after {
    transform: rotate(90deg);
    content: "";
    position: absolute;
    top: 27%;
    left: -6px;
    margin-left: -5px;
    border-width: 8px 3px;
    border-style: solid;
    border-color: #5C5C5C transparent transparent transparent;
  }
  .height-one {
      bottom: -27% !important;
    }
  .height-one::after {
    top: 14% !important;
  }
  .height-three {
      bottom: -90% !important;
    }
  .height-three::after {
    top: 32% !important;
  }
  .tooltip:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
  }
</style>
