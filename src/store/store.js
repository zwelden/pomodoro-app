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

            let totalIntervals = parseInt(state.pomodoroConfig.intervals);

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
            state.pomodoroConfig.focusMinutes = parseInt(payload.newFocusMinutes);

            console.log(payload);
        },

        changeConfigShortRestMinutes (state, payload) {
            state.pomodoroConfig.shortRestMinutes = parseInt(payload.newShortRestMinutes);
        },

        changeConfigLongRestMinutes (state, payload) {
            state.pomodoroConfig.longRestMinutes = parseInt(payload.newLongRestMinutes);
        },

        changeConfigIntervals (state, payload) {
            state.pomodoroConfig.intervals = parseInt(payload.newIntervals);
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