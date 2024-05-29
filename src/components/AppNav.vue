<template>
  <div v-show="!isCollapsed" class="sidebar">
    <RouterLink to="/" class="nav-header">
      <Icon name="logo" />
      <span class="logo-text">Сим Центр</span>
    </RouterLink>
    <div class="nav-main">
      <RouterLink to="/schedule" class="nav-item">
        <Icon name="schedule" />Расписание
      </RouterLink>
      <RouterLink to="/lesson-session" class="nav-item">
        <Icon name="lessons" />Учебные сессии
      </RouterLink>
      <RouterLink to="/room-list" class="nav-item">
        <Icon name="room" />Список комнат
      </RouterLink>
      <RouterLink to="/users" class="nav-item">
        <Icon name="user" />Пользователи
      </RouterLink>
      <RouterLink to="/lesson-groups" class="nav-item">
        <Icon name="lesson-group" />Учебные группы
      </RouterLink>
      <RouterLink to="/device-list" class="nav-item">
        <Icon name="device" />Список устройств
      </RouterLink>
      <RouterLink to="/settings" class="nav-item">
        <Icon name="setting" />Настройки системы
      </RouterLink>
      <RouterLink to="/archive" class="nav-item">
        <Icon name="archive" />Архив
      </RouterLink>
    </div>
    <div class="nav-footer">
      <div class="user-panel">
        <div>
          <div style="font-weight: 800; font-size: 15px">Барнаби Мармадюк</div>
          <div style="font-weight: 500; font-size: 13px; color: gray; margin-top: 5px;">
            Преподаватель
          </div>
        </div>
        <div class="user-icon">БМ</div>
      </div>
      <RouterLink to="/login" class="nav-item" style="margin: 5px 0">
        <Icon name="logout" />Выйти
      </RouterLink>
      <div class="lang-combobox">
        <Icon name="flag-ru" />
        <span style="margin-left: 10px; vertical-align: super">Русский</span>
        <Icon name="arrow-down" style="float: right" />
      </div>
      <div class="version-info">Версия 1.02</div>
    </div>
  </div>
  <button class="collapse" @click="isCollapsed = !isCollapsed"
    :title="(!isCollapsed ? 'Скрыть' : 'Показать') + ' меню'">
    <Icon v-show="!isCollapsed" name="arrow-left" />
    <Icon v-show="isCollapsed" name="arrow-right" />
  </button>
</template>

<script setup>
import { ref } from 'vue';
import Icon from '@/ui/Icon.vue';

const isCollapsed = ref(false)

</script>

<style lang="scss">
@import '@/css/vars.scss';

.collapse {
  height: 19px;
  width: 19px;
  padding: 0px;
  border-radius: 50%;
  border: none;
  background: black;
  cursor: pointer;
  position: relative;
  top: 10px;
  left: 12px;

  svg {
    fill: white;
  }
}

.sidebar {
  width: 290px;

  .nav-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85px;
    color: black;
    text-decoration: none;

    .logo-text {
      font-size: 24px;
      margin-left: 10px;
      font-weight: 800;
    }
  }

  .nav-main {
    padding: 10px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    font-size: 17px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;
    color: black;
    text-decoration: none;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background: $bg-color;
      border-radius: 15px;
    }

    &.router-link-active {
      background: $primary-color;
      color: white;
      border-radius: 15px;

      svg {
        fill: white;
      }
    }
  }
}

.nav-footer {
  position: absolute;
  bottom: 0;
  margin: 8px;
}

.user-panel {
  display: flex;
  padding: 10px;
  border-radius: 14px;
  box-shadow: $border-color 0 0 10px;
  margin-bottom: 10px;
}

.user-icon {
  background: $primary-color;
  border-radius: 50%;
  width: 48px;
  text-align: center;
  line-height: 48px;
  color: white;
  font-weight: 800;
  margin-left: 10px;
}

.lang-combobox {
  display: block;
  height: 24px;
  border: 1px solid $border-color;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  padding: 10px;
  cursor: pointer;
}

.version-info {
  color: grey;
  margin-top: 18px;
}
</style>
