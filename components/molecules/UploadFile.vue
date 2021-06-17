<template>
  <div>
    <div
      class="upload-container"
      :class="{ error: errorMessage, 'circle-style': circleStyle }"
      id="app"
    >
      <div
        class="input-box"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
      >
        <input
          type="file"
          :id="id"
          class="w-px h-px opacity-0 overflow-hidden absolute"
          ref="file"
          accept=".pdf,.jpg,.jpeg,.png"
          @change="fileChange"
        />

        <ul class="image-box" v-if="imageUrl" v-cloak>
          <div
            class="show-image"
            :class="{ 'circle-style': circleStyle }"
            :style="{
              background: `url(${imageUrl}) center / contain no-repeat`
            }"
          >
            <div class="icon-box" :class="{ 'circle-style': circleStyle }">
              <div class="icon-padding" @click="viewFile">
                <div class="icon-container">
                  <img class="view-file" :src="assets('login/eye-white.png')" />
                </div>
                <span class="view-file-text" @click="viewFile">
                  {{ $t('common.viewFile') }}
                </span>
              </div>
              <div class="icon-padding" @click="remove">
                <div class="icon-container">
                  <img
                    class="delete-file"
                    :src="assets('table/delete-white.png')"
                  />
                </div>
                <div class="delete-file-text">
                  {{ $t('common.deleteFile') }}
                </div>
              </div>
            </div>
          </div>
        </ul>
        <label v-else :for="id" class="block cursor-pointer upload-box">
          <div class="upload-input">
            <span class="material-icons icon-upload"> cloud_upload </span>
            <div>
              <span class="drop-text">{{ $t('common.dragAndDrop') }}</span>
              <span class="btn-upload">{{ $t('common.upload') }}</span>
              <div class="drop-text-description">
                {{ $t('common.fileType') }}
              </div>
            </div>
          </div>
        </label>
        <div class="error-message" :class="{ 'error-circle': circleStyle }">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'

@Component
export default class UploadImage extends Vue {
  @Prop({
    required: true,
    type: String
  })
  private id: string | undefined

  @Prop({
    type: String,
    default: ''
  })
  public imageUrl?: string | undefined

  @Prop({
    required: true,
    type: undefined
  })
  private value: undefined

  @Prop({
    type: String,
    default: ''
  })
  private errorMessage?: string

  @Prop({
    type: Boolean,
    default: false
  })
  private circleStyle?: boolean

  private file: any = null
  private filelist: any[] = []

  assets(name: string) {
    return getAssetsPath(name)
  }

  fileSelected() {
    const file: any = this.$refs.file
    this.filelist = [...file.files]
    this.fileChange(false)
  }
  viewFile() {
    this.$emit('viewFile', this.imageUrl)
  }
  remove() {
    this.filelist = []
    this.imageUrl = ''
    this.file = undefined
    this.$emit('input', this.file)
    this.$emit('onBlur', { file: this.file, imageUrl: this.imageUrl })
    this.$emit('removeUrl', this.file)
  }
  dragover(event: any) {
    event.preventDefault()
    // Add some visual fluff to show the user can drop its files
    if (!event.currentTarget.classList.contains('bg-gray-300')) {
      event.currentTarget.classList.remove('bg-gray-300')
      event.currentTarget.classList.add('bg-gray-300')
    }
  }
  dragleave(event: any) {
    // Clean up
    event.currentTarget.classList.add('bg-gray-300')
    event.currentTarget.classList.remove('bg-gray-300')
  }
  drop(event: any) {
    event.preventDefault()
    const file: any = this.$refs.file
    file.files = event.dataTransfer.files
    this.fileSelected() // Trigger the fileSelected event manually
    // Clean up
    event.currentTarget.classList.add('bg-gray-300')
    event.currentTarget.classList.remove('bg-gray-300')
  }

  private fileChange(event: any): void {
    const regexFileType = /(\jpg|\jpeg|\png)$/g
    this.file = event ? event.target.files[0] : this.filelist[0]
    if (event) {
      event.target.value = ''
      if (!this.file) return
      if (this.file.size > 20 * 1024 * 1024) {
        this.file = undefined
        this.$toast.error(`File is too big!`, {
          icon: {
            name: 'cancel',
            after: false
          }
        })
      }
    }

    if (!regexFileType.test(this.file.type)) {
      this.file = undefined
      this.$toast.error(`File is wrong type!`, {
        icon: {
          name: 'cancel',
          after: false
        }
      })
    }

    this.file && (this.imageUrl = URL.createObjectURL(this.file))
    this.$emit('input', this.file)
    this.$emit('onBlur', { file: this.file, imageUrl: this.imageUrl })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.error-message {
  color: $primary;
  font-size: 12px;
  margin-top: 7px;
  text-align: left;

  &.error-circle {
    text-align: center;
  }
}

.upload-container {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid $grey-text;
  border-style: dashed;
  border-radius: 10px;
  background: $grey-bg-hover;

  &.error {
    border: 1px solid $primary;
    border-style: dashed;
  }

  .input-box {
    justify-content: center;
    width: 100%;
    height: 100%;

    .icon-upload {
      font-size: 76px;
      color: $grey-text;
    }

    .btn-upload {
      color: $mid-black;
      border: 1px solid $gray-disable;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 700;
      padding: 6px 20px 9px 20px;
      // margin-left: 13px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      background: $white;
    }

    .upload-box {
      width: 100%;
      height: 100%;

      position: relative;

      .upload-input {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .drop-text {
          font-size: 14px;
          color: $mid-black;
        }
        .drop-text-description {
          font-size: 14px;
          color: $gray-disable;
          margin-top: 12px;
        }
      }
    }

    .image-box {
      width: 100%;
      height: 100%;
      padding-left: 0px !important;
      .show-image {
        width: 100%;
        height: 100%;
        position: relative;
        color: $white;
      }
      .show-image:hover .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .show-image .icon-box {
        display: none;
        align-items: center;
        justify-content: center;
        background-color: rgb(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
      }
      .show-image .view-file {
        cursor: pointer;
        width: 36px;
        height: 27px;
      }
      .show-image .delete-file {
        cursor: pointer;
        width: 30px;
        height: 33px;
      }
      .show-image .view-file-text {
        cursor: pointer;
        font-size: 14px;
      }
      .show-image .delete-file-text {
        cursor: pointer;
        font-size: 14px;
      }
    }
  }
}
.circle-style {
  border-radius: 50%;
}

.icon-padding {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
}
.icon-container {
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
