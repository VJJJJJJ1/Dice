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
                let k = parseInt(Math.random() * 7);
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
      <div class="Button_Group">

        <button id = "A0" @click="putNum(0, MapA[0].idx)">{{MapA[0].num}}</button>
        <button id = "A1" @click="putNum(0, MapA[1].idx)">{{MapA[1].num}}</button>
        <button id = "A2" @click="putNum(0, MapA[2].idx)">{{MapA[2].num}}</button>
        <button id = "A3" @click="putNum(0, MapA[3].idx)">{{MapA[3].num}}</button>
        <button id = "A4" @click="putNum(0, MapA[4].idx)">{{MapA[4].num}}</button>
        <button id = "A5" @click="putNum(0, MapA[5].idx)">{{MapA[5].num}}</button>
        <button id = "A6" @click="putNum(0, MapA[6].idx)">{{MapA[6].num}}</button>
        <button id = "A7" @click="putNum(0, MapA[7].idx)">{{MapA[7].num}}</button>
        <button id = "A8" @click="putNum(0, MapA[8].idx)">{{MapA[8].num}}</button>

      </div>
    </div>

    <div class="col-2">
      <div class="dice">
        <button @click="Roll_Dice">{{dice_num}}</button>
      </div>
      <div class="alert alert-danger " role="alert" align = "center"> 
        {{situation}}
      </div>

      <div class="Model" align = "center">
          <button @click="model">切换模式</button>
      </div>

      <div class="Model_msg">
        <div class="alert alert-danger" role="alert" align = "center" > {{ model_msg }}</div>
      </div>
      
      

    </div>


    <div class="col-5">
      <div class="Button_Group">
        <button id = "B0" @click="putNum(1, MapB[0].idx)">{{MapB[0].num}}</button>
        <button id = "B1" @click="putNum(1, MapB[1].idx)">{{MapB[1].num}}</button>
        <button id = "B2" @click="putNum(1, MapB[2].idx)">{{MapB[2].num}}</button>
        <button id = "B3" @click="putNum(1, MapB[3].idx)">{{MapB[3].num}}</button>
        <button id = "B4" @click="putNum(1, MapB[4].idx)">{{MapB[4].num}}</button>
        <button id = "B5" @click="putNum(1, MapB[5].idx)">{{MapB[5].num}}</button>
        <button id = "B6" @click="putNum(1, MapB[6].idx)">{{MapB[6].num}}</button>
        <button id = "B7" @click="putNum(1, MapB[7].idx)">{{MapB[7].num}}</button>
        <button id = "B8" @click="putNum(1, MapB[8].idx)">{{MapB[8].num}}</button>
      </div>
    </div>

      <div class="See_Score">
          <button @click="see_score">查看得分</button>
      </div>

      <div class="Restart">
          <button @click="restart">再玩一把</button>
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
    let situation;
    let has_roll = 0;
    let model_msg;
    let model_flag;  //0表示本地对战，1表示人机对战
  //   const store = useStore();

  const model = () =>{
    // console.log(model_msg);
    // console.log(model_flag);
    if(model_flag === 0){
      model_flag = 1;
      model_msg.value = '现在是人机对战';
    }
    else{
      model_flag = 0;
      model_msg.value = '现在是本地对战';
    }
  }

  const see_score = () =>{
      if(!judge_full()){
          alert("游戏还没结束！");
          return  ;
      }
      calculate_score();
      
  }

    const init = () => {
      // MapA = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      // MapB = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      
      MapA = ref([{ idx: 0, num: 0, id: "A0" }, { idx: 1, num: 0, id: "A1" }, { idx: 2, num: 0, id: "A2" }, { idx: 3, num: 0, id: "A3" }, { idx: 4, num: 0, id: "A4" }, { idx: 5, num: 0, id: "A5" }, { idx: 6, num: 0, id: "A6" }, { idx: 7, num: 0, id: "A7" }, { idx: 8, num: 0, id: "A8" }]);
      MapB = ref([{ idx: 0, num: 0, id: "B0" }, { idx: 1, num: 0, id: "B1" }, { idx: 2, num: 0, id: "B2" }, { idx: 3, num: 0, id: "B3" }, { idx: 4, num: 0, id: "B4" }, { idx: 5, num: 0, id: "B5" }, { idx: 6, num: 0, id: "B6" }, { idx: 7, num: 0, id: "B7" }, { idx: 8, num: 0, id: "B8" }]);
      dice_num = ref("投掷");
      step = ref(0);
      situation = ref('Round A');
      model_msg = ref('现在是本地对战');
      model_flag = 0;
    }
    init();

    const Roll_Dice = () => {
      if(judge_full()){
        alert('对局已结束！');
        return ;
      }


      // 生成随机数
      if(has_roll === 0){
          for(let i = 0;i < 10000; i ++){
              let k = parseInt(Math.random(0, 1) * 7);
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


    const set_num = (f, idx, number) => {
      let msg = 'success';
      if (step.value === 0 && f === 0) {
        if (MapA.value[idx].num === 0) {
          has_roll = 0;
          MapA.value[idx].num = number;
          judge(f, idx, number);
          step.value = 1;
          return msg;
        }
         else msg = '只能在空区域置放骰子';
      } 
      else if (step.value === 0 && f === 1) msg = "请操作左侧九宫格";
      
      if (step.value === 1 && f === 1) {
          if (MapB.value[idx].num === 0) {
              has_roll = 0;
              MapB.value[idx].num = number;
              judge(f, idx, number);
              step.value = 0;
          }
          else msg = '只能在空区域置放骰子';
      } 
      else if (step.value === 1 && f === 0){
        msg = "请操作右侧侧九宫格";
      }
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
      situation.value = "游戏结束！";
      
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
    const judge = (f, idx, num) => {
      if (f === 0) {
        for (let i = parseInt(idx / 3) * 3; i < parseInt(idx / 3) * 3 + 3; i++) {
          if (MapB.value[i].num === num) MapB.value[i].num = 0;
        }
      } 
      else {
        for (let i = parseInt(idx / 3) * 3; i < parseInt(idx / 3) * 3 + 3; i++) {
          if (MapA.value[i].num === num) MapA.value[i].num = 0;
        }
      }
    }


    const AiputNum = () =>{
      for(let i = 0; i < 10000; i ++){
        let randomPos = parseInt(Math.random(0, 1) * 9);
        if(MapB.value[randomPos].num === 0){
          MapB.value[randomPos].num = dice_num.value;
          judge(1, randomPos, dice_num.value);

          console.log("num" + dice_num.value);
          console.log("pos" + randomPos);


          dice_num.value = "投掷";
          if(situation.value === 'Round A') situation.value = 'Round B';
          else situation.value = 'Round A';
          has_roll = 0;
          step.value = 0;
          if(judge_full()){
              calculate_score();
              return;
          }
          break;
        }
      }
      
    }

    const putNum = (f, idx) => {
      if (dice_num.value === '投掷') {
        alert('请先投掷骰子');
        return;
      }
      let res = set_num(f, idx, dice_num.value)
      if (res != 'success') alert(res);
      else {
          dice_num.value = '投掷';
          if(situation.value === 'Round A') situation.value = 'Round B';
          else situation.value = 'Round A';
          if(judge_full()){
              calculate_score();
              return;
          }
      }
      if(model_flag === 1 && step.value === 1){
        // for(let i = 0; i < 10000; i ++){
        //   let k = parseInt(Math.random(0, 1) * 7);
        //   if(k !== 0){
        //     dice_num.value = k;
        //     break;
        //   } 
        // }
       setTimeout(() => {
        Roll_Dice();
       }, 500);
        setTimeout(() => {
          AiputNum();
        }, 1000);
      }
    }


    const restart = () =>{
      for(let i = 0; i < 9; i ++){
        MapA.value[i].num = 0;
        MapB.value[i].num = 0;
      }
      situation.value = 'Round A'
      dice_num.value = "投掷";
      has_roll = 0;
      step.value = 0;
    }
    return {
      MapA,
      MapB,
      dice_num,
      step,
      situation,
      putNum,
      Roll_Dice,
      see_score,
      restart,
      model_msg,
      model_flag,
      model,
    }
  }
}
</script>

<style scoped>
button {
  width: 100px;
  height: 100px;
  
  background: #202938;
  border-radius: 50%;
  margin: 5px 5px 5px 5px;
  color: white;
  
}
div.Button_Group {
  width: 330px;
  height: 330px;
  margin: 20vh auto;
  font-size:30px;
}
div.dice {
  width: 100px;
  height: 100px;
  margin: 2vh auto;
}
div.See_Score{
  width: 100px;
  height: 100px;
  margin: -640px auto;
  /* width: 6.5vw;
  height: 10vh;
  margin: -50vh auto; */
}
div.Restart{

  font-weight:900;
  width: 115px;
  height: 100px;
  margin: -640px auto;
  /* width: 20vw;
  height: 20vh;
  margin: -30vh auto; */
}
div.Model_msg{
  margin-top: 15px;
}
</style>