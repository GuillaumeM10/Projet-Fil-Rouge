import { toast } from "react-hot-toast";

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

const filesSizeCheck = (
  fileToCheck, 
  setDisplayedError = false, 
  maxSize = 10000000,
  setSending = false,
  message = `La taille totale des fichiers ne doit pas dépasser ${maxSize / 1000000}mo`
) => {
  let filesSize = 0;
  for (let i = 0; i < fileToCheck.length; i++) {
    filesSize += fileToCheck[i].size;
  }

  if (filesSize > maxSize) {
    if(setDisplayedError !== false) setDisplayedError(message);
    toast.error(message, {
      duration: 5000,
    });
    if(setSending) setSending(false);
    return false;
  }else{
    return true;
  }
}

const FunctionsService = {
  labelDisplay,
  dateFormater,
  filesSizeCheck
}

export default FunctionsService