<template>
    <div class="personal-data">
        <div class="personal-data-body">
            <h2 class="personal-data-title-container">
                <span>{{ content.welcomeBack }}, {{ store.getUserFormatted().name }} </span>
                <a class="personal-data-logout" href="#" @click.prevent="store.logOut()">{{ content.form.logout }}</a>
            </h2>
            <ul class="personal-data-list">
                <li v-for="(field, key) in store.getUserFormatted()">
                    <span class="personal-data-list-name">{{ key }}:</span>
                    <span class="personal-data-list-value">{{ field }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { useStore } from '@/stores'

const store = useStore()
const content = inject('content') as Record<string, any>
</script>

<style lang="scss" scoped>
.personal-data {
    color: var(--color-white);
    font-size: 17px;

    @media (max-width: 768px) {
        font-size: 14px;
    }
}
.personal-data-body {
    width: 100%;
    max-width: 640px;
}
.personal-data-title-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
    }
}
.personal-data-logout {
    color: var(--color-white);
    font-size: 14px;
}
.personal-data-list {
    list-style-type: none;
    margin: 12px 0 0;
    padding: 0 0 0 8px;

    li {
        display: flex;
        justify-content: space-between;
        margin: 0 0 4px;
        padding: 0 0 4px;
        border-bottom: 1px solid var(--color-light-1);

        &:last-child {
            margin: 0;
            padding: 0;
            border-bottom: none;
        }
    }
}
.personal-data-list-name {
    font-size: 15px;
    color: var(--color-light-2);
    text-transform: capitalize;

    @media (max-width: 768px) {
        font-size: 12px;
    }
}
.personal-data-list-value {
    text-align: right;
}
</style>
