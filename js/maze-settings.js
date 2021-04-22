let M;

function createMaze() {
    let size = document.querySelector("#sg-1").value;
    let rows = document.querySelector("#sg-2").value;
    let cols = document.querySelector("#sg-3").value;
    let bg = document.querySelector("#form_field_1_4").value;
    let fg = document.querySelector("#form_field_1_5").value;
    var b = document.querySelector(".sg-hero");
    b.style.display = "none";
    M = new Maze(size, rows, cols, bg, fg);
    M.setup();
    M.generateMaze();     
}

function play(event) {    
    let key = event.key;
    let row = current.row;
    let col = current.col;
    let fin = document.querySelector(".final");
    if(key == "ArrowUp" && !current.walls.topWall) {      
        let next = M.grid[row - 1][col];
        current = next;
        M.generateMaze();
        current.colorCell(M.cols,'blue');
        if(current.final == true) {
            mazeEl.style.display = "none";
            fin.style.display = "block";
        }
    } else if (key == "ArrowRight" && !current.walls.rightWall){
        let next = M.grid[row][col + 1];
        current = next;
        M.generateMaze();
        current.colorCell(M.cols,'blue');
        if(current.final == true) {
            mazeEl.style.display = "none";
            fin.style.display = "block";
        }
    } else if (key == "ArrowDown" && !current.walls.bottomWall){
        let next = M.grid[row + 1][col];
        current = next;
        M.generateMaze();
        current.colorCell(M.cols,'blue');
        if(current.final == true) {
            mazeEl.style.display = "none";
            fin.style.display = "block";
        }
    } else if (key == "ArrowLeft" && !current.walls.leftWall){
        let next = M.grid[row][col - 1];
        current = next;
        M.generateMaze();
        current.colorCell(M.cols,'blue');      
        if(current.final == true) {
            mazeEl.style.display = "none";
            fin.style.display = "block";
        }
    }
}
 
  

  
  