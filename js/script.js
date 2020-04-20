/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// Global Variables
		const fsForm = document.querySelector('form');
		fsForm.parentElement.id = "top";
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
// Add "Please select a T-shirt theme" to the color options dropdown and show.
		const selectAColorTheme = document.createElement('option');
		selectAColorTheme.textContent = "Please select a T-shirt theme";
		colorOptions[0].parentNode.insertBefore(selectAColorTheme, colorOptions.firstElementChild);
		colorOptions.selectedIndex = 0;
		for (let i = 0; i < colorOptions.length; i++) {
			colorOptions[i].style.display = 'none';
		};
		colorOptions.parentElement.style.display = "none";
// Filters the available colors after making a design selection.
  	designDiv.addEventListener('change',(e) => {
		colorOptions.parentElement.style.display = "";
		const designTarget = e.target;
		const punOptions = colorOptions.querySelectorAll("option:nth-child(-n+4)");
    const heartOptions = colorOptions.querySelectorAll("option:nth-child(n+5)");
		for (let i = 1; i < colorOptions.length; i++) {
			colorOptions[i].style.display = '';
		};
    if (designTarget.value == "js puns") {
        for (let i = 0; i < heartOptions.length; i++) {
          heartOptions[i].style.display = 'none';
// Shows desired option in drop-down menu --> https://stackoverflow.com/questions/8605516/default-select-option-as-blank
				}
				colorOptions.selectedIndex = 1;
    } else if (designTarget.value == "heart js") {
        for (let i = 0; i < punOptions.length; i++) {
          punOptions[i].style.display = 'none';
        }
				colorOptions.selectedIndex = 4;
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
			newSpan.className = "animated slideInDown spanner";
		}
		createAlerts(nameInput, 'Name must not be left blank or use numbers.');
		createAlerts(mailInput, 'Enter a valid email address; cannot be left blank.');
		createAlerts(activityInput, 'One or more activities must be selected.');
		createAlerts(creditCardInput, 'Use numbers only; must be 13 to 16 digits.');
		createAlerts(creditCardInput, 'Enter valid Credit Card number.');
		createAlerts(zipInput, 'Enter your billing 5 digit zip code.');
		createAlerts(cvvInput, 'Enter the 3 digits CVV code associated with your payment card.');
// Necessary variable here to be able to target after created.
		const spanners = document.querySelectorAll('.spanner');
		function hideSpanner() {
			for (let i = 0; i < spanners.length	; i++) {
				spanners[i].style.display = "none";
			}
		}
		hideSpanner();
// Creates and adds red arrow shaped divs.
		const fieldset = document.querySelectorAll('fieldset');
		function addArrow(field) {
			let newDiv = document.createElement('div');
			newDiv.className = "redArrow";
			field.insertBefore(newDiv, field.firstElementChild);
			field.firstElementChild.style.visibility = "hidden";
		}
		for (let i = 0; i < fieldset.length; i++) {
			addArrow(fieldset[i]);
		}
// Validators for required all fields.
		function isValidName(text) {
			return /^[a-z][a-z '-.]*$/i.test(text);
		}
		function isValidEmail(text) {
			return /^[^@]+@[^@]+\.[a-z][a-z]+$/i.test(text);
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
					spanners[2].style.display = "inherit";
					fieldset[2].firstElementChild.style.visibility = "visible";
					fieldset[2].firstElementChild.nextElementSibling.style.color = "salmon";
			} else {
					hideSpanner();
					spanners[2].style.display = "none";
					fieldset[2].firstElementChild.style.visibility = "hidden";
					fieldset[2].firstElementChild.nextElementSibling.style.color = "rgba(6, 49, 68, 0.9)";
				}
		});
// Conditional function to show or hide fix spans.
		function showOrHideTip(show, element) {
			let target = element;
			let ccTarget = element.parentElement.parentElement;
			function doThis (x){
				target.style.border = "2px solid salmon";

				x.parentElement.firstElementChild.style.visibility = "visible";
				x.parentElement.firstElementChild.nextElementSibling.style.color = "salmon";
			}
			if (show) {
				hideSpanner();
				if (element.id === 'name'){
					doThis(target);
					target.nextElementSibling.style.display = "";
				}
				if (element.id === 'mail'){
					doThis(target);
					target.nextElementSibling.style.display = "";
				}
// Display different fix instruction for credit card inputs.
				if (element.id === 'cc-num'){
					if (element.value.length == 0) {
						doThis(ccTarget);
						spanners[3].style.display = "";
				} else {
						doThis(ccTarget);
						spanners[4].style.display = "";
					}
				}
				if (element.id === 'zip'){
					doThis(ccTarget);
					target.nextElementSibling.style.display = "";
				}
				if (element.id === 'cvv'){
					doThis(ccTarget);
					target.nextElementSibling.style.display = "";
				}
			} else {
					hideSpanner()
					element.style.border = "2px solid rgb(111, 157, 220)";
					if (element.parentElement.parentElement.id === "credit-card") {
						ccTarget.parentElement.firstElementChild.style.visibility = "hidden";
						ccTarget.parentElement.firstElementChild.nextElementSibling.style.color = "rgba(6, 49, 68, 0.9)";
					} else {
						element.parentElement.firstElementChild.style.visibility = "hidden";
						element.parentElement.firstElementChild.nextElementSibling.style.color = "rgba(6, 49, 68, 0.9)";
					}
		  }
		}
// Listener for to process validation functions
		function createListener(validator) {
		  return e => {
		    const text = e.target.value;
		    const valid = validator(text);
				const showTip = text === "" || !valid;
		    const tooltip = e.target;
				showOrHideTip(showTip, tooltip);
		  };
		}
// Tests string regex while typing.
		nameInput.addEventListener("input", createListener(isValidName));
		mailInput.addEventListener("input", createListener(isValidEmail));
		creditCardInput.addEventListener("input", createListener(isValidCardNumber));
		zipInput.addEventListener("input", createListener(isValidZipCode));
		cvvInput.addEventListener("input", createListener(isValidCVV));
// Listener can ignore nameInput.focus(); avoids load with error message, and will catch if user skips/ignores.
		nameInput.addEventListener("blur", createListener(isValidName));
// Displays fix instructions when red input box is selected.
		zipInput.addEventListener("focus", createListener(isValidZipCode));
		cvvInput.addEventListener("focus", createListener(isValidCVV));
		nameInput.addEventListener("focus", createListener(isValidName));
		mailInput.addEventListener("focus", createListener(isValidEmail));
		creditCardInput.addEventListener("focus", createListener(isValidCardNumber));
//Form validation: checks each validator before allowing to submit.
		fsForm.addEventListener("submit", (e) => {
			if (payOptions.value == 'credit card') {
				if (!isValidCVV(cvvInput.value)) {
					cvvInput.nextElementSibling.style.display = "";
					cvvInput.focus();
					fieldset[3].firstElementChild.style.visibility = "visible";
					fieldset[3].firstElementChild.nextElementSibling.style.color = "salmon";
					cvvInput.style.border = "2px solid salmon";
					e.preventDefault();
				}
				if (!isValidZipCode(zipInput.value)) {
					zipInput.nextElementSibling.style.display = "";
					zipInput.focus();
					fieldset[3].firstElementChild.style.visibility = "visible";
					fieldset[3].firstElementChild.nextElementSibling.style.color = "salmon";
					zipInput.style.border = "2px solid salmon";
					e.preventDefault();
				}
				if (!isValidCardNumber(creditCardInput.value)) {
					creditCardInput.nextElementSibling.style.display = "";
					window.location.href = "#payment";
					fieldset[3].firstElementChild.style.visibility = "visible";
					fieldset[3].firstElementChild.nextElementSibling.style.color = "salmon";
					creditCardInput.style.border = "2px solid salmon";
					e.preventDefault();
				}
			}
			if (totalCost == 0) {
				spanners[2].style.display = "";
				window.location.href = "#colors-js-puns";
				fieldset[2].firstElementChild.style.visibility = "visible";
				fieldset[2].firstElementChild.nextElementSibling.style.color = "salmon";
				e.preventDefault();
			}
			if (!isValidEmail(mailInput.value)) {
				mailInput.nextElementSibling.style.display = "";
				window.location.href = "#top";
				fieldset[0].firstElementChild.style.visibility = "visible";
				fieldset[0].firstElementChild.nextElementSibling.style.color = "salmon";
				mailInput.style.border = "2px solid salmon";
				e.preventDefault();
			}
			if (!isValidName(nameInput.value)) {
				nameInput.nextElementSibling.style.display = "";
				window.location.href = "#top";
				fieldset[0].firstElementChild.style.visibility = "visible";
				fieldset[0].firstElementChild.nextElementSibling.style.color = "salmon";
				nameInput.style.border = "2px solid salmon";
				e.preventDefault();
		 	}
			hideSpanner();
		});
