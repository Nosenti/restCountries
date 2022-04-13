const BASE_URL = "https://restcountries.com/v3.1/all";

const searchInput = document.getElementById("search");
const selectOption = document.getElementById("regions");

let countries, country;

const getCountries = async () => {
  const res = await axios.get(`${BASE_URL}`);
  return res.data;
};

const searchCountry = () => {
  let input = searchInput.value;
  input = input.toLowerCase();
  let x = document.getElementsByClassName("country");

  for (i = 0; i < x.length; i++) {
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
      x[i].style.display = "none";
    } else {
      x[i].style.display = "";
    }
  }
};

const populateUi = async () => {
  let countries = await getCountries();
  let getReg = getRegionValue();
  if (getReg !== "all") {
    countries = countries.filter((country) => {
      return country.region.toLowerCase() == getReg;
    });
  } else {
    countries = countries;
  }
  countries.forEach((country) => {
    populateElement(country);
  });
};

const getRegionValue = () => {
  regValue = selectOption.options[selectOption.selectedIndex].value;
  console.log(regValue);
  return regValue;
};

const populateElement = (element) => {
  countries = document.getElementById("countries");
  country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `
   
    <a href="#">
      <div class="country-flag">
        <img src="${element.flags.png}" alt="flag" />
      </div>
      <div class="country-info">
        <div class="country-name">${element.name.common}</div>
        <div class="country-info__more">
          <p>Population: ${element.population}</p>
          <p>Region: ${element.region}</p>
          <p>Capital: ${element.capital}</p>
        </div>
      </div>
    </a>
 
    `;
  countries.appendChild(country);
};
const resetDOM = () => {
  countries.innerHTML = "";
  populateUi();
};

selectOption.addEventListener("change", resetDOM);
populateUi();
