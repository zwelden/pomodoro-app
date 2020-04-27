<template>
    <div class="timer-countdown-card text-center rounded overflow-hidden shadow-lg" :class="'bg-' + displayColor + '-100'">
        <div class="timer-countdown-fill-bg"></div>
        
        <div class="radial-gradient"></div>

        <div class="timer-content">
            <div class="timer-title font-semibold text-3xl pt-2 text-gray-600 ">
                <span class="time-type">{{ title }}</span>
            </div>
            <div class="countdown-timer-text text-5xl font-semibold tracking-widest" :class="'text-' + displayColor + '-900'">
                {{ remainingTimeDisplay }}
            </div>
        </div>

        <TimerSequenceTracker v-if="numIntervals > 1" :numBlocks="numIntervals" :activeBlock="currentInterval" :blockColor="displayColor"/>
        
        <CountdownBarContainer :barColor="displayColor" :progressPercent="progressPercent" />
        
    </div>
</template>

<script>
import TimerSequenceTracker from './TimerSequenceTracker.vue'
import CountdownBarContainer from './CountdownBarContainer.vue'

export default {
    name: 'TimerDisplay',
    components: {
        TimerSequenceTracker,
        CountdownBarContainer
    },
    props: ['title', 'timeRemaining', 'totalTime', 'displayColor'],
    computed: {
        remainingTimeDisplay () {
            let minutes = Math.floor(this.timeRemaining / 60);
            let seconds = this.timeRemaining % 60;

            return minutes + ':' + ('0' + seconds).slice(-2);
        },
        progressPercent () {
            let percent =  Math.floor(((this.totalTime - this.timeRemaining) / this.totalTime) * 10000) / 100;

            if (!percent || percent <= 0 || isNaN(percent)) {
                return 0;
            }

            return percent;
        },
        numIntervals () {
            console.log(this.$store.state.intervals.length)
            return this.$store.state.intervals.length;
        },
        currentInterval () {
            return this.$store.state.currentInterval;
        }
    }
}
</script>

<style>
    .timer-countdown-card {
        position: relative;
        padding-top: 66%;
    }

    .timer-countdown-fill-bg {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
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

    .time-type {
        opacity: 0.9;
    }
</style>