const { ref, reactive, computed } = require("vue")

const state = reactive({
    loading: false,
    message: null
})

export default () => {
    return {
        setLoading: value => state.loading = value,
        setMessage: value => {
            state.message = value
            setTimeout(() => {
                state.message = null
            }, 4000)
        },
        loading: computed(() => state.loading),
        message: computed(() => state.message)
    }
}