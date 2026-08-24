const customerNameInput = document.getElementById("customerName");
const descriptionInput = document.getElementById("description");
const priceInput = document.getElementById("price");

const invoiceCustomer = document.getElementById("invoiceCustomer");
const invoiceDescription = document.getElementById("invoiceDescription");
const invoicePrice = document.getElementById("invoicePrice");
const invoiceTotal = document.getElementById("invoiceTotal");

const invoiceNumber = document.getElementById("invoiceNumber");
const invoiceDate = document.getElementById("invoiceDate");

const updateBtn = document.getElementById("updateBtn");
const printBtn = document.getElementById("printBtn");
const newBtn = document.getElementById("newBtn");


/* =========================
   INVOICE NUMBER
   ========================= */

function getInvoiceNumber() {
  let number = localStorage.getItem("maxProjectsInvoiceNumber");

  if (!number) {
    number = 1001;
    localStorage.setItem("maxProjectsInvoiceNumber", number);
  }

  return Number(number);
}

function displayInvoiceNumber() {
  invoiceNumber.textContent = getInvoiceNumber();
}


/* =========================
   DATE
   ========================= */

function displayDate() {
  const today = new Date();

  invoiceDate.textContent = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}


/* =========================
   UPDATE INVOICE
   ========================= */

function updateInvoice() {
  const customer =
    customerNameInput.value.trim() || "Customer name";

  const description =
    descriptionInput.value.trim() || "Work description";

  const price =
    Number(priceInput.value) || 0;

  const formattedPrice =
    price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });

  invoiceCustomer.textContent = customer;
  invoiceDescription.textContent = description;

  invoicePrice.textContent = formattedPrice;
  invoiceTotal.textContent = formattedPrice;
}


/* =========================
   SAVE AS PDF
   ========================= */

function savePDF() {
  updateInvoice();
  window.print();
}


/* =========================
   NEW INVOICE
   ========================= */

function startNewInvoice() {
  const currentNumber = getInvoiceNumber();
  const nextNumber = currentNumber + 1;

  localStorage.setItem(
    "maxProjectsInvoiceNumber",
    nextNumber
  );

  customerNameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";

  invoiceCustomer.textContent = "Customer name";
  invoiceDescription.textContent = "Work description";
  invoicePrice.textContent = "$0.00";
  invoiceTotal.textContent = "$0.00";

  invoiceNumber.textContent = nextNumber;

  displayDate();
}


/* =========================
   BUTTONS
   ========================= */

updateBtn.addEventListener(
  "click",
  updateInvoice
);

printBtn.addEventListener(
  "click",
  savePDF
);

newBtn.addEventListener(
  "click",
  startNewInvoice
);


/* =========================
   START
   ========================= */

displayInvoiceNumber();
displayDate();
