<template>
    <div class="pomodoro-config-manager-card rounded overflow-hidden shadow-lg border border-gray-200 p-4 text-center bg-white">
        <div class="text-xl text-gray-600 font-semibold mb-6">
            Config Options
        </div>
        <div class="section-wrapper mb-10">
            <div class="section-title text-lg text-gray-700 mb-1">
                Focus Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="focusMinutes" @change="changeFocusMinutes" min="1" max="60" step="1" class="text-center bg-gray-200 rounded p-1 text-blue-900 font-semibold">
            </div>
            <div class="value-slider">
                <input type="range" min="1" max="60" v-model="focusMinutes" @change="changeFocusMinutes" class="slider-input bg-gray-300">
            </div>
        </div>
        <div class="section-wrapper mb-10">
            <div class="section-title text-lg text-gray-700 mb-1">
                Short Rest Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="shortRestMinutes" @change="changeShortRestMinutes" class="text-center bg-gray-200 border border-gray-300 rounded p-1 text-blue-900 font-semibold">
            </div>
            <div class="value-slider">
                <input type="range" min="1" max="30" v-model="shortRestMinutes" @change="changeShortRestMinutes" class="slider-input bg-gray-300">
            </div>
        </div>
        <div class="section-wrapper mb-10">
            <div class="section-title text-lg text-gray-700 mb-1">
                Long Rest Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="longRestMinutes" @change="changeLongRestMinutes" class="text-center bg-gray-200 border border-gray-300 rounded p-1 text-blue-900 font-semibold">
            </div>
            <div class="value-slider">
                <input type="range" min="1" max="60" v-model="longRestMinutes" @change="changeLongRestMinutes" class="slider-input bg-gray-300">
            </div>
        </div>
        <div class="section-wrapper mb-10">
            <div class="section-title text-lg text-gray-700 mb-1">
                Pomodoro Intervals
            </div>
            <div class="section-value">
                <input type="number" v-model="intervals" @change="changeIntervals" class="text-center bg-gray-200 border border-gray-300 rounded p-1 text-blue-900 font-semibold">
            </div>
            <div class="value-slider">
                <input type="range" min="1" max="15" v-model="intervals" @change="changeIntervals" class="slider-input bg-gray-300">
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../eventBus';

export default {
    name: 'PomodoroConfigManager',
    data() {
        return {
            focusMinutes: 0,
            shortRestMinutes: 0,
            longRestMinutes: 0,
            intervals: 0
        }
    },
    methods: {
        changeFocusMinutes () {
            this.$store.commit('changeConfigFocusMinutes', {newFocusMinutes: this.focusMinutes});
            this.$store.commit('generateIntervals');

            EventBus.$emit('reload-timers');
        },

        changeShortRestMinutes() {
            this.$store.commit('changeConfigShortRestMinutes', {newShortRestMinutes: this.shortRestMinutes});
            this.$store.commit('generateIntervals');

            EventBus.$emit('reload-timers');
        },

        changeLongRestMinutes() {
            this.$store.commit('changeConfigLongRestMinutes', {newLongRestMinutes: this.longRestMinutes});
            this.$store.commit('generateIntervals');

            EventBus.$emit('reload-timers');
        },

        changeIntervals() {
            this.$store.commit('changeConfigIntervals', {newIntervals: this.intervals});
            this.$store.commit('generateIntervals');

            EventBus.$emit('reload-timers');
        }
    },
    created () {
        this.focusMinutes = this.$store.state.pomodoroConfig.focusMinutes;
        this.shortRestMinutes = this.$store.state.pomodoroConfig.shortRestMinutes;
        this.longRestMinutes = this.$store.state.pomodoroConfig.longRestMinutes;
        this.intervals = this.$store.state.pomodoroConfig.intervals;
    }
}
</script>

<style>
.section-value input {
    width: 5rem;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
}

.section-value input::-webkit-inner-spin-button, 
.section-value input::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
}

.slider-input {
    -webkit-appearance: none;
    appearance: none;
    width: 60%;
    height: 6px;
    opacity: 0.6;
}

.slider-input:hover {
    opacity: 1;
    background: #bee3f8 !important;
}

.slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: #63b3ed;
    cursor: pointer;
    border-radius: 100%;
}

.slider-input:focus {
    -webkit-appearance: none;
    appearance: none;
    outline: none;
}
</style>