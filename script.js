var showList,
    direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    inputs = document.getElementsByTagName("input");

    var idList = oldList = "";

function isCheck(arr, elem){

  for (var i = 0; i < arr.length; i++)
  arr[i].addEventListener("change", function(){
    this.setAttribute("checked", true);
    idList = idList + this.value;

  });

}

isCheck(direction);
isCheck(system);
isCheck(category);
isCheck(classification);


btn_result.addEventListener("click", function(){

 console.log(idList);
var e = document.getElementById(idList);
e.style.display = "block";
  console.log(e);
  oldList =isList;
});

btn_reset.addEventListener("click", function(){
  idList = "";
for (var i = 0; i < inputs.length; i++)
 inputs[i].removeAttribute("checked");

var e = document.getElementById(oldList);
e.style.display = "none";
console.log("текущий элемент " + idList)
});

/*
btn_result.addEventListener("click", function(){
  itemDirection = hasChecked(direction);
  console.log(itemDirection + direction[itemDirection].value);

  if (direction[itemDirection].value == "tpr")  {
    for(var i = 0; i < classification.length; i++) classification[i].setAttribute("disabled", true);
  }

  itemSystem = hasChecked(system);
  console.log(itemSystem);
  itemCategory = hasChecked(category);
  console.log(itemCategory);
  itemClassification = hasChecked(classification);
  console.log(itemClassification);
  var tmp = direction[itemDirection].value + "_" + system[itemSystem].value + "_" +category[itemCategory].value;

  if (system[itemSystem].value == "lira" || system[itemSystem].value == "eissd")
  {

    tmp = tmp + "_" + classification[itemClassification].value;
  }


  if (showList) {
    document.getElementById(showList).style.display = "none";
  }
  showList = tmp;
  document.getElementById(showList).style.display = "block";

  console.log(tmp);
  console.log(showList);
});

function hasChecked (arr){
  for(var i = 0; i < arr.length; i++)
  if (arr[i].hasAttribute("checked"))  return i;
  }
*/
