<template>
    <div class="timer-card flex justify-between mb-6 rounded overflow-hidden shadow-lg border border-gray-200 px-2 py-8 bg-white">
            <div class="px-3 text-center">
                <div class="font-semibold text-gray-700">
                    Focus Duration
                </div>
                <div class="px-2">
                    <input type="number" :value="focusTime" id="focus-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
                    <input type="number" :value="restTime" id="rest-duration" class="text-2xl text-center shadow appearance-none border rounded w-full py-2 pl-3 pr-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                </div>
                <div class="text-gray-600">
                    minutes
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'TimeBlockCard',
    props: ['focusTime', 'restTime']
}
</script>