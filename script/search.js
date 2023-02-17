"use strict";

const findButton = document.getElementById("find-btn");
const tBodyEl = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

let breedArr = [];
let petSearchArr = [];

// GET PET'S LIST FROM STORAGE
let checkDataHaveOrNot = getFromStorage("pet");
console.log(checkDataHaveOrNot !== null);
if (checkDataHaveOrNot !== null) {
  petSearchArr = getFromStorage("pet");
  console.log(petSearchArr);
}
let checkBreedDataHaveOrNot = getFromStorage("breed");
if (checkBreedDataHaveOrNot !== null) {
  breedArr = getFromStorage("breed");
  console.log(breedArr);
}

/*...............................
RENDER PET'S LIST FUNCTION 
...............................*/
const renderSearchTable = function (petSearchArr) {
  tBodyEl.innerHTML = "";
  for (let i = 0; i < petSearchArr.length; i++) {
    let rowSearch = document.createElement("tr");
    rowSearch.innerHTML = `<th scope="row">${petSearchArr[i].id}</th>
<td>${petSearchArr[i].name}</td>
<td>${petSearchArr[i].age}</td>
<td>${petSearchArr[i].type}</td>
<td>${petSearchArr[i].weight + " kg"}</td>
<td>${petSearchArr[i].lengthPet + " cm"}</td>
<td>${petSearchArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petSearchArr[i].color}"></i>
</td>
<td><i ${
      petSearchArr[i].vaccinated === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td><i ${
      petSearchArr[i].dewormed === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td><i ${
      petSearchArr[i].sterilized === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td>${petSearchArr[i].date}</td>
`;
    tBodyEl.appendChild(rowSearch);
  }
};

// ADD BREED TO OPTIONS
for (let i = 0; i < breedArr.length; i++) {
  const option = document.createElement("option");
  option.innerHTML = `<option>${breedArr[i].breed}</option>`;
  breedInput.appendChild(option);
}

/*...............................
 EVENT WITH FIND BUTTON
 ................................*/
findButton.addEventListener("click", function () {
  let findArr = [...petSearchArr];
  // WHEN USER DOES NOT FILL ANYTHING ==> RENDER ALL OF PET
  if (
    idInput.value === "" &&
    nameInput.value === "" &&
    typeInput.value === "Select Type" &&
    breedInput.value === "Select Breed" &&
    vaccinatedInput.checked === false &&
    dewormedInput.checked === false &&
    sterilizedInput.checked === false
  ) {
    renderSearchTable(petSearchArr);
  }
  // WHEN USER FILL SOMETHING => RENDER LIST FOLLOW FILTERED DATA
  if (idInput.value !== "") {
    findArr = findArr.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value !== "") {
    findArr = findArr.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "種別を選択") {
    findArr = findArr.filter((pet) => pet.type.includes(typeInput.value));
  }

  if (breedInput.value !== "品種を選択") {
    findArr = findArr.filter((pet) => pet.breed.includes(breedInput.value));
  }

  if (vaccinatedInput.checked) {
    findArr = findArr.filter((pet) => pet.vaccinated === true);
  }

  if (dewormedInput.checked) {
    findArr = findArr.filter((pet) => pet.dewormed === true);
  }

  if (sterilizedInput.checked) {
    findArr = findArr.filter((pet) => pet.sterilized === true);
  }

  console.log(findArr);
  renderSearchTable(findArr);
});
