import Vue from 'vue/dist/vue.js';

export default Vue.extend({
  template: `
      <span class="custom-row-80">
        <div class="view-branch" @click="clickSave">
          {{ params.btnName }}
        </div>
      </span>
    `,
  methods: {
    clickSave() {
      this.params.clicked(this.params.value);
    }
  }
});