import { db } from "./firebase.js";

document.addEventListener("DOMContentLoaded", function () {
  // Toggle Read More
  const readMoreBtn = document.getElementById("readMoreBtn");
  const moreAbout = document.getElementById("moreAbout");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      if (moreAbout.style.display === "none" || moreAbout.style.display === "") {
        moreAbout.style.display = "block";
        readMoreBtn.textContent = "Read Less";
      } else {
        moreAbout.style.display = "none";
        readMoreBtn.textContent = "Read More";
      }
    });
  }

  // Form submit
  const form = document.querySelector("form");
  const successMessage = document.getElementById("successMessage");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      try {
        const docRef = await db.collection("escrowRequests").add(data); // If using compat
        successMessage.style.display = "block";
        setTimeout(() => {
          successMessage.style.display = "none";
        }, 3000);
        form.reset();
      } catch (error) {
        alert("Error submitting form.");
        console.error("Submission error:", error);
      }
    });
  }
});
