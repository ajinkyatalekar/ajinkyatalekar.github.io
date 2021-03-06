var realTime = false;
var running = false;

function toggleVisibility() {
    if (document.getElementById("hidden").style.visibility == "visible") {
        document.getElementById("hidden").style.visibility = "hidden";
        document.getElementById("hidden").style.display = "none";
    } else {
        document.getElementById("hidden").style.visibility = "visible";
        document.getElementById("hidden").style.display = "block";
    }
}

function toggleRealTime() {
    if (!running) {
        if (!realTime)
            realTime = true;
        else
            realTime = false;
    } else {
        if (!realTime)
            document.getElementById("toggleSwitch").checked = false;
        else
            document.getElementById("toggleSwitch").checked = true;
    }
}

function toggleRun() {
    if (running) {
        document.getElementById("button").innerHTML = "Run";
        running = false;
    } else {
        document.getElementById("button").innerHTML = "Stop";
        running = true;
        main();
    }
}

function findPos(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return [curtop];
    }
}

function main() {
    document.getElementById("output").style.visibility = "visible";

    n = parseInt(document.getElementById("size").value);
    if (n > 0 && n < 1401) {

        m = new Visualizer(n, 1);
        m.run();
    }

    else {
        document.getElementById("output").value = "Enter Valid Size";
        toggleRun();
    }

}

class Visualizer {
    canvas;
    c;
    n;
    t;
    canvasSize;
    siteSize;
    buffer;
    siteDrawn;
    p;
    sleep;

    constructor(n, t) {
        this.canvas = document.getElementById("canvas");
        this.c = this.canvas.getContext("2d");
        var x = Math.min(window.innerHeight*0.75, window.innerWidth*0.8)
        this.c.canvas.width = x;
        this.c.canvas.height = x;

        this.n = n;
        this.t = 1;
        this.canvasSize = this.canvas.clientWidth;
        this.siteSize = this.canvasSize/n;


        if (n>10) {
            this.sleep = 20000/(n*n*n);
            // this.sleep = 10000 / (0.59 * n * n);
        } else {
            this.sleep = 40;
        }

        // if (window.innerWidth >= 1240) {
        //     window.scroll(0,findPos(document.getElementById("canvas"))-15);
        // } else {
        //     window.scroll(0,findPos(document.getElementById("size"))-15);
        // }
            window.scroll(0,findPos(document.getElementById("size"))-15);

        if (n < 600) {
            this.buffer = 0.4;
        } else {
            this.buffer = 0.2;
        }
      
        this.siteDrawn = new Array;

        for (var i = 0; i < n*n; i++) {
            this.siteDrawn[i] = false;
        }

        if (realTime && n>200) {
            realTime=false;
            document.getElementById("toggleSwitch").checked = false;
        }
    }

    run() {
        for (var i = 0; i < this.t; i++) {
            this.c.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.p = new Percolation(n);
            
            if (realTime) {
                this.loop();
            }
                
            if (!realTime) {
                toggleRun();
                while (!this.p.isPercolating) {
                    this.loop();
                }

                for (var i = 0; i < this.n; i++) {
                    this.flow(0, i);
                }
            }

        }
    }

    loop() {
                var row = Math.floor(Math.random() * this.n);
                var col = Math.floor(Math.random() * this.n);

                if (this.p.open(row, col)) {
                    this.paintSite(row, col, "open");

                    if (realTime) {
                        this.flow(row, col);
                    }
                }

                var lastRow = row;
                var lastCol = col;

            document.getElementById("output").value = this.p.numberOfOpenSites() + " sites opened";

        if (running && realTime) {
            if (!this.p.isPercolating) {
                    setTimeout(()=> {
                        this.loop();
                    }, this.sleep)
            } else {
                toggleRun();
            }
        }

    }

    paintSite(row, col, type) {
        switch(type) {
            case "close": this.c.fillStyle = "black"; break;
            case "open": this.c.fillStyle = "white"; break;
            case "fill": this.c.fillStyle = "lightskyblue"; break;
        }

        this.c.fillRect(this.siteSize*col, this.siteSize*row, this.siteSize-this.buffer, this.siteSize-this.buffer);
    }

    flow(row, col) {
        if (row < 0 || row >= n || col < 0 || col >= n) {
            return;
        }

        if (this.p.isFull(row, col) && !this.isDrawn(row, col)) {
            this.paintSite(row, col, "fill");
            this.siteDrawn[row*this.n+col] = true;

            // Down
            if (row < this.n-1) {
                if (!this.isDrawn(row+1, col))
                    this.flow(row+1, col);
            }

            // Left
            if (col > 0) {
                if (!this.isDrawn(row, col-1))
                    this.flow(row, col-1);
            }

            // Right
            if (col < this.n-1) {
                if (!this.isDrawn(row, col+1))
                    this.flow(row, col+1);
            }
            
            // Up
            if (row > 0) {
                if (!this.isDrawn(row-1, col))
                    this.flow(row-1, col);
            }
        }
    }

    isDrawn(row, col) {
        if (this.siteDrawn[row*this.n+col]) {
            return true;
        }
        
        return false;
    }
}

class Percolation {
    n; // grid size
    numOpen;
    isOpen; // boolean array (n*n+1)
    isPercolating; // boolean
    uf; // union-find

    constructor(n) {
        this.n = n;
        this.numOpen = 0;
        this.isOpen = new Array;
        this.isPercolating = false;
        this.uf = new UnionFind(n*n+1);

        for (var i = 0; i < n*n; i++) {
            this.isOpen[i] = false;
        }

        // imaginary site at top -> [n*n] in array
        this.isOpen[n*n] = true;
    }

    open(row, col) {
        if (!this.isOpen[this.n*(row) + (col)]) {

            this.isOpen[this.n*(row) + (col)] = true;

            // left
            if (col > 0) {
                if (this.isOpen[row*this.n + col-1]) {
                    this.uf.union(this.n*(row) + (col), this.n*(row) + (col-1));
                }
            }

            // right
            if (col < this.n-1) {
                if (this.isOpen[row*this.n + col+1]) {
                    this.uf.union(this.n*(row) + (col), this.n*(row) + (col+1));
                }
            }

            // top
            if (row > 0) {
                if (this.isOpen[(row-1)*this.n + col]) {
                    this.uf.union(this.n*(row) + (col), this.n*(row-1) + (col));
                }
            } else {
                // Connects to imaginary obj on top of the highest layer
                this.uf.union(this.n*(row) + (col), this.n * this.n);
            }

            // bottom
            if (row < this.n-1) {
                if (this.isOpen[(row+1)*this.n + col]) {
                    this.uf.union(this.n*(row) + (col), this.n*(row+1) + (col));
                }
            } 

            if (this.isFull(row, col)) {
                this.percolationCheck();
            }

            this.numOpen++;
            return true;
        }

        return false;
    }

    isFull(row, col) {
        return(this.uf.find(row*this.n + col) == this.uf.find(this.n*this.n));
    }

    numberOfOpenSites() {
        return this.numOpen;
    }

    percolationCheck() {
        if (this.isOpen[this.n*(this.n-1)]) {
            if (this.isFull(this.n-1, 0)) {
                this.isPercolating = true;
                return true;
            }
        }

        for (var i = 1; i < this.n; i++) {
            if (this.isOpen[this.n*(this.n-1) + i] && !this.isOpen[this.n*(this.n-1) + (i-1)]) {
                if (this.isFull(this.n-1, i)) {
                    this.isPercolating = true;
                    return true;
                }
            }
        }
    }
}

class UnionFind {
    parent; // int array [n]
    size; // int array [n]

    constructor(n) {
        this.parent = new Array;
        this.size = new Array;

        for (var i = 0; i < n; i++) {
            this.parent[i] = i;
            this.size[i] = 0;
        }
    }

    find(p) {
        while (this.parent[p] != p) {
            this.parent[p] = this.parent[this.parent[p]];
            p = this.parent[p];
        }
        return p;
    }

    connected(p, q) {
        return (this.parent[p] == this.parent[q]);
    }

    union(p, q) {
        var rootP = this.find(p);
        var rootQ = this.find(q);

        if (this.size[rootP] > this.size[rootQ]) {
            this.parent[this.find(q)] = find(p);
            this.size[rootP] += this.size[rootQ];
        } else {
            this.parent[rootP] = rootQ;
            this.size[rootQ] += this.size[rootP];
        }
    }
}
