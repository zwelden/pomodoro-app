<template>
  <div id="app" class="container mx-auto p-6">
    <div class="flex justify-center">
      <pomodoro-timer></pomodoro-timer>
    </div>
  </div>
</template>

<script>
import PomodoroTimer from './components/PomodoroTimer.vue'

export default {
  name: 'App',
  components: {
    PomodoroTimer
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
