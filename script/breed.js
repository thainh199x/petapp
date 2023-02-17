"use strict";

/*.................................
CREATE VARIABLE
...............................*/
const inputBreed = document.querySelector("#input-breed");
const inputType = document.querySelector("#input-type");
const submitButton = document.getElementById("submit-btn");
const tableBreedEl = document.getElementById("tbody");

let breedArr = [];
let data;
let validate2 = false;

/*......................................
CREATE CHECKING INPUT FUNCTION
.........................................*/
const checkInput = function (data) {
  if (data.breed === "") {
    alert("品種を選択してください。!");
  } else if (data.type === "種別を選択") {
    alert("種別を選択してください。!");
  } else {
    validate2 = true;
  }
};

/*...........................
RENDER BREED FUNCTION 
..............................*/
let renderBreedTable = function (breedArr) {
  tableBreedEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    let rowbreed = document.createElement("tr");
    rowbreed.innerHTML = `<td>${i + 1}</td>
<td>${breedArr[i].breed}</td>
<td>${breedArr[i].type}</td>
<td><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}')">削除</button></td>`;
    tableBreedEl.appendChild(rowbreed);
  }
};

/*...........................
CLEAR INPUT FUNCTION
..............................*/
const clearInputBreed = () => {
  inputBreed.value = "";
  inputType.value = "種別を選択";
  validate2 = false;
};

/*...........................
EVENT WITH SUBMIT BUTTON
..............................*/
submitButton.addEventListener("click", function () {
  data = {
    breed: inputBreed.value,
    type: inputType.value,
  };
  checkInput(data);
  if (validate2) {
    breedArr.push(data);
    saveToStorage("breed", breedArr);
    renderBreedTable(breedArr);
    clearInputBreed();
  }
});

/*.....................
DELETE BREED FUNCTION
.....................*/
const deleteBreed = function (stt) {
  console.log(stt);
  breedArr.splice(stt, 1);
  localStorage.removeItem("breed");
  saveToStorage("breed", breedArr);
  renderBreedTable(breedArr);
};

/*...................................
UPDATE DATA WHEN RELOAD WEB
.....................................*/
let checkDataHaveOrNot = getFromStorage("breed");
console.log(checkDataHaveOrNot != null);
if (checkDataHaveOrNot != null) {
  breedArr = getFromStorage("breed");
  renderBreedTable(breedArr);
}
console.log(breedArr);
// localStorage.clear();
