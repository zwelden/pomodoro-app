<template>
    <div class="pomodoro-timer">

        <TimeBlockCard :focus-time="currentTimerBlockFocusMinutes" :rest-time="currentTimerBlockRestMinutes" :current-active="currentTimeBlock.currentTimer"></TimeBlockCard>
        
        <TimerDisplay :title="timerType" 
                :time-remaining="remainingTime" 
                :total-time="timerTotalTime" 
                :display-color="timerDisplayColor()"
                class="mb-6">
        </TimerDisplay>

        <div class="flex justify-center items-center rounded overflow-hidden mb-4">
            <div @click="toggleTimer" 
                class="h-16 w-16 fill-current cursor-pointer" 
                :class="textCssClass()"
            >
                <span v-if="timerCountdownActive">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                </span>

                <span v-if="!timerCountdownActive">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M4 4l12 6-12 6z"/></svg>
                </span>
            </div>
        </div>


        <div class="flex justify-center items-center">
            <SettingsButton />
        </div>
    </div>
</template>

<script>
import TimeBlockCard from './TimeBlockCard.vue';
import TimerDisplay from './TimerDisplay.vue';
import SettingsButton from './SettingsButton.vue';

import { EventBus } from '../eventBus';

export default {
    name: 'PomodoroTimer',
    components: {
        TimeBlockCard,
        TimerDisplay,
        SettingsButton
    },
    data() {
        return {
            currentTimeBlock: {
                focusMinutes : 0,
                restMinutes : 0,
                currentTimer: 'next'
            },
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
            completionSound: new Audio(require('../assets/complete.mp3'))
        }
    },
    methods: {
        toggleTimer() {
            this.$store.commit('toggleTimerCountdownActive');

            if (this.timerCountdownActive === true) {
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

            setTimeout(this.secondCountDown, 1000);

            if (this.currentTimeBlock.currentTimer === 'focus' && this.timerInProgress === false) {
                this.$store.commit('incrementCurrentInterval');
                this.$store.commit('setTimerInProgressTrue');
            }
        },

        pauseTimer() {
            this.clearTimer();
            this.$store.commit('deactivateWarningFlash');
        },

        clearTimer() {
            this.lastIterationStart = 0;
            this.startTime = 0;
            this.endTime = 0;
            this.targetIntervalTime = 1000;
        },

        endTimer() {
            this.clearTimer();
            this.playCompletionSound();
            
            this.$store.commit('setTimerInProgressFalse');
            this.$store.commit('deactivateWarningFlash');
            this.$store.commit('setTimerCountdownActiveFalse');

            if (this.currentTimeBlock.currentTimer === 'focus') {
                this.currentTimeBlock.currentTimer = 'rest';
            } else if (this.currentTimeBlock.currentTimer === 'rest') {
                this.currentTimeBlock.currentTimer = 'next';
            }

            setTimeout(this.getNextTimer, 1000);
        },

        playCompletionSound() {
            this.completionSound.play();
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

            this.$store.commit('updateCurrentTimerSection', {timerSection: this.currentTimeBlock.currentTimer});
            this.timerType = timerTypes[this.currentTimeBlock.currentTimer];
            this.remainingTime = this.currentTimeBlock[this.currentTimeBlock.currentTimer + 'Minutes'] * 60
        },

        loadCurrentTimerMinutes() {
            this.currentTimerBlockFocusMinutes = this.currentTimeBlock.focusMinutes;
            this.currentTimerBlockRestMinutes = this.currentTimeBlock.restMinutes;
        },

        getNextIntervalBlock () {
            let currentInterval = this.$store.state.currentInterval;
            let intervals = this.$store.state.intervals;

            if (currentInterval > intervals) {
                return false;
            }

            return intervals[currentInterval];
        },

        getNextTimer() {            
            if (
                (!this.currentTimeBlock || !this.currentTimeBlock.focusMinutes || this.currentTimeBlock.currentTimer === 'next') 
                && this.$store.state.intervals.length > 0
            ) {
                this.currentTimeBlock = this.getNextIntervalBlock();

                if (this.currentTimeBlock === false) {
                    return;
                }

                this.currentTimeBlock.currentTimer = 'focus';
                this.loadCurrentTimerMinutes();
            } else if (this.$store.state.intervals.length <= 0) {
                return;
            }
            
            this.setTimerFromCurrentTimeBlock();
        },

        secondCountDown() {
            if (!this.timerCountdownActive) { return; }

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

            if (this.remainingTime <= 5) {
                this.$store.commit('activateWarningFlash');
            }

            if (this.remainingTime <= 0 || currentTime > this.endTime) {
                this.endTimer();
                return;
            }
            
            setTimeout(this.secondCountDown, nextTimeout);
        },

        timerDisplayColor () {
            if (!this.currentTimeBlock.currentTimer) {
                return 'gray';
            }

            if (this.currentTimeBlock.currentTimer === 'rest') {
                return 'teal';
            }

            return 'blue';
        },
        textCssClass () {
            if (!this.currentTimeBlock.currentTimer) {
                return 'text-gray-400';
            }

            if (this.currentTimeBlock.currentTimer === 'rest') {
                return 'text-teal-400 hover:text-teal-500';
            }

            return 'text-blue-400 hover:text-blue-500';
        },
    },
    computed: {
        remainingTimeDisplay () {
            let minutes = Math.floor(this.remainingTime / 60);
            let seconds = this.remainingTime % 60;
            return minutes + ':' + ('0' + seconds).slice(-2);
        },
        timerCountdownActive () {
            return this.$store.state.timerCountdownActive;
        },
        timerInProgress () {
            return this.$store.state.timerInProgress;
        },
    },
    created() {
        this.$store.commit('setConfigToDefault');
        this.$store.commit('generateIntervals');

        this.getNextTimer();
    },
    mounted() {
        EventBus.$on('reload-timers', () => {
            this.currentTimeBlock = {
                focusMinutes : 0,
                restMinutes : 0,
                currentTimer: 'next'
            };

            this.$store.commit('setTimerInProgressFalse');
        
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