document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".auth-form");
  
    if (!form) return;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const email = form.querySelector("input[type='email']").value;
      const role = form.querySelector("select").value;
  
      // Fake auth
      localStorage.setItem("user", JSON.stringify({
        email,
        role,
        name: "User"
      }));
  
      window.location.href = "dashboard.html";
    });
  });
  