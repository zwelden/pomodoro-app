<template>
    <div class="background-flash"></div>
</template>

<script>
export default {
    name: 'BackgroundFlash'
}
</script>

<style>

.background-flash {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    animation: background-flash-animation 1.5s linear 0s infinite;
    z-index: 1;
}

@keyframes background-flash-animation {
    0% {background: transparent}
    50% {background: #f99}
    100% {background: transparent}
}
</style>