<template>
  <div id="app" class="container mx-auto p-0 min-h-screen px-3">

    <TimerBackground :bgColor="bgColor" />

    <BackgroundFlash v-if="warningFlashActive"/>

    <BackgroundTexture />

    <div class="pomodoro-timer-component flex justify-center items-center h-screen">
      <pomodoro-timer class="max-w-sm w-full"></pomodoro-timer>
    </div>

    <transition name="fade">
      <div v-if="configActive" class="pomodoro-config-manager-component flex justify-center items-center h-screen w-screen">
        <PomodoroConfigManager class="max-w-md w-full" />
      </div>
    </transition>

  </div>

</template>

<script>
import PomodoroTimer from './components/PomodoroTimer.vue'
import PomodoroConfigManager from './components/PomodoroConfigManager.vue';
import BackgroundFlash from './components/BackgroundFlash.vue';
import TimerBackground from './components/TimerBackground.vue';
import BackgroundTexture from './components/BackgroundTexture.vue';

import { EventBus } from './eventBus';

export default {
  name: 'App',
  components: {
    PomodoroTimer,
    PomodoroConfigManager,
    BackgroundFlash,
    TimerBackground,
    BackgroundTexture
  },
  computed: {
    configActive () {
      return this.$store.state.configActive;
    },
    warningFlashActive () {
      return this.$store.state.warningFlashActive
    },
    bgColor () {
      if (this.$store.state.currentTimerSection === 'rest') {
        return 'teal';
      } 

      return 'blue';
    }
  },
  mounted () {
    EventBus.$on('toggle-config-active', () => {
        this.$store.commit('toggleConfigActive');
    });

    EventBus.$on('set-config-active-state', (data) => {
        this.$store.commit('toggleConfigActive', data);
    });
  }
}
</script>

<style>
.pomodoro-timer-component {
  position: relative;
  z-index: 1;
}

.pomodoro-config-manager-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background: #fffefc;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.settings-btn-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
</style>
