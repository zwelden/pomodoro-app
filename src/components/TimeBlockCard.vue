<template>
    <div class="timer-card flex justify-center mb-6 rounded overflow-hidden">
        <div class="px-4 text-center flex justify-center items-center" :class="{'greyed-out': focusClass}">
            <div class="font-semibold text-gray-600">
                focus
            </div>
            <div class="px-2 text-xl text-gray-800 font-semibold">
                {{ focusTime }}
            </div>
            <div class="text-gray-600 font-semibold">
                min
            </div>
        </div>
        <div class="px-4 text-center flex justify-center items-center" :class="{'greyed-out': restClass}">
            <div class="font-semibold text-gray-600">
                rest
            </div>
            <div class="px-2 text-xl text-gray-800 font-semibold">
                {{ restTime }}
            </div>
            <div class="text-gray-600 font-semibold">
                min
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TimeBlockCard',
    props: ['focusTime', 'restTime', 'currentActive'],
    computed: {
        focusClass() {
            if (this.currentActive !== 'focus') {
                return true;
            }

            return false;
        },
        restClass() {
            if (this.currentActive !== 'rest') {
                return true;
            }

            return false;
        }
    }

}
</script>

<style>
.greyed-out {
    opacity: 0.3;
}
</style>