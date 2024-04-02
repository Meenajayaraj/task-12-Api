const navBar = document.createElement("div");
navBar.setAttribute("class", "container-fluid position-sticky");
document.body.append(navBar);

const h1 = document.createElement("h1");
h1.innerText = "DICTIONARY";
h1.setAttribute("class", "text-center");
navBar.append(h1);

const content = document.createElement("div");
content.setAttribute("class", "container");
document.body.append(content);

const row = document.createElement("div");
row.setAttribute("class", "input row justify-content-center position-sticky");
content.append(row);

const inputBox = document.createElement("div");
inputBox.setAttribute("class", "col-6 col-sm-6");
row.append(inputBox);

const btnBox = document.createElement("div");
btnBox.setAttribute("class", "col-2 col-sm-2 sol-md-1 col-lg-1");
row.append(btnBox);

const inputRow = document.createElement("div");
inputRow.setAttribute("class", "row");
inputBox.append(inputRow);

const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search Your Word");
input.setAttribute("class", "border rounded-start-5 p-0 m-0 text-center");
input.setAttribute("id", "inputText");
inputRow.append(input);

const btnRow = document.createElement("div");
btnRow.setAttribute("class", "row");
btnBox.append(btnRow);

const meaningBtn = document.createElement("button");
meaningBtn.setAttribute("class", "border rounded-end-5 p-0 m-0");
meaningBtn.innerHTML =
  '<div class="d-none d-sm-block">Search</div><div class="d-block d-sm-none"><i class="fa-solid fa-magnifying-glass p-0"></i></div>';
btnRow.append(meaningBtn);

const meaningContainer = document.createElement("div");
meaningContainer.setAttribute("class", "meaning container");
content.append(meaningContainer);

const ulTag = document.createElement("ul");

const p = document.createElement("p");
p.setAttribute("class", "pTag text-center text-danger");
const h1Tag = document.createElement("h1");
h1Tag.setAttribute("class", "p-0 m-0 text-center");

meaningBtn.addEventListener("click", function () {
  search();
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    search();
  }
});

function search() {
  meaningContainer.append(ulTag);
  p.innerText = "";
  ulTag.innerHTML = "";
  const userInput = document.getElementById("inputText").value;
  h1Tag.innerHTML = `Meaning of <span>${userInput.toUpperCase()}</span>`;

  if (!userInput) {
    alert("Please Enter The Word");
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${userInput}`)
    .then((res) => res.json())
    .then((response) => {
      ulTag.append(h1Tag);
      for (let ind in response) {
        for (let ink in response[ind].meanings[0].definitions) {
          const definition = document.createElement("li");
          definition.setAttribute("class", "p-0 m-0");
          definition.innerText = `${response[ind].meanings[0].definitions[ink].definition}`;
          ulTag.append(definition);
        }
      }
    })
    .catch((error) => {
      error = `Unable to Fetch The Meaning Please Try Another Word`;

      p.innerText = "";
      p.innerText = error;
      meaningContainer.append(p);
    });
}
