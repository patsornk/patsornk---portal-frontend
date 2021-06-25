<template>
  <div class="brand-feature-body-container">
    <dialog-popup
      :display="dialogDisplay"
      :title="$t('common.wantToDeleteBrandFeature')"
      :description="$t('common.neverGetBack')"
      :left-button-title="$t('common.cancel')"
      :right-button-title="$t('common.delete')"
      @onLeftButtonClick="dialogLeftButtonAction"
      @onRightButtonClick="dialogRightButtonAction"
    />
    <div>
      <upload-file
        :id="`brand_feature_image`"
        :key="`brand_feature_image-${featureNo}`"
        v-model="image"
        :image-url="imageUrl"
        :circle-style="true"
        :error-message="error.image"
        class="upload-file"
        @viewFile="$emit('viewFile', imageUrl)"
        @onBlur="onUploadImage"
        @removeUrl="onRemoveFeatureImage"
      />
    </div>
    <div class="form-container" style="position: relative">
      <div class="feature-container">
        <div class="feature">
          <div class="title">
            {{ `${$t('createBrand.brandFeature.feature')} ${featureNo}` }}
          </div>
          <img
            v-if="canDelete"
            class="delete-icon"
            :src="assets('table/delete.png')"
            @click="deleteBrandFeature"
          />
        </div>
        <input-field
          v-model="showDisplay"
          type="switch"
          :title="$t('createBrand.display')"
          :shouldBeError="false"
        />
      </div>
      <div class="text-danger error-msg validation-error-text">
        {{ errorMessage }}
      </div>
      <input-field
        v-model="$v.ctaLabel.$model"
        class="input"
        :title="$t('createBrand.brandFeature.ctaLabel')"
        :required="showDisplay"
        :error-message="error.ctaLabel"
        :maxlength="50"
        :placeholder="$t('createBrand.brandFeature.ctaPlaceholder')"
      />
      <input-field
        v-model="$v.ctaType.$model"
        type="select"
        :placeholder="$t('common.pleaseSelect')"
        :title="$t('createBrand.brandFeature.ctaType')"
        :required="showDisplay"
        :options="ctaTypeOptions"
        :options-reduce="(item) => item.featureTypeId"
        options-label="featureTypeValue"
        :error-message="error.ctaType"
        class="input"
      />
      <input-field
        v-model="$v.ctaFeature.$model"
        type="textarea"
        class="input"
        :title="$t('createBrand.brandFeature.ctaFeature')"
        :required="showDisplay"
        :error-message="error.ctaFeature"
        :maxlength="255"
        :placeholder="$t('createBrand.brandFeature.ctaFeaturePlaceholder')"
      />
      <div class="info-description">
        {{ $t('common.charaterLeftS') }}
        {{ 255 - $v.ctaFeature.$model.length }}
        {{ $t('common.charaterLeftE') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { required } from 'vuelidate/lib/validators'
import { getAssetsPath } from '~/helper/images'
import { UploadImageType } from '~/constants/types/UploadImageType'

import {
  BrandFeatureInitialData,
  BrandFeatureError
} from '~/constants/types/Brandfeature'
import InputField from '~/components/atoms/InputField.vue'
import UploadImage from '~/components/molecules/UploadImage.vue'
import UploadFile from '~/components/molecules/UploadFile.vue'
import DialogPopup from '~/components/molecules/DialogPopup.vue'

const brandFeatureValidations = {
  ctaLabel: { required },
  ctaType: { required },
  ctaFeature: { required },
  imageUrl: { required }
}

@Component({
  validations: brandFeatureValidations,
  components: {
    InputField,
    UploadImage,
    UploadFile,
    DialogPopup
  }
})
export default class BrandFeatureBody extends Vue {
  @Prop({
    type: Object
  })
  readonly initialData!: BrandFeatureInitialData

  @Prop({
    type: Number,
    required: true
  })
  readonly featureNo!: number

  @Prop({
    type: Boolean,
    required: true
  })
  readonly canDelete!: boolean

  @Prop({
    type: String
  })
  errorMessage = ''

  dialogDisplay = false
  dialogTitle = 'Want to Delete this brand feature ? '
  dialogDescription =
    'Please check the information before click to confirm button. The information will lose and never get back.'

  dialogLeftButtonText = 'Cancel'
  dialogRightButtonText = 'Delete'

  ctaTypeOptions: object[] = []

  currentfeatureNo = 0
  image = null
  imageUrl?: string = ''
  showDisplay = false
  ctaLabel = ''
  ctaType = ''
  ctaFeature = ''

  private error: BrandFeatureError = {
    ctaLabel: '',
    ctaType: '',
    ctaFeature: '',
    image: ''
  }

  dialogLeftButtonAction(): void {
    this.setDialogDisplay(false)
  }

  dialogRightButtonAction(): void {
    this.$emit('deleteBrandFeature', this.featureNo)
    this.setDialogDisplay(false)
  }

  setDialogDisplay(value: boolean): void {
    this.dialogDisplay = value
  }

  assets(name: string): string {
    return getAssetsPath(name)
  }

  mounted(): void {
    this.getCtaType()
    this.image = this.initialData.image
    this.imageUrl = this.initialData.imageUrl
    this.showDisplay = this.initialData.showDisplay
    this.ctaLabel = this.initialData.ctaLabel
    this.ctaType = this.initialData.ctaType
    this.ctaFeature = this.initialData.ctaFeature
  }

  updated(): void {
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
        const pleaseSelect = {
          featureTypeId: '',
          featureTypeValue: 'Please select...'
        }
        this.ctaTypeOptions.unshift(pleaseSelect)
      }
    } catch (error) {
      if (error.response.data.code !== '04') {
        this.$toast.global.error(error.response.data.message)
      }
    }
  }

  onUploadImage(value: UploadImageType): void {
    this.imageUrl = value.imageUrl
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'image', value.file)
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'imageUrl',
      value.imageUrl
    )
    if (this.showDisplay) {
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
      this.error.image = this.imageUrl
        ? ''
        : this.$t('createBrand.brandFeature.error.image').toString()
    } else {
      this.error.image = ''
    }
  }

  onRemoveFeatureImage(): void {
    this.imageUrl = ''
    this.$emit('onBrandFeatureChange', this.featureNo - 1, 'image', undefined)
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'imageUrl',
      undefined
    )
    if (this.showDisplay) {
      this.error.image = this.imageUrl
        ? ''
        : this.$t('createBrand.brandFeature.error.image').toString()
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
    }
  }

  @Watch('showDisplay')
  onChangedShowDisplay(): void {
    this.$v.$touch()
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'showDisplay',
      this.showDisplay
    )
    if (!this.showDisplay) {
      this.$emit('onBrandFeatureChange', this.featureNo - 1, 'isValid', true)
      this.error = {
        ctaLabel: '',
        ctaType: '',
        ctaFeature: ''
      }
    } else {
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
      this.error.ctaLabel = !this.$v.ctaLabel.required
        ? this.$t('createBrand.brandFeature.error.ctaLabel').toString()
        : ''
      this.error.ctaType = !this.$v.ctaType.required
        ? this.$t('createBrand.brandFeature.error.ctaType').toString()
        : ''
      this.error.ctaFeature = !this.$v.ctaFeature.required
        ? this.$t('createBrand.brandFeature.error.ctaFeature').toString()
        : ''
      this.error.image = this.imageUrl
        ? ''
        : this.$t('createBrand.brandFeature.error.image').toString()
      if (
        this.error.ctaLabel ||
        this.error.ctaType ||
        this.error.ctaFeature ||
        this.error.image
      ) {
        this.$toast.global.error(
          this.$t('createBrand.brandFeature.error.toastRequiredField')
        )
      }
    }
  }

  @Watch('ctaLabel')
  onCtaLabelChanged(): void {
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'ctaLabel',
      this.ctaLabel
    )
    if (this.showDisplay) {
      this.error.ctaLabel = !this.$v.ctaLabel.required
        ? this.$t('createBrand.brandFeature.error.ctaLabel').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
    }
  }

  @Watch('ctaType')
  onCtaTypeChanged(): void {
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'ctaType',
      this.ctaType
    )
    if (this.showDisplay) {
      this.error.ctaType = !this.$v.ctaType.required
        ? this.$t('createBrand.brandFeature.error.ctaType').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
    }
  }

  @Watch('ctaFeature')
  onCtaFeatureChanged(): void {
    this.$emit(
      'onBrandFeatureChange',
      this.featureNo - 1,
      'ctaFeature',
      this.ctaFeature
    )
    if (this.showDisplay) {
      this.error.ctaFeature = !this.$v.ctaFeature.required
        ? this.$t('createBrand.brandFeature.error.ctaFeature').toString()
        : ''
    }
    if (this.showDisplay) {
      this.$emit(
        'onBrandFeatureChange',
        this.featureNo - 1,
        'isValid',
        this.formValid
      )
    }
  }

  deleteBrandFeature(): void {
    if (this.showDisplay) {
      this.$toast.global.error(
        this.$t('createBrand.brandFeature.error.toastDelete')
      )
      return
    } else {
      this.dialogDisplay = true
    }
  }

  get formValid(): boolean {
    return !this.$v.$invalid && this.imageUrl !== ''
  }
}
</script>

<style lang="scss" scoped>
@import './BrandFeatureBody.scss';

.error-msg {
  top: 35px !important;
}
</style>
