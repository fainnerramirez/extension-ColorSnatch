document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.querySelector("#date");
    if (dateElement) dateElement.textContent = new Date().getFullYear();
    const buttonPassenger = document.querySelector("#avianca__action__passenger");
    let timeOutButton;
    if (buttonPassenger) {
        buttonPassenger.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormValues' });
                console.log("Message Send");
                buttonPassenger.textContent = "Generando valores...";
                timeOutButton = setTimeout(() => {
                    const elementI = document.createElement("i");
                    elementI.classList.add("fa-solid", "fa-user-plus");
                    const elementText = document.createElement("p");
                    elementText.textContent = "Completar valores del formulario";
                    buttonPassenger.textContent = "";
                    buttonPassenger.appendChild(elementI);
                    buttonPassenger.appendChild(elementText);
                }, 2000);
            });
        });
    } else {
        console.error("No se ha encontrado el botón de PASAJEROS en el side panel.");
    }
    clearTimeout(timeOutButton);
});