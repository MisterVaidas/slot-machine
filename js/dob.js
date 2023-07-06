document.getElementById("play-now").addEventListener("click", function () {
  document.getElementById("dob-modal").style.display = "block";
});

window.onload = function () {
  document.getElementById("enter").addEventListener("click", function () {
    let dob = new Date(document.getElementById("dob").value);
    let today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    let m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    if (age >= 18) {
      // Redirect to slotMachine.html
      window.location.href = "slotMachine.html";
    } else {
      // Display error message in modal
      document.getElementById("error-message").textContent =
        "You must be 18 or older to play.";
    }
  });
};
