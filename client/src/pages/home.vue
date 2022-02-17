
<script setup>
import { ref, onMounted } from 'vue';
import Clipboard from 'clipboard'

import axios from 'axios'

import useStore from '../store'


const { loading, setLoading, setMessage } = useStore() 


const formURL = ref(null)
const shortened = ref(null)

const submit = async () => {
    shortened.value = null

    setLoading(true)

    try{
        let response = await axios.post('/api/links', { url: formURL.value })
        shortened.value = response.data.data
        formURL.value = null

    }catch(e){
        if (e.response.status && e.response.status === 422){
            setMessage(e.response.data.url)
        }
    }

    setLoading(false)
}


onMounted(() =>{
    let clipboard = new Clipboard('#copy')
    clipboard.on('success', (e) => {
        setMessage('Copied to clipboard')
        e.clearSelection()
    })
})

</script>


<template>
    
    <div class="max-w-screen-md m-auto p-4 w-full flex flex-col items-center justify-center min-h-full ">
        <form action="" class="w-full mb-10" @submit.prevent="submit" novalidate>
            <input 
                v-model="formURL"
                type="url"
                placeholder="Let's get you a short URL"
                class="text-xl p-4 w-full border-0 outline-0 rounded"/><!-- Add box-shadow -->
        </form>
        <div class="text-white text-lg font-light" v-if="formURL && !shortened && !loading">
            Hit return when you are done
        </div>
        <div class="w-full text-center text-white" v-if="shortened">
            <div class="text-2xl font-light">
                <div class="opacity-50 mb-1.5 flex flex-wrap justify-center">
                    <span class="inline-block max-w-xs truncate mr-1">{{ shortened.original_url }}</span> is now
                </div>
                <a :href="shortened.shortened_url" id="url" class="block text-lg mb-1 underline underline-offset-2" target="_blank">
                    {{ shortened.shortened_url }}
                </a>
                <router-link :to="{name:'stats', params:{code:shortened.code}}" class="block text-lg mb-4 underline underline-offset-2">Get stats</router-link>
            </div>
            <button class="h-full text-sm font-medium px-4 py-2 bg-yellow-500 rounded" id="copy" data-clipboard-target="#url">
                Copy to clipboard
            </button>
        </div>
    </div>
</template>