let currentStep = 0;

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".form-step");
  const indicators = document.querySelectorAll(".step");
  const nextBtn = document.querySelector(".btn-primary");
  const backBtn = document.querySelector(".btn-secondary");

  function updateStep() {
    steps.forEach((s, i) => s.classList.toggle("active", i === currentStep));
    indicators.forEach((s, i) => s.classList.toggle("active", i === currentStep));

    backBtn.style.display = currentStep === 0 ? "none" : "inline-block";
    nextBtn.textContent = currentStep === steps.length - 1 ? "Save Profile" : "Next →";
  }

  nextBtn.addEventListener("click", () => {
    const currentFormStep = steps[currentStep];
    const inputs = currentFormStep.querySelectorAll("input, select");
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '#e2e8f0';
      }
    });

    if (!isValid) {
      showNotification('Please fill all fields', 'error');
      return;
    }

    if (currentStep < steps.length - 1) {
      currentStep++;
    } else {
      saveProfile();
    }
    updateStep();
  });

  backBtn.addEventListener("click", () => {
    if (currentStep > 0) currentStep--;
    updateStep();
  });

  updateStep();
  loadSavedProfile();
});

function loadSavedProfile() {
  const profile = StorageManager.get('profile', {});
  const inputs = document.querySelectorAll("input, select");

  inputs.forEach(input => {
    const label = input.previousElementSibling?.innerText || '';
    if (profile[label]) {
      input.value = profile[label];
    }
  });
}

function saveProfile() {
  const steps = document.querySelectorAll(".form-step");
  const data = {};

  steps.forEach(step => {
    const inputs = step.querySelectorAll("input, select");
    inputs.forEach(input => {
      const label = input.previousElementSibling?.innerText || input.name || 'Unknown';
      data[label] = input.value;
    });
  });

  StorageManager.set('profile', data);
  showNotification('Profile saved successfully!', 'success');
  
  setTimeout(() => {
    navigateTo('dashboard.html');
  }, 1500);
}
