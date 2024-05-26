<script setup>
import { ref, computed } from 'vue';
import data from './data.json'
import Icon from './components/Icon.vue';

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
  const time = rec.start.slice(11, 16) + ' - ' + rec.end.slice(11,16)
  return new Date(rec.start).toLocaleDateString() + ', ' + time
}

const session = {
  accreditation: 'Аккредитация',
  lesson: 'Урок',
  examination: 'Экзамен',
}

const status = {
  planned: {text: 'Запланировано', color: '#AFBFF5'},
  completed: {text: 'Завершено', color: '#91C893'},
  canceled: {text: 'Отменено', color: '#FFDAA1'},
}

</script>

<template>
  <div class="sidebar">
    <div class="nav-header">
      <Icon name="logo" style="align-self: center"/>
      <span class="logo-text">Сим Центр</span>
    </div>
    <div class="nav-main">
      <div class="nav-item" tabindex="1">
        <Icon name="schedule"/>Расписание
      </div>
      <div class="nav-item" tabindex="2">
        <Icon name="lessons"/>Учебные сессии
      </div>
      <div class="nav-item" tabindex="3">
        <Icon name="room"/>Список комнат
      </div>
      <div class="nav-item" tabindex="4">
        <Icon name="user"/>Пользователи
      </div>
      <div class="nav-item" tabindex="5">
        <Icon name="lesson-group"/>Учебные группы
      </div>
      <div class="nav-item" tabindex="6">
        <Icon name="device"/>Список устройств
      </div>
      <div class="nav-item" tabindex="7">
        <Icon name="setting"/>Настройки системы
      </div>
      <div class="nav-item" tabindex="8">
        <Icon name="archive"/>Архив
      </div>
    </div>
    <div class="nav-footer">
      <div class="user-panel">
        <div>
          <div style="font-weight: 800; font-size: 15px">Барнаби Мармадюк</div>
          <div style="font-weight: 500; font-size: 13px; color: gray; margin-top: 5px">Преподаватель</div>
        </div>
        <div class="user-icon">БМ</div>
      </div>
      <div class="nav-item" style="margin: 5px 0" tabindex="9">
        <Icon name="logout"/>Выйти
      </div>
      <div class="lang-combobox">
        <Icon name="flag-ru"/>
        <span style="margin-left: 10px; vertical-align: super;">Русский</span>
        <Icon name="arrow-down" style="float: right"/>
      </div>
      <div class="version-info">Версия 1.02</div>
    </div>
  </div>
  <div class="back-panel">
    <div class="content">
      <div class="table-nav">
        <span style="font-weight: 700; font-size: 20px">Учебные сессии</span>
        <div style="float: right; display: flex;">
          <label id="search-input">
            <input type="text" placeholder="Поиск" v-model="search">
          </label>
          <button class="icon-btn">
            <Icon name="filter"/>
          </button>
          <button class="icon-btn">
            <Icon name="sort"/>
          </button>
          <button class="add-btn">Создать</button>
        </div>
      </div>
      <table class="table-border">
        <thead style="height: 50px">
          <tr>
            <th style="width: 210px; padding-left: 10px;">
              <span>Дата и время</span>
              <Icon name="arrow-down" style="float: right; margin-right: 60px"/>
            </th>
            <th style="width: 145px">Статус</th>
            <th>Название учебного модуля</th>
            <th style="width: 170px">Тип сессии</th>
            <th style="width: 220px">Комната</th>
            <th style="width: 200px; padding-right: 10px">Группа</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(rec, i) in page" style="height: 60px" :style="{background: i%2==1 ? '#F4F4F4' : 'white'}">
            <td style="padding-left: 10px">{{ dateFormat(rec) }}</td>
            <td>
              <span class="status-col" :style="{background: status[rec.status.name].color}">
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
                <Icon name="arrow-left"/>
              </button>
              <button v-for="num in pageNum" @click="curPage = num-1"
                      :class="{'cur-page': curPage===num-1}">{{ num }}</button>
              <button @click="curPage != pageNum-1 && curPage++">
                <Icon name="arrow-right"/>
              </button>
            </div>
          </td>
        </tfoot>
      </table>
    </div>
  </div>
</template>
