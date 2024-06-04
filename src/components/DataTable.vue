<template>
  <div class="table-nav">
    <span class="table-title">{{ title }}</span>
    <div class="flex">
      <input class="search-input" type="text" placeholder="Поиск" v-model="search">
      <button class="icon-btn">
        <Icon name="filter" />
      </button>
      <button class="icon-btn">
        <Icon name="sort" />
      </button>
      <button class="primary-btn" @click="emit('add')">Создать</button>
    </div>
  </div>
  <table class="table-border">
    <thead>
      <tr>
        <SortColumn v-for="col in cols" :label="col.label" :width="col.width" />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(rec, i) in page">
        <td v-for="col in cols">
          <span :class="{ 'status-col': col.colors }"
            :style="{ background: col.colors ? col.colors[col.value(rec)] : '' }">
            {{ col.value(rec) }}
          </span>
        </td>
      </tr>
      <tr v-if="!filtered.length">
        <td colspan="6" class="no-data">Нет данных</td>
      </tr>
    </tbody>
    <tfoot v-if="filtered.length">
      <td colspan="6">
        <div class="pagination flex">
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
import Icon from '@/ui/Icon.vue';
import SortColumn from '@/components/SortColumn.vue';

const p = defineProps({
  data: { type: Array, required: true },
  title: { type: String, required: true },
  mainCol: { type: String, required: true }, // по данной колонке будет выполняться поиск
  cols: { type: Array, required: true },
  pageSize: { type: Number, default: 11 },
})

const emit = defineEmits(['add'])

const curPage = ref(0)
const search = ref('')

const filtered = computed(() => {
  if (!search.value.trim()) return p.data

  curPage.value = 0
  return p.data.filter(it => it[p.mainCol].includes(search.value.trim()))
})

const pageNum = computed(() => ~~(filtered.value.length / p.pageSize) + 1)
const page = computed(() => filtered.value.slice(curPage.value * p.pageSize, (curPage.value + 1) * p.pageSize))

</script>

<style lang="scss">
@import '@/css/vars.scss';
@import '@/css/style.scss';

.table-nav {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  .table-title {
    font-weight: 700;
    font-size: 20px;
  }

  .icon-btn {
    @extend %center;
    width: 40px;
    border: none;
    background: $bg-color;
    border-radius: 10px;
    cursor: pointer;
    margin-left: 10px;
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
    padding: 0 10px;
  }

  thead,
  tfoot {
    height: 50px;
  }

  tbody {
    font-size: 14px;

    tr {
      height: 60px;

      &:nth-child(even) {
        background: $bg-color;
      }

      &:nth-child(odd) {
        background: white;
      }

      .status-col {
        border-radius: 15px;
        padding: 6px 10px;
      }

      .no-data {
        text-align: center;
        padding: 10px 0;
      }
    }
  }

  .pagination button {
    @extend %center;
    width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, .1);
    background: white;
    cursor: pointer;
    margin: 0 3px;

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