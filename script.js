"use strict";

/* ........................
Selecting Elements
 .........................*/
const submitBtn = document.getElementById("submit-btn");
const showHealthyBtn = document.getElementById("healthy-btn");
const deleteBtn = document.querySelectorAll(".btn-delete");
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
const tableBodyEl = document.getElementById("tbody");
const bmiEl = document.querySelector(".bmi");
const bmiBtn = document.getElementById("bmi-btn");

/*................
create variable
..................*/
let d = new Date();
let today = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
let strVaccinated = "";
let strDewormed = "";
let strSterilized = "";

let petArr = [];
let petIdArr = [];

let validate = false;
let data = {};
let healthyCheck = true;
let healthyPetArr = [];
let bmi = 0;

/*................................
RENDER PET LIST
.....................................*/
let renderTableData = function (petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    if (petArr[i].vaccinated) {
      strVaccinated = `class="bi bi-check-circle-fill"`;
    } else {
      strVaccinated = `class="bi bi-x-circle-fill"`;
    }
    if (petArr[i].dewormed) {
      strDewormed = `class="bi bi-check-circle-fill"`;
    } else {
      strDewormed = `class="bi bi-x-circle-fill"`;
    }
    if (petArr[i].sterilized) {
      strSterilized = `class="bi bi-check-circle-fill"`;
    } else {
      strSterilized = `class="bi bi-x-circle-fill"`;
    }

    // create row with pet's data
    let row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight}</td>
<td>${petArr[i].lengthPet}</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i ${strVaccinated}></i></td>
<td><i ${strDewormed}></i></td>
<td><i ${strSterilized}></i></td>
<td class="bmi-score">?</td>
<td>${petArr[i].date}</td>
<td><button type="button" class="btn btn-danger" onclick="deletePet('${petArr[i].id}')">削除</button></td>
`;
    tableBodyEl.appendChild(row);
  }
};

/*..............................................
CHECK INPUT'S DATA IS VALIDE OR NOT
...............................................*/
let validateData = function (data) {
  if (data.id === "") {
    alert("IDを入力してください");
  } else if (petIdArr.includes(`${data.id}`)) {
    alert("他のIDを入力してください");
  } else if (data.name === "") {
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

/*............................
EVENT WITH SUBMIT BUTTON
.............................*/
submitBtn.addEventListener("click", function () {
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
    date: today,
  };

  // CHECK INPUT
  validateData(data);

  if (validate) {
    petArr.push(data);
    saveToStorage("pet", petArr);
    console.log(petArr);

    petIdArr.push(data.id);
    saveToStorage("id", petIdArr);

    // SHOW BMI ROW AND BMI BUTTON
    bmiEl.classList.remove("hidden");
    bmiBtn.classList.remove("hidden");

    // RENDER PET LIST
    renderTableData(petArr);

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
    clearInput();
  }
});

/*............................
EVENT WITH DELETE BUTTON
.............................*/
const deletePet = function (petId) {
  if (confirm("削除します ?")) {
    for (let i = 0; i < petArr.length; i++) {
      // pet ID position
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
        petIdArr.splice(i, 1);
        localStorage.removeItem("pet");
        localStorage.removeItem("id");
        saveToStorage("pet", petArr);
        saveToStorage("id", petIdArr);
        renderTableData(petArr);
        break;
      }
    }
  }
};

/*..................................
EVENT WITH HEALTHY SHOW BUTTON
..................................*/
showHealthyBtn.addEventListener("click", function () {
  console.log(petArr);
  if (healthyCheck) {
    let healthyPetArr = petArr.filter(
      (pet) =>
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
    );
    console.log(healthyPetArr);
    renderTableData(healthyPetArr);
    showHealthyBtn.textContent = "全てペットを表示";
    healthyCheck = false;
    healthyPetArr = [];
  } else {
    renderTableData(petArr);
    showHealthyBtn.textContent = "いいねペットを表示";
    healthyCheck = true;
  }
});

/*....................................
EVENT WITH BMI BUTTON
.....................................*/
bmiBtn.addEventListener("click", function () {
  let bmiScore = document.querySelectorAll(".bmi-score");

  for (let i = 0; i < petArr.length; i++) {
    bmi =
      Math.round(((petArr[i].weight * 703) / petArr[i].lengthPet ** 2) * 100) /
      100;
    bmiScore[i].textContent = bmi;
  }
});

/*...................
EVENT WITH SIDEBAR
.....................*/
const sidebarEl = document.getElementById("sidebar");
const sidebarTitleEl = document.getElementById("sidebar-title");
sidebarTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

/*....................................
RENDER BREED LIST
......................................*/
typeInput.addEventListener("change", function () {
  breedInput.innerHTML = `<option>品種を選択</option>`;
  let breedArr;
  // WHEN USER SELECT TYPE IS DOG
  if (typeInput.value === "犬") {
    const renderBreed = function (breedArr) {
      breedArr = getFromStorage("breed");
      // console.log(breedArr);
      let checkBreed = breedArr.filter((check) => check.type === "犬");
      // console.log(checkBreed);
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
      breedArr = getFromStorage("breed");
      // console.log(breedArr);
      let checkBreed = breedArr.filter((check) => check.type === "猫");
      // console.log(checkBreed);
      for (let i = 0; i < checkBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${checkBreed[i].breed}</option>`;
        breedInput.appendChild(option);
      }
    };
    renderBreed(breedArr);
  }
});

/*...................................
UPDATE DATA WHEN RELOAD
.....................................*/
let checkDataHaveOrNot = getFromStorage("pet");
console.log(checkDataHaveOrNot);
if (checkDataHaveOrNot != null) {
  petIdArr = getFromStorage("id");
  petArr = getFromStorage("pet");
  renderTableData(petArr);
  bmiEl.classList.remove("hidden");
  bmiBtn.classList.remove("hidden");
}
// localStorage.clear();
