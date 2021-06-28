<template>
  <div class="normal-article-container">
    <div class="selection-header">
      <div class="header-mark" />
      <div class="header-container">
        <div class="header-title">
          {{ $t('contentManagement.normalArticleCreation') }}
        </div>
        <div class="header-sub-title">
          {{ $t('contentManagement.twoOfTwoStep') }}
        </div>
      </div>
      <switch-lang @get-article-lang="getArticleLang"></switch-lang>
    </div>
    <div class="article-input w-full" v-show="articleLang === 'th'">
      <input-field
        :title="$t('contentManagement.titleTh')"
        v-model="formData.titleTh"
        :errorMessage="error.titleTh"
        :placeholder="$t('contentManagement.error.emptyTitleTh')"
        required
      />
      <input-field
        :type="'optional'"
        :title="$t('contentManagement.subTitleTh')"
        v-model="formData.subTitleTh"
        :placeholder="$t('contentManagement.error.emptySubTitleTh')"
        style="position: relative"
      >
      </input-field>
    </div>
    <div class="article-input w-full" v-show="!(articleLang === 'th')">
      <input-field
        :title="$t('contentManagement.titleEn')"
        v-model="formData.titleEn"
        :errorMessage="error.titleEn"
        :placeholder="$t('contentManagement.error.emptyTitleEn')"
        required
      />
      <input-field
        :type="'optional'"
        :title="$t('contentManagement.subTitleEn')"
        v-model="formData.subTitleEn"
        :placeholder="$t('contentManagement.error.emptySubTitleEn')"
        style="position: relative"
      >
      </input-field>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import {
  BreadcrumbType,
  TitleArticleData,
  ErrorTitleArticleData
} from '~/constants'
import { getAssetsPath } from '~/helper/images'
import SwitchLang from '~/components/atoms/SwitchLang.vue'
import InputField from '~/components/atoms/InputField.vue'
import InputTagCategory from '~/components/atoms/InputTagCategory.vue'
import InputTopic from '~/components/atoms/InputTopic.vue'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { validateError } from '~/helper'

const validations = {
  titleTh: {
    required
  },
  titleEn: {
    required
  },
  category: {
    required
  },
  topic: {
    required
  },
  validationGroup: ['titleTh', 'titleEn', 'category', 'topic']
}

@Component({
  mixins: [validationMixin],
  validations,
  components: {
    SwitchLang,
    InputField,
    InputTagCategory,
    InputTopic
  }
})
export default class NormalArticle extends Vue {
  articleLang = 'th'

  private formData: TitleArticleData = {
    titleTh: '',
    subTitleTh: '',
    titleEn: '',
    subTitleEn: ''
  }
  private error: ErrorTitleArticleData = {
    titleTh: '',
    titleEn: ''
  }

  get language(): any {
    return this.$i18n.locale
  }

  get titleTh(): string {
    return this.formData.titleTh
  }

  set titleTh(newValue: string) {
    this.formData.titleTh = newValue
  }

  get titleEn(): string {
    return this.formData.titleEn
  }

  set titleEn(newValue: string) {
    this.formData.titleEn = newValue
  }

  get isDisabled(): boolean {
    return !!(
      ((this.articleLang === 'th' && this.formData.titleTh) ||
        (this.articleLang === 'en' && this.formData.titleEn)) &&
      validateError(this.error)
    )
  }

  get isSubmit(): string {
    return this.$store.getters['article/isSubmit']
  }

  @Watch('language')
  setTitleBreadcrumb(): void {
    this.setupBreadcrumb()
  }

  @Watch('isDisabled')
  setIsDisabled(): void {
    this.$store.dispatch('article/setIsHaveNormalTitle', this.isDisabled)
  }

  @Watch('titleTh')
  onChangedTitleTh(): void {
    if (this.articleLang === 'th') {
      this.error.titleTh = !this.$v.titleTh.required
        ? this.$t('contentManagement.error.emptyTitleTh').toString()
        : ''
    }
  }

  @Watch('titleEn')
  onChangedTitleEn(): void {
    if (this.articleLang === 'en') {
      this.error.titleEn = !this.$v.titleEn.required
        ? this.$t('contentManagement.error.emptyTitleEn').toString()
        : ''
    }
  }

  @Watch('isSubmit')
  onChangedSubmit(): void {
    this.checkFormData()
  }

  mounted() {
    this.setupBreadcrumb()
    this.setupArticle()
  }

  beforeDestroy() {
    this.$store.dispatch('article/setIsError', false)
    this.$store.dispatch('article/setIsCreateNewArticle', false)
    this.$store.dispatch('article/setIsHaveNormalTitle', false)
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  private setupBreadcrumb(): void {
    const breadcrumb: BreadcrumbType[] = [
      {
        title: this.$t('home.landing.contentManagement').toString(),
        url: '/'
      },
      {
        title: this.$t('contentManagement.articleList').toString(),
        url: '/'
      },
      {
        title: this.$t('contentManagement.createNewArticle').toString(),
        url: '/',
        active: true
      }
    ]
    this.$store.dispatch('breadcrumb/setBreadcrumb', breadcrumb)
    this.$store.dispatch(
      'breadcrumb/setPageTitle',
      `${this.$t('contentManagement.createNewArticle').toString()}`
    )
  }

  private setupArticle(): void {
    this.$store.dispatch('article/setIsCreateNewArticle', true)
  }

  private getArticleLang(lang: string): void {
    if (lang === 'th') {
      this.onChangedTitleTh()
    } else {
      this.onChangedTitleEn()
    }
    this.articleLang = lang
  }

  private checkFormData(): void {
    this.onChangedTitleTh()
    this.onChangedTitleEn()

    if (validateError(this.error)) {
      this.$router.push('/contentManagement/articlelist/create')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.normal-article-container {
  background: $white;
  padding: 25px 53px 20px;

  .selection-header {
    display: flex;
    height: 44px;

    .header-mark {
      width: 4px;
      height: 100%;
      background: $primary;
    }

    .header-container {
      margin-left: 14px;

      .header-title {
        font-size: 24px;
        line-height: 20px;
        font-weight: 700;
      }

      .header-sub-title {
        font-size: 14px;
        line-height: 20px;
        margin-top: 9px;
      }
    }

    .tooltip-pos {
      padding-top: 3px;
      height: 17px;
      margin-left: 14px;
    }
  }

  .article-input {
    margin-top: 27px;

    .optional-txt {
      position: absolute;
      top: 0;
      left: 130px;
      color: $gray-disable;
      font-size: 12px;
      line-height: 24px;
    }
  }
}
</style>
