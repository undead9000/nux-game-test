<template>
    <div class="todo-filters-wrapper">
        <div class="todo-filters">
            <select v-model="store.state.filterState.statusOption" @change="store.onFilter()">
                <option disabled value="0">{{ content.filter.byStatus }}</option>
                <option v-for="option in store.state.filterState.statusOptions" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <select v-model="store.state.filterState.userOption" @change="store.onFilter()">
                <option value="0">{{ content.filter.allUsers }}</option>
                <option v-for="user in store.state.filterState.userOptions" :value="user.value">
                    {{ user.label }}
                </option>
            </select>
            <input
                type="text"
                v-model="store.state.filterState.search"
                @input="store.onFilter()"
                :placeholder="content.filter.searchByTitle"
            />
        </div>

        <button v-html="content.html.refreshFilters" @click="store.clearFilter()" class="todo-filters-refresh" />
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from '@/stores'

const store = useStore()
const content = inject('content') as Record<string, any>
</script>

<style lang="scss" scoped>
.todo-filters-wrapper {
    display: flex;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
}
.todo-filters {
    display: flex;
    gap: 12px;

    select,
    input {
        padding: 10px;
        width: 100%;
        font-size: 17px;
        background-color: var(--color-white);
        border-radius: 5px;
        border: none;
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
}
.todo-filters-refresh {
    padding: 10px;
    border-radius: 5px;
    font-size: 21px;
    cursor: pointer;
}
</style>
