var showList,
    direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    inputs = document.getElementsByTagName("input");

for (var i = 0; i < inputs.length; i++){
  inputs[i].addEventListener("click", function(){
    this.setAttribute("checked", true);
  });
}


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
