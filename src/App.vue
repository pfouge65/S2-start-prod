<template>
  <el-container class="mainContainer">

    <el-aside width="200px">
      <TheMenu />
    </el-aside>

    <el-container>
      
      <el-header height="60px">
        <TheTopTask 
          ref="TheTopTask"
          @newTask="addTask($event)"
        />
      </el-header>

      <el-main>
        <TaskList 
          :tasks="tasks" 
          :areTaskLoading = areTaskLoading
          v-on="{
            restart: sendRestartTask,
            delete: deleteTask
          }" 
        />
      </el-main>

    </el-container>

  </el-container>
</template>

<script>
  import { v4 as uuid } from '@lukeed/uuid';
  import * as TaskService from './services/TaskService.js'
  import TheMenu from './components/TheMenu.vue'
  import TheTopTask from './components/TheTopTask.vue'
  import TaskList from './components/TaskList.vue'

  export default {
    components: {
      TheMenu,
      TheTopTask,
      TaskList,
      
    },
    data() {
      return {
        tasks: [],
        areTaskLoading: true
      }
    },
    methods: {
      async addTask ({name, startTime}) {
        this.tasks.unshift({
          id: uuid(),
          name,
          startTime ,
          endTime: Date.now()
          })
          try{
            await TaskService.updateAll(this.tasks)
          }catch (e){
            console.error(e)
          }
      },
      sendRestartTask(taskID){
        //Récuperation ancienne task name
        let newTaskName = null
        this.tasks.forEach(task => {
            if (task.id === taskID){
                newTaskName = task.name
            }
        })
        this.$refs.TheTopTask.restartTask(newTaskName)
      },
      async deleteTask(taskID) {
        // console.log('taskID' , taskID)
        let taskIndex = null
        this.tasks.forEach((task, index)  => {
            if (task.id === taskID){
                taskIndex = index
            }
        })
        // console.log('deleteTask', taskID, taskIndex)
        this.tasks.splice(taskIndex, 1)

        try{
            await TaskService.updateAll(this.tasks)
          }catch (e){
            console.error(e)
          }
      },
    },
    async created() {
      try{
        this.tasks = await TaskService.getAll()
      }catch(e){
        console.error(e)
      }
      this.areTaskLoading = false
    }
  };
</script>

<style lang="scss">
body { margin: 0; }
#app {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mainContainer { height: 100%; }

.el-aside {
  height: 100%;
  color: #333;
  border-right: solid 1px #e6e6e6;
}
.el-header {
  padding: 0 !important;
  border-bottom: solid 1px #e6e6e6;
  color: #333;
  line-height: 60px;
  .el-input .el-input__inner {
    border: none !important;
  }
}

</style>