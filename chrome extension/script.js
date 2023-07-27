let mySaves = [];
const inputEl = document.getElementById("input-el");
const savetab = document.getElementById("save-tab-btn");
const inputbtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let i = 0;

let savesFromLocalStr = [];
savesFromLocalStr = JSON.parse(localStorage.getItem("mySaves"));

if (savesFromLocalStr) {
  mySaves = savesFromLocalStr;
  rendersaves(mySaves);
}

inputbtn.addEventListener("click", function () {
  if (!mySaves.includes(inputEl.value)) {
    mySaves.push(inputEl.value);
  }
  inputEl.value = "";
  localStorage.setItem("mySaves", JSON.stringify(mySaves));
  rendersaves(mySaves);
});

// tab = [{ url: "https://www.google.com/" }];

savetab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    console.log(tabs[0].url);
    if (!mySaves.includes(tabs[0].url)) {
      mySaves.push(tabs[0].url);
    }
    localStorage.setItem("mySaves", JSON.stringify(mySaves));
    rendersaves(mySaves);
  });
});

function rendersaves(leads) {
  let listitems = "";
  for (i = 0; i < leads.length; i++) {
    listitems += `<li><a href="${leads[i]}"
        target="_blank" rel="" noopener noreferr>
      ${leads[i]}
      </a></li>`;
  }

  ulEl.innerHTML = listitems;
}

document.getElementById("delete-btn").addEventListener("click", function () {
  localStorage.clear();
  mySaves = [];
  rendersaves(mySaves);
});
