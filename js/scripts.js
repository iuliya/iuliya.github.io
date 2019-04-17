function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer'){
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    else if (navigator.appName == 'Netscape'){
        var ua = navigator.userAgent;
        var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
    }
    return rv;
}

function placeholderForIE() {
    if(getInternetExplorerVersion()!==-1){
        var input = document.querySelectorAll(".matrix-cell");
        for(var i=0; i<input.length; i++){
            var ph = input[i].getAttribute("placeholder");
            input[i].setAttribute("value", ph);
            input[i].setAttribute("style", "color: #ccc");
            if (input[i].getAttribute("disabled")){
                input[i].setAttribute("style", "background-color: rgb(235, 235, 228)");
            }

        var cp = document.querySelector(".control-panel");

        input[i].addEventListener("focus", function(){
            this.setAttribute("value", "");
            this.setAttribute("style", "color: #404040");
            cp.style.backgroundColor = "#5199db";
        });

        input[i].addEventListener("blur",  function(){
            cp.style.backgroundColor = "";
            ph = this.getAttribute("placeholder");
            if (this.value == "") {
                this.setAttribute("value", ph);
                this.setAttribute("style", "color: #ccc");
            }
        });

        input[i].addEventListener("change",  function(){
            this.setAttribute("style", "color: #404040");
        });
        }
    }
}
window.onload = placeholderForIE;

var multiples = "AB"; //порядок умножения матриц
var errorCells = 0; //есть ли ячейки с некорректными значениями

function handlerChangeMatrix() {
    var A = document.querySelector(".matrixA");
    var B = document.querySelector(".matrixB");
    var letter = document.querySelectorAll(".letter");
    if (!B.classList.toggle("second-multiple")) {
        changeMatrix(A, B);
        multiples = "BA";
        A.classList.add("second-multiple");
        letter[0].classList.toggle("second-matrix");
        letter[0].classList.toggle("first-matrix");
        letter[1].classList.toggle("first-matrix");
        letter[1].classList.toggle("second-matrix");
    } else {
        changeMatrix(B, A);
        multiples = "AB";
        A.classList.remove("second-multiple");
        letter[0].classList.toggle("first-matrix");
        letter[0].classList.toggle("second-matrix");
        letter[1].classList.toggle("second-matrix");
        letter[1].classList.toggle("first-matrix");
      }
    canMultiple(multiples);
}

function changeMatrix(A, B) {
    var board = document.querySelector(".board");
    board.removeChild(A);
    board.appendChild(A);
}

function getSize(matrix) {
    var rows = matrix.querySelectorAll(".matrix-row").length;
    var columns = matrix.querySelectorAll(".matrix-cell").length/rows;
    return {rows: rows, columns: columns}
}

function canMultiple(multiples) {
    var first = document.querySelector(".matrix" + multiples.charAt(0));
    var second = document.querySelector(".matrix" + multiples.charAt(1));
    var error = document.querySelector(".error");
    if (getSize(first).columns == getSize(second).rows) {
        recreateMatrixC(getSize(first).rows, getSize(second).columns);
        error.style.display = "none";
        document.querySelector(".control-panel").classList.remove("is_error");
    } else {
        error.querySelector(".first").innerHTML = multiples.charAt(0);
        error.querySelector(".second").innerHTML = multiples.charAt(1);
        error.style.display = "block";
        document.querySelector(".control-panel").classList.add("is_error");
    }
}

function recreateMatrixC(n, m) {
    var board = document.querySelector(".board");
    var row, cell;
    var newMatrixC = document.createElement("div");
    newMatrixC.className  = "matrix matrixC";
    for (var i = 1; i <= n ; i++){
        row = createRowWithCells("c", i, m);
        newMatrixC.appendChild(row);
    }
    var oldMatrixC = board.querySelector(".matrixC");
    board.replaceChild(newMatrixC, oldMatrixC);
    placeholderForIE();
}

function createRowWithCells (str, n, m) {
    var row = document.createElement('div');
    row.className  = "matrix-row";
    for(var i = 1; i <= m; i++) {
        row.appendChild(createCell(str, n, i));
    }
    return row;
}

function createCell (str, x, y) {
    var cell = document.createElement("input");
    cell.setAttribute("type", "text");
    cell.setAttribute("placeholder", str + x + "," + y);
    cell.className  = "matrix-cell";
    if (str == "c") cell.setAttribute("disabled", "disabled");
    return cell;
}

var btnAddRow = document.querySelector(".btn-add_row");
var btnRemoveRow = document.querySelector(".btn-del_row");
var btnAddColumn = document.querySelector(".btn-add_column");
var btnRemoveColumn = document.querySelector(".btn-del_column");
var btnResult = document.querySelector(".btn-result");
var btnReset = document.querySelector(".btn-clear_matrix");
var btnChangeMatrix = document.querySelector(".btn-change_matrix");
var radioButton = document.querySelector("choice_matrix");


btnAddRow.onclick = handlerAddOrRemoveElementsMatrix;
btnRemoveRow.onclick = handlerAddOrRemoveElementsMatrix;
btnAddColumn.onclick = handlerAddOrRemoveElementsMatrix;
btnRemoveColumn.onclick =handlerAddOrRemoveElementsMatrix;

function handlerAddOrRemoveElementsMatrix() {
    var radioButton = document.querySelector("[name=choice_matrix]:checked");
    if (this.classList.contains("btn-add_row")) addRow(radioButton.value);
    if (this.classList.contains("btn-del_row")) removeRow(radioButton.value);
    if (this.classList.contains("btn-add_column")) addColumn(radioButton.value);
    if (this.classList.contains("btn-del_column")) removeColumn(radioButton.value);
    canMultiple(multiples);
}

function addRow(value) {
    var matrix = document.querySelector(".matrix" + value);
    var n = matrix.querySelectorAll(".matrix-row").length;
    var m = matrix.querySelectorAll(".matrix-cell").length/n;
    if (n < 10) {
        row = createRowWithCells(value.toLowerCase(), n+1, m);
        matrix.appendChild(row);
    }
    placeholderForIE();
}

function removeRow(value) {
    var matrix = document.querySelector(".matrix" + value);
    var n = matrix.querySelectorAll(".matrix-row").length;
    if (n > 2) matrix.removeChild(matrix.children[n]);
}

function addColumn(value) {
    var matrix = document.querySelector(".matrix" + value);
    var rows = matrix.querySelectorAll(".matrix-row");
    var n = rows.length;
    var m = matrix.querySelectorAll(".matrix-cell").length/n;
    if (m < 10) {
        for(var i = 0; i < n; i++) {
            rows[i].appendChild(createCell(value.toLowerCase(), i+1, m+1));
        }
    }
    placeholderForIE();
}

function removeColumn(value) {
    var matrix = document.querySelector(".matrix" + value);
    var rows = matrix.querySelectorAll(".matrix-row");
    var n = rows.length;
    var m = matrix.querySelectorAll(".matrix-cell").length/n;
    if (m > 2) {
        for(var i = 0; i < n; i++) {
            rows[i].removeChild(rows[i].querySelectorAll(".matrix-cell")[m-1]);
        }
    }
}

function multipleMatrix() {
    if (errorCells == 0) {
    var first = document.querySelector(".matrix" + multiples.charAt(0));
    var second = document.querySelector(".matrix" + multiples.charAt(1));
    var A = first.querySelectorAll("input");
    var B = second.querySelectorAll("input");
    var C = document.querySelectorAll(".matrixC input");
    var  sum = 0;
        for(var i = 0; i < getSize(first).rows; i++){
            var z = 0;
            for(var j = 0; j < getSize(second).columns; j++) {
                for(var k = 0; k < getSize(first).columns; k++) {
                    sum = sum + Number(A[i*getSize(first).columns+k].value)*Number(B[k*getSize(second).columns+j].value);
                }z++;
                C[j+getSize(second).columns*i].value = sum;
                sum = 0;
            }
        }
    }
}

var values = document.querySelectorAll(".matrix-cell");
    for (var i =0; i < values.length; i++) {
        var cp = document.querySelector(".control-panel");

        values[i].onfocus = function() {
            cp.style.backgroundColor = "#5199db";
        }

        values[i].onblur = function() {
            cp.style.backgroundColor = "";
            if ((this.value > 10) ||(isNaN(this.value))){
                this.value = "";
                this.classList.add("is_error");
                errorCells++;

                if (getInternetExplorerVersion()!==-1) {
                    ph = this.getAttribute("placeholder");
                    this.setAttribute("value", ph);
                    this.setAttribute("style", "color: #ccc");
                }
            } else if  (this.classList.contains("is_error")) {
                this.classList.remove("is_error");
                errorCells--;
            }
    }
}

function tabFocus() {if (event.keyCode == 9) this.setAttribute("style", "background-color: #fff; border: 2px solid #5199db;")};
function tabBlur() {if (event.keyCode == 9) this.removeAttribute("style")};

btnAddRow.addEventListener("keyup", tabFocus);
btnAddRow.addEventListener("keydown", tabBlur);
btnRemoveRow.addEventListener("keyup", tabFocus);
btnRemoveRow.addEventListener("keydown", tabBlur);
btnAddColumn.addEventListener("keyup", tabFocus);
btnAddColumn.addEventListener("keydown", tabBlur);
btnRemoveColumn.addEventListener("keyup", tabFocus);
btnRemoveColumn.addEventListener("keydown", tabBlur);
btnReset.addEventListener("keyup", tabFocus);
btnReset.addEventListener("keydown", tabBlur);
btnChangeMatrix.addEventListener("keyup", tabFocus);
btnChangeMatrix.addEventListener("keydown", tabBlur);
btnResult.addEventListener("keyup", function() {if (event.keyCode == 9) {this.setAttribute("style", "background-color: #46a318; border: 2px solid #5199db; border-right: none;"); document.styleSheets[2].cssRules[0].style.cssText = "position: absolute; content: ''; display: block; border: 12.7px solid #46a318; top: 7px; right: -11px; -webkit-transform: rotate(53deg) skewX(18deg); transform: rotate(53deg) skewX(18deg); border-radius: 2px; box-shadow: #5199db 2px 0px, #5199db 0px -2px;";}});
btnResult.addEventListener("keydown", tabBlur);
btnResult.addEventListener("keydown", function() { document.styleSheets[2].cssRules[0].style.cssText = "position: absolute; content: ''; display: block; border: 12.7px solid rgb(69, 161, 24); top: 7px; right: -11px; -webkit-transform: rotate(53deg) skewX(18deg); transform: rotate(53deg) skewX(18deg); border-radius: 2px; box-shadow: rgb(74, 128, 60) 0.9px 0px, rgb(74, 128, 60) 0px -0.9px;"});
