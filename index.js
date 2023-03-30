class graph{
    constructor(){
        this.adj=new Array(101).fill(null).map(()=>[]);
    }
    addEdge(a,b){
        this.adj[a].push(b);
    }
    neighbours(u){
        return this.adj[u];
    }
}
let board=new graph();
// for(let i=1;i<=100;i++){
//    board.addNode(i);
// }
for(let i=1;i<=100;i++){
    if(i<=94){
        board.addEdge(i,i+1);
        board.addEdge(i,i+2);
        board.addEdge(i,i+3);
        board.addEdge(i,i+4);
        board.addEdge(i,i+5);
        board.addEdge(i,i+6);
    }
    else{
        let j=i+1;
        while(j<=100){
            board.addEdge(i,j);
            j++;
        }
    }
}
//console.log(board);
// for(let i=1;i<=100;i++){
//     console.log(board[i]);
// }
var ele=document.getElementById("grid");
let cnt=100;
let mod=0;
for(let i=1;i<=10;i++){
    var row=document.createElement("div");
    var s="row-"+i; 
    //console.log(s);
    // row.classList.add("box");
    row.classList.add("row");
    row.classList.add(s);
    for(let j=1;j<=10;j++){
        var col=document.createElement("button");
        col.style.display="block";        
        col.innerHTML=cnt;
        var a="row-"+i+"col-"+j;
        //console.log(a);
        col.id=cnt;
        col.classList.add(cnt);
        col.classList.add("box");
        col.classList.add("col");
        col.classList.add(a);
        row.appendChild(col);
        if(mod%2==0){
            cnt--;
        }
        else{
            cnt++;
        }
    }
    if(i%2==1){
        cnt=100-10*(i+1)+1;
    }
    else{
        cnt=100-10*(i);
    }
    mod++;
    ele.appendChild(row);
}
//console.log(ele);

const snakeCheckBox=document.getElementById("snake-check-box");
const laddersCheckBox=document.getElementById("ladders-check-box");

let snakechecked=false;
let ladderchecked=false;

snakeCheckBox.addEventListener('click',function(){
    snakechecked=this.checked;
    ladderchecked=!this.checked;
})

laddersCheckBox.addEventListener('click',function(){
    snakechecked=!this.checked;
    ladderchecked=this.checked;
})

let selectedCells=[];

let snakecount=0;
let laddercount=0;

const boardCells = document.querySelectorAll(".box");
//console.log(boardCells);
boardCells.forEach(cell=>{
    cell.addEventListener('click',function(){
        if(snakechecked==true && ladderchecked==false){
            snakecount++;
            selectedCells.push(this);
            if(selectedCells.length===2){
                //console.log(selectedCells);
                const[cell1,cell2]=selectedCells;
                let k="S"+(snakecount/2)+"head";
                let l="S"+(snakecount/2)+"tail";
                cell1.style.justifyText="center";
                cell1.style.backgroundColor="red";
                cell1.style.backgroundImage="linear-gradient(to bottom right,rgba(255,0,0,1),rgba(255,0,0,0))";
                cell2.style.backgroundColor="green";
                cell2.style.backgroundImage="linear-gradient(to bottom right,rgba(0,128,0,1),rgba(0,128,0,0))";
                const cell1id=cell1.id;
                const cell2id=cell2.id;
                //console.log(board.neighbours[cell1id]);
                //board.neighbours[cell1id]=[cell2id];
                board.adj[cell1id]=[];
                board.addEdge(Number(cell1id),Number(cell2id));
                console.log(board);
                //console.log(board.neighbours[cell1id]);
                cell1.innerHTML+=`<p>${k}</p>`;
                cell2.innerHTML+=`<p>${l}</p>`;
                selectedCells=[];
            }
        }else{
            laddercount++;
            selectedCells.push(this);
            if(selectedCells.length===2){
                const[cell1,cell2]=selectedCells;
                let m="S"+(laddercount/2)+"begin";
                let n="S"+(laddercount/2)+"end";
                cell1.style.backgroundColor="burlywood";
                cell1.style.backgroundImage="linear-gradient(to bottom right,rgba(222,184,135,1),rgba(222,184,135,0))";
                cell2.style.backgroundColor="brown";
                cell2.style.backgroundImage="linear-gradient(to bottom right,rgba(165,42,42,1),rgba(165,42,42,0))";
                const cell1id=cell1.id;
                const cell2id=cell2.id;
                //board.neighbours[cell1id]=[];
                board.adj[cell1id]=[];
                board.addEdge(Number(cell1id),Number(cell2id));
                cell1.innerHTML+=`<p>${m}</p>`;
                cell2.innerHTML+=`<p>${n}</p>`;
                selectedCells=[];
            }
        }
    })
})
let counter=0;
let current=1;
var path=[];
//console.log(board);
Submit=document.getElementById("submit");
Submit.addEventListener('click',function(){
    const queue=[1];
    const prev=new Array(101).fill(-1);
    while (queue.length!=0){
        const u=queue.shift();
        if(u==100){
            break;
        }
        //console.log(board[u]);
        const n=board.neighbours(u);
        //console.log(n);
        for(let i=0;i<n.length;i++){
            const v=n[i];
            if(prev[v]==-1){
                prev[v]=u;
                queue.push(v);
            }
        }
    }
    //console.log(prev);
    
    let u=100;
    while(u!=-1){
        path.push(u);
        u=prev[u];
    }
    console.log("path");
    console.log(path);
    path.reverse();
    print(path);
    return;
})
// const d2=document.getElementById("dice2");
// d2.style.display="none";
         
// const d3=document.getElementById("dice3");
// d3.style.display="none";
         
// const d4=document.getElementById("dice4");
// d4.style.display="none";

// const d5=document.getElementById("dice5");
// d5.style.display="none";
         
// const d6=document.getElementById("dice6");
// d6.style.display="none";

var speed=5050;
var increment=1;

const dice=document.querySelector('.dice');

const rollDice=steps=>{
    dice.style.animation='rolling 4s';
    // console.log(typeof(steps));
    setTimeout(() => {
        switch(steps){
            case 1:
                dice.style.transform='rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                dice.style.transform='rotateX(180deg) rotateY(0deg)';
                break;
            
            case 2:
                dice.style.transform='rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                dice.style.transform='rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                dice.style.transform='rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                dice.style.transform='rotateX(0deg) rotateY(-90deg)';
                break;
            
            default:
                break;
        }
        dice.style.animation='none';
    }, 4000);
}

function print(path){
    path.forEach(cell=>{
        var interval=setTimeout(function(){
        counter++; 
        // const b=document.getElementById(cell);
        // b.style.backgroundColor="pink";
        // b.style.backgroundImage="linear-gradient(to bottom right,rgba(255,192,203,1),rgba(255,192,203,0))";
        if(counter>1){
         let steps=cell-current;
         current=cell;
         
         if(steps<=6 && steps>=1){
         let helper="dice"+steps;
         //console.log(steps);
        rollDice(steps);
        //  const d1=document.getElementById("dice1");
        //  d1.style.display="none";

        //  const d2=document.getElementById("dice2");
        //  d2.style.display="none";
         
        //  const d3=document.getElementById("dice3");
        //  d3.style.display="none";
         
        //  const d4=document.getElementById("dice4");
        //  d4.style.display="none";

        //  const d5=document.getElementById("dice5");
        //  d5.style.display="none";
         
        //  const d6=document.getElementById("dice6");
        //  d6.style.display="none";

        //  const d=document.getElementById(helper);
        //  d.style.display="flex";
        
         }
        }
        const b=document.getElementById(cell);
        b.style.backgroundColor="pink";
        b.style.backgroundImage="linear-gradient(to bottom right,rgba(255,192,203,1),rgba(255,192,203,0))";
      },speed*increment);
      increment=increment+1;
    });
}

//console.log("hello");
//console.log(path);