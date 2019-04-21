var n = document.getElementById("rows"),
			m = document.getElementById("cols"),
			btnRender = document.getElementById("btn-render"),
			btnAutofill = document.getElementById("btn-autofill"),
			btnCalculate = document.getElementById("btn-calculate"),
			nDomains = document.getElementById("numberofdomains"),
			numResult=0;


		btnRender.addEventListener("click", function(event){
			var matrix = document.getElementById("matrix");
			if (matrix.childNodes.length!=0) {
				while (matrix.firstChild)
					matrix.removeChild(matrix.firstChild);
			}

			/*let table = document.getElementById("table_body");
			document.getElementById("result").classList.add("no_result");
			numResult = 0;
			if (table.childNodes.length!=0) {
				while (table.firstChild)
					table.removeChild(table.firstChild);
			}*/

			for(let i=0; i<n.value; i++){

				let row = document.createElement("div");
    			row.className = "matrix-row";

				for(let j=0; j<m.value; j++){
					let cell = document.createElement("input");
    				cell.setAttribute("type", "text");
    				cell.setAttribute("maxlength", "1"); 
    				cell.id = "matrix-cell";
    				cell.className  = "matrix-cell";
    				//заполнение матрицы по клику ячейки
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
function searchDomains(){
				var cells = document.querySelectorAll(".matrix-cell");
				let arr = new Array();
				var r,g,b,bColor;
					for(let i=0; i<n.value; i++){
						arr[i] = new Array();
						for(let j=0; j<m.value; j++){
							arr[i][j] = new Object();
							arr[i][j].value = cells[i*m.value+j].value;
							arr[i][j].isViewed = false;
							arr[i][j].domain = 0;
							//arr[i][j].indCell = i*m.value+j;
							if (cells[i*m.value+j].hasAttribute("style")) 
								cells[i*m.value+j].removeAttribute("style");
						}
					}
					let ind = 0, isDomain = false; //нет доменов
					var nextElements = new Array();
					for(let i=0; i<n.value; i++)
						for(let j=0; j<m.value; j++){

							function checkElem(i, j){
								//console.log(i + " " + j);
								if (arr[i][j].isViewed != true){
									arr[i][j].isViewed = true
									if (arr[i][j].value == 0) {
										//arr[i][j].isViewed = true;
										return 0;
									}
									else if (arr[i][j].value == 1) {
										if (!isDomain) { 
											isDomain = true; ind++;
											r = Math.ceil(Math.random()*255);
											g = Math.ceil(Math.random()*255);
											b = Math.ceil(Math.random()*255);
											bColor = "background-color: rgba(" + r + ", " + g + ", " + b + ", .6)";
										}
										//arr[i][j].isViewed = true;
										arr[i][j].domain = ind;									
										return 1;
									}
								} else return 0;				
							}

						
						
						function checkNextElem(i,j){
									console.log("проверяем соседей "+i+", "+ j);
										if (i-1>=0) 
											if (checkElem(i-1, j) == 1 //&& !arr[i-1][j].isViewed
												) {
												console.log("проверяем и красим " + (i-1) + "," + j +
													"- соседа " + i+", "+ j);
												cells[(i-1)*m.value+j].setAttribute("style", bColor);
												let o = new Object(); o.x = i-1; o.y = j; o.isNew =true; nextElements.push(o);
											}
										if (j-1>=0) 
											if (checkElem(i, j-1) == 1 //&& !arr[i][j-1].isViewed
												) {
												console.log("проверяем и красим " + i + "," + (j-1) +
													"- соседа " + i+", "+ j);
												cells[i*m.value+j-1].setAttribute("style", bColor);
												let o = new Object(); o.x = i; o.y = j-1; o.isNew =true;nextElements.push(o);
											} 
										if (i+1<n.value) 
											if (checkElem(i+1, j) == 1 //&& !arr[i+1][j].isViewed
												) {
												console.log("проверяем и красим " + (i+1) + "," + j +
													"- соседа " + i+", "+ j);
												cells[(i+1)*m.value+j].setAttribute("style", bColor);
												let o = new Object(); o.x = i+1; o.y = j; o.isNew =true;nextElements.push(o);
											} 
										if (j+1<m.value)  
											if (checkElem(i, j+1) == 1 //&& !arr[i][j+1].isViewed
												) {
												console.log("проверяем и красим " + i + "," + (j+1) +
													"- соседа " + i+", "+ j);
												cells[i*m.value+j+1].setAttribute("style", bColor);
												let o = new Object(); o.x = i; o.y = j+1; o.isNew =true;nextElements.push(o);
											} 
										if (nextElements.length == 0) {isDomain = false}
											else {
												//while(nextElements.length !=0){
													for(let k =0; k<nextElements.length;k++){
														let o = nextElements[k];
													nextElements[k].isNew = false;
													nextElements = nextElements.filter((item)=>item.isNew);
													console.log("длина" + nextElements.length);
													checkNextElem(o.x,o.y);
													//}
													;
												}
											}	
										//if (vt + vr + vl + vb == 0) {isDomain = false;}
						}
						
						if (arr[i][j].isViewed)	{continue;}
						else if (checkElem(i, j)==0) {continue;}
							else {
								console.log("проверили и покрасили checkElem(" +i+", "+ j+")");
								cells[i*m.value+j].setAttribute("style", bColor);
								//var nextElements = new Array();
								checkNextElem(i,j);
							}
							
								
					} 
					nDomains.value = ind;console.log(arr); //return cells;
					addResult();
			}
			
			function addResult(){
				let table = document.getElementById("result"),
					tbody = document.getElementById("table_body"),
					tr = document.createElement("tr"),
					td1 = document.createElement("td"),
					td2 = document.createElement("td"),
					td3 = document.createElement("td");
				let p = document.getElementById("probability").value;

    				td1.innerText = p;	
    				td2.innerText = nDomains.value;	
    				td3.innerText = n.value*m.value;

    				tr.appendChild(td1);	
    				tr.appendChild(td2);
    				tr.appendChild(td3);
    				if(numResult <10) {
    					numResult++;
    					//tbody.appendChild(tr); 
    				} else {
    					tbody.removeChild(tbody.firstChild);
    					//tbody.appendChild(tr); 
    				}
    				tbody.appendChild(tr); 

    				if (table.classList.contains("no_result"))
    					 table.classList.remove("no_result");
			}




			btnCalculate.addEventListener("click", searchDomains);

			document.getElementById("probability").onblur = function(){
				if (isNaN(Number(this.value))) {//this.value = "";
							this.classList.add("is_error");
						}
				else if (this.value > 1) {
					this.value = Number(("0." + this.value).slice(0, 4));
					if (this.classList.contains("is_error"))
							this.classList.remove("is_error");
				}
			}
			//автозаполнение
			btnAutofill.addEventListener("click", function(event){
				let p = document.getElementById("probability").value;
				let numOfOnes = Math.floor(Number(n.value)*Number(m.value)*Number(p));
				var cells = document.querySelectorAll(".matrix-cell");
				let arr = new Array();
				let j=0, k=0;

				for(let i=0; i<n.value*m.value; i++) {
					cells[i].value = 0;
				}
				while(j<numOfOnes){
					if (k==n.value*m.value) k=0;
					if (cells[k].value != 1) {
						cells[k].value = Math.round(Math.random());
						if (cells[k].value ==1) j++; 
					}					
					k++;
				}

				

			});
			btnAutofill.addEventListener("click", searchDomains);




		//заполнение матрицы по клику ячейки

		/*var cell = document.getElementById("matrix-cell");
		cell.addEventListener("click", function(event){
			if (this.value === undefined || this.value == 1) this.value = 0;
			console.log(this.value);
			if (this.value == 0) this.value = 1;
			console.log(this.value);
			});*/
		/*function setValue(){
			if (this.value ==0) this.value = 1; 
			else if (this.value == "1") this.value = "0";
					}*/

		/*var values = document.querySelectorAll(".matrix-cell");
    	for (var i =0; i < values.length; i++) {
            values[i].onclick = function() {
            	if (this.value == 0) this.value = 1; 
            	else if (this.value == "1") this.value = "0";
            }
        }*/
		/*var n = document.getElementById("field1"),
			m = document.getElementById("field2"),
			b = document.getElementById("btn");

			b.addEventListener("click", function(event){
				m.value = n.value+1;
			});
*/