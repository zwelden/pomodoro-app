<template>
    <div class="pomodoro-config-manager-card rounded overflow-hidden shadow-lg border border-gray-200 p-4 text-center">
        <div>
            <div class="section-title">
                Focus Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="focusMinutes" @change="changeFocusMinutes">
            </div>
        </div>
        <div>
            <div class="section-title">
                Short Rest Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="shortRestMinutes" @change="changeShortRestMinutes">
            </div>
        </div>
        <div>
            <div class="section-title">
                Long Rest Minutes
            </div>
            <div class="section-value">
                <input type="number" v-model="longRestMinutes" @change="changeLongRestMinutes">
            </div>
        </div>
        <div>
            <div class="section-title">
                Intervals
            </div>
            <div class="section-value">
                <input type="number" v-model="intervals" @change="changeIntervals">
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