const form = document.getElementById("contact-form");
const message = document.querySelector(".user-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch("https://cors-anywhere.herokuapp.com/http://161.35.29.72/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        message.innerHTML = "something went wrong, try again.";
        message.style.color = "#F3341F";
        showMessageTemporarily();
        throw new Error("something went wrong");
      }
      message.innerHTML = "successfully sent!";
      message.style.color = "#1c2b40";
      form.reset();
      showMessageTemporarily();
      console.log(res.json());
    })
    .catch((err) => console.log(err));
});

function showMessageTemporarily() {
  setTimeout(() => {
    message.innerHTML = "";
  }, 10000);
}
