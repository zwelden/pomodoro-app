import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        pomodoroType: 'generated', // 'generated' / 'manual'
        pomodoroConfig: {},
        defaultPomodoroConfig: {
            focusMinutes: 1,
            shortRestMinutes: 1,
            longRestMinutes: 2,
            intervals: 2
        },
        intervals: [],
        timerActive: false
    },
    mutations: {
        generateIntervals (state) {
            state.intervals = [];

            let totalIntervals = state.pomodoroConfig.intervals;
            console.log(totalIntervals)

            for (let interval = 1; interval <= totalIntervals; interval++) {
                let timeBlock = {
                    focusMinutes: state.pomodoroConfig.focusMinutes,
                    restMinutes: state.pomodoroConfig.shortRestMinutes
                }
                console.log(interval);
                if (interval === totalIntervals) {
                    console.log('in if condition')
                    timeBlock.restMinutes = state.pomodoroConfig.longRestMinutes
                }

                state.intervals.push(timeBlock)
            }
        },
        
        changeConfigFocusMinutes (state, payload) {
            state.pomodoroConfig.focusMinutes = payload.newFocusMinutes;

            console.log(payload);
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
        },

        toggleTimerActive (state) {
            state.timerActive = !state.timerActive;
        },

        setTimerActiveFalse (state) {
            state.timerActive = false;
        }
    }
})