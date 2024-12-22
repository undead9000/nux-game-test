<template>
    <Login />
    <Todo />
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { content } from '@/content'

import Login from '@/components/Login.component.vue'
import Todo from '@/todo/Todo.vue'

provide('content', content)
</script>
