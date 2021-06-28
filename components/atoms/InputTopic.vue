<template>
  <div class="input-tag-container">
    <div class="title-box w-full" v-if="title">
      <span class="input-title">{{ title }}</span>
      <span v-show="required" class="input-field-required"> *</span>
    </div>
    <div class="tag-inline">
      <div
        class="tag"
        v-for="(topic, index) in topicListsSelected"
        :key="topic.id"
        v-if="topic.isSelected"
      >
        {{ topic.topic }}
        <img
          class="icon"
          :src="assets('icon/x-cross-white.png')"
          @click="removeItem(index)"
          alt="cross-red"
        />
      </div>
    </div>
    <div class="multiselect" v-click-outside="closeDropdown">
      <div class="test" style="position: relative">
        <input-field
          :type="'topic'"
          v-model="searchTopic"
          :placeholder="$t('contentManagement.searchForTopicPlaceholder')"
          :should-be-error="false"
          required
          :searchable="true"
          @click.native="showCheckboxes"
          @onEnter="topicInserted"
          :error-message="''"
        />
      </div>
      <div v-if="expanded" class="checkboxes">
        <label
          class="item-checkbox"
          v-for="topic in filterTopicList"
          :key="topic.id"
          v-if="!topic.isSelected"
        >
          <input
            type="checkbox"
            @click="selectValue(topic.id)"
            :checked="isCheckItemInSelectValue(topic.id)"
          />
          <span class="checkbox-text">{{ topic.topic }}</span>
        </label>
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
import { TopicTag } from '~/constants'

@Component({
  components: {
    InputField
  }
})
export default class InputTopic extends Vue {
  @Prop({
    required: true,
    type: Array
  })
  private value?: Array<object>

  @Prop({
    required: true,
    type: Array
  })
  private option!: TopicTag[]

  @Prop({
    default: 'Topics',
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
  topicListsSelected: TopicTag[] = this.option.slice()
  private searchTopic = ''
  private filterTopicList: TopicTag[] = []

  @Watch('searchTopic')
  searchChangeValue() {
    if (this.searchTopic.trim() === '' || this.searchTopic.trim().length < 2) {
      this.filterTopicList = []
    } else {
      this.filterTopicList = []
      this.topicListsSelected.forEach((v: TopicTag) => {
        if (
          v.topic.toLowerCase().includes(this.searchTopic.toLowerCase().trim())
        ) {
          this.filterTopicList.push(v)
        } else {
          return
        }
      })
    }
  }

  @Watch('topicListsSelected')
  onTopicListsSelectedChange() {
    let temp = this.topicListsSelected.slice()
    this.$emit('input', temp)
  }

  mounted() {}

  showCheckboxes() {
    this.expanded = true
  }

  closeDropdown() {
    this.expanded = false
  }

  topicInserted(value: any) {
    if (value === '') {
      this.filterTopicList = []
      return
    } else {
      const isHave = this.topicListsSelected.find(
        (topicList) =>
          topicList.topic.toLowerCase() === value.toLowerCase().trim()
      )
      if (!isHave) {
        this.topicListsSelected.push({
          id: this.topicListsSelected.length + 1,
          isSelected: true,
          topic: value
        })
        this.searchTopic = ''
        this.isCheckItemInSelectValue(this.topicListsSelected.length)
      } else {
        this.topicListsSelected = this.topicListsSelected.map((topic) => {
          return isHave.id === topic.id ? { ...topic, isSelected: true } : topic
        })
        this.isCheckItemInSelectValue(this.topicListsSelected.length)
        this.searchTopic = ''
      }
    }
  }

  selectValue(topicId: number) {
    this.topicListsSelected = this.topicListsSelected.map((topic) => {
      return topic.id === topicId
        ? {
            ...topic,
            isSelected: !topic.isSelected
          }
        : topic
    })
    this.expanded = !this.expanded
    this.searchTopic = ''
    this.filterTopicList = []
  }

  isCheckItemInSelectValue(topicId: number) {
    const topic = this.topicListsSelected.find((list) => list.id === topicId)
    return !!topic?.isSelected
  }

  removeItem(topicIndex: number) {
    this.topicListsSelected[topicIndex].isSelected = false
    this.onTopicListsSelectedChange()
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
      background: $mid-black;
      color: $white;
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
      max-height: 300px;
      overflow: auto;
      //border: 1px #dadada solid;
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
