<template>
    <div class="settings-icon cursor-pointer text-gray-600 hover:text-gray-700 fill-current opacity-50 hover:opacity-100" 
        @click="toggleConfigView">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>
    </div>
</template>


<script>
import { EventBus } from '../eventBus';

export default {
    name: 'SettingsButton',
    methods: {
        toggleConfigView() {
            this.$store.commit('deactivateWarningFlash');

            EventBus.$emit('toggle-config-active');
        },
    }
}
</script>

<style>
.settings-icon {
    height: 30px;
    width: 30px;
    display: inline-block;
}
</style>