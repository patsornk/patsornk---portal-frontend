<template>
  <div class="lang-switch">
    <div class="btn-lang-switch left" :class="isLangTh" @click="getArticleLang('th')">
      TH
    </div>
    <div class="btn-lang-switch right" :class="isLangEn" @click="getArticleLang('en')">
      EN
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {getAssetsPath} from "~/helper/images";
@Component
export default class SwitchLang extends Vue {
  private articleLang = 'th'

  get language(): any {
    return this.$i18n.locale
  }

  get isLangTh(): any {
    if(this.articleLang === 'th') {
      return 'active'
    }else {
      return ''
    }
  }

  get isLangEn(): any {
    if(this.articleLang === 'en') {
      return 'active'
    }else {
      return ''
    }
  }

  @Watch('articleLang')
  setTitleBreadcrumb(): void {
    this.$emit('get-article-lang', this.articleLang)
  }

  private getArticleLang(lang:string) {
    this.articleLang = lang
  }
  assets(name: string) {
    return getAssetsPath(name)
  }

}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.lang-switch {
  height: 30px;
  width: 80px;
  border-radius: 40px;
  background: $tritery-red;
  margin-left: auto;
  display: inline-flex;
  align-items: center;
.btn-lang-switch {
  width: 50%;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #BCA9A9;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  padding-top: 2px;
}
.left {
  border-radius: 40px 0 0 40px;
  margin-left: 2px;
}
.right {
  border-radius: 0 40px 40px 0;
  margin-right: 2px;
}
.active {
  background: $white;
  color: $primary;
  cursor: default;
  pointer-events: none;
}
}
</style>
