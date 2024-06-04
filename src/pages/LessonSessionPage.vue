<template>
  <DataTable :data="records" mainCol="module" title="Учебные сессии" @add="modal.showModal()" :cols="[
    { label: 'Дата и время', width: 170, value: rec => dateTimeFormat(rec) },
    { label: 'Статус', width: 130, value: rec => status[rec.status.name], colors: statusColor },
    { label: 'Название учебного модуля', value: rec => rec.module },
    { label: 'Тип сессии', width: 150, value: rec => session[rec.type.name] },
    { label: 'Комната', width: 220, value: rec => rec.rooms.map(r => r.name).join(', ') },
    { label: 'Группа', width: 200, value: rec => rec.groups.map(r => r.name).join(', ') },
  ]" />

  <Dialog ref="modal" title="Добавление сессии">
    <label>
      Статус
      <select required v-model="formData.status">
        <option value="" disabled selected hidden>Выберите статус</option>
        <option v-for="([key, val]) in Object.entries(status)" :value="key">{{ val }}</option>
      </select>
    </label>
    <label>
      Название учебного модуля
      <input type="text" placeholder="Введите название" required v-model="formData.name"/>
    </label>
    <label>
      Тип сессии
      <select required v-model="formData.session">
        <option value="" disabled selected hidden>Выберите тип сессии</option>
        <option v-for="([key, val]) in Object.entries(session)" :value="key">{{ val }}</option>
      </select>
    </label>
    <label>
      Комнаты
      <input type="text" placeholder="Укажите комнаты через запятую" required v-model="formData.rooms"/>
    </label>
    <label>
      Группы
      <input type="text" placeholder="Укажите группы через запятую" required v-model="formData.groups"/>
    </label>
    <label>
      Дата/время начала и конца
      <div class="flex" style="gap: 10px">
        <input type="datetime-local" placeholder="Дата и время начала" required v-model="formData.startDate"/>
        <input type="datetime-local" placeholder="Дата и время конца" required v-model="formData.endDate"/>
      </div>
    </label>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { dateTimeFormat } from '@/utils/formatter.js'
import data from '@/data.json'
import DataTable from '@/components/DataTable.vue';
import Dialog from '@/components/Dialog.vue';

const records = ref(data.sessions ?? [])

const modal = ref()

const formData = ref({
  status: '',
  name: '',
  session: '',
  rooms: '',
  groups: '',
  startDate: '', endDate: '',
})

const session = {
  accreditation: 'Аккредитация',
  lesson: 'Урок',
  examination: 'Экзамен',
}

const status = {
  planned: 'Запланировано',
  completed: 'Завершено',
  canceled: 'Отменено',
}

const statusColor = {
  Запланировано: '#AFBFF5',
  Завершено: '#91C893',
  Отменено: '#FFDAA1',
}
</script>