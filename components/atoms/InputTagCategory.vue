<template>
  <div class="input-tag-container">
    <div class="title-box w-full" v-if="title">
      <span class="input-title">{{ title }}</span>
      <span v-show="required" class="input-field-required"> *</span>
    </div>
    <div class="tag-inline">
      <template v-for="(category, index) in categoryListsSelected">
        <div class="tag category" v-if="category.isSelected">
          {{ category.category }}
          <img
            class="icon"
            :src="assets('icon/x-cross-white.png')"
            @click="removeCategory(index)"
          />
        </div>
        <div
          class="tag"
          v-for="(child, childIndex) in category.child"
          :key="child.id"
          v-if="child.isSelected"
        >
          {{ child.role }}
          <img
            class="icon"
            :src="assets('icon/x-cross-red.png')"
            @click="removeItem(index, childIndex)"
          />
        </div>
      </template>
    </div>
    <div class="multiselect" v-click-outside="closeDropdown">
      <div class="test" style="position: relative">
        <input-field
          v-model="searchCategory"
          :placeholder="$t('contentManagement.searchForCategoryPlaceholder')"
          :should-be-error="false"
          required
          :searchable="true"
          @click.native="showCheckboxes"
          :error-message="errorMessage"
        />
        <img
          :src="assets('icon/arrow-down.png')"
          alt="arrow-down"
          style="position: absolute; top: 48%; right: 3%; width: 10px"
        />
      </div>
      <div v-if="expanded" class="checkboxes">
        <label class="item-please-select">
          {{ $t('common.pleaseSelect') }}
        </label>
        <div v-for="category in filterCategory" :key="category.id">
          <label class="category-type" :key="category.category">
            {{ category.category }}
          </label>
          <label
            class="item-checkbox"
            v-for="item in category.child"
            :key="item.id"
          >
            <input
              type="checkbox"
              @click="selectValue(category.id, item.id)"
              :checked="isCheckItemInSelectValue(category.id, item.id)"
            />
            <span class="checkbox-text">{{ item.role }}</span>
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
    <div class="error-message-box">
      <span v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getAssetsPath } from '~/helper/images'
import InputField from '@/components/atoms/InputField.vue'
import { CategoryTag, Child } from '~/constants'
@Component({
  components: {
    InputField
  }
})
export default class InputTagCategory extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  private value?: Array<object>

  @Prop({
    required: true,
    type: Array
  })
  private option!: CategoryTag[]

  @Prop({
    default: 'Category Tag',
    type: String
  })
  private title?: string

  @Prop({
    default: '',
    type: String
  })
  private errorMessage?: string

  @Prop({
    default: false,
    type: Boolean
  })
  private required?: boolean

  expanded = false
  categoryListsSelected: CategoryTag[] = this.option.slice()
  private searchCategory = ''
  private filterCategory = this.option.slice()

  @Watch('searchCategory')
  searchChangeValue() {
    if (this.searchCategory === '') {
      this.filterCategory = this.categoryListsSelected.slice()
    } else {
      this.filterCategory = []
      this.categoryListsSelected.forEach((v: CategoryTag) => {
        if (
          v.category
            .toLowerCase()
            .includes(this.searchCategory.toLowerCase().trim())
        ) {
          this.filterCategory.push(v)
        } else {
          let result: any = { ...v, child: [] }
          v.child.forEach((c: Child) => {
            if (
              c.role
                .toLowerCase()
                .includes(this.searchCategory.toLowerCase().trim())
            ) {
              result.child.push(c)
            }
          })
          if (result.child.length !== 0) this.filterCategory.push(result)
        }
      })
    }
  }

  @Watch('categoryListsSelected')
  onCategoryListSelectedChange() {
    let temp = this.categoryListsSelected.slice()
    this.$emit('input', temp)
  }

  mounted() {}

  showCheckboxes() {
    this.expanded = true
  }

  closeDropdown() {
    this.expanded = false
  }

  selectValue(categoryId: number, childId: number) {
    this.categoryListsSelected = this.categoryListsSelected.map((category) => {
      return category.id === categoryId
        ? {
            ...category,
            child: category.child.map((child: Child) => {
              return child.id === childId
                ? { ...child, isSelected: !child.isSelected }
                : child
            })
          }
        : category
    })
    this.categoryListsSelected = this.categoryListsSelected.map((category) => {
      return category.id === categoryId
        ? {
            ...category,
            isSelected: !!category.child.find(
              (child) => child.isSelected === true
            )
          }
        : category
    })
  }

  isCheckItemInSelectValue(categoryId: number, childId: number) {
    const category = this.categoryListsSelected.find(
      (list) => list.id === categoryId
    )
    return category?.child.find((c) => {
      if (c.id === childId) {
        return c.isSelected
      }
    })
  }

  removeItem(categoryIndex: number, childIndex: number) {
    this.categoryListsSelected[categoryIndex].child[childIndex].isSelected =
      false
    let isChildSelected = false
    this.categoryListsSelected[categoryIndex].child.forEach((c) => {
      if (c.isSelected === true) {
        isChildSelected = true
        return
      } else {
        return
      }
    })
    this.categoryListsSelected[categoryIndex].isSelected = isChildSelected
    this.onCategoryListSelectedChange()
  }

  removeCategory(index: number) {
    this.categoryListsSelected[index].child.forEach(
      (c) => (c.isSelected = false)
    )
    this.categoryListsSelected[index].isSelected = false
    this.onCategoryListSelectedChange()
  }

  assets(name: string) {
    return getAssetsPath(name)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.input-tag-container {
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  .title-box {
    margin-bottom: 8px;

    .input-title {
      font-size: 16px;
      font-weight: 700;
    }

    .input-field-required {
      margin-left: 0.25rem;
      color: $primary;
      font-weight: 700;
    }
  }

  .tag-inline {
    display: flex;
    flex-wrap: wrap;
    margin-top: 3px;

    .tag {
      display: flex;
      border-radius: 30px;
      background: $tritery-red;
      color: $primary;
      padding: 5px 14px;
      margin: 0 15px 8px 0;

      .icon {
        cursor: pointer;
        width: 10px;
        height: 10px;
        margin-top: 6px;
        margin-left: 10px;
      }
    }
    .category {
      background: $primary;
      color: $white;
    }
  }

  .multiselect {
    width: 100%;

    .select-role {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      width: 100%;
      height: 42px;
      color: $gray-disable;
      border: 1px solid $gray-disable;
      border-radius: 4px;
      padding-left: 15px;
      padding: 9px 16px;
      line-height: 25px;

      .icon {
        height: 6.24px;
        width: 10.2px;
        margin-top: 9px;
      }

      .dropdown-icon {
        position: absolute;
      }

      &.error {
        border: 1px solid $primary;
      }
    }

    .category-search-box {
      position: absolute;
      top: 0;
    }

    .checkboxes {
      height: 300px;
      overflow: auto;
      border: 1px #dadada solid;
      box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.1);
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;

      .item-please-select {
        font-size: 16px;
        line-height: 20px;
        color: $gray-disable;
        padding: 10px 16px;
        background-color: $grey-hover-dropdown;
      }

      .category-type {
        color: $grey-text;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        display: block;
        position: relative;
        padding: 10px 16px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .category-type:hover {
        background: white;
      }

      .item-checkbox {
        color: $mid-black;
        padding: 10px 16px;
        display: block;
        position: relative;
        padding-left: 35px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        input {
          position: absolute;
          cursor: pointer;
          opacity: 0;
          height: 0;
          width: 0;
        }

        .checkbox-text {
          font-size: 16px;
          line-height: 20px;
          margin-left: 8px;
        }

        .checkmark {
          position: absolute;
          top: 15px;
          left: 16px;
          height: 15px;
          width: 15px;
          background-color: $white;
          border: 1px solid $grey-text;
          border-radius: 3px;
        }
      }

      .item-checkbox input:checked ~ .checkmark {
        background-color: $primary;
        border: 1px solid $primary;
      }

      .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }

      .item-checkbox input:checked ~ .checkmark:after {
        display: block;
      }

      .item-checkbox .checkmark:after {
        left: 4px;
        top: 1px;
        width: 4px;
        height: 9px;
        border: solid white;
        border-width: 0 2px 2px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }

    .checkboxes label {
      display: block;
    }

    .checkboxes label:hover {
      background-color: $grey-hover-dropdown;
    }
  }

  .error-message-box {
    height: 24px;

    .error-message {
      color: $primary;
      font-size: 12px;
      margin-top: 0.4rem;
    }
  }

  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 18px;
    background: $scroll-bg;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 18px;
    background: $grey-text;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
