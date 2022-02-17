<script setup>
import AppMessage from './components/AppMessage.vue'
import AppProgressBar from './components/AppProgressBar.vue';

import useStore from './store'

const { loading } = useStore()

</script>

<template>
    <AppProgressBar v-if="loading" class="fixed"/>
    <AppMessage/>
    <router-view></router-view>
</template>

<style>

html, body, #app{
    height: 100%;
    font-family: 'Quicksand', sans-serif;
}

</style>
