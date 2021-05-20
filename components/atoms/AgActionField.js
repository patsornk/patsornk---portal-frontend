import Vue from 'vue/dist/vue.js';

export default Vue.extend({
  template: `
        <span>
          <img
            class="btn-edit"
            src="${process.env.PORTAL_HOST}/assets/icon/edit.png"
            @click="btnClickedHandler"
          />
        </span>
    `,
  methods: {
    btnClickedHandler() {
      this.params.clicked(this.params.value);
    }
  }
});