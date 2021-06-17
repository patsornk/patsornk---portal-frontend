<template>
  <div class="upload-image">
    <div class="header-section">
      <span class="title">{{ title }}</span>
      <span class="description">
        ( JPG file or PNG file , File size maximum 20MB)
      </span>
    </div>
    <div class="upload-section">
      <label class="upload-btn" for="upload-file">
        <input
          type="file"
          id="upload-file"
          name="file"
          @change="fileSelected"
          accept="jpg/image/jpeg/image/png"
          hidden
        />
        Upload file
      </label>
      <span class="filename" v-if="file">
        {{ file.name }}
      </span>
    </div>
    <div class="preview-section">
      <img v-if="imageUrl && file" :src="imageUrl" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class UploadImage extends Vue {
  private file: any = null
  private imageUrl: string = ''

  @Prop({
    required: true,
    type: String
  })
  private title!: string

  private fileSelected(event: any): void {
    const regexFileType = /(\jpg|\jpeg|\png)$/g
    this.file = event.target.files[0]

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

    this.file && (this.imageUrl = URL.createObjectURL(this.file))
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.upload-image {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  .header-section {
    display: flex;
    flex-direction: column;
    text-align: left;

    .title {
      color: $mid-black;
      font-size: 16px;
      font-weight: 700;
    }

    .description {
      color: $gray-disable;
      font-size: 16px;
    }
  }

  .upload-section {
    text-align: left;
    margin: 1.5rem 0rem;

    .upload-btn {
      color: $mid-black;
      font-size: 16px;
      border: 1px solid $grey-text;
      padding: 6px 20px;
      margin-right: 1rem;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .filename {
      color: $mid-black;
      font-size: 16px;
    }
  }

  .preview-section {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px dashed $grey-text;
    height: 360px;
    width: 100%;

    img {
      max-height: 320px;
    }
  }
}
</style>
