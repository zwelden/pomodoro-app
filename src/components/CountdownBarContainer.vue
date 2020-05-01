<template>
    <div class="timer-countdown-bar-container">
        <div class="timer-countdown-bar" :class="bgColor"></div>
        <div class="timer-countdown-ball" :class="bgColor" :style="{top: topPosition}"></div>
    </div>
</template>


<script>
export default {
    name: 'CountdownBarContainer',
    props: {
        progressPercent: Number,
        barColor: String
    },
    computed: {
        topPosition () {
            return this.progressPercent + '%';
        },
        bgColor () {
            if (this.barColor === 'gray') {
                return 'bg-gray-300';
            }

            if (this.barColor === 'teal') {
                return 'bg-teal-300';
            }

            return 'bg-blue-300';
        }
    }
}
</script>


<style>
.timer-countdown-bar-container {
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    right: 1.5rem;
    z-index: 2;
}

.timer-countdown-bar {
    position: relative;
    height: 100%;
    width: 2px;
}

.timer-countdown-ball {
    position: absolute;
    right: -5px;
    height: 12px;
    width: 12px;
    border-radius: 50%;
    transform: translateY(-50%);
}
</style>