<template>
    <div class="timer-countdown-card text-center rounded overflow-hidden shadow-lg bg-white">
        <div class="timer-countdown-fill-bg"></div>
        
        <div class="radial-gradient"></div>

        <div class="timer-content">
            <div class="timer-title font-semibold text-3xl pt-2 text-gray-600 ">
                <span class="time-type">{{ title }}</span>
            </div>
            <div class="countdown-timer-text text-blue-700 text-5xl font-semibold tracking-widest">
                {{ remainingTimeDisplay }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimerDisplay',
    props: ['title', 'timeRemaining', 'totalTime', 'timerActive'],
    methods: {
        toggleTimer() {
            // do stuff
        }
    },
    computed: {
        remainingTimeDisplay () {
            let minutes = Math.floor(this.timeRemaining / 60);
            let seconds = this.timeRemaining % 60;
            return minutes + ':' + ('0' + seconds).slice(-2);
        },
        fillPercent () {
            let percent =  Math.floor(((this.totalTime - this.timeRemaining) / this.totalTime) * 10000) / 100;

            return percent + '%';
        }
    }
}
</script>

<style>
    .timer-countdown-card {
        position: relative;
        padding-top: 66%;
        border: 1px solid rgba(0, 100, 255, 0.3);
    }

    .timer-countdown-fill-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: rgba(0, 100, 255, 0.1);
    }

    .timer-content {
        position: absolute;
        top: 0rem;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: 2;
    }

    .countdown-timer-text  {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
    }

    .radial-gradient {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 0;
        width: 0;
        box-shadow: 0 0 150px 75px #fff;
        z-index: 1;
        border-radius: 100%;
    }
</style>