let table = document.getElementById("counthere");

function renderContributorsTable(contributors) {
  let i = 1;
  contributors.forEach(({ login, html_url, contributions }) => {
    let row = table.insertRow(i);
    let slNoCell = row.insertCell(0);
    let userNameCell = row.insertCell(1);
    let urlUser = row.insertCell(2);
    let noOfContributions = row.insertCell(3);
    slNoCell.innerText = i;
    userNameCell.innerText = login;
    urlUser.innerHTML = `<a href="${html_url}">${html_url}</a>`;
    noOfContributions.innerText = contributions;
    i++;
  });
  document.getElementById("ct").innerHTML = i - 1 + " Contributors";
}

fetch("https://api.github.com/repos/yelynn1/tictactoe/contributors")
  .then((response) => response.json())
  .then((contributors) => renderContributorsTable(contributors))
  .catch((err) => console.log("Request Failed", err));
