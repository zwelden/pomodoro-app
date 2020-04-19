<template>
    <div class="pomodoro-timer max-w-sm w-full">

        <TimeBlockCard :focus-time="currentTimerBlockFocusMinutes" :rest-time="currentTimerBlockRestMinutes"></TimeBlockCard>

        <div class="text-center rounded overflow-hidden shadow-lg border border-gray-200 px-2 py-8 bg-white">
            <div class="font-semibold text-2xl text-gray-600 mb-2">
                <span class="time-type">{{ timerType }}</span>
            </div>
            <div class="countdown-timer-text text-blue-700 text-5xl mb-3 font-semibold tracking-widest">
                {{ remainingTimeDisplay }}
            </div>
            <div class="">
                <div @click="toggleTimer" 
                    class="rounded inline-block px-10 py-2 text-lg font-semibold tracking-wide cursor-pointer border-0 border-b-2" 
                    v-bind:class="timerActive ? 'bg-red-200 text-red-700 border-red-400' : 'bg-green-200 text-green-700 border-green-400'"
                >
                    {{ timerText }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TimeBlockCard from './TimeBlockCard.vue';

export default {
    name: 'PomodoroTimer',
    components: {
        TimeBlockCard
    },
    data() {
        return {
            currentTimeBlock: [],
            timers: [
                [
                    {type: 'focused', minutes: 1},
                    {type: 'rest', minutes: 1}
                ],
                [
                    {type: 'focused', minutes: 16},
                    {type: 'rest', minutes: 6}
                ],
                [
                    {type: 'focused', minutes: 14},
                    {type: 'rest', minutes: 4}
                ]
            ],
            currentTimerBlockFocusMinutes: 0,
            currentTimerBlockRestMinutes: 0,
            timerActive: false,
            secondsPassed: 0,
            remainingTime: 0, // seconds
            startTime: 0,
            endTime: 0,
            timerInterval: null,
            lastIterationStart: 0,
            targetIntervalTime: 1000,
            timerType: 'Focused',
            timerText: 'Start',
            completionSound: new Audio(require('../assets/complete.mp3'))
        }
    },
    methods: {
        toggleTimer() {
            this.timerActive = !this.timerActive;
 
            if (this.timerActive === true) {
               this.startTimer();
               return;
            }

            this.pauseTimer();
        },

        startTimer() {
            let diff = this.remainingTime * 1000; // seconds to milliseconds
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
            this.timerActive = false;
            this.timerText = 'Start';
            this.playCompletionSound();

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
            if (this.currentTimeBlock.length <= 0) {
                return;
            }

            const timerTypes = {
                'focused': 'Focus',
                'rest': 'Rest'
            };

            const timerBlock = this.currentTimeBlock.shift();

            this.timerType = timerTypes[timerBlock.type];
            this.remainingTime = timerBlock.minutes * 60
        },

        loadCurrentTimerMinutes() {
            this.currentTimerBlockFocusMinutes = this.currentTimeBlock[0].minutes;
            this.currentTimerBlockRestMinutes = this.currentTimeBlock[1].minutes;
        },

        getNextTimer() {            
            if ((!this.currentTimeBlock || this.currentTimeBlock.length <= 0) && this.timers.length > 0) {
                this.currentTimeBlock = this.timers.shift();

                this.loadCurrentTimerMinutes();
            }
            
            this.setTimerFromCurrentTimeBlock();
        },

        secondCountDown() {
            if (!this.timerActive) { return; }

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
        }
    },
    computed: {
        remainingTimeDisplay: function () {
            let minutes = Math.floor(this.remainingTime / 60);
            let seconds = this.remainingTime % 60;
            return minutes + ':' + ('0' + seconds).slice(-2);
        }
    },
    created() {
        this.getNextTimer();
    }
}
</script>


<style>
.countdown-timer-text {
    font-family: 'Fira Code', monospace;
}
</style>