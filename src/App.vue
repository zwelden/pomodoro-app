<template>
  <div id="app" class="container mx-auto p-0 min-h-screen">
    <div class="pomodoro-timer-component flex justify-center items-center h-screen">
      <pomodoro-timer class="max-w-sm w-full"></pomodoro-timer>
    </div>

    <transition name="fade">
      <div v-if="configActive" class="pomodoro-config-manager-component flex justify-center items-center h-screen w-screen bg-gray-100">
        <PomodoroConfigManager class="max-w-md w-full" />
      </div>
    </transition>
  </div>

</template>

<script>
import PomodoroTimer from './components/PomodoroTimer.vue'
import PomodoroConfigManager from './components/PomodoroConfigManager.vue';

import { EventBus } from './eventBus';

export default {
  name: 'App',
  components: {
    PomodoroTimer,
    PomodoroConfigManager
  },
  computed: {
    configActive () {
      return this.$store.state.configActive;
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
  z-index: 10;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
