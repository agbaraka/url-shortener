<script setup>

import useStore from '../store'

const { message } = useStore()

</script>

]<template>
    <div v-if="message" class="fixed bg-white w-full  h-16 font-medium m-auto p-4 flex flex-col items-center justify-center">
        <p>{{ message }}</p>
    </div>
</template>
