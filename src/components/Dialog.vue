<template>
  <dialog ref="modal" class="custom-dialog">
    <header class="dialog-header">
      <h2 class="dialog-title">{{ title }}</h2>
      <button class="close-btn" @click="modal.close()">
        <Icon name="x" />
      </button>
    </header>
    <form>
      <div class="form-content">
        <slot></slot>
      </div>
      <div class="dialog-buttons">
        <button class="primary-btn" type="submit">Сохранить</button>
        <button class="secondary-btn" @click="modal.close()">Закрыть</button>
      </div>
    </form>
  </dialog>
</template>

<script setup>
import { ref } from 'vue';
import Icon from '@/ui/Icon.vue';

const modal = ref()

defineProps({
  title: String,
})

defineExpose({
  showModal: () => modal.value.showModal()
})

</script>

<style lang="scss">
.custom-dialog {
  width: 500px;
  min-height: 500px;
  padding: 0;
  top: 0;
  margin: auto;
  border: 1px solid #F4F4F4;
  border-radius: 5px;

  &::backdrop {
    backdrop-filter: blur(.8px);
    background-color: black;
    opacity: .3;
  }

  .dialog-header {
    display: flex;
    height: 60px;
    align-items: center;

    .dialog-title {
      text-align: center;
      margin: 0;
      flex-grow: 1;
    }

    .close-btn {
      display: none;
      align-self: center;
      background: none;
      border: none;
      cursor: pointer;
      margin-right: 10px;

      svg {
        width: 13px;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 60px);
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 10px 30px;
    overflow-y: auto;

    input, select {
      display: block;
      width: 100%;
    }
  }

  .dialog-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;
      margin: 0 10px;
    }
}
</style>