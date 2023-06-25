const labelDisplay = (e) => {
  const label = e.target.previousElementSibling;
  if (e.target.value !== "") {
    label.classList.add("active");
  } else {
    label.classList.remove("active");
  }
}

const dateFormater = (date) => {
  // from Wed Jun 21 2023 02:00:00 GMT+0200 (heure d’été d’Europe centrale) to 21/06/2023
  const dateFormated = new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  }).split('/').reverse().join('/');
  return dateFormated;
}

const FunctionsService = {
  labelDisplay,
  dateFormater
}

export default FunctionsService