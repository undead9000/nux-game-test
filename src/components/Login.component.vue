<template>
    <div v-if="!store.state.isAuthenticated" class="overlay">
        <div class="login-form-wrapper">
            <header class="login-form-title">{{ content.form.descriptionLoginTitle }}</header>
            <main class="login-form-main">
                <p class="login-form-description">
                    {{ content.form.descriptionLoginBody }}
                </p>
                <form class="login-form" @submit.prevent="submitForm">
                    <div class="login-form-input-wrapper">
                        <input
                            type="text"
                            v-model="username"
                            @blur="validateField('username')"
                            id="username"
                            :placeholder="content.form.namePlaceholder"
                        />
                        <span class="login-form-error" v-if="errors.username && !isUsernameValid">{{
                            errors.username
                        }}</span>
                    </div>
                    <div class="login-form-input-wrapper">
                        <input
                            type="tel"
                            v-model="phone"
                            @blur="validateField('phone')"
                            id="phone"
                            :placeholder="content.form.phonePlaceholder"
                        />
                        <span class="login-form-error" v-if="errors.phone && !isPhoneValid">{{ errors.phone }}</span>
                    </div>
                    <input type="submit" :value="content.form.login" :disabled="!isUsernameValid || !isPhoneValid" />
                </form>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, inject } from 'vue'
import { useStore } from '@/stores'

const store = useStore()
const content = inject('content') as Record<string, any>

const username = ref('')
const phone = ref('')
const errors = reactive({
    username: '',
    phone: '',
})

const isUsernameValid = computed(() => !!(username.value.length && /^[A-Za-z\s]*$/.test(username.value)))
const isPhoneValid = computed(() => !!(phone.value.length && /^[0-9-+()x ]*$/.test(phone.value)))

const clearErrors = () => {
    errors.username = ''
    errors.phone = ''
}

const clearForm = () => {
    username.value = ''
    phone.value = ''
}

const validateField = (field: string) => {
    if (field === 'username' && !isUsernameValid.value)
        errors.username = username.value ? content.form.errorOnlyLetters : content.form.errorUsernameRequired
    if (field === 'phone' && !isPhoneValid.value)
        errors.phone = phone.value ? content.form.errorOnlyNumbersSymbols : content.form.errorTelephoneRequired
}

const submitForm = () => {
    clearErrors()
    validateField('username')
    validateField('phone')
    store.submitLoginForm(username.value, phone.value)
    store.state.isAuthenticated ? clearForm() : alert(content.form.errorLoginError)
}
</script>

<style lang="scss" scoped>
.login-form-wrapper {
    width: 100%;
    max-width: 450px;
    padding: 0 20px;
    align-self: center;
    z-index: 1;
    color: var(--color-dark-1);
}
.login-form-title {
    padding: 15px 0;
    font-size: 17px;
    text-align: center;
    border-radius: 5px 5px 0 0;
    background-color: var(--color-light-1);
}
.login-form-main {
    padding: 15px 25px 30px 25px;
    background-color: var(--color-light-2);
    border-radius: 0 0 5px 5px;
}
.login-form-description {
    font-size: 15px;
}
form.login-form {
    margin: 14px 0 0 0;

    input {
        padding: 10px;
        width: 100%;
        font-size: 17px;
        background-color: var(--color-white);
        border-radius: 5px;
        border: none;
    }

    input[type='submit'] {
        margin: 0;
        color: var(--color-white);
        background-color: var(--color-green);
        cursor: pointer;

        &:disabled {
            background-color: var(--color-dark-2);
            cursor: not-allowed;
        }
    }
}
.login-form-input-wrapper {
    margin: 0 0 20px;

    &:last-child {
        margin: 0 0 25px;
    }
}
.login-form-error {
    font-size: 12px;
    color: var(--color-red);
}
</style>
