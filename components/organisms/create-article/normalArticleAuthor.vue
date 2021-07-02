<template>
  <div class="normal-article-author-container">
    <div style="width: 100%">
      <input-field
        v-model="formData.author"
        :title="$t('contentManagement.authorTitle')"
        required
        type="select"
        :options="authorLists"
        :options-reduce="(item) => item.authorId"
        :options-label="language === 'th' ? 'authorNameTh' : 'authorNameEn'"
        :placeholder="$t('common.pleaseSelect')"
        :error-message="error.author"
      />
      <div class="thumbnail-image">
        <div class="thumbnail-image-header">
          <div>
            {{ $t('contentManagement.thumbnailTitle') }} <span class="required"> *</span>
          </div>
          <div class="thumbnail-image-sub-header">
            {{ $t('contentManagement.thumbnailSubTitle') }}
          </div>
        </div>
        <upload-file
          id="thumbnail"
          class="upload-file"
          :imageUrl="thumbnailUrl"
          v-model="formData.thumbnailUrl"
          :errorMessage="error.thumbnail"
          :isHaveDescription="false"
          @viewFile="viewFile"
          @onBlur="onChangedThumbnail"
          @removeUrl="onRemoveThumbnail"
        >
        </upload-file>
      </div>
    </div>
    <modal v-show="isShowImage" class="show-image">
      <template v-slot:header>
        <div class="show-image-header">
          <div>{{ $t('common.exampleFile') }}</div>
          <div>
            <span class="material-icons close" @click="changeIsModal">
              close
            </span>
          </div>
        </div>
      </template>
      <template v-slot:body>
        <img class="show-image-view" v-if="imageUrl" :src="imageUrl"/>
      </template>
    </modal>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {validationMixin} from 'vuelidate'
import InputField from '@/components/atoms/InputField.vue'
import UploadFile from '@/components/molecules/UploadFile.vue'
import Modal from '@/components/atoms/Modal.vue'
import {NormalArticleAuthorData} from '~/constants'

import {required} from "vuelidate/lib/validators";

const validations = {
  author: {
    required,
  },
  thumbnail: {
    required
  },

  validationGroup: [
    'author',
    'thumbnail'
  ],
}
@Component({
  mixins: [validationMixin],
  validations,
  components: {
    InputField,
    UploadFile,
    Modal,
    NormalArticleAuthor
  }
})

export default class NormalArticleAuthor extends Vue {
  $i18n: any
  isShowImage = false
  imageUrl = ''
  private formData: NormalArticleAuthorData = {
    author: 0,
    thumbnailUrl: ''
  }
  private authorLists = [
    {
      authorId: 1,
      authorNameTh: 'เทส',
      authorNameEn: 'test'
    },
    {
      authorId: 2,
      authorNameTh: 'เทส2',
      authorNameEn: 'test2'
    },
    {
      authorId: 3,
      authorNameTh: 'เทส3',
      authorNameEn: 'test3'
    }
  ]

  private error = {
    author: '',
    thumbnail: ''
  }

  get authorId(): number {
    return this.formData.author
  }

  set authorId(newValue: number) {
    this.formData.author = newValue
  }

  get thumbnailUrl(): string {
    return this.formData.thumbnailUrl
  }

  set thumbnailUrl(newValue: string) {
    this.formData.thumbnailUrl = newValue
  }

  get language(): any {
    return this.$i18n.locale
  }

  get isSubmit(): string {
    return this.$store.getters['article/isSubmit']
  }

  @Watch('authorId')
  onChangedAuthorId(): void {
    if (this.authorId) {
      this.error.author = ''
      this.$store.dispatch('article/setIsHaveAuthor', true)
    } else {
      this.error.thumbnail = this.$t('contentManagement.error.inputAuthor').toString()
      this.$store.dispatch('article/setIsHaveAuthor', false)
    }
  }

  @Watch('thumbnailUrl')
  onChangedThumbnailUrl(): void {
    if (this.thumbnailUrl) {
      this.error.thumbnail = ''
      this.$store.dispatch('article/setIsHaveThumbnail', true)
    } else {
      this.error.thumbnail = this.$t('contentManagement.error.inputThumbnail').toString()
      this.$store.dispatch('article/setIsHaveThumbnail', false)
    }
  }

  @Watch('isSubmit')
  onChangedSubmit(): void {
    this.onChangedAuthorId()
    this.onChangedThumbnailUrl()
  }

  beforeDestroy() {
    this.$store.dispatch('article/setIsHaveAuthor', false)
    this.$store.dispatch('article/setIsHaveThumbnail', false)
  }

  viewFile(imageUrl: string): void {
    this.isShowImage = true
    this.imageUrl = imageUrl
  }

  onChangedThumbnail(data: any) {
    if (data) {
      this.error.thumbnail = ''
      if (data.imageUrl) {
        this.thumbnailUrl = data.imageUrl

        if (data.file) {
          this.error.thumbnail = ''
        } else {
          this.error.thumbnail = this.$t(
            'createBrand.brandFeature.error.image'
          ).toString()
        }
      } else {
        this.error.thumbnail = this.$t('contentManagement.error.thumbnailType').toString()
      }
    } else {
      this.error.thumbnail = this.$t(
        'createBrand.brandFeature.error.image'
      ).toString()
    }
  }

  private changeIsModal(): void {
    this.isShowImage = false
  }

  onRemoveThumbnail(): void {
    this.thumbnailUrl = ''
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.normal-article-author-container {
  background: $white;
  padding: 32px 36px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: fit-content;

  .show-image {
    .modal {
      width: 66%;
    }

    .show-image-header {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .close {
        cursor: pointer;
        font-size: 16px;
        font-weight: 700;
        color: $black;
      }
    }

    .show-image-view {
      width: 100%;
    }
  }

  .thumbnail-image {
    padding: 8px 0px 36px 0px;

    .thumbnail-image-header {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;

      .required {
        margin-left: 0.25rem;
        color: $primary;
        font-weight: 700;
      }

      .thumbnail-image-sub-header {
        font-weight: normal;
        font-size: 12px;
        line-height: 20px;
        color: $gray-disable;
      }
    }

    .upload-file {
      height: 180px;

      .error {
        background: none !important;
      }
    }
  }
}
</style>
