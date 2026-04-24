const form = document.getElementById("contactForm");
const list = document.getElementById("contactList");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

function renderContacts() {
  list.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    li.textContent = `${contact.name} ${contact.surname} | ${contact.phone} | ${contact.email}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.addEventListener("click",()=>{
      contacts.splice(index, 1);
      saveAndRender();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Редагувати";
    editBtn.addEventListener("click", () => {
      document.getElementById("name").value = contact.name;
      document.getElementById("surname").value = contact.surname;
      document.getElementById("phone").value = contact.phone;
      document.getElementById("email").value = contact.email;

      editIndex = index;
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newContact = {
    name: form.name.value,
    surname: form.surname.value,
    phone: form.phone.value,
    email: form.email.value,
  };

  if (editIndex === null) {
    contacts.push(newContact);
  } else {
    contacts[editIndex] = newContact;
    editIndex = null;
  }

  form.reset();
  saveAndRender();
});

renderContacts();