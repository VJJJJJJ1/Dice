<!-- <template>
    <div>
        <div class="d-grid gap-2 col-3 mx-auto">
            <button @click="RandomInt" type="button" class="btn btn-secondary btn-lg">投掷</button>
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
        RandomInt(){
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
</style> -->
<template>
    <div class="row">
      <div class="col-5">
        <div class="group_but">
          <button v-for="a in MapA" :key="a.pos" :value="a.num" @click="putNum(0,a.pos)">{{a.num}}</button>
        </div>
      </div>

      <div class="col-2">
        <div class="dice">
          <button @click="Roll_Dice">{{dice_num}}</button>
        </div>
        <div class="badge bg-primary text-wrap fs-6" style="width: 100%;margin: 0 auto;">
          {{msg}}
        </div>
      </div>


      <div class="col-5">
        <div class="group_but">
          <button v-for="b in MapB" :key="b.pos" :value="b.pos" @click="putNum(1,b.pos)">{{b.num}}</button>
        </div>
      </div>

        <div class="See_Score">
            <button @click="see_score">查看得分</button>
        </div>
        

    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
//   import { useStore } from 'vuex';
  export default {
    setup() {
      let MapA;
      let MapB;
      let dice_num;
      let step;
      let msg;
      let has_roll = 0;
    //   const store = useStore();

    const see_score = () =>{
        if(!judge_full()){
            alert("游戏还没结束！");
            return  ;
        }
        calculate_score();
        
    }

      const init = () => {
        MapA = ref([{ pos: 0, num: 0 }, { pos: 1, num: 0 }, { pos: 2, num: 0 }, { pos: 3, num: 0 }, { pos: 4, num: 0 }, { pos: 5, num: 0 }, { pos: 6, num: 0 }, { pos: 7, num: 0 }, { pos: 8, num: 0 }]);
        MapB = ref([{ pos: 0, num: 0 }, { pos: 1, num: 0 }, { pos: 2, num: 0 }, { pos: 3, num: 0 }, { pos: 4, num: 0 }, { pos: 5, num: 0 }, { pos: 6, num: 0 }, { pos: 7, num: 0 }, { pos: 8, num: 0 }]);
        dice_num = ref("投掷");
        step = ref(0);
        msg = ref('现在是A回合');
      }
      init();


      const Roll_Dice = () => {
        if(has_roll === 0){
            for(let i = 0;i < 10000; i ++){
                let k = parseInt(Math.random(0, 1) * 6);
                if(k !== 0){
                    dice_num.value = k;
                    has_roll = 1;
                    break;
                }
            }
        }
        else if(has_roll === 1){
            alert("不许抢骰！！！！！！！");
        }
      }
      const set_num = (f, pos, number) => {
        let msg = 'success';
        if (step.value === 0 && f === 0) {
          if (MapA.value[pos].num === 0) {
            has_roll = 0;
            MapA.value[pos].num = number;
            judge(f, pos, number);
            step.value = 1;
            return msg;
          }
           else msg = '只能在空区域置放骰子';
        } 
        else if (step.value === 0 && f === 1) msg = "请操作左侧九宫格";
        
        if (step.value === 1 && f === 1) {
            if (MapB.value[pos].num === 0) {
                has_roll = 0;
                MapB.value[pos].num = number;
                judge(f, pos, number);
                step.value = 0;
            }
            else msg = '只能在空区域置放骰子';
        } 
        else if (step.value === 1 && f === 0) msg = "请操作右侧侧九宫格";
        return msg;
      }
      const calculate_score = () => {
        let ScoreA = 0;
        let ScoreB = 0;
        let winner = '';
        // 计算A的得分
        for (let i = 0; i < 3; i++) {
          let a = MapA.value[i * 3].num;
          let b = MapA.value[i * 3 + 1].num;
          let c = MapA.value[i * 3 + 2].num;
          if (a === b && b === c) ScoreA += a * 9;
          else if (a === b) ScoreA += a * 4 + c;
          else if (a === c) ScoreA += a * 4 + b;
          else if (b === c) ScoreA += b * 4 + a;
          else ScoreA += (a + b + c);
        }
        // 计算B的得分
        for (let i = 0; i < 3; i++) {
          let a = MapB.value[i * 3].num;
          let b = MapB.value[i * 3 + 1].num;
          let c = MapB.value[i * 3 + 2].num;
          if (a === b && b === c) ScoreB += a * 9;
          else if (a === b) ScoreB += a * 4 + c;
          else if (a === c) ScoreB += a * 4 + b;
          else if (b === c) ScoreB += b * 4 + a;
          else ScoreB += (a + b + c);
        }
        if (ScoreA > ScoreB) winner = 'A';
        else if (ScoreA < ScoreB) winner = 'B';
        else winner = '平局';
        if(winner !== '平局'){
            alert("A的得分是："+ScoreA + "\nB的得分是："+ScoreB + "\n" + winner + "胜出！");
        }
        else{
            alert("A的得分是："+ScoreA + "\nB的得分是："+ScoreB + "\n平局！");
            
        }
        msg.value = "游戏结束！";
        
        // store.commit("updateLoser", loser);
      }

      const judge_full = () => {
        let arr = [];
        //判断上一回合
        if (step.value === 1) arr = MapA.value;
        else arr = MapB.value;
        let cnt = 0;
        for (let i = 0; i < arr.length; i++) if (arr[i].num != 0) cnt++;
        if (cnt === 9)  return true;
        return false;
      }
      const judge = (f, pos, num) => {
        if (f === 0) {
          for (let i = parseInt(pos / 3) * 3; i < parseInt(pos / 3) * 3 + 3; i++) {
            if (MapB.value[i].num === num) MapB.value[i].num = 0;
          }
        } 
        else {
          for (let i = parseInt(pos / 3) * 3; i < parseInt(pos / 3) * 3 + 3; i++) {
            if (MapA.value[i].num === num) MapA.value[i].num = 0;
          }
        }
      }
      const putNum = (f, pos) => {
        if (dice_num.value === '投掷') {
          alert('请先投掷骰子');
          return;
        }
        let res = set_num(f, pos, dice_num.value)
        if (res != 'success') alert(res);
        else {
            dice_num.value = '投掷';
            msg.value = (msg.value === '现在是A回合' ? '现在是B回合' : '现在是A回合');
            if(judge_full()){
                calculate_score();
                return;
            }
        }
      }
      return {
        MapA,
        MapB,
        dice_num,
        step,
        msg,
        putNum,
        Roll_Dice,
        see_score,
      }
    }
  }
  </script>
  
  <style scoped>
  button {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 5px 5px 5px 5px;
  }
  div.group_but {
    width: 330px;
    height: 330px;
    margin: 20vh auto;
  }
  div.dice {
    width: 100px;
    height: 100px;
    margin: 2vh auto;
  }
 div.See_Score{
    width: 6.5vw;
    height: 10vh;
    margin: -50vh auto;
  }
  </style>