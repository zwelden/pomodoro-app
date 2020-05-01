<template>
    <div class="app-timer-background" :class="bgColorClass"></div>
</template>

<script>
export default {
    name: 'TimerBackground',
    props: ['bgColor'],
    computed: {
        bgColorClass () {
            if (this.bgColor === 'gray') {
                return 'bg-gray-100';
            }

            if (this.bgColor === 'teal') {
                return 'bg-teal-100';
            }

            return 'bg-blue-100';
        }
    }
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