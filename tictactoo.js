// set up 
let board = [0,0,0,0,0,0,0,0,0];
let next = 1 ;
let gState = 0 ; 

// conver number to character 
function int2char(i){
    return i==1 ? "x" :i==-1 ? "o" : "b";
}

function resetBoard(){
    board = [0,0,0,0,0,0,0,0,0];
    next = 1 ;
    gState = 0 ; 
    updatePage();
}

function checkState(){
    let patts = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    for(p of patts){
        const sum = p.reduce((a, i) => a + board[i], 0);
        
        if(sum==3){

            return 1;            // x won
        }
        else if (sum == -3){
            return -1;          // o won
        }
    }
    for(i of board){
        if (i==0) return 0;  // still in process
    }
    return 2;  // drow
        
}


function updatePage(){
    const e = document.getElementById("next");
    const b = document.getElementById("button");
    if (gState == 0) {
        e.innerHTML = `<h1>Next move : <img src='./static/${int2char(next)}.png' /></h1>`;
        b.innerHTML =``;
    }
    else if (gState == 1){
        e.innerHTML = `<h1> yay! <img src='./static/x.png' /> won!</h1>`;
        b.innerHTML = `<button onclick='resetBoard();'>Play again?</button>`;
    }
    else if (gState == -1){
        e.innerHTML = `<h1> yay! <img src='./static/o.png' /> won!</h1>`;
        b.innerHTML = `<button onclick='resetBoard();'>Play again?</button>`;
    }
    else {
        e.innerHTML = `<h1> That was a boring draw!</h1>`;
        b.innerHTML = `<button onclick='resetBoard();'>Play again?</button>`;
    }
    
    for(const i in board){
        const e = document.getElementById("td"+i);
        e.innerHTML = `<img src='./static/${int2char(board[i])}.png' onclick="updateEntry(${i});"/>`;
    }
}

function updateEntry(x){
    if (gState == 0 && board[x]==0){
        board[x]=next;
        next = -next ;
        gState = checkState();
    }
    updatePage()
}

resetBoard();