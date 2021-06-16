<template>
  <div class="profile-section">
    <div class="outsite-frame">
      <div class="preview-section">
        <img
          class="profile-image"
          style="width: 100%; height: 100%"
          v-if="!(dataValue && file)"
          :src="assets('common/temporary-profile.png')"
        />
        <img
          class="profile-image"
          style="width: 100%; height: 100%"
          v-if="dataValue && file"
          :src="dataValue"
        />
      </div>
    </div>
    <button @click="openDropdown" v-click-outside="toggleLock">
      <img class="camera-btn" :src="assets('icon/profile-camera.png')" />
    </button>
    <div
      class="dropdown-select"
      v-if="isShowDropdown"
      v-click-outside="closeDropdown"
    >
      <div class="first-option">
        <label class="upload-btn" for="upload-file">
          <input
            type="file"
            id="upload-file"
            name="file"
            @change="fileSelected"
            accept=".jpeg, .jpg, .png"
            hidden
            @click="closeDropdown"
          />
          {{ $t('profile.inputChooseFile') }}
        </label>
      </div>
      <button
        class="second-option"
        style="text-align: start"
        @click="deleteProfile"
        :class="isDisabled"
      >
        {{ $t('profile.textDeleteBtn') }}
      </button>
    </div>
    <div class="validation-error-text">
      <span v-if="errorMessage" class="text-danger error-msg">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'
@Component({
  components: {}
})
export default class ProfilePicture extends Vue {
  $i18n: any

  @Prop({
    required: true,
    type: String
  })
  private value!: string

  private isShowDropdown = false
  private file: any = null
  private errorMessage = ''
  private lock = false

  get dataValue() {
    return this.value
  }

  set dataValue(value) {
    this.$emit('input', value)
  }

  get language(): any {
    return this.$i18n.locale
  }

  get isDisabled(): any {
    if (!(this.dataValue && this.file)) {
      return 'disabled'
    } else {
      return ''
    }
  }

  @Watch('language')
  changeLanguage(): void {
    if (this.language === 'en') {
      if (this.errorMessage) {
        if (this.errorMessage === this.$t('common.fileType').toString()) {
          this.errorMessage = this.$t('common.fileType').toString()
        } else this.errorMessage = this.$t('common.fileSizeNotExceed').toString()
      }
    } else {
      if (this.errorMessage) {
        if (this.errorMessage === this.$t('common.fileType').toString()) {
          this.errorMessage = this.$t('common.fileType').toString()
        } else this.errorMessage = this.$t('common.fileSizeNotExceed').toString()
      }
    }
  }

  assets(name: string) {
    return getAssetsPath(name)
  }

  private openDropdown() {
    this.isShowDropdown = true
    this.lock = true
  }

  private closeDropdown() {
    if (this.isShowDropdown && !this.lock) {
      this.isShowDropdown = false
    }
  }

  private toggleLock() {
    this.lock = false
  }

  private fileSelected(event: any): void {
    this.isShowDropdown = false
    const regexFileType = /(\jpg|\jpeg|\png)$/g
    this.file = event.target.files[0]

    if (!this.file) {
      //if don't select any file
      this.isShowDropdown = false
      return
    } else if (!regexFileType.test(this.file.type)) {
      // wrong type
      this.errorMessage = this.$t('common.fileType').toString()
    } else if (this.file.size > 5 * 1024 * 1024) {
      // out of size
      this.errorMessage = this.$t('common.fileSizeNotExceed').toString()
    } else {
      //success case
      this.file && (this.dataValue = URL.createObjectURL(this.file))
      this.isShowDropdown = false
      this.errorMessage = ''
    }
  }

  private deleteProfile() {
    this.dataValue = ''
    this.isShowDropdown = false
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.profile-section {
  position: relative;
  width: 194px;
  height: 194px;
}
.outsite-frame {
  position: absolute;
  border-radius: 50%;
  height: 100%;
  width: 100%;
  border: 2px solid red;
}
.preview-section {
  height: 100%;
  width: auto;
  border-radius: 50%;
}
.profile-image {
  width: 100%;
  height: 100%;
  padding: 3px;
  object-fit: cover;
  border-radius: 50%;
}
.camera-btn {
  position: absolute;
  width: 44px;
  height: 44px;
  right: 17px;
  bottom: 0;
}
.dropdown-select {
  position: absolute;
  width: 175px;
  height: 94px;
  right: -60%;
  bottom: -50%;
  background: #ffffff;
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1;
  .first-option {
    margin-top: 8px;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .first-option:hover {
    background-color: $grey-hover-dropdown;
  }
  .upload-btn {
    padding-left: 16px;
    cursor: pointer;
  }
  .second-option {
    height: 40px;
    width: 100%;
    padding-left: 16px;
  }
  .second-option:hover {
    background-color: $grey-hover-dropdown;
  }
  .disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.3;
  }
  .second-option:focus {
    outline: none;
  }
}

.validation-error-text {
  color: $primary;
  width: 194px;
  top: 100%;
  position: absolute;
  text-align: center;
  line-height: 15px;
  margin-top: 6px;
}

.error-msg {
  font-size: 0.75rem;
  width: max-content;
}
</style>
