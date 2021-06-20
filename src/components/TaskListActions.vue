<template>
    <el-button size="small" @click="sendCopyTaskName" icon="el-icon-copy-document" circle></el-button>
    <el-button size="small" @click="sendRestart" i type="primary" icon="el-icon-video-play" circle></el-button>
    <el-button size="small" @click="sendDelete" type="danger" icon="el-icon-delete" circle></el-button>

        
</template>

<script>
    export default {
        props: {
            taskID: {
                type: String,
                required: true 
            },
        },
        emits: ['restart', 'delete', 'copyTaskName'],
        methods:{
            sendRestart() {
                this.$emit('restart', this.taskID)
                // console.log('restart')
            },
            sendDelete() {
                this.$emit('delete', this.taskID)
                // console.log('delete')
            },
            sendCopyTaskName() {
                this.$emit('copyTaskName')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>