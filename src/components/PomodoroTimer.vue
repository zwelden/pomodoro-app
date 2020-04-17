<template>
    <div class="pomodoro-timer max-w-sm w-full">
        <div class="timer-card flex justify-between mb-6 rounded overflow-hidden shadow-lg border border-gray-200 px-2 py-8 bg-white">
            <div class="px-3 text-center">
                <div class="font-semibold text-gray-700">
                    Focus Duration
                </div>
                <div class="px-2">
                    <input type="number" value="25" id="focus-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="text-gray-600">
                    minutes
                </div>
            </div>
            <div class="px-3 text-center">
                <div class="font-semibold text-gray-700">
                    Rest Duration
                </div>
                <div class="px-2">
                    <input type="number" value="5" id="rest-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="text-gray-600">
                    minutes
                </div>
            </div>
        </div>

        <div class="text-center rounded overflow-hidden shadow-lg border border-gray-200 px-2 py-8 bg-white">
            <div class="font-semibold text-2xl text-gray-600 mb-2">
                <span class="time-type">{{ timerType }}</span> Time
            </div>
            <div class="text-gray-800 text-4xl mb-3 font-semibold tracking-widest">
                {{ remainingTimeDisplay }}
            </div>
            <div class="">
                <div @click="toggleTimer" 
                    class="rounded inline-block px-10 py-2 text-lg font-semibold tracking-wide cursor-pointer" 
                    v-bind:class="timerActive ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'"
                >
                    {{ timerText }}
                </div>
            </div>
        </div>

        {{ startTime }}
        <br>
        {{ endTime }}
        <br>
        {{ remainingTime }}
    </div>
</template>

<script>
export default {
    name: 'PomodoroTimer',
    data() {
        return {
            currentTimeBlock: [
                {type: 'focused', seconds: 15},
                {type: 'rest', seconds: 5}
            ],
            timers: [
                [
                    {type: 'focused', seconds: 16},
                    {type: 'rest', seconds: 6}
                ],
                [
                    {type: 'focused', seconds: 14},
                    {type: 'rest', seconds: 4}
                ]
            ],
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
                'focused': 'Focused',
                'rest': 'Rest'
            };

            const timerBlock = this.currentTimeBlock.shift();

            this.timerType = timerTypes[timerBlock.type];
            this.remainingTime = timerBlock.seconds
        },

        getNextTimer() {            
            if ((!this.currentTimeBlock || this.currentTimeBlock.length <= 0) && this.timers.length > 0) {
                this.currentTimeBlock = this.timers.shift();
            }

            this.setTimerFromCurrentTimeBlock();
        },


        secondCountDown() {
            if (!this.timerActive) { return; }

            console.log('#######');
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
                console.log(true);
                console.log(nextTimeout);
                console.log('...')

                nextTimeout -= msTotalDrift;
            }

            if (nextTimeout < 950) {
                nextTimeout = 950;
            }

            if (nextTimeout > 1050) {
                nextTimeout = 1050;
            }

            this.targetIntervalTime = nextTimeout;

            console.log(timeDiff);
            console.log(nextTimeout);
            console.log('---');
            console.log(msTotalDrift);
            console.log(this.secondsPassed);
            console.log(elapsedTime);
            console.log('\n');

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

</style>