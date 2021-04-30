<template>
  <div class="create-branch-container">
    Branch

    <div class="submit-section">
      <button class="submit" @click="clickSave">Save</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class CreateBranch extends Vue {
  async clickSave() {
    this.$toast.global.success('Saved successfully')
    this.$router.push('/organizationManagement/create/service')
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.create-branch-container {
  padding-top: 60px;

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
