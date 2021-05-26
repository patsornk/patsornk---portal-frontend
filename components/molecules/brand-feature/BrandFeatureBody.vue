<template>
  <div class="brand-feature-body-container">
    <div>
      <upload-file
        id="image"
        class="upload-file"
        :circleStyle="true"
        :imageUrl="data.imageUrl"
        v-model="data.image"
        @viewFile="$emit('viewFile')"
        @onBlur="onUploadImage"
        @removeUrl="$emit('onRemoveFeatureImage', activeIndex - 1)"
      />
    </div>
    <div class="form-container">
      <div class="feature-container">
        <div class="feature">
          <div class="title">{{`${$t('createBrand.brandFeature.feature')} ${activeIndex}`}}</div>
          <img
            v-if="canDelete"
            class="delete-icon"
            :src="assets('table/delete.png')"
            @click="$emit('deleteBrandFeature', activeIndex)"
          />
        </div>
        <input-field
          type="switch"
          :title="$t('createBrand.display')"
          v-model="data.showDisplay"
          :errorMessage="error.showDisplay"
        />
      </div>
      <input-field
        class="input"
        :title="$t('createBrand.brandFeature.ctaLabel')"
        :required="data.showDisplay"
        v-model="vuelidate.ctaLabel.$model"
        :errorMessage="error.ctaLabel"
      />
      <input-field
        type="select"
        class="input"
        :title="$t('createBrand.brandFeature.ctaType')"
        :required="data.showDisplay"
        v-model="data.ctaType"
        :errorMessage="data.error.ctaType"
      />
      <input-field
        type="textarea"
        class="input"
        :title="$t('createBrand.brandFeature.ctaFeature')"
        :required="data.showDisplay"
        v-model="data.ctaFeature"
        :errorMessage="data.error.ctaFeature"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  Vue, 
  Prop,
  Component,
  Watch
} from 'vue-property-decorator'
import InputField from '~/components/atoms/InputField.vue'
import UploadImage from '~/components/molecules/UploadImage.vue'
import UploadFile from '~/components/molecules/UploadFile.vue'
import { getAssetsPath } from '~/helper/images'

@Component({
  components: {
    InputField,
    UploadImage,
    UploadFile,
}})
export default class BrandFeatureBody extends Vue {
  @Prop({
    type: Object
  })
  readonly data!: {}

  @Prop({
    type: Object
  })
  readonly vuelidate!: {}

  @Prop({
    type: Object
  })
  readonly state!: {}

  @Prop({
    type: Number,
    required: true,
  })
  readonly activeIndex!: number

  @Prop({
    type: Boolean,
    required: true,
  })
  readonly canDelete!: boolean

  assets(name: string) {
    return getAssetsPath(name)
  }

  private error = {
    image: '',
    showDisplay: '',
    ctaLabel: '',
    ctaType: '',
    ctaFeature: '',
  }

  mounted(): void {
  }


  get dataValue() {
    return this.data
  }

  set dataValue(value: any) {
    this.dataValue = value
  }

  @Watch('dataValue')
  onChangedData(): void {
  }

  onUploadImage(value: any) {
    this.$emit('onChangeFeatureImage', { activeIndex: this.activeIndex - 1, value: value })
  }

  // @Watch('showDisplay')
  // onChangedShowDisplay(): void {
  //   if (!this.showDisplay) {
  //     this.error = {
  //       image: '',
  //       showDisplay: '',
  //       ctaLabel: '',
  //       ctaType: '',
  //       ctaFeature: '',
  //     }
  //   }
  // }

  // @Watch('ctaLabel')
  // onChangedLabel(): void {
  //   if (this.showDisplay) {
  //     this.error.ctaLabel = !this.$v.ctaLabel.required
  //       ? this.$t('createBrand.error.require').toString()
  //       : !this.$v.ctaLabel.mustBe
  //       ? this.$t('createBrand.characterAndNumber').toString()
  //       : !this.$v.ctaLabel.maxLength
  //       ? this.$t('createBrand.maxLength').toString()
  //       : ''
  //   }
  // }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.brand-feature-body-container {
  display: flex;
  flex: 1;

  .upload-file {
    height: 305px;
    width: 305px;

    .error {
      background: none !important;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-left: 47px;

    .feature-container {
      display: flex;
      flex: 1;
      justify-content: space-between;
      .feature {
        display: flex;
        align-items: center;
        .title {
          font-size: 16px;
          font-weight: bold;
          text-decoration-line: underline;
        }
        .delete-icon {
          margin-left: 36px;
          height: 16.67px;
          width: 15.36px;
        }
      }
    }

    .input {
      margin-top: 21px;
    }
  }
}

</style>
