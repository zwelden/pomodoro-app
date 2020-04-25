<template>
    <div class="pomodoro-config-manager-card rounded overflow-hidden shadow-lg border border-gray-200 p-4 text-center">
        <div class="text-xl text-gray-600 font-semibold mb-6">
            Config Options
        </div>
        <ConfigOptionSliderInput 
            v-model="focusMinutes" 
            @change="changeFocusMinutes" 
            :min="1" 
            :max="60" 
            :option-title="'Focus Minutes'" 
            class="mb-10">
        </ConfigOptionSliderInput>

        <ConfigOptionSliderInput 
            v-model="shortRestMinutes" 
            @change="changeShortRestMinutes" 
            :min="1" 
            :max="30" 
            :option-title="'Short Rest Minutes'" 
            class="mb-10">
        </ConfigOptionSliderInput>

        <ConfigOptionSliderInput 
            v-model="longRestMinutes" 
            @change="changeLongRestMinutes" 
            :min="1" 
            :max="60" 
            :option-title="'Long Rest Minutes'" 
            class="mb-10">
        </ConfigOptionSliderInput>

        <ConfigOptionSliderInput 
            v-model="intervals" 
            @change="changeIntervals" 
            :min="1" 
            :max="15" 
            :option-title="'Pomodoro Intervals'" 
            class="mb-10">
        </ConfigOptionSliderInput>
    </div>
</template>

<script>
import ConfigOptionSliderInput from './ConfigOptionSliderInput.vue';

import { EventBus } from '../eventBus';

export default {
    name: 'PomodoroConfigManager',
    components: {
        ConfigOptionSliderInput
    },
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
.pomdoro-config-manager-card {
    background: #fffefc;
}
</style>