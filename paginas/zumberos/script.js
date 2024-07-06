function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    const aNum = parseInt(aText);
    const bNum = parseInt(bText);

    return (aNum - bNum) * dirModifier;
  });

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#zumberosTable");
  sortTableByColumn(table, 1, false);
});
