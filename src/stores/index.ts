import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { ApplicationApi } from '@/api'
import { type User, type TodoItem, type FilterOption, StatusOptionsEnum, LocalStorageKeysEnum } from '@/models'

export class Store {
    isAuthenticated: boolean = false
    users: User[] = []
    currentUser: User = {} as User
    filterState: FilterState = {} as FilterState
    todos: TodoItem[] = []
    filteredTodos: TodoItem[] = []
    favorites: number[] = []
}

export class FilterState {
    statusOption: number = 0
    userOption: number = 0
    search: string = ''
    statusOptions: FilterOption[] = []
    userOptions: FilterOption[] = []
}

export const useStore = defineStore('store', () => {
    const ApplicationService = new ApplicationApi()
    const state = reactive<Store>(new Store())

    async function init() {
        const users = await ApplicationService.getUsers()
        const todos = await ApplicationService.getTodos()

        state.users = users
        state.todos = todos
        state.filteredTodos = todos
        state.filterState = new FilterState()
        state.filterState.statusOptions = setStatusOptions()
        state.filterState.userOptions = setUserOptions()
        state.favorites = localStorage[LocalStorageKeysEnum.Favorites]
            ? JSON.parse(localStorage[LocalStorageKeysEnum.Favorites])
            : []
    }

    function setStatusOptions() {
        return [
            { label: 'All', value: '1' },
            { label: 'Completed', value: '2' },
            { label: 'Uncompleted', value: '3' },
            { label: 'Favorites', value: '4' },
        ]
    }

    function setUserOptions() {
        return [...new Set(state.todos.map((todo) => todo.userId))].map((id) => ({ label: id, value: id }))
    }

    function findUser(username: string, phone: string) {
        if (!state.users.length) return null

        return state.users.find((user) => user.username === username && user.phone === phone) ?? null
    }

    function submitLoginForm(username: string, phone: string) {
        const currentUser = findUser(username, phone)
        if (!currentUser) return null

        const localStorageUser =
            typeof localStorage[LocalStorageKeysEnum.CurrentUser] !== 'undefined'
                ? JSON.parse(localStorage[LocalStorageKeysEnum.CurrentUser])
                : null

        if (localStorageUser && localStorageUser.id !== currentUser.id) {
            localStorage.removeItem(LocalStorageKeysEnum.Favorites)
            state.favorites = []
        }

        state.currentUser = currentUser
        state.isAuthenticated = true
        localStorage.setItem(LocalStorageKeysEnum.CurrentUser, JSON.stringify(currentUser))
    }

    function logOut() {
        state.currentUser = {} as User
        state.isAuthenticated = false
        localStorage.removeItem(LocalStorageKeysEnum.Favorites)
        localStorage.removeItem(LocalStorageKeysEnum.CurrentUser)
    }

    function getUserFormatted() {
        return {
            username: state.currentUser.username ?? '',
            name: state.currentUser.name ?? '',
            email: state.currentUser.email ?? '',
            address: [
                state.currentUser.address.suite ?? '',
                state.currentUser.address.street ?? '' + ' street',
                state.currentUser.address.city ?? '',
            ].join(', '),
            phone: state.currentUser.phone ?? '',
            website: state.currentUser.website ?? '',
            company: state.currentUser.company?.name ?? '',
        }
    }

    function onFilter() {
        if (
            !Number(state.filterState.userOption) &&
            !Number(state.filterState.statusOption) &&
            !state.filterState.search
        ) {
            clearFilter()
            return
        }

        state.filteredTodos = state.todos
        searchByString()
        filterByUser()
        filterByStatus()
    }

    function searchByString() {
        state.filteredTodos = state.filteredTodos.filter((todo) => todo.title.includes(state.filterState.search)) ?? []
    }

    function filterByUser() {
        state.filteredTodos = Number(state.filterState.userOption)
            ? state.filteredTodos.filter((todo) => todo.userId === state.filterState.userOption) ?? []
            : state.filteredTodos
    }

    function filterByStatus() {
        switch (Number(state.filterState.statusOption)) {
            case StatusOptionsEnum.All:
                state.filteredTodos = state.filteredTodos
                break
            case StatusOptionsEnum.Completed:
                state.filteredTodos = state.filteredTodos.filter((todo) => todo.completed)
                break
            case StatusOptionsEnum.Uncompleted:
                state.filteredTodos = state.filteredTodos.filter((todo) => !todo.completed)
                break
            case StatusOptionsEnum.Favorites:
                state.filteredTodos = state.filteredTodos.filter((todo) =>
                    todo.id ? state.favorites.includes(todo.id) : false
                )
                break
            default:
                state.filteredTodos = state.filteredTodos
        }
    }

    function clearFilter() {
        state.filteredTodos = state.todos
        state.filterState = new FilterState()
        state.filterState.statusOptions = setStatusOptions()
        state.filterState.userOptions = setUserOptions()
    }

    async function addNewTodoItem(userId: number, title: string) {
        try {
            const newTodoItem = await ApplicationService.addItem({
                userId: userId,
                title: title,
                completed: false,
            })

            state.todos.push(newTodoItem.data)
            state.filterState.userOptions = setUserOptions()
        } catch (error) {
            throw new Error("Item didn't add")
        }
    }

    function addToFavorites(itemId: number) {
        const favorites = localStorage[LocalStorageKeysEnum.Favorites]
            ? JSON.parse(localStorage[LocalStorageKeysEnum.Favorites])
            : []
        const index = favorites.findIndex((id: number) => id === itemId)

        favorites.includes(itemId) && index >= 0 ? favorites.splice(index, 1) : favorites.push(itemId)
        state.favorites = favorites
        localStorage.setItem(LocalStorageKeysEnum.Favorites, JSON.stringify(favorites))
    }

    return {
        state,
        init,
        submitLoginForm,
        logOut,
        getUserFormatted,
        onFilter,
        clearFilter,
        addNewTodoItem,
        addToFavorites,
    }
})
