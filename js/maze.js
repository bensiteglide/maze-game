let mazeEl = document.querySelector(".maze");
let context = mazeEl.getContext("2d");
let current;
class Maze {
    constructor(size, rows, cols, bg, fg) {
        this.size = size;
        this.cols = cols;
        this.rows = rows;
        this.fg = fg;
        this.bg = bg
        this.grid = [];
        this.stack = [];
    }

    setup() {
        for (let r = 0; r < this.rows; r++) {
            let row = [];
            for (let c = 0; c < this.cols; c++) {
                let newCell = new Cell(r, c, this.grid, this.size);
                if(r == this.rows - 1 && c == this.cols -1) newCell.final = true;
                row.push(newCell);
            }
            this.grid.push(row);
        }
        current = this.grid[0][0];    
    }

    generateMaze() {        
        mazeEl.width = this.size;
        mazeEl.height = this.size;
        mazeEl.style.background = this.bg;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let grid = this.grid;
                grid[r][c].generateCell(this.size, this.rows, this.cols, this.fg, this.bg);
            }
        }

        let nextCell = current.checkSurroundingCells();
        if (nextCell) {
            nextCell.visited = true;
            if(!current.final) current.colorCell(this.cols,"blue");
            this.stack.push(current);          
            current.remove(current, nextCell);
            current = nextCell;
        } else if (this.stack.length > 0) {
            let cell = this.stack.pop();
            current = cell;
            current.colorCell(this.cols,"blue");      
        }
        if (this.stack.length === 0) {
            document.addEventListener('keydown', play);
            return;
        }
        window.requestAnimationFrame(() => {
            this.generateMaze();
        });
    }

}

class Cell {
    constructor(row, col, parent, pSize) {
        this.visited = false;
        this.row = row;
        this.col = col;
        this.parent = parent;
        this.pSize = pSize;
        this.final = false;
        this.walls = {
            topWall: true,
            rightWall: true,
            bottomWall: true,
            leftWall: true,
        };

    }

    checkSurroundingCells() {
        let grid = this.parent;
        let row = this.row;
        let col = this.col;
        let neighbours = [];

        if (row !== 0) {
            let t = grid[row - 1][col];
            if (!t.visited) neighbours.push(t)
        } else {
            let t = undefined;
        }
        if (col !== grid.length - 1) {
            let r = grid[row][col + 1];
            if (!r.visited) neighbours.push(r)
        } else {
            let r = undefined;
        }
        if (row !== grid.length - 1) {
            let b = grid[row + 1][col];
            if (!b.visited) neighbours.push(b)
        } else {
            let b = undefined;
        }
        if (col !== 0) {
            let l = grid[row][col - 1];
            if (!l.visited) neighbours.push(l)
        } else {
            let l = undefined;
        }

        if (neighbours.length > 0) {
            let random = Math.floor(Math.random() * neighbours.length);
            return neighbours[random];
        } else {
            return undefined;
        }
    }

    drawWall(mt, lt) {
        context.beginPath();
        context.moveTo(mt[0], mt[1]);
        context.lineTo(lt[0], lt[1]);
        context.stroke();
    }

    colorCell(cols,color) {
        let x = (this.col * this.pSize) / cols + 1;
        let y = (this.row * this.pSize) / cols + 1;
        context.fillStyle = color;       
        context.fillRect(x, y, this.pSize / cols - 3, this.pSize / cols - 3);
    }

    remove(i, z) {
        let x = i.col - z.col;
        let y = i.row - z.row;
        if (x === 1) {
            i.walls.leftWall = false;
            z.walls.rightWall = false;
        } else if (x === -1) {
            i.walls.rightWall = false;
            z.walls.leftWall = false;
        }
        if (y === 1) {
            i.walls.topWall = false;
            z.walls.bottomWall = false;
        } else if (y === -1) {
            i.walls.bottomWall = false;
            z.walls.topWall = false;
        }
    }

    generateCell(size, rows, cols, fg, bg) {
        let x = (this.col * size) / cols;
        let y = (this.row * size) / rows;
        context.strokeStyle = fg;
        context.fillStyle = bg;
        context.lineWidth = 2;  
        if (this.final) {
            context.fillStyle = "gold";
            context.fillRect(x + 1, y + 1, size / cols - 2, size / rows - 2);
          }
        if (this.walls.topWall) {
            let moveTo = [x, y];
            let lineTo = [x + size / cols, y];
            this.drawWall(moveTo, lineTo);
        }
        if (this.walls.rightWall) {
            let moveTo = [x + size / cols, y];
            let lineTo = [x + size / cols, y + size / rows];
            this.drawWall(moveTo, lineTo);
        }
        if (this.walls.bottomWall) {
            let moveTo = [x, y + size / rows];
            let lineTo = [x + size / cols, y + size / rows];
            this.drawWall(moveTo, lineTo);
        }
        if (this.walls.leftWall) {
            let moveTo = [x, y];
            let lineTo = [x, y + size / rows];
            this.drawWall(moveTo, lineTo);
        }
        if (this.visited) context.fillRect(x + 1, y + 1, size / cols - 2, size / rows - 2);


    }
}
