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
  function pGiftHandler() {
    this.parentElement.click();
  }

  function clickHandler() {
    document.querySelectorAll(".en__pg__select input").forEach((item) => {
      item.removeEventListener("click", pGiftHandler);
      item.addEventListener("click", pGiftHandler);
    });
  }

  clickHandler();

  // Re-add event listeners when radio buttons are reset
  document
    .querySelectorAll(
      ".en__field--recurrpay input, .en__field--donationAmt input"
    )
    .forEach((item) =>
      item.addEventListener("click", (e) => {
        document.querySelector(".en__pg--selected .en__pg__select").click();
        if (e.target.parentElement.classList.contains("en__field--recurrpay")) {
          document
            .querySelectorAll(".en__field--donationAmt input")
            .forEach((item) =>
              item.addEventListener("click", () => {
                setTimeout(clickHandler, 500);
              })
            );
        }

        setTimeout(clickHandler, 500);
      })
    );
};
