import Vue from 'vue/dist/vue.js';

export default Vue.extend({
  template: `
        <span>
          <img
            class="btn-edit"
            src="https://dev-the1-portal.s3-ap-southeast-1.amazonaws.com/assets/btn-edit.png"
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