<template>
  <el-table
    :data="tasks"
    row-key="id"
    stripe
    empty-text=" pas de donnée"
    style="width: 100%"
    v-loading ="areTaskLoading"
    >

    <el-table-column
      prop="name"
      label="Tâche">
    </el-table-column>

    <el-table-column
      align="right"
      label="Début et fin"
      width="150">
      <template #header></template>
      <template #default="scope">
        {{ formatTimeStamp(scope.row.startTime) }} - {{ formatTimeStamp(scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Durée"
      width="100">
      <template #header></template>
      <template #default="scope">
        {{ durationBetweenTimeStamp(scope.row.startTime, scope.row.endTime) }}
      </template>
    </el-table-column>

    <el-table-column
      align="right"
      label="Actions"
      width="200">      
      <template #header></template>
      <template #default="scope">
        <TaskListActions 
        :taskID="scope.row.id"
        v-on="{
          restart: sendRestart,
          delete: sendDelete
        }"
        @copyTaskName="copyToClipboard(scope.row.name)"
         />
      </template>
    </el-table-column>
    
  </el-table>
</template>

<script>
  import TaskListActions from './TaskListActions.vue'

  export default {
    components: {
      TaskListActions,
    },
    data() {
      return {
        tsFormatteur: Intl.DateTimeFormat('fr',{ hour: '2-digit', minute: '2-digit'}),

      }
    },
    props: {
      tasks: {
        type: Array,
        default: []
      },
      areTaskLoading: {
        type: Boolean,
        default: false
      }
    },
    emits: ['restart', 'delete'],
    methods: {
      sendRestart(data) {
          this.$emit('restart', data)
          // console.log('restart')
      },
      sendDelete(data) {
          this.$emit('delete', data)
          // console.log('delete')
      },
      formatTimeStamp(ts){
          return this.tsFormatteur.format(ts)
      },
      durationBetweenTimeStamp (start, end) {
          let seconds = Math.floor((end / 1000) - (start/1000))
          let minutes = Math.floor(seconds/60)
          const hours = Math.floor(minutes / 60)
          seconds = seconds % 60
          minutes = minutes % 60
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      },
      copyToClipboard(text){
        // console.log(text)
        navigator.clipboard.writeText(text)
        // navigator.clipboard.writeText(text)
      }
    }
  }
</script>