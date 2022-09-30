<template>
    <div id="app">
  <!-- `greet` 是在下面定义的方法名 -->
  <button @click="greet">点我</button>
</div>
</template>

<script>
    const app = {
    data() {
        return {
        name: 'Runoob'
        }
    },
    methods: {
        greet(event) {
        // `methods` 内部的 `this` 指向当前活动实例
        alert('Hello ' + this.name + '!')
        // `event` 是原生 DOM event
        if (event) {
            alert(event.target.tagName)
        }
        }
    }
    }
 
Vue.createApp(app).mount('#app')
</script>


<style scoped>

</style>