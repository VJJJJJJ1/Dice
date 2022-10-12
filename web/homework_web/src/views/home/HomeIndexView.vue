<template>
    <div>
        <div class="welcome">
               welcome!
       </div>

    <div class="col-5">
        <div class="rules">
            <div class="Title" style="text-align: center; font-size: 40px; color: #395374;">游戏规则</div>
            <div class="Content" style = "font-size: 25px; color: mistyrose; font-weight: 500;">
                &nbsp;&nbsp;&nbsp;&nbsp;点击投掷然后把骰子放在你想放置的位置上，当其中一方的位置被填满游戏结束。
                但是你可以用自己的骰子消掉对方的骰子哦，只要你摇到的骰子和对方棋盘上的任意一个数值一样，放在和它对应的同一列上就可以消去它。<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;分数结算：把所有骰子数加起来，注意如果同一列有两个数值一样的骰子那么这两个骰子分数可以乘2，有三个一样即乘3，得分高者获胜。
    
            </div>
        </div>


        <div class="BeginGame" >
            <router-link  type="button" class="btn btn-warning btn-lg" :to="{name:'pk_index'}">进入游戏</router-link>
            <!-- <buttont type="button" class="btn btn-outline-secondary" onclick="window.location.href = 'http://localhost:8080/pk/'" >进入游戏</buttont> -->
        </div>


    </div>
   
    

    </div>
    
       

    
    

    <!-- <div class="col-10" align = "center">
        <div class = "dice"></div>
    </div> -->
    


</template>

<script>
// import ContenFiled from '../../components/ContentFiled.vue'
export default{
    components:{
    // ContenFiled
}
}
</script>

<style scoped>
body{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* .dice{
    background-image: url("@/assets/images/dice.png");
    width: 100px;
    height: 100px;
    background-position: 0% 50%;
    border-radius:20%;
    animation: .2s steps(6, jump-none) random infinite;
    margin-top: -20vh;
} */

@keyframes random{
    to{
        background-position: 100% 50%;
    }
}

div.welcome{
    margin-top: 20px;
    text-align: center;
    font-size: 100px;
    font-weight: bold;
    color: #fda7a6;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
div.rules{
    border: 0.5rem outset pink;
    border-radius: 12px;
    font: bold 1rem sans-serif;
    margin: 2rem;
    padding: 1rem;
    outline-offset: 0.5rem;
    margin-left: 100px;
  }
div.BeginGame{
    margin-left: 45%;
}

</style>