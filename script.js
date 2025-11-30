let currentStorage = localStorage;
const emptyHeader = "Нет данных";

window.onload = updateTable;

function getStorage() {
  const type = document.getElementById("storageSelect").value;
  currentStorage = (type === "local") ? localStorage : sessionStorage;
  updateTable();
}

function updateTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (currentStorage.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = emptyHeader;
    row.appendChild(cell);
    tbody.appendChild(row);
    return;
  }

  for (let i = 0; i < currentStorage.length; i++) {
    const key = currentStorage.key(i);
    const value = currentStorage.getItem(key);

    const row = document.createElement("tr");

    const keyCell = document.createElement("td");
    keyCell.textContent = key;

    const valueCell = document.createElement("td");
    valueCell.textContent = value;

    const delCell = document.createElement("td");
    const span = document.createElement("span");
    span.textContent = "X";
    span.style.cursor = "pointer";
    span.onclick = () => deleteItem(key);

    delCell.appendChild(span);

    row.appendChild(keyCell);
    row.appendChild(valueCell);
    row.appendChild(delCell);

    tbody.appendChild(row);
  }
}

function saveItem() {
  const key = document.getElementById("keyInput").value.trim();
  const value = document.getElementById("valueInput").value.trim();

  if (!key || !value) return;

  currentStorage.setItem(key, value);
  updateTable();
}

function deleteItem(key) {
  currentStorage.removeItem(key);
  updateTable();
}

function clearStorage() {
  if (confirm("Вы уверены, что хотите полностью очистить хранилище?")) {
    currentStorage.clear();
    updateTable();
  }
}
