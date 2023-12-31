const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  // display only 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  // display message when there no phone found
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  // display all phones here
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card p-4">
            <img src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
            </p>
            <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
            </div>
        </div>
      `;
    phonesContainer.appendChild(phoneDiv);
  });
  // stop loader
  toggleSpinner(false);
};

const searchProcess = (dataLimit) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
};
document.getElementById("btn-search").addEventListener("click", function () {
  // start loader
  searchProcess(10);
});

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchProcess(10);
    }
  });

document.getElementById("btn-show-all").addEventListener("click", function () {
  searchProcess();
});

const toggleSpinner = (isLoading) => {
  const toggleSection = document.getElementById("loader");
  if (isLoading) {
    toggleSection.classList.remove("d-none");
  } else {
    toggleSection.classList.add("d-none");
  }
};

const loadPhoneDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

const displayPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("phoneDetailsModalLabel");
  modalTitle.innerText = phone.name;
  const modalBody = document.getElementById("phoneDetailsBody");
  modalBody.innerHTML = `
  <p>Release Date: ${
    phone.releaseDate ? phone.releaseDate : "No Relase Date Found"
  } </p>
  <p>Storage: ${
    phone.mainFeatures
      ? phone.mainFeatures.storage
      : "No Storage Information Found"
  } </p>
  <p>Others: ${
    phone.others ? phone.others.Bluetooth : "No Bluetooth Information Found"
  } </p>
  `;
};

loadPhones("iphone");
