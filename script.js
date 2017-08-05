var showList,
    direction = document.getElementsByName("direction"),
    system = document.getElementsByName("system"),
    category = document.getElementsByName("category"),
    classification = document.getElementsByName("classification"),
    btn_result = document.getElementById("btn_result"),
    inputs = document.getElementsByTagName("input"),
    err = document.querySelector(".error"),
    idList = oldList = "";

    isCheck(direction);
    isCheck(system);
    isCheck(category);
    isCheck(classification);

function isCheck(arr, elem){
  for (var i = 0; i < arr.length; i++)
    arr[i].addEventListener("change", function(){
      this.setAttribute("checked", true);
      idList = idList + this.value;

      if (this.value == "tpr"){
        document.getElementById("btn_comment").classList.remove("invisible");
      }
  });

}

btn_result.addEventListener("click", function(){
  var list = document.getElementById(idList);
  if (list){
    document.querySelector(".information").style.backgroundPosition = "-1000px";
    list.style.display = "block";
    oldList =idList;
  } else {
      err.style.display="block";
  }
});

btn_reset.addEventListener("click", function(){
  idList = "";
  var list = document.getElementById(oldList);
  if (oldList){
      list.style.display = "none";
      document.querySelector(".information").style.backgroundPosition = "center"
  } else{
      err.style.display="none";
      console.log("была ошибка ");
  }
  for (var i = 0; i < inputs.length; i++)
    inputs[i].removeAttribute("checked");

    document.getElementById("btn_comment").classList.add("invisible");
});
