<template>
    <div class="timer-sequence-tracker-container">
        <div v-for="x in numBlocks" 
            class="sequence-block" 
            :key="x"
            :class="activeBlock == x ? activeBlockClass : inactiveBlockClass" 
            :style="{top: calculateTopPercent(x) + '%', height: calculateHeightPercent() + '%'}">
        </div>
    </div>
</template>


<script>
export default {
    name: 'TimerSequenceTracker',
    props: {
        numBlocks: Number,
        activeBlock: Number,
        blockColor: String
    },
    methods: {
        calculateTopPercent (x) {
            return ((x - 1) * (100 / this.numBlocks)) + ((x - 1) * (1 / this.numBlocks))
        },
        calculateHeightPercent () {
            return (100 / this.numBlocks) - 1
        }
    },
    computed: {
        activeBlockClass () {
            if (this.blockColor === 'gray') {
                return 'active bg-gray-300';
            }

            if(this.blockColor === 'teal') {
                return 'active bg-teal-300';
            }

            return 'active bg-blue-300';
        },
        inactiveBlockClass () {
            if (this.blockColor === 'gray') {
                return 'bg-gray-200';
            }

            if(this.blockColor === 'teal') {
                return 'bg-teal-200';
            }

            return 'bg-blue-200';
        }
    }
}
</script>


<style>
.timer-sequence-tracker-container {
    position: absolute;
    top: 2rem;
    bottom: 2rem;
    left: 1.5rem;
    z-index: 2;
}

.sequence-block {
    position: absolute;
    /* background: #c3dafe; */
    width: 4px;
    border-radius: 4px;
    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
}

.sequence-block.active {
    transform: translateX(12px);
    width: 6px;
    /* background: #a3bffa; */
}
</style>