<template>
    <div class="pomodoro-timer max-w-sm w-full rounded overflow-hidden shadow-lg border border-gray-200 px-2 py-8">
        <div class="flex justify-between mb-6">
            <div class="px-3 text-center">
                <div class="font-semibold text-gray-700">
                    Focus Duration
                </div>
                <div class="px-2">
                    <input type="number" value="25" id="focus-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="text-gray-600">
                    minutes
                </div>
            </div>
            <div class="px-3 text-center">
                <div class="font-semibold text-gray-700">
                    Rest Duration
                </div>
                <div class="px-2">
                    <input type="number" value="5" id="rest-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="text-gray-600">
                    minutes
                </div>
            </div>
        </div>

        <div class="text-center">
            <div class="font-semibold text-3xl text-gray-700 mb-2">
                <span class="time-type">Focused</span> Time
            </div>
            <div class="text-gray-800 text-4xl mb-2">
                23:30
            </div>
            <div class="text-gray-600 text-lg">
                remaining
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PomodoroTimer',
    data() {
        return {}
    }
}
</script>


<style>

</style>