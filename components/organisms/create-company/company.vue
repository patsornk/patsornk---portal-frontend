<template>
  <div class="create-company-container">
    <span class="header">Company Information</span>
    <div class="input-section">
      <input-field
        title="Company Name (TH)"
        :required="true"
      />
      <input-field title="Company Name (EN)" />
      <input-field title="Company type" :required="true" />
      <input-field
        title="Partner Category"
        :required="true"
      />
      <input-field title="Business Size" :required="true" />
      <input-field title="Assignee" :required="true" />
      <input-field title="E-mail" :required="true" />
      <phone-num-input title="Phone No." :required="true" />
    </div>
    <div class="submit-section">
      <button class="submit">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import InputField from '@/components/atoms/InputField.vue'
import PhoneNumInput from '@/components/atoms/PhoneNumInput.vue'

@Component({
  components: {
    InputField,
    PhoneNumInput
  }
})
export default class CreateCompany extends Vue {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-company-container {
  padding-top: 60px;

  .header {
    font-size: 24px;
    font-weight: 700;
  }

  .input-section {
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 60px;
    grid-row-gap: 25px;
    padding: 30px 10% 30px 0px;

    .input-field,
    .phone-num-input {
      min-width: 420px;
    }
  }

  .submit-section {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 35px;

    .submit {
      display: flex;
      justify-content: center;
      align-items: center;

      background: $mid-black;
      color: $white;
      border-radius: 6px;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
      width: 160px;
      height: 40px;

      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
