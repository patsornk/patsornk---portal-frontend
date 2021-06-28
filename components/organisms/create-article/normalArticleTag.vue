<template>
  <div class="normal-article-tag-container">
    <input-tag-category
      v-model="$v.category.$model"
      :option="categoryArrayObj"
      :errorMessage="error.category"
      required
    ></input-tag-category>
    <input-topic
      v-model="$v.topic.$model"
      :option="topicList"
      :errorMessage="error.topic"
      required
    ></input-topic>
  </div>
</template>

<script lang="ts">
import { Component, Vue , Watch} from 'vue-property-decorator'
import InputTagCategory from '~/components/atoms/InputTagCategory.vue'
import InputTopic  from "~/components/atoms/InputTopic.vue";
import { validationMixin } from 'vuelidate'
import {required} from "vuelidate/lib/validators";
import { ErrorNormalArticleTagData, CategoryTag, TopicTag} from '~/constants'

const validations = {
  category: {
    required
  },
  topic: {
    required
  },
  validationGroup: [
    'category',
    'topic'
  ]
}

@Component({
  mixins: [validationMixin],
  validations,
  components: {
    InputTagCategory,
    InputTopic
  }
})

export default class NormalArticleTag extends Vue {

  category = []
  topic = []
  isCategorySelected = false
  isTopicSelected = false
  private error: ErrorNormalArticleTagData = {
    category: '',
    topic: ''
  }

  @Watch('category')
  checkCategory(): void {
    let haveCategorySelected = this.$v.category.$model.length > 0
    this.isCategorySelected = !!this.$v.category.$model.find((category:CategoryTag) => category.isSelected)
    this.error.category = !this.isCategorySelected && !haveCategorySelected
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('topic')
  checkTopic(): void {
    let haveTopicSelected = this.$v.topic.$model.length > 0
    this.isTopicSelected = !!this.$v.topic.$model.find((topic:TopicTag) => topic.isSelected)
    this.error.topic = !this.isTopicSelected && !haveTopicSelected
      ? this.$t('common.pleaseSelect').toString()
      : ''
  }

  @Watch('isCategorySelected')
  updateCategoryToStore(): void {
    this.$store.dispatch('article/setIsCategorySelected', this.isCategorySelected)
  }

  @Watch('isTopicSelected')
  updateTopicToStore(): void {
    this.$store.dispatch('article/setIsTopicSelected', this.isTopicSelected)
  }

  categoryArrayObj = [
    {
      id: 1,
      category: 'Food & Dining',
      isSelected: false,
      child: [
        {
          id: 1,
          role: 'Cafe',
          isSelected: false
        },
        {
          id: 2,
          role: 'Restaurant',
          isSelected: false
        },
        {
          id: 3,
          role: 'Grocery',
          isSelected: false
        },
        {
          id: 4,
          role: 'Recipe',
          isSelected: false
        }
      ]
    },
    {
      id: 2,
      category: 'Mom & Kids',
      isSelected: false,
      child: [
        {
          id: 5,
          role: 'TestMom1',
          isSelected: false
        },
        {
          id: 6,
          role: 'TestMom2',
          isSelected: false
        },
        {
          id: 7,
          role: 'TestMom3',
          isSelected: false
        },
        {
          id: 8,
          role: 'Food',
          isSelected: false
        },
        {
          id: 9,
          role: 'Dining',
          isSelected: false
        },
      ]
    }
  ]
  topicList = [
    {
      id: 1,
      topic: 'Food & Dining',
      isSelected: false
    },
    {
      id: 2,
      topic: 'Pasta',
      isSelected: false
    },
    {
      id: 3,
      topic: 'Recipes',
      isSelected: false
    },
    {
      id: 4,
      topic: 'Restaurant',
      isSelected: false
    },
    {
      id: 5,
      topic: 'Buffet',
      isSelected: false
    },
    {
      id: 6,
      topic: 'Food Truck',
      isSelected: false
    },
    {
      id: 7,
      topic: 'Chilled&RTE Meal',
      isSelected: false
    },
    {
      id: 8,
      topic: 'Delivery',
      isSelected: false
    }
  ]
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.normal-article-tag-container {
  background: $white;
  padding: 25px 53px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
