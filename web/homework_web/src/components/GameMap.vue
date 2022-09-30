<template>
    <!-- 让下面函数返回的parent和canvas与html部分产生关联 -->
    <div>
        <div class="d-grid gap-2 col-3 mx-auto">
            <button @click="greet" type="button" class="btn btn-secondary btn-lg">投掷</button>
        </div>
        <div ref = "parent" class = "gamemap">  
        <canvas ref = "canvas"></canvas>
        </div>
        
    </div>
    
</template>


<script>
import {  GameMap  } from '@/assets/scripts/GameMap';
import {  ref, onMounted  } from 'vue'



export default{
    setup(){
        let parent = ref(null);
        let canvas = ref(null);
        
        //组件挂载完后需要执行以下操作
        onMounted(() =>{ 
            // 就是ctx和parent
            new GameMap(canvas.value.getContext('2d'), parent.value)
        });
        return{
            parent,
            canvas
        }
    },
    methods:{
        greet(){
            for(let i = 0; i < 1000; i ++){
                let k = parseInt(Math.random() * 6);
                if(k !== 0){
                    alert("你转出了：" + k);
                    break;
                }
            }
            
            
        }
    }

}
</script>

<style scoped>
div.gamemap{
    /* width: 200%;
    height: 200%; */
    width:60vw;
    height:70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
button{
    
}
</style>
