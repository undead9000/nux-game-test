<template>
    <div class="add-todo-wrapper">
        <h2>{{ content.todos.createTodoTitle }}</h2>
        <form @submit.prevent="onAdd" class="add-todo-form">
            <input type="text" v-model="userId" placeholder="Add user id" />
            <input type="text" v-model="title" placeholder="Add title" />
            <input
                type="submit"
                :value="content.todos.addTodo"
                :disabled="!isValid"
                class="btn"
                :class="isValid ? 'active' : ''"
            />
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useStore } from '@/stores'

const store = useStore()
const content = inject('content') as Record<string, any>

const userId = ref()
const title = ref('')
const isUserIdValid = computed(() => /^\d+$/.test(userId.value))
const isValid = computed(() => isUserIdValid.value && userId.value && title.value)

function onAdd() {
    if (!isValid) return

    store.addNewTodoItem(userId.value, title.value)
}
</script>

<style lang="scss" scoped>
.add-todo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    color: var(--color-white);
}
.add-todo-form {
    display: flex;
    justify-content: space-between;
    gap: 12px;

    input {
        padding: 10px;
        width: 100%;
        font-size: 17px;
        background-color: var(--color-white);
        border-radius: 5px;
        border: none;
    }

    input[type='submit'] {
        width: 100%;
        margin: 0;
        color: var(--color-white);
        background-color: var(--color-green);
        cursor: pointer;

        &:disabled {
            background-color: var(--color-dark-2);
            cursor: not-allowed;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
}
</style>
