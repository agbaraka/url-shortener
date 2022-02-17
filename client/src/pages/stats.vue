<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pluralize from 'pluralize';
import useStore from '../store'


const stats = ref(null)

const { setLoading } = useStore()

const route = useRoute()
const router = useRouter()


onMounted(async() => {
    let code = route.params['code']

    setLoading(true)
    
    try{
        let resp = await axios.get(`/api/links/${code}/stats`)
        stats.value = resp.data


    }catch(e){
        router.replace({ name: '404' })
    }

    setLoading(false)
})

</script>

<template>
    <div class="text-white max-w-screen-md m-auto p-4 w-full flex flex-col items-center justify-center min-h-full" >
        
        <div class=" w-full" v-if="stats">
            <h1 class="text-xl m-0 mb-10 break-words">
                Stats for {{ stats.shortened_url }}
            </h1>
            <dl class="mb-5">
                <dt class="font-bold mb-1">Origin URL</dt>
                <dd class="mb-2 break-words ml-10">{{ stats.original_url }}</dd>
            </dl>
            <dl class="mb-5">
                <dt class="font-bold mb-1">Shortening requested</dt>
                <dd class="mb-2 break-words ml-10">{{ stats.requested_count }} {{ pluralize('time', stats.requested_count) }}</dd>
            </dl>
            <dl class="mb-5">
                <dt class="font-bold mb-1">Used</dt>
                <dd class="mb-2 break-words ml-10">{{ stats.used_count }} {{ pluralize('time', stats.used_count) }}</dd>
            </dl>
            <dl class="mb-5">
                <dt class="font-bold mb-1">Last requested</dt>
                <dd class="mb-2 break-words ml-10">{{ stats.last_requested }}</dd>
            </dl>
             <dl class="mb-5">
                <dt class="font-bold mb-1">Last used</dt>
                <dd class="mb-2 break-words ml-10">{{ stats.last_used || 'Never' }}</dd>
            </dl>
            <div class="mt-10">
                <a :href="stats.shortened_url" target="_blank" class="h-full text-sm font-medium px-4 py-2 bg-yellow-500 rounded">
                    Take me there
                </a>
            </div>
            
        </div>
        <div v-else class="text-xl">One moment...</div>
    </div>
    
</template>