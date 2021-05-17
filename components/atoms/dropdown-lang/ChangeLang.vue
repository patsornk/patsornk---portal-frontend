<template>
  <div class="change-lang">
    <v-select
      :searchable="false"
      :options="language"
      v-model="langSelected"
      :reduce="(locale) => locale.code"
      class="lang-select"
      label="name"
      :map-keydown="deleteHandler"
    >
      <template #selected-option="option">
        <div class="dropdown-option">
          <img
            :src="imageIcon(option.code)"
            style="
              margin-right: 8px;
              width: 22px;
              height: 22px;
            "
          />
          <span>{{ option.name }}</span>
        </div>
      </template>
      <template v-slot:option="option">
        <div class="dropdown-option">
          <img
            :src="imageIcon(option.code)"
            style="
              margin-right: 8px;
              width: 22px;
              height: 22px;
            "
          />
          {{ option.name }}
        </div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component
export default class ChangeLang extends Vue {
  private langSelected: string = this.$i18n.locale

  get language(): any {
    return this.$i18n.locales
  }

  @Watch('langSelected')
  onChangedLang(value: string): void {
    this.$i18n.setLocale(value)
  }

  private imageIcon(name: string): any {
    const image = require(`@/assets/images/lang/${name}.png`)
    return image
  }

  deleteHandler(map: any, vm: any) {
    return {
      ...map, 8: (e: any) => {
        e.preventDefault();
      },
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.change-lang {
  .lang-select {
    width: 140px;

    .dropdown-option {
      display: flex;
      width: 100%;
    }

    ::v-deep .vs__clear {
      display: none;
    }

    ::v-deep .vs__selected {
      position: inherit;
    }

    ::v-deep .vs__dropdown-toggle {
      border: none;
    }

    ::v-deep .vs__dropdown-menu {
      box-shadow: $box-shadow-black;
      border: none;
    }

    ::v-deep .vs__dropdown-option > span {
      width: 100%;
    }
  }
}

@media screen and (max-width: 767px) {
  .change-lang {
    .lang-select {
      width: auto;
      .dropdown-option {
        span {
          display: none;
        }
      }

      ::v-deep .vs__selected-options {
        flex-basis: auto;
        flex-grow: 0;
      }

      ::v-deep .vs__search {
        display: none;
      }

      ::v-deep .vs__dropdown-toggle {
        width: fit-content;
      }

      ::v-deep .vs__dropdown-menu {
        left: -90px;
      }
    }
  }
}
</style>