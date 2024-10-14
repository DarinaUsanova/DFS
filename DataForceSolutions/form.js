const form = document.getElementById("contact-form");

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
        document.querySelector(".message-card textarea").style.border =
          "2px solid red";
        throw new Error("Something went wrong");
      }
      document.querySelector(".message-card textarea").style.border =
        "2px solid green";
      console.log(res.json());
    })
    .catch((err) => console.log(err));
});
