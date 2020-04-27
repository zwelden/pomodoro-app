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
        intervals: [],
        currentInterval: 0,
        timerActive: false,
        configActive: false,
        warningFlashActive: false
    },
    mutations: {
        generateIntervals (state) {
            state.intervals = [];
            state.currentInterval = 0;

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
        },

        toggleConfigActive (state) {
            state.configActive = !state.configActive;
        },

        setConfigActiveState (state, payload) {
            if (typeof payload.isActive !== 'boolean') {
                payload.isActive = false;
            }

            state.configActive = payload.isActive;
        },

        incrementCurrentInterval (state) {
            state.currentInterval++;
        },

        resetCurrentInterval (state) {
            state.currentInterval = 1;
        },

        activateWarningFlash (state) {
            state.warningFlashActive = true;
        },

        deactivateWarningFlash (state) {
            state.warningFlashActive = false;
        }
    }
})