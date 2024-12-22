<template>
    <div class="todo-grid-wrapper">
        <h2>{{ content.todos.title }}</h2>
        <FilterComponent />
        <div class="todo-grid">
            <div class="todo-grid-title">
                <span>{{ content.todos.id }}</span>
                <span>{{ content.todos.userId }}</span>
                <span>{{ content.todos.todoTitle }}</span>
                <span>{{ content.todos.completed }}</span>
                <span>{{ content.todos.favorites }}</span>
            </div>
            <div v-if="todos.length" class="todo-grid-body">
                <template v-for="todo in todos">
                    <span>{{ todo.id }}</span>
                    <span>{{ todo.userId }}</span>
                    <span>{{ todo.title }}</span>
                    <span v-html="todo.completed ? content.html.completedMark : ''" class="center" />
                    <button
                        v-html="
                            store.state.favorites.includes(todo.id ?? 0)
                                ? content.html.favoriteMarkChecked
                                : content.html.favoriteMark
                        "
                        @click="store.addToFavorites(todo.id!)"
                        class="center todo-grid-mark"
                    />
                </template>
            </div>
            <div v-else>{{ content.todos.noTodosFound }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { useStore } from '@/stores'
import FilterComponent from './Filter.component.vue'

const store = useStore()
const content = inject('content') as Record<string, any>
const todos = computed(() => store.state.filteredTodos)
</script>

<style lang="scss" scoped>
@mixin todo-grid() {
    display: grid;
    grid-template-columns: 48px 64px minmax(100px, auto) 100px 100px;

    @media (max-width: 768px) {
        grid-template-columns: 24px 48px minmax(100px, auto) 72px 72px;
    }
}
.todo-grid-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    color: var(--color-white);
}
.todo-grid {
    list-style-type: none;
    padding: 0 0 0 8px;
}
.todo-grid-title,
.todo-grid-body {
    span {
        &.center {
            text-align: center;
        }
    }
}
.todo-grid-title {
    display: grid;
    grid-template-columns: 48px 64px minmax(100px, auto) 100px 100px;
    border-bottom: 1px solid var(--color-light-1);
    font-size: 17px;
    padding: 0 0 10px;

    @media (max-width: 768px) {
        grid-template-columns: 24px 48px minmax(100px, auto) 72px 72px;
        font-size: 14px;
    }
}
.todo-grid-body {
    display: grid;
    grid-template-columns: 48px 64px minmax(100px, auto) 100px 100px;
    grid-auto-rows: max-content;
    font-size: 14px;

    span {
        min-height: 42px;
        padding: 9px 0;
        border-bottom: 1px solid var(--color-light-1);
    }

    @media (max-width: 768px) {
        grid-template-columns: 24px 48px minmax(100px, auto) 72px 72px;
        font-size: 12px;
    }
}
.todo-grid-mark {
    font-size: 30px;
    color: var(--color-white);
    border: none;
    background: none;
    cursor: pointer;
    border-bottom: 1px solid var(--color-light-1);
}
</style>
