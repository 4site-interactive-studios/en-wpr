if ("pageJson" in window && window.pageJson.pageType === "premiumgift") {
  const removeError = () => {
    const error = document.querySelector(
      ".en__pg__optionType + .en__field__error"
    );
    if (error) {
      error.remove();
    }
  };
  const toggleSubmit = () => {
    const premiumVariant = document.querySelector(".en__pg--selected select");
    const submit = document.querySelector(".en__submit button");
    const premiumGiftLabel = document.querySelector(
      ".en__pg--selected .en__pg__optionTypes label"
    );
    if (
      premiumVariant &&
      premiumVariant.options[premiumVariant.selectedIndex].innerText.includes(
        "Select"
      )
    ) {
      submit.disabled = true;
      submit.setAttribute(
        "title",
        `Please select your ${premiumGiftLabel.innerText.toLowerCase()}.`
      );
    } else {
      submit.disabled = false;
      submit.removeAttribute("title");
    }
  };
  const addError = () => {
    const premiumContainer = document.querySelector(".en__pg--selected");
    const premiumVariant = premiumContainer.querySelector("select");
    if (premiumVariant && premiumVariant.selectedIndex === 0) {
      const premiumGiftContainer = premiumVariant.closest(
        ".en__pg__optionTypes"
      );
      const premiumGiftLabel = premiumGiftContainer.querySelector("label");
      const message = `<div class="en__field__error">Please select your ${premiumGiftLabel.innerText.toLowerCase()}.</div>`;
      premiumGiftContainer.insertAdjacentHTML("beforeend", message);
    }
  };

  ["click", "change"].forEach(function (event) {
    document.addEventListener(event, (e) => {
      removeError();
      const element = e.target;
      const premiumGift = element.closest(".en__pg__body");
      if (premiumGift) {
        if (element.type !== "radio") {
          const premiumGiftInput = premiumGift.querySelector('[name="en__pg"]');
          if (premiumGiftInput) {
            const premiumGiftValue = premiumGiftInput.value;
            window.setTimeout(() => {
              const newPremiumGift = document.querySelector(
                '[name="en__pg"][value="' + premiumGiftValue + '"]'
              );
              if (newPremiumGift) {
                newPremiumGift.checked = true;
                newPremiumGift.dispatchEvent(new Event("change"));
              }
              toggleSubmit();
              addError();
            }, 100);
          }
        }
      }
    });
  });
}

// Show error when radio button is clicked and dropdown isn't selected
window.onload = function () {
  document.querySelectorAll(".en__pg__select input").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.target.parentElement.click();
    });
  });
};
