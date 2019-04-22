var n = document.getElementById("rows"),
		m = document.getElementById("cols"),
		btnRender = document.getElementById("btnRender"),
		btnAutofill = document.getElementById("btnAutofill"),
		btnCalculate = document.getElementById("btnCalculate"),
		numDomains = document.getElementById("numberOfDomains"), //число доменов
		numResult=0; //число строк в результирующей таблице

//проверка корректности ввода данных
function checkSize(){	
	if ((this.value.match(/\d*[,.]\d*/) !== null ) ||
		(isNaN(Number(this.value))) ||
		(Number(this.value) < 1) ||
		(Number(this.value) > 40)
		) this.value = 1;	
}
n.onblur = checkSize;
m.onblur = checkSize;

document.getElementById("probability").onblur = function(){				
	if ((Number(this.value) <= 0) || 
			(isNaN(Number(this.value))) ||  
			(Number(this.value) >= 1) 
			) this.value = 0.01;			
}


btnRender.addEventListener("click", function(event){
	let matrix = document.getElementById("matrix");
	if (matrix.childNodes.length!=0) {
		while (matrix.firstChild)
			matrix.removeChild(matrix.firstChild);
	}	
	for(let i=0; i<n.value; i++){

		let row = document.createElement("div");
		row.className = "matrix-row";

		for(let j=0; j<m.value; j++){
			let cell = document.createElement("input");
			cell.setAttribute("type", "text");
			cell.setAttribute("maxlength", "1"); 
			cell.id = "matrix-cell";
			cell.className  = "matrix-cell";
			//заполнение ячейки по клику
			cell.onclick = function() {
				if (this.value == 0) this.value = 1; 
				else if (this.value == 1) this.value = 0;
			}
			cell.onblur = function() {
				if (this.value != 0 && this.value != 1){
					this.value = "";
					this.classList.add("is_error");
				}
				else if (this.classList.contains("is_error"))
					this.classList.remove("is_error");
			}
			row.appendChild(cell);
		}
		matrix.appendChild(row);
	}
});

btnAutofill.addEventListener("click", function(event){
	let p = document.getElementById("probability").value;
	let numOfOnes = Math.floor(Number(n.value)*Number(m.value)*Number(p));
	var cells = document.querySelectorAll(".matrix-cell");
	let arr = new Array();
	let j=0, k=0;

	for(let i=0; i<n.value*m.value; i++) {
		if (Math.random() <= p) cells[i].value = 1;
			else cells[i].value = 0;
	}
});

btnAutofill.addEventListener("click", searchDomains);
btnCalculate.addEventListener("click", searchDomains);

function searchDomains(){
	let cells = document.querySelectorAll(".matrix-cell"),
	arr = new Array(), //вспом. массив для хранения матрицы
	r,g,b,colorCell; //для хранения цвета ячейки
		for(let i=0; i<n.value; i++){
			arr[i] = new Array();
			for(let j=0; j<m.value; j++){
				arr[i][j] = new Object();
				arr[i][j].value = cells[i*m.value+j].value;
				arr[i][j].isViewed = false; //элемент еще не просмотрен, т.е. не проанализирован на предмет принадлежности к домену
				arr[i][j].domain = 0; //номер домена, если элемент в домене, 0 - по умочлчанию (элемент не в доменае 
				if (cells[i*m.value+j].hasAttribute("style")) 
					cells[i*m.value+j].removeAttribute("style"); //сброс раскраски при повторном вычисление домена без изменения размеров
			}
		}
		let ind = 0, //число найденных доменов
		isDomain = false; //признак, что найден домен
		var nextElements = new Array();
		for(let i=0; i<n.value; i++)
			for(let j=0; j<m.value; j++){

				function checkElem(i, j){
					if (arr[i][j].isViewed != true){
						arr[i][j].isViewed = true
						if (arr[i][j].value == 0) {
							return 0;
						}
						else if (arr[i][j].value == 1) {
							if (!isDomain) { 
								isDomain = true; ind++;
								r = Math.ceil(Math.random()*255);
								g = Math.ceil(Math.random()*255);
								b = Math.ceil(Math.random()*255);
								colorCell = "background-color: rgba(" + r + ", " + g + ", " + b + ", .6)";
							}
							arr[i][j].domain = ind;									
							return 1;
						}
					} else return 0;				
				}
		
						
				function checkNextElem(i,j){
					if (i-1>=0) f(i-1, j);
					if (j-1>=0) f(i, j-1);
					if (i+1<n.value) f(i+1, j);
					if (j+1<m.value) f(i, j+1);

					function f(i, j){
						if (checkElem(i, j) == 1){
						cells[i*m.value+j].setAttribute("style", colorCell);
						let o = new Object(); o.x = i; o.y = j; o.isNew =true;nextElements.push(o);
						} 
					}

					if (nextElements.length == 0) {isDomain = false;}
						else {
								for(let k =0; k<nextElements.length;k++){
									let o = nextElements[k];
									nextElements[k].isNew = false;
									nextElements = nextElements.filter((item)=>item.isNew);
									checkNextElem(o.x,o.y);
								}
						}	
				}			
				if (arr[i][j].isViewed)	{continue;}
				else if (checkElem(i, j)==0) {continue;}
					else {
						cells[i*m.value+j].setAttribute("style", colorCell);
						checkNextElem(i,j);
					}
			} 
			numDomains.value = ind;
			addResult();
	}

//добавление результатов в таблицу
function addResult(){
	let table = document.getElementById("result"),
			tbody = document.getElementById("table_body"),
			tr = document.createElement("tr"),
			td1 = document.createElement("td"),
			td2 = document.createElement("td"),
			td3 = document.createElement("td"),
			p = document.getElementById("probability").value;

			td1.innerText = p;	
			td2.innerText = numDomains.value;	
			td3.innerText = n.value*m.value;

			tr.appendChild(td1);	
			tr.appendChild(td2);
			tr.appendChild(td3);
			if(numResult <10) {
				numResult++;
			} else {
				tbody.removeChild(tbody.firstChild);
			}
			tbody.appendChild(tr); 

			if (table.classList.contains("no_result"))
				 table.classList.remove("no_result");
}



