import Vue from 'vue/dist/vue.js'

export default Vue.extend({
  template: `
      <div style="width: 100%;height: 100%;display: flex; align-items: center;" @click="onSortRequested('asc', $event)">
        <span style="font-size: 14px; font-weight: 700; text-overflow: ellipsis; overflow: hidden;">
        {{ params.displayName }}
        </span>
      </div>
    `,
  data: function () {
    return {
      ascSort: null,
      descSort: null,
      noSort: null
    }
  },
  beforeMount() {},
  mounted() {},
  methods: {
    onSortRequested(order) {
      this.params.sortingList(this.params, order)
    }
  }
})
