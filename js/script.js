/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

  const nameInput = document.getElementById('name');
  const designDiv = document.getElementById('design');

  const selectMenu = document.getElementById('title');
  //let lastOption = selectMenu.lastElementChild;
  let otherJobRole = document.getElementById('other-title')

// Set for the site to load with the top most input field ready.
  nameInput.focus();
// Hides the text box.
  otherJobRole.style.display = 'none';
// Reveals a hidden text box when other is selected.
  selectMenu.addEventListener('input', (e) => {
    if (e.target.value == 'other'){
      otherJobRole.style.display = 'block';
    } else {
      otherJobRole.style.display = 'none';
    }
  })
// The "select theme" text is hidden when the design dropdown is focused.
  designDiv.addEventListener('focus', (e) => {
    const selectTheme = e.target.firstElementChild;
    selectTheme.style.display = 'none';
  });
// Filters the color options after making a design selection.
  designDiv.addEventListener('change',() => {
    const colorOptions = document.getElementById('color');
    const punOptions = colorOptions.querySelectorAll("option:nth-child(-n+3)");
    const heartOptions = colorOptions.querySelectorAll("option:nth-child(n+4)");
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.display = '';
    };
// Trigger a selection with .selectedIndex --> https://stackoverflow.com/questions/51033185/addeventlistener-onchange-dropdown-selected-value-javascript
    if (designDiv.options[designDiv.selectedIndex].value == "js puns") {
        for (let i = 0; i < 3; i++) {
          heartOptions[i].style.display = 'none';
        };
    } else if (designDiv.options[designDiv.selectedIndex].value == "heart js") {
        for (let i = 0; i < 3; i++) {
          punOptions[i].style.display = 'none';
        };
      }
  });

  const activField = document.querySelector('.activities');
  let totalCost = 0;
  let costDiv = document.createElement('div');
  //costDiv.className = "activities";  Do I need this?
  costDiv.textContent = '$' + totalCost;
  activField.appendChild(costDiv);
// Updates the cost shown on the site for every change in the checkox inputs.
  function updateCost() {
    costDiv.textContent = '$' + totalCost;
  };
// Add/Subract the totalCost value with changes to checked status of an input.
  activField.addEventListener('change', (e) =>{
    const checkBox = e.target;
    const isChecked = e.target.checked;
    let checkBoxCost = checkBox.dataset.cost;
    let checkBoxName = checkBox.name;
    console.log(checkBoxName);

    if (isChecked) {
      totalCost += parseInt(checkBoxCost);
    } else {
      totalCost -= parseInt(checkBoxCost);
    }
    updateCost();
  });
