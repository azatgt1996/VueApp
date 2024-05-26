<template>
  <div class="table-nav">
    <span style="font-weight: 700; font-size: 20px">Учебные сессии</span>
    <div style="float: right; display: flex;">
      <label id="search-input">
        <input type="text" placeholder="Поиск" v-model="search">
      </label>
      <button class="icon-btn">
        <Icon name="filter" />
      </button>
      <button class="icon-btn">
        <Icon name="sort" />
      </button>
      <button class="add-btn">Создать</button>
    </div>
  </div>
  <table class="table-border">
    <thead style="height: 50px">
      <tr>
        <th style="width: 210px; padding-left: 10px;">
          <span>Дата и время</span>
          <Icon name="arrow-down" style="float: right; margin-right: 60px" />
        </th>
        <th style="width: 145px">Статус</th>
        <th>Название учебного модуля</th>
        <th style="width: 170px">Тип сессии</th>
        <th style="width: 220px">Комната</th>
        <th style="width: 200px; padding-right: 10px">Группа</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rec, i) in page" style="height: 60px" :style="{ background: i % 2 == 1 ? '$bg-color' : 'white' }">
        <td style="padding-left: 10px">{{ dateFormat(rec) }}</td>
        <td>
          <span class="status-col" :style="{ background: status[rec.status.name].color }">
            {{ status[rec.status.name].text }}
          </span>
        </td>
        <td>{{ rec.module }}</td>
        <td>{{ session[rec.type.name] }}</td>
        <td>{{ rec.rooms.map(r => r.name).join(', ') }}</td>
        <td style="padding-right: 10px">{{ rec.groups.map(r => r.name).join(', ') }}</td>
      </tr>
      <tr v-if="!filtered.length">
        <td colspan="6" style="text-align: center; padding: 10px 0;">Нет данных</td>
      </tr>
    </tbody>
    <tfoot v-if="filtered.length" style="height: 50px">
      <td colspan="6" style="margin-top: 10px">
        <div class="pagination" style="display: flex">
          <button @click="curPage && curPage--">
            <Icon name="arrow-left" />
          </button>
          <button v-for="num in pageNum" @click="curPage = num - 1" :class="{ 'cur-page': curPage === num - 1 }">
            {{ num }}
          </button>
          <button @click="curPage != pageNum - 1 && curPage++">
            <Icon name="arrow-right" />
          </button>
        </div>
      </td>
    </tfoot>
  </table>
</template>

<script setup>
import { ref, computed } from 'vue';
import data from '@/data.json'
import Icon from '@/ui/Icon.vue';

const records = ref(data.sessions ?? [])

const curPage = ref(0)
const search = ref('')

const filtered = computed(() => {
  if (search.value.trim()) {
    curPage.value = 0
    return records.value.filter(it => it.module.includes(search.value.trim()))
  }
  return records.value
})

const ITEMS_IN_PAGE = 11

const pageNum = computed(() => ~~(filtered.value.length / ITEMS_IN_PAGE) + 1)
const page = computed(() => filtered.value.slice(curPage.value * ITEMS_IN_PAGE, (curPage.value + 1) * ITEMS_IN_PAGE))

const dateFormat = (rec) => {
  const time = rec.start.slice(11, 16) + ' - ' + rec.end.slice(11, 16)
  return new Date(rec.start).toLocaleDateString() + ', ' + time
}

const session = {
  accreditation: 'Аккредитация',
  lesson: 'Урок',
  examination: 'Экзамен',
}

const status = {
  planned: { text: 'Запланировано', color: '#AFBFF5' },
  completed: { text: 'Завершено', color: '#91C893' },
  canceled: { text: 'Отменено', color: '#FFDAA1' },
}
</script>

<style lang="scss">
@import '@/css/vars.scss';

.table-nav {
  display: block;

  #search-input {
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: 10px;
      top: 8px;
      height: 24px;
      width: 24px;
      background: url("@/assets/icons/search.svg");
    }

    input {
      padding: 0 20px 0 40px;
      border-radius: 10px;
      border: 1px solid $border-color;
      font-size: 18px;
      height: 42px;

      &:focus {
        outline: none;
      }
    }
  }

  .icon-btn {
    width: 40px;
    height: 40px;
    border: none;
    background: $bg-color;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
  }

  .add-btn {
    height: 40px;
    border-radius: 10px;
    border: none;
    background: $primary-color;
    font-size: 15px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    padding: 0 17px;
    margin-left: 14px;
  }
}

table.table-border {
  border-radius: 15px;
  border: 2px solid #E8EAEC;
  margin-top: 28px;
  background: #F5F7F9;
  width: 100%;
  border-spacing: 0px;

  td {
    padding: 0 5px;
  }

  th {
    text-align: left;
  }

  tbody {
    font-size: 14px;

    .status-col {
      border-radius: 15px;
      text-align: center;
      padding: 7px 10px;
    }
  }

  .pagination button {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,.1);
    background: white;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
      background: $bg-color;
    }
  }

  .cur-page {
    color: $primary-color;
    border: 1px solid $primary-color !important;
  }
}
</style>