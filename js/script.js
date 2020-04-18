/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// Global Variables
		const fsForm = document.querySelector('form');
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
// Sets the site to load with the nameInput field ready.
	  nameInput.focus();
// Hides the text box.
	  otherJobRole.style.display = 'none';
// Displays the text box when 'other' is selected.
	  selectMenu.addEventListener('input', (e) => {
	    if (e.target.value == 'other'){
	      otherJobRole.style.display = 'block';
	    } else {
	      otherJobRole.style.display = 'none';
	    }
	  })
// Hides "select theme" when the design dropdown is focused.
	  designDiv.addEventListener('focus', (e) => {
			const selectTheme = e.target.firstElementChild;
	    selectTheme.style.display = 'none';
	  });
// Filters the available colors after making a design selection.
	  designDiv.addEventListener('change',(e) => {
			const designTarget = e.target;
			const punOptions = colorOptions.querySelectorAll("option:nth-child(-n+3)");
	    const heartOptions = colorOptions.querySelectorAll("option:nth-child(n+4)");
	    for (let i = 0; i < colorOptions.length; i++) {
	      colorOptions[i].style.display = '';
	    };
	    if (designTarget.value == "js puns") {
	        for (let i = 0; i < 3; i++) {
	          heartOptions[i].style.display = 'none';
// Shows desired option in drop-down menu --> https://stackoverflow.com/questions/8605516/default-select-option-as-blank
						colorOptions.selectedIndex = 0;
	        };
	    } else if (designTarget.value == "heart js") {
	        for (let i = 0; i < 3; i++) {
	          punOptions[i].style.display = 'none';
						colorOptions.selectedIndex = 3;
	        };
	      }
	  });
// New element stores and shows the total cost of selected activities.
	  let costDiv = document.createElement('div');
		let totalCost = 0;
	  costDiv.textContent = 'Total: $' + totalCost;
	  activField.appendChild(costDiv);
// Updates the cost shown on the site for every change in the checkox inputs.
	  function updateCost() {
	    costDiv.textContent = 'Total: $' + totalCost;
	  };
// Calculates total cost for every checked input, and disables inputs with time conflicts.
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
				for (let i = 0; i < checkBoxes.length; i++){
				 if (checkBoxes[i].name !== checkBox.name && checkBoxes[i].dataset.dayAndTime === checkBoxDate) {
						checkBoxes[i].disabled = false;
					}
		    }
			}
			updateCost();
	  });
// Setup and reset purposes; hides the payment divs to shows only selected.
		function hideAllPayForms() {
			for (let i = 0; i < paymentDivs.length	; i++) {
				paymentDivs[i].style.display = "none"
			}
		}
// Set default for payment section.
		hideAllPayForms();
		paymentDivs[0].style.display = "";
		const selectPay = payOptions.firstElementChild;
		selectPay.style.display = 'none';
		payOptions.selectedIndex = 1;
// Displays form for selected pay option and hides others.
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
// Adds spans with fix directions to each required input.
		function createAlerts (target, content){
			let newSpan = document.createElement('span');
			newSpan.innerHTML = content;
			target.parentNode.insertBefore(newSpan, target.nextSibling);
			newSpan.className = "animated slideInDown";
			newSpan.style.display = "none";
		}
		createAlerts(nameInput, '<u><b>Name:</b></u> numbers may not be used');
		createAlerts(mailInput, '<u><b>Email:</b></u> must enter valid address');
		createAlerts(activityInput, '<u><b>Register for Activities:</b></u> please make selection(s)');
		createAlerts(creditCardInput, '<u><b>Card Number:</b></u> must be 13-16 digits long');
		createAlerts(zipInput, '<u><b>Zip Code:</b></u> must be 5 digit long');
		createAlerts(cvvInput, '<u><b>CVV:</b></u> must be 3 digits long.');
// Necessary variable here to be able to target after created.
		const theSpan = activField.firstElementChild.nextElementSibling;
// Validators for required all fields.
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
// Checks that at least 1 checkbox is checked.
 	activField.addEventListener('change', (e) => {
			if (totalCost == 0) {
					theSpan.style.display = "inherit";
			} if (totalCost > 0) {
					theSpan.style.display = "none";
				}
		});
// Conditional function to show or hide fix spans.
		function showOrHideTip(show, element) {
		  if (show) {
		    element.style.display = "inherit";
		  } else {
		    element.style.display = "none";
		  }
		}
// Listener for to process validation functions
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
// Form validation: checks each validator before allowing to submit.
		fsForm.addEventListener("submit", (e) => {
			if (payOptions.value == 'credit card') {
				if (!isValidCVV(cvvInput.value)) {
					cvvInput.nextElementSibling.style.display = "";
					cvvInput.nextElementSibling.style.zIndex = 5;
					cvvInput.focus();
					e.preventDefault();
				}
				if (!isValidZipCode(zipInput.value)) {
					zipInput.nextElementSibling.style.display = "";
					zipInput.nextElementSibling.style.zIndex = 6;
					zipInput.focus();
					e.preventDefault();
				}
				if (!isValidCardNumber(creditCardInput.value)) {
					creditCardInput.nextElementSibling.style.display = "";
					creditCardInput.nextElementSibling.style.zIndex = 7;
					creditCardInput.focus();
					e.preventDefault();
				}
			}
			if (totalCost == 0) {
				theSpan.style.display = "";
				theSpan.style.zIndex = 8;
				theSpan.focus();
				e.preventDefault();
			}
			if (!isValidEmail(mailInput.value)) {
				mailInput.nextElementSibling.style.display = "";
				mailInput.nextElementSibling.style.zIndex = 9;
				mailInput.focus();
				e.preventDefault();
			}
			if (!isValidName(nameInput.value)) {
				nameInput.nextElementSibling.style.display = "";
				nameInput.nextElementSibling.style.zIndex = 10;
				nameInput.focus();
				e.preventDefault();
		 	}
		});

/*
	3 errors I cant figure out:
	* why does the text in selection boxes shift up slightly?
	* should the entire checkbox line auto gray when disabled? or just the box? how to gray the text too?
	* cannot get focus() on activities. 
*/
