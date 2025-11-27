addEventListener("DOMContentLoaded", () => {
  // === ABOUT TOGGLE ===
  const aboutLink = document.getElementById("aboutLink");
  const aboutPara = document.getElementById("aboutParagraph");

  aboutLink.addEventListener("click", (e) => {
    e.preventDefault();
    const isVisible = aboutPara.style.display === "block";
    aboutPara.style.display = isVisible ? "none" : "block";
  });

  // === JOBS TOGGLE – STAYS VISIBLE UNTIL CLICKED AGAIN OR OUTSIDE ===
  const jobsToggle = document.querySelector(".mega-dropdown .dropdown-toggle");
  const jobsMenu = document.querySelector(".mega-dropdown .dropdown-menu");

  // Click "Jobs" → toggle menu (stay open)
  jobsToggle.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent document click from closing immediately
    const isOpen = jobsMenu.style.display === "block";
    jobsMenu.style.display = isOpen ? "none" : "block";
    jobsMenu.classList.toggle("show", !isOpen); // for animation
  });

  // Click outside → close menu
  document.addEventListener("click", () => {
    if (jobsMenu.style.display === "block") {
      jobsMenu.style.display = "none";
      jobsMenu.classList.remove("show");
    }
  });

  // Don't close when clicking inside the menu
  jobsMenu.addEventListener("click", (e) => e.stopPropagation());

  // Optional: Close when clicking another nav item
  document.querySelectorAll(".nav-link").forEach((link) => {
    if (!link.closest(".mega-dropdown")) {
      link.addEventListener("click", () => {
        if (jobsMenu.style.display === "block") {
          jobsMenu.style.display = "none";
          jobsMenu.classList.remove("show");
        }
      });
    }
  });
});
// === PAGES TOGGLE – SAME AS JOBS & ABOUT ===
const pagesToggle = document.querySelector(".pages-dropdown .dropdown-toggle");
const pagesMenu = document.querySelector(".pages-dropdown .dropdown-menu");

pagesToggle.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  const isOpen = pagesMenu.style.display === "block";
  pagesMenu.style.display = isOpen ? "none" : "block";
  pagesMenu.classList.toggle("show", !isOpen);
});

// Close when clicking outside
document.addEventListener("click", () => {
  if (pagesMenu.style.display === "block") {
    pagesMenu.style.display = "none";
    pagesMenu.classList.remove("show");
  }
});

pagesMenu.addEventListener("click", (e) => e.stopPropagation());

// Close when clicking other nav items
document.querySelectorAll(".nav-link").forEach((link) => {
  if (!link.closest(".pages-dropdown") && !link.closest(".mega-dropdown")) {
    link.addEventListener("click", () => {
      if (pagesMenu.style.display === "block") {
        pagesMenu.style.display = "none";
        pagesMenu.classList.remove("show");
      }
    });
  }
});
// Owl Carousel (after DOMContentLoaded)
$("#jobCarousel").owlCarousel({
  loop: true,
  margin: 20,
  nav: true,
  responsive: { 0: { items: 1 }, 768: { items: 3 } },
});

// Animate Counters
function animateCounters() {
  $("[data-target]").each(function () {
    $(this)
      .prop("Counter", 0)
      .animate(
        { Counter: $(this).text().replace(/,/g, "") },
        {
          duration: 2000,
          easing: "swing",
          step: function (num) {
            $$(this).text(
              num.toFixed(0).replace(/(\d)(?=(\d{3})+ $$)/g, "$1,")
            );
          },
        }
      );
  });
}
$$(window).on("scroll", function () {
  if ($$(window).scrollTop() > 500) animateCounters();
});
// === INITIALIZE AOS (Animate On Scroll) ===
AOS.init({
  duration: 800, // animation duration
  easing: "ease-in-out",
  once: true, // animate only once
  offset: 100, // trigger 100px before element
});
<a href="job-list.html" class="text-center text-decoration-none mega-item">
  <div class="icon-box mb-2">
    <i class="bi bi-list-ul fs-1 text-orange"></i>
  </div>
  <strong class="d-block">Job List</strong>
</a>;
const applyModal = document.getElementById("applyModal");
const modalFormContent = document.getElementById("modalFormContent");
const modalTitle = document.getElementById("modalTitle");

applyModal.addEventListener("show.bs.modal", function () {
  // Reset to form every time modal opens
  modalTitle.textContent = "Apply for Job";
  modalFormContent.innerHTML = `
        <form id="applyForm">
          <div class="mb-3">
            <label class="form-label fw-600">Full Name</label>
            <input type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-600">Email</label>
            <input type="email" class="form-control" required />
          </div>
          <div class="mb-4">
            <label class="form-label fw-600">Resume (PDF)</label>
            <input type="file" class="form-control" accept=".pdf" />
          </div>
          <button type="submit" class="btn btn-orange w-100 fw-bold">
            Submit Application
          </button>
        </form>
      `;

  // Add submit event after form is created
  document.getElementById("applyForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Change title
    modalTitle.textContent = "Success!";

    // Show beautiful green success message
    modalFormContent.innerHTML = `
          <div class="text-center py-5">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 5rem; color: #10b981 !important;"></i>
            <h3 class="mt-4 fw-bold" style="color: #10b981;">Application Submitted Successfully!</h3>
            <p class="text-muted lead">Thank you! We have received your application.<br>We will contact you soon via email.</p>
            <button class="btn btn-orange px-5 mt-3" data-bs-dismiss="modal">Close</button>
          </div>
        `;
  });
});
