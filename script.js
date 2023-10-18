const flagButton = document.getElementById("flag-btn");

// Set default selected country to United States;
let selectedCountry = "United States";
let selectedCurrency = "USD";

// Create span to hold currency
const currencySpan = document.createElement("span");
currencySpan.textContent = selectedCurrency;
currencySpan.id = "currencySpan";

// Function to update the currency span
function updateCurrency(currency) {
  currencySpan.textContent = currency;
}

// Function to fetch flag image and currency
function fetchFlagAndCurrency(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      const flagUrl = data[0].flags.png; // Assuming the API response contains flag information
      flagButton.style.backgroundImage = `url('${flagUrl}')`;

      // Get the currency information
      const currencyInfo = data[0].currencies;
      if (currencyInfo) {
        // Extract the currency code
        const currencyCode = Object.keys(currencyInfo)[0];

        if (currencyCode) {
          // Update the selected currency
          selectedCurrency = currencyCode;
          // Update the currencySpan with the selected currency
          updateCurrency(selectedCurrency);
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching flag:", error);
    });
}

// Set the default flag and currency to the USA
fetchFlagAndCurrency("United States");

// Function to create a centered pop-up for country selection
function createCountrySelectionPopup() {
  // Fetch the list of all countries
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      // Sort the data array alphabetically by country name
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      // Create popup container and classname for it
      const popup = document.createElement("div");
      popup.className = "popup";

      // Create heading for popup
      const shopIn = document.createElement("h3");
      shopIn.id = "shopIn";
      shopIn.textContent = "Shop In:";

      // Create select element and give that an id
      const select = document.createElement("select");
      select.id = "countrySelect";

      // Populate the selection box with country options
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.name.common;
        option.textContent = country.name.common;
        select.appendChild(option);
      });

      // Set the default selected option to the previously selected country
      const defaultOption = select.querySelector(
        `[value="${selectedCountry}"]`
      );
      if (defaultOption) {
        defaultOption.selected = true;
      }

      // Create a heading to display currency
      const currencyHeading = document.createElement("h3");
      currencyHeading.id = "currencyHeading";
      currencyHeading.textContent = "Currency:";

      // Create button to update the location
      const button = document.createElement("button");
      button.textContent = "Update Location";
      button.id = "selectBtn";

      // Update country and currency without closing the popup
      button.addEventListener("click", function () {
        selectedCountry = select.value;
        fetchFlagAndCurrency(selectedCountry);
        currencySpan.style.display = "block";
      });

      // Add a close button (X) in the top-right corner
      const closeButton = document.createElement("button");
      closeButton.textContent = "X";
      closeButton.className = "close-button";

      // Add click event listener to close popup
      closeButton.addEventListener("click", function () {
        popup.style.display = "none";
      });

      // Add elements to popup and make popup pop up
      popup.appendChild(closeButton);
      popup.appendChild(shopIn);
      popup.appendChild(select);
      popup.appendChild(currencyHeading);
      popup.appendChild(currencySpan);
      popup.appendChild(button);
      document.body.appendChild(popup);

      // Center the pop-up on the screen
      popup.style.left = `${(window.innerWidth - popup.offsetWidth) / 2}px`;
      popup.style.top = `${(window.innerHeight - popup.offsetHeight) / 2}px`;
    })

    // Log an error message if there's an error getting data from the API
    .catch((error) => {
      console.error("Error fetching country list:", error);
    });
}

// Add a click event listener to the button
flagButton.addEventListener("click", function () {
  createCountrySelectionPopup();
});
