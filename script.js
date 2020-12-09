const addUser = document.getElementById("add-user");
const double = document.getElementById("double");
const millionaires = document.getElementById("show-millionaires");
const sort = document.getElementById("sort");
const wealth = document.getElementById("calculate-wealth");
const main = document.getElementById("main");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//double money using the map method

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

//sort users by richest using the sort method

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//filter millionaires using the filter method

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

//calculate wealth using the reduce method

function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
}

//add new obj to data array

function addData(obj) {
  data.push(obj);

  updateDOM();
}

//update DOM

function updateDOM(providedData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

//format number as money

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//event listeners

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortByRichest);
millionaires.addEventListener("click", showMillionaires);
wealth.addEventListener("click", calculateWealth);
