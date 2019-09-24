class Spot {
    constructor(_red, _green, _blue, _col, _row) {
        this.red = _red;
        this.green = _green;
        this.blue = _blue;
        this.correctLocation = [_col, _row]
    }

    isSelected;
    isFixed;
    static allSpots;

    static setup(w, h) {
        this.allSpots = [];
        for (let i = 0; i < w; i++) {
            this.allSpots[i] = new Array(h);
            for (let j = 0; j < h; j++) {
                this.allSpots[i][j] = new Spot(255, 0, 0, i, j);
                //fixing spots
                // this.allSpots[i][j].isFixed = false;
                if (i === 0 || i === width - 1) {
                    if (j > 0 && j < height - 1) {
                        this.allSpots[i][j].isFixed = false;
                        nonFixedSpots.push([i, j]);
                    } else {
                        this.allSpots[i][j].isFixed = true;
                    }
                } else if (j === 0 || j === height - 1) {
                    if (i > 0 && i < width - 1) {
                        this.allSpots[i][j].isFixed = false;
                        nonFixedSpots.push([i, j]);
                    } else {
                        this.allSpots[i][j].isFixed = true;
                    }
                } else {
                    this.allSpots[i][j].isFixed = true;
                }


            }
        }
        console.log(this.allSpots);
    }

    static fillSpotCol(arrLen, col) {
        for (let i = 1; i < arrLen - 1; i++) {
            let r = (this.allSpots[col][arrLen - 1].red - this.allSpots[col][0].red) * (i / arrLen) + this.allSpots[col][0].red;
            let g = (this.allSpots[col][arrLen - 1].green - this.allSpots[col][0].green) * (i / arrLen) + this.allSpots[col][0].green;
            let b = (this.allSpots[col][arrLen - 1].blue - this.allSpots[col][0].blue) * (i / arrLen) + this.allSpots[col][0].blue;
            // let r1 = this.allSpots[col][arrLen - 1].red ^ 2;
            // let r2 = this.allSpots[col][0].red ^ 2;
            // let r = Math.abs(Math.sqrt(
            //     r1  +  (r2 - r1) * (i / arrLen)));
            // let g1 = this.allSpots[col][arrLen - 1].green ^ 2;
            // let g2 = this.allSpots[col][0].green ^ 2;
            // let g = Math.abs(Math.sqrt(
            //     g1  +  (g2 - g1) * (i / arrLen)));
            // let b1 = this.allSpots[col][arrLen - 1].blue ^ 2;
            // let b2 = this.allSpots[col][0].blue ^ 2;
            // let b = Math.abs(Math.sqrt(
            //     b1  +  (b2 - b1) * (i / arrLen)));

            this.allSpots[col][i] = new Spot(r, g, b, col, i);
        }
    }

    static fillSpotRow(width, row) {
        for (let i = 1; i < width - 1; i++) {
            // let r1 = this.allSpots[width - 1][row].red ^ 2;
            // let r2 = this.allSpots[0][row].red ^ 2;
            // let r = Math.abs(Math.sqrt(
            //     (r1 + (r2 - r1)) * (i / width)));
            // let g1 = this.allSpots[width - 1][row].green ^ 2;
            // let g2 = this.allSpots[0][row].green ^ 2;
            // let g = Math.abs(Math.sqrt(
            //     (g1 + (g2 - g1)) * (i / width)));
            // let b1 = this.allSpots[width - 1][row].blue ^ 2;
            // let b2 = this.allSpots[0][row].blue ^ 2;
            // let b = Math.abs(Math.sqrt(
            //     (b1 + (b2 - b1)) * (i / width)));
            let r = (this.allSpots[width - 1][row].red - this.allSpots[0][row].red) * (i / width) + this.allSpots[0][row].red;
            let g = (this.allSpots[width - 1][row].green - this.allSpots[0][row].green) * (i / width) + this.allSpots[0][row].green;
            let b = (this.allSpots[width - 1][row].blue - this.allSpots[0][row].blue) * (i / width) + this.allSpots[0][row].blue;
            this.allSpots[i][row] = new Spot(r, g, b, i, row);
        }
    }
}

let width = 5;
let height = 5;
let nonFixedSpots = [];
Spot.setup(width, height);
let selectedSpots = [[-1, -1], [-1, -1]];

container = document.getElementById("container");
for (let i = 0; i < width; i++) {
    let newColumn = document.createElement("div");
    newColumn.style.display = "flex";
    newColumn.style.flexDirection = "column";
    newColumn.style.width = 100 / width + "%";

    for (let j = 0; j < height; j++) {
        let div = document.createElement("div");
        div.style.width = "100%";
        div.style.height = "150px";
        div.style.backgroundColor = "rgb(0,0,0)";
        div.id = "" + i.toString() + " " + j.toString() + "";
        if (Spot.allSpots[i][j].isFixed === false) {
            div.addEventListener('click',
                function () {
                    div.style.boxShadow = "inset 0 -5px  #000000";
                    let divCol = parseInt(div.id.toString().substr(0, div.id.toString().indexOf(' ')));
                    let divRow = parseInt(div.id.toString().substr(div.id.toString().indexOf(' ') + 1));
                    if (divCol === 0 || divCol === width - 1) {
                        if (divRow === 0 || divRow === height - 1) {
                            //shake / not selectable
                            // break;
                        }
                    }

                    if (selectedSpots[0][0] != -1) {
                        selectedSpots[1] = [divCol, divRow];
                    } else {
                        selectedSpots[0] = [divCol, divRow];
                    }
                    if (selectedSpots[0][0] != -1 && selectedSpots[1][0] != -1) {
                        //switch colors and redraw board
                        let tempSpot = Spot.allSpots[selectedSpots[0][0]][selectedSpots[0][1]];
                        Spot.allSpots[selectedSpots[0][0]][selectedSpots[0][1]] = Spot.allSpots[selectedSpots[1][0]][selectedSpots[1][1]];
                        Spot.allSpots[selectedSpots[1][0]][selectedSpots[1][1]] = tempSpot;
                        container.children[selectedSpots[0][0]].children[selectedSpots[0][1]].style.boxShadow = "none";
                        container.children[selectedSpots[1][0]].children[selectedSpots[1][1]].style.boxShadow = "none";
                        selectedSpots = [[-1, -1], [-1, -1]];
                        if (checkForFinished()) {
                            document.getElementById("subText").innerText = "You Won!";
                        }
                        updateBoardColors();
                    }
                }
            );

        } else {
            div.display = "flex";
            div.textAlign = "center";
            div.justifyContent = "center";
            div.alignItems = "center"
            let fixedDot = document.createElement("span");
            let fixedDotText = document.createTextNode(".");
            fixedDot.appendChild(fixedDotText);
            fixedDot.style.display = "flex";
            fixedDot.style.width = "100%";
            fixedDot.style.justifyContent = "center";
            div.appendChild(fixedDot);
            div.style.fontSize = "5em";

        }


        newColumn.appendChild(div);
    }

    container.appendChild(newColumn);
}

//setup each corner colors
let topLeftDiv = container.firstChild.firstChild;
let rgbTLDCol = [255, 0, 0];
topLeftDiv.style.backgroundColor = "rgb(" + rgbTLDCol[0] + "," + rgbTLDCol[1] + "," + rgbTLDCol[2] + ")";
Spot.allSpots[0][0].red = rgbTLDCol[0];
Spot.allSpots[0][0].green = rgbTLDCol[1];
Spot.allSpots[0][0].blue = rgbTLDCol[2];

let topRightDiv = container.lastChild.firstChild;
let rgbTRDCol = [0, 255, 180];
topRightDiv.style.backgroundColor = "rgb(" + rgbTRDCol[0] + "," + rgbTRDCol[1] + "," + rgbTRDCol[2] + ")";
Spot.allSpots[width - 1][0].red = rgbTRDCol[0];
Spot.allSpots[width - 1][0].green = rgbTRDCol[1];
Spot.allSpots[width - 1][0].blue = rgbTRDCol[2];

let bottomRightDiv = container.lastChild.lastChild;
let rgbBRDCol = [255, 255, 0];
bottomRightDiv.style.backgroundColor = "rgb(" + rgbBRDCol[0] + "," + rgbBRDCol[1] + "," + rgbBRDCol[2] + ")";
Spot.allSpots[width - 1][height - 1].red = rgbBRDCol[0];
Spot.allSpots[width - 1][height - 1].green = rgbBRDCol[1];
Spot.allSpots[width - 1][height - 1].blue = rgbBRDCol[2];

let bottomLeftDiv = container.firstChild.lastChild;
let rgbBLDCol = [130, 0, 130];
bottomLeftDiv.style.backgroundColor = "rgb(" + rgbBLDCol[0] + "," + rgbBLDCol[1] + "," + rgbBLDCol[2] + ")";
Spot.allSpots[0][height - 1].red = rgbBLDCol[0];
Spot.allSpots[0][height - 1].green = rgbBLDCol[1];
Spot.allSpots[0][height - 1].blue = rgbBLDCol[2];

Spot.fillSpotCol(height, 0);
Spot.fillSpotCol(height, width - 1);
for (let i = 0; i < height; i++) {
    Spot.fillSpotRow(width, i);
}

function updateBoardColors() {
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            container.children[i].children[j].style.backgroundColor = "    rgb(" + Spot.allSpots[i][j].red + "," + Spot.allSpots[i][j].green + "," + Spot.allSpots[i][j].blue + ")    ";
        }
    }
}

function shuffleBoard() {
    let numberOfSwaps = Math.round(nonFixedSpots.length / 2);
    for (let i = 0; i < numberOfSwaps; i++) {
        let spot1 = nonFixedSpots[Math.floor(Math.random() * nonFixedSpots.length)];
        let spot2 = nonFixedSpots[Math.floor(Math.random() * nonFixedSpots.length)];
        console.log(nonFixedSpots);
        let tempSpot = Spot.allSpots[spot1[0]][spot1[1]];
        Spot.allSpots[spot1[0]][spot1[1]] = Spot.allSpots[spot2[0]][spot2[1]];
        Spot.allSpots[spot2[0]][spot2[1]] = tempSpot;
    }
}

function checkForFinished() {
    for (let i = 0; i < container.children.length; i++) {
        for (let j = 0; j < container.children[i].children.length; j++) {
            let currentLocation = [i, j];
            console.log(Spot.allSpots[i][j].correctLocation);
            console.log(currentLocation);
            if (!checkForEqualArrays(Spot.allSpots[i][j].correctLocation, currentLocation)) {
                return false;
            }
        }
    }
    return true;
}

function checkForEqualArrays(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}

shuffleBoard();
updateBoardColors();




