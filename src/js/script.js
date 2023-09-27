// Buttons
const addBtn = document.getElementById("add");
const contactPageBtn = document.getElementById("next-page");
const backBtn = document.getElementById("back-btn");

// checking
let contactViewed = false;

// name field
const name = document.getElementById("user");
// number field
const num = document.getElementById("usr-num");

// Generate Random ID
const randomID = (max=10000) =>{
  return Math.floor(Math.random()*max);
};

// display the contacts
const loadContacts = () => {
  // div to create contact list (Contact page)
  const contactDiv = document.getElementById("contact-details");
  contactData = JSON.parse(localStorage.getItem("contactArray"));
  localStorage.setItem("contactArray", JSON.stringify(contactData));
  if (Array.isArray(contactData)) {
    console.log(contactData);

    let div = "";

    for (let contact of contactData) {
      div += `<div class="row mt-2">
    <div class="col-5"><input class="w-100 rounded border-primary p-1 input-name" type="text" name="name" id="${contact.name}" disabled value=${contact.name}></div>
    <div class="col-5"><input class="w-100 rounded border-primary p-1 input-num" type="text" name="number" id="${contact.name}" disabled value=${contact.num}></div>
    <div class="col"><button class="btn btn-secondary edit" value=${contact.name}>Edit</button></div>
    <div class="col"><button class="btn btn-danger delete" value=${contact.name}>Delete</button></div>
    </div>`;
    }
    if (contactDiv) contactDiv.innerHTML = div;
    if (contactViewed) {
      window.location.href = "pages/contacts.html";
      contactViewed = false;
    }
  }
};
loadContacts();

// Button Functionalities

// Add Contacts Button
if (addBtn) {
  addBtn.addEventListener("click", () => {
    if (name.value !== "" && num.value !== "") {
      contactData = JSON.parse(localStorage.getItem("contactArray"));
      contactData.push({ id: randomID(), name: name.value, num: num.value });
      localStorage.setItem("contactArray", JSON.stringify(contactData));
      name.value = "";
      num.value = "";
    }
  });
}

// View Contacts Button
if (contactPageBtn) {
  contactPageBtn.addEventListener("click", () => {
    contactViewed = true;
    loadContacts();
  });
}

// Back Button (Contacts page)
if (backBtn) {
  backBtn.addEventListener("click", () => {
    // window.location.href = "http://127.0.0.1:5500/index.html";
    window.location.href = "https://dharun-srikanth.github.io/Address-Book-JS-Project/index";
  });
}

// Edit button Functionality (Contact Page)
const nameField = document.querySelectorAll(".input-name");
const numField = document.querySelectorAll(".input-num");
const editBtn = document.querySelectorAll(".edit");
editBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    nameField.forEach((input) => {
      if (input.id === e.target.value) {
        btn.classList.add("btn-success");
        btn.classList.remove("btn-secondary");
        btn.textContent = "Done";
        input.removeAttribute("disabled");
        btn.addEventListener("click", () => {
          let data = JSON.parse(localStorage.getItem("contactArray"));
          data = data.map((val) => {
            if (val.name === e.target.value) {
              return { ...val, name: input.value };
            } else return val;
          });
          localStorage.setItem("contactArray", JSON.stringify(data));
          location.reload();
        });
      }
    });
    numField.forEach((input) => {
      if (input.id === e.target.value) {
        btn.classList.add("btn-success");
        btn.classList.remove("btn-secondary");
        btn.textContent = "Done";
        input.removeAttribute("disabled");
        btn.addEventListener("click", () => {
          let data = JSON.parse(localStorage.getItem("contactArray"));
          data = data.map((val) => {
            if (val.name === e.target.value) {
              return { ...val, num: input.value };
            } else return val;
          });
          localStorage.setItem("contactArray", JSON.stringify(data));
          location.reload();
        });
      }
    });
    // console.log(e.target.value);
  })
);

// Delete button Functionality (Contact Page)
const delBtn = document.querySelectorAll(".delete");

delBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.value);
    const existingEntries = JSON.parse(localStorage.getItem("contactArray"));
    existingEntries.splice(
      existingEntries.findIndex((ele) => ele.name === e.target.value),
      1
    );
    localStorage.setItem("contactArray", JSON.stringify(existingEntries));
    loadContacts();
    location.reload();
  });
});
