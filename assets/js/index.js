document.addEventListener("DOMContentLoaded", () => {
  const btn_signup = document.querySelector("#btn-signup");
  const modal = document.querySelector("#contact");

  btn_signup.addEventListener("click", () => {
    modal.showModal();
    modal.addEventListener("click", function (event) {
      var rect = modal.getBoundingClientRect();
      var isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        modal.close();
      }
    });
  });

  const my_form = document.querySelector("#my_form");
  my_form.addEventListener("submit", async () => {
    const data = {};
    const inputs = document.querySelectorAll("input[name], textarea[name]");
    inputs.forEach((element) => {
      data[element.name] = element.value;
    });

    const dest_url = location.host.search(/netlify.app/)
      ? "https://site--fake-tripvisor--5sgz5mzbgxzv.code.run/form"
      : "http://localhost:3000/form";

    const response = await axios.post(dest_url, data);

    console.log(response.data);
  });
});
