/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// Set for the site to load with the top most input field ready.
// **functionally you want to start with the first item to require action.
  let nameInput = document.getElementById('name');
  nameInput.focus();

  const selectMenu = document.getElementById('title');
  let lastOption = selectMenu.lastElementChild;
  let otherJobRole = document.getElementById('other-title')
  otherJobRole.style.display = 'none';

// Reveals a hidden text box when other is selected.
  selectMenu.addEventListener('input', (e) => {
    if (e.target.value == 'other'){
      otherJobRole.style.display = 'block';
    } else {
      otherJobRole.style.display = 'none';
    }
  })
  const designDiv = document.getElementById('design');
  designDiv.addEventListener('focus', (e) => {
    const selectTheme = e.target.firstElementChild;
    selectTheme.style.display = 'none';
  });


  const colorDiv = document.querySelectorAll('#color option:nth-child(n+4)');
  console.log(colorDiv);
  console.log(colorDiv.length);
  colorDiv.style.display = 'none';


























designDiv.addEventListener('change',() => {
    // I had no clue what or how to trigger a selection.
    // https://stackoverflow.com/questions/51033185/addeventlistener-onchange-dropdown-selected-value-javascript
    if (designDiv.options[designDiv.selectedIndex].value == "js puns") {
      colorOptions.style.display = '';
      console.log(colorOptions);
// https://css-tricks.com/useful-nth-child-recipies/
      let punChoices = colorDiv.querySelector('option:nth-child(n+4)');
      console.log(punChoices);
      punChoices.style.display = 'none';

      console.log('it worked!');
    } else if (designDiv.options[designDiv.selectedIndex].value == "heart js") {
      //colorOptions.style.display = '';
      console.log(colorOptions);

      console.log('it still works!');
      }

  });

console.log('testing');
