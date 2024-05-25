<script setup>
import { ref, computed } from 'vue';
import data from './data.json'
import ILogo from './assets/icons/logo.svg'
import ISchedule from './assets/icons/schedule.svg'
import ILessons from './assets/icons/lessons.svg'
import IRoom from './assets/icons/room.svg'
import IUser from './assets/icons/user.svg'
import ILessonGroup from './assets/icons/lesson-group.svg'
import IDevice from './assets/icons/device.svg'
import ISetting from './assets/icons/setting.svg'
import IArchive from './assets/icons/archive.svg'
import ILogout from './assets/icons/logout.svg'
import ISort from './assets/icons/sort.svg'
import IFilter from './assets/icons/filter.svg'
import IFlagRu from './assets/icons/flag-ru.svg'
import IArrowDown from './assets/icons/arrow-down.svg'
import IArrowLeft from './assets/icons/arrow-left.svg'
import IArrowRight from './assets/icons/arrow-right.svg'


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

const sessionType = {
  accreditation: 'Аккредитация',
  lesson: 'Урок',
  examination: 'Экзамен',
}

const statusType = {
  planned: 'Запланировано',
  completed: 'Завершено',
  canceled: 'Отменено',
}

const statusColor = {
  planned: '#AFBFF5',
  completed: '#91C893',
  canceled: '#FFDAA1',
}

</script>

<template>
  <div class="sidebar">
    <div class="nav-header">
      <ILogo style="align-self: center"/>
      <span class="logo-text">Сим Центр</span>
    </div>
    <div class="nav-main">
      <div class="nav-item" tabindex="1">
        <ISchedule/>Расписание
      </div>
      <div class="nav-item" tabindex="2">
        <ILessons/>Учебные сессии
      </div>
      <div class="nav-item" tabindex="3">
        <IRoom/>Список комнат
      </div>
      <div class="nav-item" tabindex="4">
        <IUser/>Пользователи
      </div>
      <div class="nav-item" tabindex="5">
        <ILessonGroup/>Учебные группы
      </div>
      <div class="nav-item" tabindex="6">
        <IDevice/>Список устройств
      </div>
      <div class="nav-item" tabindex="7">
        <ISetting/>Настройки системы
      </div>
      <div class="nav-item" tabindex="8">
        <IArchive/>Архив
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
        <ILogout/>Выйти
      </div>
      <div class="lang-combobox">
        <IFlagRu/>
        <span style="margin-left: 10px; vertical-align: super;">Русский</span>
        <IArrowDown style="float: right"/>
      </div>
      <div class="version-info">Версия 1.02</div>
    </div>
  </div>
  <!-- <button class="collapse">
    <IArrowLeft/>
  </button> -->
  <div class="back-panel">
    <div class="content">
      <div class="table-nav">
        <span style="font-weight: 700; font-size: 20px">Учебные сессии</span>
        <div style="float: right; display: flex;">
          <label id="search-input">
            <input type="text" placeholder="Поиск" v-model="search">
          </label>
          <button class="icon-btn">
            <IFilter/>
          </button>
          <button class="icon-btn">
            <ISort/>
          </button>
          <button class="add-btn">Создать</button>
        </div>
      </div>
      <table class="table-border" style="width: 100%">
        <thead style="height: 50px">
          <tr>
            <th style="width: 210px; padding-left: 10px;">
              <span>Дата и время</span>
              <IArrowDown style="float: right; margin-right: 60px"/>
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
              <span class="status-col" :style="{background: statusColor[rec.status.name]}">
                {{ statusType[rec.status.name] }}
              </span>
            </td>
            <td>{{ rec.module }}</td>
            <td>{{ sessionType[rec.type.name] }}</td>
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
                <IArrowLeft/>
              </button>
              <button v-for="num in pageNum" @click="curPage = num-1"
                      :class="{'cur-page': curPage===num-1}">{{ num }}</button>
              <button @click="curPage != pageNum-1 && curPage++">
                <IArrowRight/>
              </button>
            </div>
          </td>
        </tfoot>
      </table>
    </div>
  </div>
</template>
