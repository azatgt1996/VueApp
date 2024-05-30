<template>
  <DataTable :data="records" mainCol="module" title="Учебные сессии" @add="console.log('adding')" :cols="[
    { label: 'Дата и время', width: 170, value: rec => dateTimeFormat(rec) },
    { label: 'Статус', width: 130, value: rec => statusText[rec.status.name], colors: statusColor },
    { label: 'Название учебного модуля', value: rec => rec.module },
    { label: 'Тип сессии', width: 150, value: rec => session[rec.type.name] },
    { label: 'Комната', width: 220, value: rec => rec.rooms.map(r => r.name).join(', ') },
    { label: 'Группа', width: 200, value: rec => rec.groups.map(r => r.name).join(', ') },
  ]" />
</template>

<script setup>
import { ref } from 'vue';
import { dateTimeFormat } from '@/utils/formatter.js'
import data from '@/data.json'
import DataTable from '@/components/DataTable.vue';

const records = ref(data.sessions ?? [])

const session = {
  accreditation: 'Аккредитация',
  lesson: 'Урок',
  examination: 'Экзамен',
}

const statusText = {
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