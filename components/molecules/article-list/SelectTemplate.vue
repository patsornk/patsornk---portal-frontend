<template>
  <div class="template-selection-container">
    <div class="selection-header">
      <div class="header-mark"/>
      <div class="header-container">
        <div class="header-title">
          {{ $t('contentManagement.templateSelection') }}
        </div>
        <div class="header-sub-title">
          {{ $t('contentManagement.oneOfThreeStep') }}
        </div>
      </div>
    </div>
    <div class="content-container">
      <div
        class="article-btn"
        @click="article = 'normal'"
        :class="isNormalArticleSelect"
      >
        <div class="article-image-box">
          <img
            class="article-image"
            :src="assets('common/article_normal.png')"
            alt="article-normal"
          />
          <img
            class="article-radio-btn test"
            width="74"
            height="74"
            :src="assets('common/article_checked.png')"
            v-if="article === 'normal'"
            alt="normal-checked"
          />
          <img
            class="article-radio-btn test2"
            width="74"
            height="74"
            :src="assets('common/article_unchecked.png')"
            v-else
            alt="normal-unchecked"
          />
        </div>
        <div class="article-text">
          <div class="article-text-title">
            {{ $t('contentManagement.articleNormal') }}
          </div>
          <div class="article-text-subtitle">
            {{ $t('contentManagement.articleNormalDescription') }}
          </div>
        </div>
      </div>
      <div
        class="article-btn"
        @click="article = 'video'"
        :class="isVideoArticleSelect"
      >
        <div class="article-image-box">
          <img
            class="article-image"
            :src="assets('common/article_video.png')"
            alt="article-video"
          />
          <img
            class="article-radio-btn"
            width="74"
            height="74"
            :src="assets('common/article_checked.png')"
            alt="video-checked"
            v-if="article === 'video'"
          />
          <img
            class="article-radio-btn"
            width="74"
            height="74"
            :src="assets('common/article_unchecked.png')"
            alt="video-unchecked"
            v-else
          />
        </div>
        <div class="article-text">
          <div class="article-text-title">
            {{ $t('contentManagement.articleVideo') }}
          </div>
          <div class="article-text-subtitle">
            {{ $t('contentManagement.articleVideoDescription') }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer-container">
      <button class="submit-section-btn cancel" @click="cancel">
        {{ $t('common.cancel') }}
      </button>
      <button class="submit-section-btn next" @click="next" :class="isDisable">
        {{ $t('common.next') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import {getAssetsPath} from '~/helper/images'

@Component({
  components: {}
})
export default class SelectTemplate extends Vue {
  article = ''

  get isNormalArticleSelect(): any {
    if (this.article === 'normal') {
      return 'active'
    } else if (this.article === 'video') {
      return ''
    } else {
      return ''
    }
  }

  get isVideoArticleSelect(): any {
    if (this.article === 'normal') {
      return ''
    } else if (this.article === 'video') {
      return 'active'
    } else {
      return ''
    }
  }

  get isDisable(): any {
    if (!this.article) {
      return 'disabled'
    } else {
      return ''
    }
  }

  private cancel(): void {
    this.article = ''
    this.$router.push('/article')
  }

  private next(): void {
    if (this.article === '') {
    } else if (this.article === 'normal') {
      this.$router.push('/article/create/normal')
    } else {
      this.$router.push('/article/create/video')
    }
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.template-selection-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 32px 50px;

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
  }

  .content-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 24px 0 32px 0;
    justify-content: center;

    .article-btn {
      display: flex;
      flex-direction: column;
      width: 450px;
      height: 545px;
      background: white;
      border: 3px solid white;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
      margin-left: 75px;
      margin-right: 75px;
      min-width: 450px;

      .article-image-box {
        width: 100%;
        height: 100%;
        max-width: 400px;
        max-height: 400px;
        align-self: center;
        margin-top: 27px;
        position: relative;

        .article-image {
          width: 100%;
          height: 100%;
          max-width: 400px;
          max-height: 400px;
          position: absolute;
        }

        .article-radio-btn {
          top: 14px;
          right: 22px;
          position: absolute;
        }
      }

      .article-text {
        margin-top: 20px;
        height: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .article-text-title {
          font-weight: bold;
          font-size: 24px;
          line-height: 20px;
        }

        .article-text-subtitle {
          margin-top: 10px;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }

    .active {
      background: rgba(255, 0, 0, 0.03);
      border: 3px solid $primary;
      cursor: default;
    }
  }

  .footer-container {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    .submit-section-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      font-size: 16px;
      line-height: 24px;
      font-weight: bold;
    }

    .cancel {
      background: $white;
      width: 157px;
      height: 40px;
      margin-right: 25px;
      border: 1px solid #b9b9b9;
    }

    .cancel:hover {
      color: $grey-text;
    }

    .next {
      background: $mid-black;
      color: $white;
      width: 157px;
      height: 40px;
    }

    .disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    button:focus {
      outline: none;
    }
  }
}

@media screen and (max-width: 1200px) {
  .template-selection-container {
    .content-container {
      justify-content: space-between;

      .article-btn {
        margin: 0;
      }
    }
  }
}
</style>
