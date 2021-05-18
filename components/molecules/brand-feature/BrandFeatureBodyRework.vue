<template>
  <div class="brand-feature-body-container">
    <dialog-popup 
      :display="dialogDisplay"
      :title="dialogTitle"
      :description="dialogDescription"
      :leftButtonTitle="dialogLeftButtonText"
      :rightButtonTitle="dialogRightButtonText"
      @onLeftButtonClick="dialogLeftButtonAction"
      @onRightButtonClick="dialogRightButtonAction"
    />
    <div>
      <upload-file
        :id="`brand_feature_image-${featureNo}`"
        :key="`brand_feature_image-${featureNo}`"
        class="upload-file"
        :circleStyle="true"
        v-model="$v.image.$model"
        :imageUrl="$v.imageUrl.$model"
        @viewFile="$emit('viewFile', $v.imageUrl.$model)"
        @onBlur="onUploadImage"
        @removeUrl="onRemoveFeatureImage"
        :errorMessage="error.image"
      />
    </div>
    <div class="form-container">
      <div class="feature-container">
        <div class="feature">
          <div class="title">{{`${$t('createBrand.brandFeature.feature')} ${featureNo}`}}</div>
          <img
            v-if="canDelete"
            class="delete-icon"
            src="@/assets/images/table/delete.png"
            @click="deleteBrandFeature"
          />
        </div>
        <input-field
          type="switch"
          title="Display on The 1 App"
          v-model="showDisplay"
        />
      </div>
      <div class="text-danger text-sm validation-error-text">
          {{ errorMessage }}
        </div>
      <input-field
        class="input"
        :title="$t('createBrand.brandFeature.ctaLabel')"
        :required="showDisplay"
        v-model="$v.ctaLabel.$model"
        :errorMessage="error.ctaLabel"
        placeholder="Input placeholder"
      />
      <input-field
        type="select"
        class="input"
        :title="$t('createBrand.brandFeature.ctaType')"
        :required="showDisplay"
        v-model="$v.ctaType.$model"
        :options="ctaTypeOptions"
        :optionsReduce="(item) => item.featureTypeId"
        optionsLabel="featureTypeValue"
        :errorMessage="error.ctaType"
        placeholder="Please select..."
      />
      <input-field
        type="textarea"
        class="input"
        :title="$t('createBrand.brandFeature.ctaFeature')"
        :required="showDisplay"
        v-model="$v.ctaFeature.$model"
        :errorMessage="error.ctaFeature"
        :maxlength="255"
        placeholder="Input placeholder"
      />
      <div class="info-description">
        {{ 256 - $v.ctaFeature.$model.length }}
        {{ $t('createBrand.limitCharacters') }}
      </div>
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
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  email,
  numeric
} from 'vuelidate/lib/validators'
import { BrandFeatureInitialData, BrandFeatureError } from '~/constants/types/Brandfeature'
import InputField from '~/components/atoms/InputField.vue'
import UploadImage from '~/components/molecules/UploadImage.vue'
import UploadFile from '~/components/molecules/UploadFile.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'

const validations = {
  image: {},
  imageUrl: {required},
  ctaLabel: {required},
  ctaType: {required},
  ctaFeature: {required}
}

@Component({
  validations: validations,
  components: {
    InputField,
    UploadImage,
    UploadFile,
    DialogPopup,
}})
export default class BrandFeatureBodyRework extends Vue {
  @Prop({
    type: Object
  })
  readonly initialData!: BrandFeatureInitialData

  @Prop({
    type: Number,
    required: true,
  })
  readonly featureNo!: number

  @Prop({
    type: Boolean,
    required: true,
  })
  readonly canDelete!: boolean

  @Prop({
    type: String,
  })
  errorMessage = ''

  dialogDisplay = false
  dialogTitle = "Want to Delete this brand feature ? "
  dialogDescription = "Please check the information before click to confirm button. The information will lose and never get back."
  dialogLeftButtonText = "Cancel"
  dialogRightButtonText = "Delete"
  dialogLeftButtonAction = () => { 
    this.setDialogDisplay(false)
  }
  dialogRightButtonAction = () => {
    this.$emit('deleteBrandFeature', this.featureNo)
    this.setDialogDisplay(false)
  }
  
  setDialogDisplay(value: boolean) {
    this.dialogDisplay = value
  }


  ctaTypeOptions = []

  currentfeatureNo = 0
  image = this.initialData.image
  imageUrl = this.initialData.imageUrl
  showDisplay = this.initialData.showDisplay
  ctaLabel = this.initialData.ctaLabel
  ctaType = this.initialData.ctaType
  ctaFeature = this.initialData.ctaFeature

  private error: BrandFeatureError = {
    ctaLabel: '',
    ctaType: '',
    ctaFeature: '',
    image: '',
  }

  mounted(): void {
    this.getCtaType();
  }

  updated() {
    if (this.currentfeatureNo !== this.featureNo) {
      this.currentfeatureNo = this.featureNo
      this.showDisplay = this.initialData.showDisplay
      this.ctaLabel = this.initialData.ctaLabel
      this.ctaType = this.initialData.ctaType
      this.ctaFeature = this.initialData.ctaFeature
      this.image = this.initialData.image
      this.imageUrl = this.initialData.imageUrl
    }
  }

  async getCtaType(): Promise<void> {
    try {
      const res = await this.$axios.$get(
        `${process.env.PORTAL_ENDPOINT}/get_brand_feature_type`,
        { data: null }
      )
      if (res.successful) {
        this.ctaTypeOptions = res.data.featureType
      }
    } catch (error) {
      if (error.response.data.code !== '04') {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  onUploadImage(value: any) {
    this.imageUrl = value.imageUrl
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'image', value.file)
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'imageUrl', value.imageUrl)    
    if (this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)
      this.error.image = this.imageUrl ? '' : this.$t('createBrand.brandFeature.error.image').toString()
    } else {
      this.error.image = ''
    }
  }

  onRemoveFeatureImage() {
    this.imageUrl = ''
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'image', undefined)
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'imageUrl', undefined)
    if (this.showDisplay) {
      this.error.image = this.imageUrl ? '' : this.$t('createBrand.brandFeature.error.image').toString()
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)
    }
  }

  @Watch('showDisplay')
  onChangedShowDisplay(): void {
    this.$v.$touch()
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'showDisplay', this.showDisplay)
    if (!this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', true)
      this.error = {
        ctaLabel: '',
        ctaType: '',
        ctaFeature: '',
      }
    } else {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)  
      this.error.ctaLabel = !this.$v.ctaLabel.required 
        ? this.$t('createBrand.brandFeature.error.ctaLabel').toString()
        : ''
      this.error.ctaType = !this.$v.ctaType.required
        ? this.$t('createBrand.brandFeature.error.ctaType').toString()
        : ''
      this.error.ctaFeature = !this.$v.ctaFeature.required
        ? this.$t('createBrand.brandFeature.error.ctaFeature').toString()
        : ''
      this.error.image = this.imageUrl ? '' : this.$t('createBrand.brandFeature.error.image').toString()
    }
  }

  @Watch('ctaLabel')
  onCtaLabelChanged(): void {
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'ctaLabel', this.ctaLabel)
    if (this.showDisplay) {
      this.error.ctaLabel = !this.$v.ctaLabel.required
        ? this.$t('createBrand.brandFeature.error.ctaLabel').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)
    }
  }

  @Watch('ctaType')
  onCtaTypeChanged(): void {
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'ctaType', this.ctaType)
    if (this.showDisplay) {
      this.error.ctaType = !this.$v.ctaType.required
        ? this.$t('createBrand.brandFeature.error.ctaType').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)
    }
  }

  @Watch('ctaFeature')
  onCtaFeatureChanged(): void {
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'ctaFeature', this.ctaFeature)
    if (this.showDisplay) {
      this.error.ctaFeature = !this.$v.ctaFeature.required
        ? this.$t('createBrand.brandFeature.error.ctaFeature').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', !this.$v.$invalid)
    }
  }

  deleteBrandFeature(): void {
    if (!this.showDisplay) {
      this.dialogDisplay = true
    }
  }
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

  .validation-error-text {
    color: $primary;
    top: 5px;
    position: relative;
  }
  .info-description {
    font-size: 14px;
    text-align: right;
  }
}

</style>
