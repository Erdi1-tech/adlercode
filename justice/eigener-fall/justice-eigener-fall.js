(() => {
  const form = document.querySelector("[data-justice-own-case]");
  if (!form) return;

  const saveButton = form.querySelector("[data-justice-demo-save]");
  const feedback = form.querySelector("[data-justice-demo-feedback]");

  saveButton?.addEventListener("click", () => {
    saveButton.textContent = "Demo vorgemerkt";
    saveButton.disabled = true;
    if (feedback) {
      feedback.textContent =
        "Diese Demo zeigt den späteren Ablauf. Echte Speicherung und Veröffentlichung werden mit Benutzerkonto und Datenbank verbunden.";
    }
  });
})();
