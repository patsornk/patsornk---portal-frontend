<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"></slot>
      </header>

      <section class="modal-body">
        <slot name="body"></slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal {
  background: $white;
  border-radius: 6px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  padding: 24px;
  width: 400px;
}

.modal-header,
.modal-footer {
  display: flex;
}

.modal-header {
  position: relative;
  color: $primary;
  font-weight: 700;
  justify-content: space-between;
}

.modal-body {
  position: relative;
  padding: 20px 0px;
  text-align: left;
  font-size: 14px;
}

.modal-footer {
  justify-content: flex-end;
  text-align: right;
  font-size: 16px;
}
</style>
