<template>
  <div class="upload-container" id="app">
    <div
      class="input-box"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
    >
      <input
        type="file"
        name="fields[assetsFieldHandle][]"
        id="assetsFieldHandle"
        class="w-px h-px opacity-0 overflow-hidden absolute"
        ref="file"
        accept=".pdf,.jpg,.jpeg,.png"
        @change="fileChange"
      />

      <ul class="image-box" v-if="imageUrl && file" v-cloak>
        <div
          class="show-image"
          :style="{
            background: `url(${imageUrl}) center / contain no-repeat`
          }"
        >
          <div class="icon-box">
            <div class="icon-view">
              <span class="material-icons view-file">
                visibility
              </span>
              <div
                class="material-icons delete-file"
                @click="remove"
              >
                delete
              </div>
            </div>

            <div class="icon-view">
              <span class="view-file-text">
                View File
              </span>
              <div class="delete-file-text" @click="remove">
                Delete File
              </div>
            </div>
          </div>
        </div>
      </ul>
      <label
        v-else
        for="assetsFieldHandle"
        class="block cursor-pointer upload-box"
      >
        <div class="upload-input">
          <span class="material-icons icon-upload">
            cloud_upload
          </span>
          <div>
            <span class="drop-text"
              >Drop file to upload or</span
            >
            <span class="btn-upload">Upload file</span>
            <div class="drop-text-description">
              ( .jpg file, .jpeg or .png file , File size
              maximum 20MB)
            </div>
          </div>
        </div>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator'

@Component
export default class UploadImage extends Vue {
  @Prop({
    required: true,
    type: undefined
  })
  private value: undefined

  private file: any = null
  private imageUrl: string = ''
  private filelist: any[] = []

  fileSelected() {
    this.filelist = [...this.$refs.file.files]

    this.fileChange(false)
  }
  remove() {
    this.filelist = []
    this.imageUrl = ''
    this.file = undefined
  }
  dragover(event: any) {
    event.preventDefault()
    // Add some visual fluff to show the user can drop its files
    if (
      !event.currentTarget.classList.contains('bg-gray-300')
    ) {
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
    this.$refs.file.files = event.dataTransfer.files
    this.fileSelected() // Trigger the fileSelected event manually
    // Clean up
    event.currentTarget.classList.add('bg-gray-300')
    event.currentTarget.classList.remove('bg-gray-300')
  }

  private fileChange(event: any): void {
    const regexFileType = /(\jpg|\jpeg|\png)$/g
    this.file = event
      ? event.target.files[0]
      : this.filelist[0]

    if (this.file.size > 20 * 1024 * 1024) {
      this.file = undefined
      this.$toast.error(`File is too big!`, {
        icon: {
          name: 'cancel',
          after: false
        }
      })
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

    this.file &&
      (this.imageUrl = URL.createObjectURL(this.file))
    this.$emit('input', this.imageUrl)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

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
      margin-left: 13px;
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
      .show-image {
        width: 100%;
        height: 100%;
        position: relative;
        color: $white;
      }
      .show-image:hover .icon-box {
        display: block;
      }
      .show-image .icon-box {
        display: none;
        background-color: rgb(0, 0, 0, 0.7);
        width: 100%;
        height: 100%;
      }
      .show-image .view-file {
        cursor: pointer;
        font-size: 36px;
        text-align: right;
        position: absolute;
        top: 45%;
        left: 45%;
        transform: translate(-50%, -50%);
      }
      .show-image .delete-file {
        cursor: pointer;
        font-size: 36px;
        text-align: left;
        position: absolute;
        top: 45%;
        left: 55%;
        transform: translate(-50%, -50%);
      }
      .show-image .view-file-text {
        cursor: pointer;
        font-size: 14px;
        text-align: right;
        position: absolute;
        top: 55%;
        left: 45%;
        transform: translate(-50%, -50%);
      }
      .show-image .delete-file-text {
        cursor: pointer;
        font-size: 14px;
        text-align: left;
        position: absolute;
        top: 55%;
        left: 55%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>