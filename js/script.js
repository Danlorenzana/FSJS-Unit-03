/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

  const nameInput = document.getElementById('name');
	const otherJobRole = document.getElementById('other-title')
	const selectMenu = document.getElementById('title');
	const designDiv = document.getElementById('design');
  const colorOptions = document.getElementById('color');
	const activField = document.querySelector('.activities');
	const payOptions = document.getElementById('payment');
	const paymentDivs = document.querySelectorAll("#credit-card, #paypal, #bitcoin")
	const creditCardDiv = document.getElementById('credit-card');
	const paypalDiv = document.getElementById('paypal');
	const bitcoinDiv = document.getElementById('bitcoin');

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

    const punOptions = colorOptions.querySelectorAll("option:nth-child(-n+3)");
    const heartOptions = colorOptions.querySelectorAll("option:nth-child(n+4)");
    for (let i = 0; i < colorOptions.length; i++) {
      colorOptions[i].style.display = '';
    };
// Trigger a selection with .selectedIndex --> https://stackoverflow.com/questions/51033185/addeventlistener-onchange-dropdown-selected-value-javascript
    if (designDiv.options[designDiv.selectedIndex].value == "js puns") {
        for (let i = 0; i < 3; i++) {
          heartOptions[i].style.display = 'none';
					colorOptions.selectedIndex = 0; //https://stackoverflow.com/questions/8605516/default-select-option-as-blank
        };
    } else if (designDiv.options[designDiv.selectedIndex].value == "heart js") {
        for (let i = 0; i < 3; i++) {
          punOptions[i].style.display = 'none';
					colorOptions.selectedIndex = 3;
        };
      }
  });


// New element to store and display the total cost.
  let costDiv = document.createElement('div');
	let totalCost = 0;
  costDiv.textContent = 'Total: $' + totalCost;
  activField.appendChild(costDiv);
// Updates the cost shown on the site for every change in the checkox inputs.
  function updateCost() {
    costDiv.textContent = 'Total: $' + totalCost;
  };
// Add/Subract the totalCost value with changes to checked status of an input.
// Also disable items with conflicting time.
  activField.addEventListener('change', (e) => {
    const checkBox = e.target;
    const isChecked = e.target.checked;
    let checkBoxCost = checkBox.dataset.cost;
    let checkBoxDate = checkBox.dataset.dayAndTime;
    let checkBoxes = activField.querySelectorAll('input');

		if (isChecked) {
			totalCost += parseInt(checkBoxCost);
			if (checkBox.name === "all") {
				for (let i = 1; i < checkBoxes.length; i++){ //wish this were more elegant
				checkBoxes[i].disabled = true;
				}
			}
			for (let i = 0; i < checkBoxes.length; i++){
	      if (checkBoxes[i].name !== checkBox.name && checkBoxes[i].dataset.dayAndTime === checkBoxDate) {
					checkBoxes[i].disabled = true;
				}
	    }
		}
		if (!isChecked) {
			totalCost -= parseInt(checkBoxCost);
			if (checkBox.name === "all") {
				for (let i = 1; i < checkBoxes.length; i++){
				checkBoxes[i].disabled = false;
				}
			}
			for (let i = 0; i < checkBoxes.length; i++){
			 if (checkBoxes[i].name !== checkBox.name && checkBoxes[i].dataset.dayAndTime === checkBoxDate) {
					checkBoxes[i].disabled = false;
				}
	    }
		}
		updateCost();
  });


		const selectTheme = payOptions.firstElementChild;
		selectTheme.style.display = 'none';
		payOptions.selectedIndex = 1; // This can be adjusted, dont understand instructions/expectations

// Hide all payment forms except selected.
	// function hidePayForms () {
	// 	for (let i = 0; i < paymentDivs.length; i++){
	// 	paymentDivs[i].style.display = "none";
	// 	}
	//
	// };

	// for (let i = 0; i < paymentDivs.length; i++) {
	// 	paymentDivs[i].style.display = "none";
	//
	// };


	payOptions.addEventListener('change', (e) => {
		let payTarget = e.target;
		let paySelected = payTarget.selectedIndex

		console.log(paySelected);

		creditCardDiv.style.display = "none";
		paypalDiv.style.display = "none";
		bitcoinDiv.style.display = "none";

		for (let i = 0; i < paymentDivs.length; i++) {

			if (paySelected[i].value === 'credit card') {
				creditCardDiv.style.display = "";

				console.log('credit cards!!!');
			} else if (paySelected[i].value === 'paypal') {

				paypalDiv.style.display = "";

				console.log('paypal!!!');
			} else if (paySelected[i].value === 'bitcoin') {


					bitcoinDiv.style.display = "";
					console.log('bitcoin!!!');
				}
		}
	});
