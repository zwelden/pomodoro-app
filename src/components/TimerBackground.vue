<template>
    <div class="app-timer-background" :class="'bg-' + bgColor + '-100'"></div>
</template>

<script>
export default {
    name: 'TimerBackground',
    props: ['bgColor']
}
</script>

<style>
.app-timer-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
}
</style>