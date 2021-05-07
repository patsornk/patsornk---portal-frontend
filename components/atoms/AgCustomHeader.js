import Vue from 'vue/dist/vue.js';

export default Vue.extend({
  template: `
      <div>
          <div class="customHeaderLabel">{{ params.displayName }}</div>
          <div v-if="params.enableSorting" @click="onSortRequested('asc', $event)" :class="ascSort" class="customSortDownLabel">
            a</div>
          <div v-if="params.enableSorting" @click="onSortRequested('desc', $event)" :class="descSort" class="customSortUpLabel">
            b</div>
          <div v-if="params.enableSorting" @click="onSortRequested('', $event)" :class="noSort" class="customSortRemoveLabel">
            c</div>
          </div>
      </div>
    `,
  data: function () {
    return {
      ascSort: null,
      descSort: null,
      noSort: null,
    };
  },
  beforeMount() {},
  mounted() {},
  methods: {
    onSortRequested(order) {
        this.params.sortingList(this.params, order)
    },
  },
});
