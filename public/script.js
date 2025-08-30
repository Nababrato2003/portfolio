// Smooth active-link highlighting with IntersectionObserver
const sections = document.querySelectorAll("main section[id]")
const navLinks = document.querySelectorAll(".nav__link")
const backToTopBtn = document.getElementById("backToTop")
const yearEl = document.getElementById("year")
const themeToggleBtn = document.getElementById("theme-toggle")

if (yearEl) {
  yearEl.textContent = new Date().getFullYear().toString()
}

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`)
  })
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id)
      }
    })
  },
  {
    root: null,
    rootMargin: "0px 0px -65% 0px", // trigger a bit earlier
    threshold: 0.1,
  },
)

sections.forEach((section) => observer.observe(section))

// Back to top button visibility
const toggleBackToTop = () => {
  if (window.scrollY > 600) {
    backToTopBtn?.classList.add("is-visible")
  } else {
    backToTopBtn?.classList.remove("is-visible")
  }
}
window.addEventListener("scroll", toggleBackToTop)
backToTopBtn?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }))

const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
const storedTheme = localStorage.getItem("theme")
const root = document.documentElement

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark")
    themeToggleBtn?.setAttribute("aria-pressed", "true")
  } else {
    root.removeAttribute("data-theme")
    themeToggleBtn?.setAttribute("aria-pressed", "false")
  }
}

applyTheme(storedTheme || (prefersDark ? "dark" : "light"))

themeToggleBtn?.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark"
  const next = isDark ? "light" : "dark"
  applyTheme(next)
  localStorage.setItem("theme", next)
})

// Contact form: open default mail client with prefilled subject/body
const form = document.getElementById("contact-form")
form?.addEventListener("submit", (e) => {
  e.preventDefault()
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)

  const mailto = `mailto:nababratobiswas.11c@gmail.com?subject=${subject}&body=${body}`
  // Fallback if popup blocked
  window.location.href = mailto
})
