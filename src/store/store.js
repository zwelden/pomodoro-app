import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        pomodoroType: 'generated', // 'generated' / 'manual'
        pomodoroConfig: {},
        defaultPomodoroConfig: {
            focusMinutes: 25,
            shortRestMinutes: 5,
            longRestMinutes: 15,
            intervals: 4
        },
        intervals: []
    },
    mutations: {
        generateIntervals (state) {
            state.intervals = [];

            let totalIntervals = state.pomodoroConfig.intervals;

            for (let interval = 1; interval <= totalIntervals; interval++) {
                let timeBlock = {
                    focusMinutes: state.pomodoroConfig.focusMinutes,
                    restMinutes: state.pomodoroConfig.shortRestMinutes
                }

                if (interval === totalIntervals) {
                    timeBlock.restMinutes = state.pomodoroConfig.longRestMinutes
                }

                state.intervals.push(timeBlock)
            }
        },
        
        changeConfigFocusMinutes (state, payload) {
            state.pomodoroConfig.focusMinutes = payload.newFocusMinutes;
        },

        changeConfigShortRestMinutes (state, payload) {
            state.pomodoroConfig.shortRestMinutes = payload.newShortRestMinutes;
        },

        changeConfigLongRestMinutes (state, payload) {
            state.pomodoroConfig.longRestMinutes = payload.newLongRestMinutes;
        },

        changeConfigIntervals (state, payload) {
            state.pomodoroConfig.intervals = payload.newIntervals;
        },

        setConfigToDefault (state) {
            state.pomodoroConfig = state.defaultPomodoroConfig;
        }
    }
})