"use strict";

const submitButton = document.getElementById("submit-btn");
const tBodyEl = document.getElementById("tbody");
const editForm = document.getElementById("container-form");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

let data;
let validate = false;
let position;

/*...............................
TẠO HÀM TẠO DANH SÁCH PET 
...............................*/
const renderEditTable = function (petArrEdit) {
  tBodyEl.innerHTML = "";
  for (let i = 0; i < petArrEdit.length; i++) {
    let rowEdit = document.createElement("tr");
    rowEdit.innerHTML = `<th scope="row">${petArrEdit[i].id}</th>
<td>${petArrEdit[i].name}</td>
<td>${petArrEdit[i].age}</td>
<td>${petArrEdit[i].type}</td>
<td>${petArrEdit[i].weight + " kg"}</td>
<td>${petArrEdit[i].lengthPet + " cm"}</td>
<td>${petArrEdit[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArrEdit[i].color}"></i>
</td>
<td><i ${
      petArrEdit[i].vaccinated === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td><i ${
      petArrEdit[i].dewormed === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td><i ${
      petArrEdit[i].sterilized === true
        ? `class="bi bi-check-circle-fill"`
        : `class="bi bi-x-circle-fill"`
    }></i></td>
<td>${petArrEdit[i].date}</td>
<td><button type="button" class="btn btn-warning" onclick="editPet('${i}')">編集</button></td>
`;
    tBodyEl.appendChild(rowEdit);
  }
};

/*.......................................................................
EVENT WITH EDIT BUTTON 
........................................................................*/
const editPet = function (stt) {
  // SHOW FORM EDIT
  editForm.classList.remove("hide");
  position = stt;

  // SHOW EDITTING PET
  idInput.value = petArrEdit[stt].id;
  nameInput.value = petArrEdit[stt].name;
  ageInput.value = petArrEdit[stt].age;
  typeInput.value = petArrEdit[stt].type;
  weightInput.value = petArrEdit[stt].weight;
  lengthInput.value = petArrEdit[stt].lengthPet;
  colorInput.value = petArrEdit[stt].color;
  breedInput.value = petArrEdit[stt].breed;
  vaccinatedInput.checked = petArrEdit[stt].vaccinated;
  dewormedInput.checked = petArrEdit[stt].dewormed;
  sterilizedInput.checked = petArrEdit[stt].sterilized;

  // ADD BREED INTO OPTION
  // WHEN TYPE IS DOG
  if (typeInput.value === "犬") {
    const renderBreed = function (breedArr) {
      let checkBreed = breedArr.filter((check) => check.type === "犬");
      for (let i = 0; i < checkBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${checkBreed[i].breed}</option>`;
        breedInput.appendChild(option);
      }
      breedInput.value = petArrEdit[stt].breed;
    };
    renderBreed(breedArr);
    // WHEN TYPE IS CAT
  } else if (typeInput.value === "猫") {
    const renderBreed = function (breedArr) {
      let checkBreed = breedArr.filter((check) => check.type === "猫");
      for (let i = 0; i < checkBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${checkBreed[i].breed}</option>`;
        breedInput.appendChild(option);
      }
      breedInput.value = petArrEdit[stt].breed;
    };
    renderBreed(breedArr);
  }
};

/*......................................................
RENDER BREED FOLLOW SELECTED TYPE
..........................................................*/
let breedArr = getFromStorage("breed");
console.log(breedArr);

typeInput.addEventListener("change", function () {
  breedInput.innerHTML = `<option>品種を選択</option>`;
  // WHEN USER SELECT TYPE IS DOG
  if (typeInput.value === "犬") {
    const renderBreed = function (breedArr) {
      let checkBreed = breedArr.filter((check) => check.type === "犬");
      for (let i = 0; i < checkBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${checkBreed[i].breed}</option>`;
        breedInput.appendChild(option);
      }
    };
    renderBreed(breedArr);
    // WHEN USER SELECT TYPE IS CAT
  } else if (typeInput.value === "猫") {
    const renderBreed = function (breedArr) {
      let checkBreed = breedArr.filter((check) => check.type === "猫");
      for (let i = 0; i < checkBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${checkBreed[i].breed}</option>`;
        breedInput.appendChild(option);
      }
    };
    renderBreed(breedArr);
  }
});

/*....................................
CHECK INPUT'S DATA IS VALIDE OR NOT 
.........................................*/
const validateData = function (data) {
  if (data.name === "") {
    alert("名前を入力してください");
  } else if (data.age === 0) {
    alert("年齢を入力してください");
  } else if (data.age < 1 || data.age > 15) {
    alert("年齢を1～15から選択してください");
  } else if (data.type === "Select Type") {
    alert("種別を入力してください");
  } else if (data.weight === "") {
    alert("重量を入力してください");
  } else if (data.weight < 1 || data.weight > 15) {
    alert("重量を1～15から選択してください!");
  } else if (data.lengthPet === "") {
    alert("長さを入力してください");
  } else if (data.lengthPet < 1 || data.lengthPet > 150) {
    alert("長さを1～150から選択してください!");
  }
  // else if (data.breed === "Select Breed") {
  //   alert("Please select breed");
  // }
  else {
    validate = true;
  }
};

// CLEAR INPUT
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "種別を選択";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "品種を選択";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  validate = false;
};

/*.........................................
  EVENT WITH SUBMIT BUTTON
...........................................*/
submitButton.addEventListener("click", function () {
  data = {
    id: idInput.value,
    name: nameInput.value,
    age: Number(ageInput.value),
    type: typeInput.options[typeInput.selectedIndex].text,
    weight: weightInput.value,
    lengthPet: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.options[breedInput.selectedIndex].text,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };

  validateData(data);
  if (validate) {
    petArrEdit[position].id = data.id;
    petArrEdit[position].name = data.name;
    petArrEdit[position].age = data.age;
    petArrEdit[position].type = data.type;
    petArrEdit[position].weight = data.weight;
    petArrEdit[position].lengthPet = data.lengthPet;
    petArrEdit[position].color = data.color;
    petArrEdit[position].breed = data.breed;
    petArrEdit[position].vaccinated = data.vaccinated;
    petArrEdit[position].dewormed = data.dewormed;
    petArrEdit[position].sterilized = data.sterilized;

    renderEditTable(petArrEdit);
    clearInput();
    editForm.classList.add("hide");
    // UPDATE PET INTO STRORAGE
    localStorage.removeItem("pet");
    saveToStorage("pet", petArrEdit);
    breedInput.innerHTML = "";
  }
  console.log(position);
});

// SHOW PET LIST FROM STORAGE
let petArrEdit = [];
let checkDataHaveOrNot = getFromStorage("pet");
console.log(checkDataHaveOrNot != null);
if (checkDataHaveOrNot != null) {
  petArrEdit = getFromStorage("pet");
  renderEditTable(petArrEdit);
}
console.log(petArrEdit);
