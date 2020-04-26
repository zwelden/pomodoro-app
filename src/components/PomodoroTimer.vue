<template>
    <div class="pomodoro-timer">

        <TimeBlockCard :focus-time="currentTimerBlockFocusMinutes" :rest-time="currentTimerBlockRestMinutes" :current-active="currentTimeBlock.currentTimer"></TimeBlockCard>
        
        <TimerDisplay :title="timerType" 
                :time-remaining="remainingTime" 
                :total-time="timerTotalTime" 
                class="mb-8">
        </TimerDisplay>

        <div class="text-center rounded overflow-hidden mb-8">
            <div @click="toggleTimer" 
                class="rounded inline-block px-10 py-2 text-lg font-semibold tracking-wide cursor-pointer border-0 border-b-2" 
                v-bind:class="timerActive ? 'bg-red-200 text-red-700 border-red-400' : 'bg-green-200 text-green-700 border-green-400'"
            >
                {{ timerText }}
            </div>
        </div>

        <div class="text-center">
            <div @click="toggleConfigView" 
                class="rounded inline-block px-10 py-2 text-lg font-semibold tracking-wide cursor-pointer border-0 border-b-2 bg-gray-200 text-gray-700 border-gray-400"
            >
                Config
            </div>
        </div>
    </div>
</template>

<script>
import TimeBlockCard from './TimeBlockCard.vue';
import TimerDisplay from './TimerDisplay.vue';

import { EventBus } from '../eventBus';

export default {
    name: 'PomodoroTimer',
    components: {
        TimeBlockCard,
        TimerDisplay
    },
    data() {
        return {
            currentTimeBlock: {
                focusMinutes : 0,
                restMinutes : 0,
                currentTimer: 'next'
            },
            timers: [],
            currentTimerBlockFocusMinutes: 0,
            currentTimerBlockRestMinutes: 0,
            secondsPassed: 0,
            remainingTime: 0, // seconds
            timerTotalTime: 0,
            startTime: 0,
            endTime: 0,
            timerInterval: null,
            lastIterationStart: 0,
            targetIntervalTime: 1000,
            timerType: 'Focus',
            timerText: 'Start',
            someNumber: 1234,
            completionSound: new Audio(require('../assets/complete.mp3'))
        }
    },
    methods: {
        toggleTimer() {
            this.$store.commit('toggleTimerActive');
 
            if (this.$store.state.timerActive === true) {
               this.startTimer();
               return;
            }

            this.pauseTimer();
        },

        startTimer() {
            let diff = this.remainingTime * 1000; // seconds to milliseconds
            this.timerTotalTime = this.remainingTime;
            this.startTime = Date.now();
            this.endTime = this.startTime + diff;

            this.timerText = 'Stop';
            setTimeout(this.secondCountDown, 1000);
        },

        pauseTimer() {
            this.clearTimer();
            this.timerText = 'Start';
        },

        clearTimer() {
            this.lastIterationStart = 0;
            this.startTime = 0;
            this.endTime = 0;
            this.targetIntervalTime = 1000;
        },

        endTimer() {
            this.clearTimer();
            this.timerText = 'Start';
            this.playCompletionSound();

            this.$store.commit('setTimerActiveFalse');

            if (this.currentTimeBlock.currentTimer === 'focus') {
                this.currentTimeBlock.currentTimer = 'rest';
            } else if (this.currentTimeBlock.currentTimer === 'rest') {
                this.currentTimeBlock.currentTimer = 'next';
            }

            setTimeout(this.getNextTimer, 1000);
        },

        playCompletionSound() {
            let _this = this;
            this.completionSound.play();

            setTimeout(function () {
                _this.completionSound.play();
            }, 2700);
        },

        setTimerFromCurrentTimeBlock() {
            if (this.currentTimeBlock.focusMinutes <= 0 || this.currentTimeBlock.restMinutes <= 0) {
                return;
            }

            if (this.currentTimeBlock.currentTimer === 'next') {
                return;
            }

            const timerTypes = {
                'focus': 'Focus',
                'rest': 'Rest'
            };

            this.timerType = timerTypes[this.currentTimeBlock.currentTimer];
            this.remainingTime = this.currentTimeBlock[this.currentTimeBlock.currentTimer + 'Minutes'] * 60
        },

        loadCurrentTimerMinutes() {
            this.currentTimerBlockFocusMinutes = this.currentTimeBlock.focusMinutes;
            this.currentTimerBlockRestMinutes = this.currentTimeBlock.restMinutes;
        },

        getNextTimer() {            
            if (
                (!this.currentTimeBlock || !this.currentTimeBlock.focusMinutes || this.currentTimeBlock.currentTimer === 'next') 
                && this.timers.length > 0
            ) {
                this.currentTimeBlock = this.timers.shift();

                this.currentTimeBlock.currentTimer = 'focus';
                this.loadCurrentTimerMinutes();
            } else if (this.timers.length <= 0) {
                return;
            }
            
            this.setTimerFromCurrentTimeBlock();
        },

        secondCountDown() {
            if (!this.$store.state.timerActive) { return; }

            let currentTime = Date.now();

            let calcTime = (this.lastIterationStart > 0) ? this.lastIterationStart : this.startTime;
            let elapsedTime = Math.floor((currentTime - this.startTime) / 10) / 100;
            let timeDiff = currentTime - calcTime;
            let msIterationDrift = this.targetIntervalTime - timeDiff;
            let nextTimeout = 1000 + msIterationDrift;
            let msTotalDrift = 0;

            this.lastIterationStart = currentTime;
            
            this.remainingTime--;
            this.secondsPassed++;

            msTotalDrift = (Math.floor((elapsedTime - this.secondsPassed) * 100) / 100) * 1000;

            if (msTotalDrift > 10) {
                nextTimeout -= msTotalDrift;
            }

            if (nextTimeout < 950) {
                nextTimeout = 950;
            }

            if (nextTimeout > 1050) {
                nextTimeout = 1050;
            }

            this.targetIntervalTime = nextTimeout;

            if (this.remainingTime <= 0 || currentTime > this.endTime) {
                this.endTimer();
                return;
            }
            
            setTimeout(this.secondCountDown, nextTimeout);
        },

        toggleConfigView() {
            EventBus.$emit('toggle-config-active');
        }
    },
    computed: {
        remainingTimeDisplay () {
            let minutes = Math.floor(this.remainingTime / 60);
            let seconds = this.remainingTime % 60;
            return minutes + ':' + ('0' + seconds).slice(-2);
        },
        timerActive () {
            return this.$store.state.timerActive;
        }
    },
    created() {
        this.$store.commit('setConfigToDefault');
        this.$store.commit('generateIntervals');

        this.timers = this.$store.state.intervals;

        this.getNextTimer();
    },
    mounted() {
        EventBus.$on('reload-timers', () => {
            this.currentTimeBlock = {
                focusMinutes : 0,
                restMinutes : 0,
                currentTimer: 'next'
            },
            this.timers = this.$store.state.intervals;

            this.getNextTimer();
        });
    }
}
</script>


<style>
.countdown-timer-text {
    font-family: 'Fira Code', monospace;
}
</style>