/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

  const nameInput = document.getElementById('name');
	const mailInput = document.getElementById('mail');
	const otherJobRole = document.getElementById('other-title')
	const selectMenu = document.getElementById('title');
	const designDiv = document.getElementById('design');
  const colorOptions = document.getElementById('color');
	const activField = document.querySelector('.activities');
	const activityInput = activField.firstElementChild;
	const payOptions = document.getElementById('payment');
	const paymentDivs = document.querySelectorAll("#credit-card, #paypal, #bitcoin");
	const creditCardInput = document.getElementById('cc-num');
	const zipInput = document.getElementById('zip');
	const cvvInput = document.getElementById('cvv');

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
// For reset purpose; hides forms unless selected.
	function hideAllPayForms() {
		for (let i = 0; i < paymentDivs.length	; i++) {
			paymentDivs[i].style.display = "none"
		}
	}
	hideAllPayForms();
// Set default for payment section.
	paymentDivs[0].style.display = "";
	const selectPay = payOptions.firstElementChild;
	selectPay.style.display = 'none';
	payOptions.selectedIndex = 1;
// Displays form for selected pay option and hides rest.
	payOptions.addEventListener('change', (e) => {
		let payTarget = e.target;
		const creditCardDiv = document.getElementById('credit-card');
		const paypalDiv = document.getElementById('paypal');
		const bitcoinDiv = document.getElementById('bitcoin');
		hideAllPayForms();
			if (payTarget.value === 'credit card') {
				creditCardDiv.style.display = "";
			} if (payTarget.value === 'paypal') {
				paypalDiv.style.display = "";
			} if (payTarget.value === 'bitcoin') {
					bitcoinDiv.style.display = "";
				}
	});

// Checks that at least 1 checkbox is checked.
 	activField.addEventListener('change', (e) => {
		const activGroup = activField.getElementsByTagName('input');
		const theSpan = activField.firstElementChild.nextElementSibling;
		let totalChecked = 0;
		for (let i = 0; i < activGroup.length	; i++) {
			if (activGroup[i].checked)
			totalChecked++
		}
		if (totalChecked === 0) {
				theSpan.style.display = "inherit";
		} if (totalChecked > 0) {
				theSpan.style.display = "none";
			}
	});

// Add spans(with error fix instructions) to each required input.
	function createAlerts (target, content){
		let newSpan = document.createElement('span');
		newSpan.innerHTML = content;
		target.parentNode.insertBefore(newSpan, target.nextSibling);
		newSpan.style.display = "none";
	}
	createAlerts(nameInput, 'Entered name can only contain letters A-Z and special characters');
	createAlerts(mailInput, 'Must enter valid email address');
	createAlerts(activityInput, 'Please select activity');
	createAlerts(creditCardInput, 'Credit card should be 13-16 digits');
	createAlerts(zipInput, 'Enter your 5 digit code');
	createAlerts(cvvInput, 'Enter 3 digit number on the back of the credit card')

	function isValidName(text) {
		return /^[a-z ]+$/i.test(text);
	}
	function isValidEmail(text) {
		return /^[^@]+@[^@]+\.[a-z]+$/i.test(text);
	}
	function isValidCardNumber(text) {
		return /^(\d[ -]*?){13,16}$/.test(text);
	}
	function isValidZipCode(text) {
		return /^\d{5}$/.test(text);
	}
	function isValidCVV(text){
		return /^\d{3}$/.test(text);
	}
// Show or hide spans
	function showOrHideTip(show, element) {
	  if (show) {
	    element.style.display = "inherit";
	  } else {
	    element.style.display = "none";
	  }
	}
	function createListener(validator) {
	  return e => {
	    const text = e.target.value;
	    const valid = validator(text);
			const showTip = text !== "" && !valid;
	    const tooltip = e.target.nextElementSibling;
			showOrHideTip(showTip, tooltip);
	  };
	}
	nameInput.addEventListener("input", createListener(isValidName));
	mailInput.addEventListener("input", createListener(isValidEmail));
	creditCardInput.addEventListener("input", createListener(isValidCardNumber));
	zipInput.addEventListener("input", createListener(isValidZipCode));
	cvvInput.addEventListener("input", createListener(isValidCVV));

//6:30AM for the onsubmit function... check the credit card section first
//to be true, and then with the paypal and bitcoin selecetions made


/*
	2 errors I cant figure out:
	*why selection boxes shift up slightly?
	*should the entire checkbox line auto gray when disabled, or just the box?
	*will the errors clear when i apply the submit verifier

	Need to add:
	CSS normalize and reset
*/
