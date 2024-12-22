<template>
    <div v-if="store.state.isAuthenticated" class="todo container">
        <UserDescriptionComponent />
        <TodoListComponent />
        <AddTodoComponent />
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import UserDescriptionComponent from './components/UserDescription.component.vue'
import TodoListComponent from './components/TodoList.component.vue'
import AddTodoComponent from './components/AddTodo.component.vue'

const store = useStore()
</script>

<style lang="scss" scoped>
.todo {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>
