const STORAGE_KEY = '__storage__'

function Storage(storageKey) {
    const store = {}

    try {
        const jsonData = window.localStorage.getItem(storageKey)
        Object.assign(store, JSON.parse(jsonData))
    } catch (error) {
        console.log(error)
    }

    const save = () => {
        window.localStorage.setItem(storageKey, JSON.stringify(store))
    }
    return {
        get(key, defaultValue = null) {
            const value = store[key]
            return value !== undefined ? value : defaultValue
        },
        set(key, value) {
            store[key] = value
            save()
        },
        remove(key) {
            delete store[key]
            save()
        },
        flush() {
            Object.keys(store).forEach(key => delete store[key])
            save()
        }
    }
}
export default new Storage(STORAGE_KEY)