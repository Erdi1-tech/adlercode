const revealItems = document.querySelectorAll(".reveal");
const heroMap = document.querySelector(".hero-map");
const heroGrid = document.querySelector(".hero-grid");
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const brandLink = siteHeader.querySelector(".brand");
  const indexUrl = new URL(brandLink?.getAttribute("href") || "index.html", window.location.href);
  const siteRoot = indexUrl.href.replace(/(?:index\.html)?(?:#.*)?$/, "");
  const navItems = [
    ["Home", "index.html"],
    ["B\u00fccher", "index.html#book"],
    ["Vision", "index.html#vision"],
    ["Adlercode App", "index.html#app"],
    ["FAQ", "faq/index.html"],
    ["Kontakt", "kontakt.html"],
    ["Impressum", "impressum/index.html"],
    ["Datenschutz", "datenschutz/index.html"],
  ];

  const mobileToggle = document.createElement("button");
  mobileToggle.className = "mobile-nav-toggle";
  mobileToggle.type = "button";
  mobileToggle.setAttribute("aria-label", "Menü öffnen");
  mobileToggle.setAttribute("aria-controls", "mobile-nav-panel");
  mobileToggle.setAttribute("aria-expanded", "false");
  mobileToggle.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;

  const mobilePanel = document.createElement("nav");
  mobilePanel.className = "mobile-nav-panel";
  mobilePanel.id = "mobile-nav-panel";
  mobilePanel.setAttribute("aria-label", "Mobile Navigation");
  mobilePanel.innerHTML = navItems
    .map(([label, path]) => `<a href="${new URL(path, siteRoot).href}">${label}</a>`)
    .join("");

  siteHeader.append(mobileToggle, mobilePanel);

  function setMobileMenu(open) {
    siteHeader.classList.toggle("is-mobile-nav-open", open);
    mobileToggle.setAttribute("aria-expanded", String(open));
    mobileToggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
  }

  mobileToggle.addEventListener("click", () => {
    setMobileMenu(!siteHeader.classList.contains("is-mobile-nav-open"));
  });

  mobilePanel.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMobileMenu(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      setMobileMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMobileMenu(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 861px)").matches) {
      setMobileMenu(false);
    }
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener(
  "scroll",
  () => {
    const offset = Math.min(window.scrollY, 900);
    if (heroMap) {
      heroMap.style.transform = `translate3d(0, ${offset * 0.05}px, 0)`;
    }
    if (heroGrid) {
      heroGrid.style.opacity = String(Math.max(0.18, 0.38 - offset / 2600));
    }
  },
  { passive: true }
);

document.querySelectorAll("[data-origin-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".origin-accordion");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

document.querySelectorAll("[data-faq-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".faq-item");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

document.querySelectorAll("[data-library-trigger]").forEach((trigger) => {
  const panelId = trigger.getAttribute("aria-controls");
  const panel = panelId ? document.getElementById(panelId) : null;
  const accordion = trigger.closest(".library-accordion");

  if (!panel || !accordion) {
    return;
  }

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    trigger.setAttribute("aria-expanded", String(!isOpen));
    accordion.classList.toggle("is-open", !isOpen);
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});

window.addEventListener("resize", () => {
  document.querySelectorAll(".origin-accordion.is-open [data-origin-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });

  document.querySelectorAll(".faq-item.is-open [data-faq-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });

  document.querySelectorAll(".library-accordion.is-open [data-library-panel]").forEach((panel) => {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
  });
});

const patternTestQuestions = [
  {
    question: "Wenn du ein Problem mit jemandem hast:",
    answers: [
      { label: "Ich spreche es direkt an.", type: "adler" },
      { label: "Ich versuche indirekt Einfluss zu nehmen.", type: "schlange" },
      { label: "Ich vermeide die Konfrontation.", type: "misch" },
    ],
  },
  {
    question: "Wenn dein Instinkt etwas anderes sagt als die Mehrheit:",
    answers: [
      { label: "Ich prüfe meinen Instinkt ernsthaft.", type: "adler" },
      { label: "Ich folge lieber der Mehrheit.", type: "schlange" },
      { label: "Kommt auf die Situation an.", type: "misch" },
    ],
  },
  {
    question: "Was ist wichtiger?",
    answers: [
      { label: "Wahrheit.", type: "adler" },
      { label: "Einfluss.", type: "schlange" },
      { label: "Harmonie.", type: "misch" },
    ],
  },
  {
    question: "Wenn jemand Kritik an dir äußert:",
    answers: [
      { label: "Ich prüfe zuerst, ob etwas Wahres daran sein könnte.", type: "adler" },
      { label: "Ich verteidige mich sofort.", type: "schlange" },
      { label: "Es kommt darauf an, wer die Kritik äußert.", type: "misch" },
    ],
  },
  {
    question: "Wie gehst du mit Macht um?",
    answers: [
      { label: "Macht sollte Verantwortung dienen.", type: "adler" },
      { label: "Macht sollte genutzt werden, um Ziele zu erreichen.", type: "schlange" },
      { label: "Macht ist weder gut noch schlecht.", type: "misch" },
    ],
  },
  {
    question: "Wenn du etwas möchtest:",
    answers: [
      { label: "Ich frage direkt.", type: "adler" },
      { label: "Ich versuche die Situation in meine Richtung zu lenken.", type: "schlange" },
      { label: "Ich hoffe, dass es sich ergibt.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage trifft eher zu?",
    answers: [
      { label: "Freiheit braucht Verantwortung.", type: "adler" },
      { label: "Kontrolle schafft Sicherheit.", type: "schlange" },
      { label: "Man braucht von beidem etwas.", type: "misch" },
    ],
  },
  {
    question: "Wenn jemand dir vertraut:",
    answers: [
      { label: "Ich behandle dieses Vertrauen sorgfältig.", type: "adler" },
      { label: "Vertrauen kann ein Vorteil sein.", type: "schlange" },
      { label: "Das hängt von der Situation ab.", type: "misch" },
    ],
  },
  {
    question: "Wenn ein System Menschen schadet:",
    answers: [
      { label: "Das System sollte hinterfragt werden.", type: "adler" },
      { label: "Menschen sollten sich besser anpassen.", type: "schlange" },
      { label: "Beides kann notwendig sein.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage passt eher zu dir?",
    answers: [
      { label: "Ich bevorzuge Klarheit.", type: "adler" },
      { label: "Ich bevorzuge Einfluss.", type: "schlange" },
      { label: "Ich bevorzuge Flexibilität.", type: "misch" },
    ],
  },
  {
    question: "Wenn du einen Fehler machst:",
    answers: [
      { label: "Ich suche meinen Anteil daran.", type: "adler" },
      { label: "Ich suche die Ursache bei anderen oder den Umständen.", type: "schlange" },
      { label: "Es kommt auf den Fehler an.", type: "misch" },
    ],
  },
  {
    question: "Welche Art von Kommunikation bevorzugst du?",
    answers: [
      { label: "Direkt und offen.", type: "adler" },
      { label: "Strategisch und indirekt.", type: "schlange" },
      { label: "Situationsabhängig.", type: "misch" },
    ],
  },
  {
    question: "Was beeindruckt dich mehr?",
    answers: [
      { label: "Charakter.", type: "adler" },
      { label: "Status.", type: "schlange" },
      { label: "Erfolg.", type: "misch" },
    ],
  },
  {
    question: "Wenn du ein wiederkehrendes Problem bemerkst:",
    answers: [
      { label: "Ich suche nach dem Muster dahinter.", type: "adler" },
      { label: "Ich konzentriere mich auf den unmittelbaren Vorteil oder Nachteil.", type: "schlange" },
      { label: "Ich beobachte erst einmal weiter.", type: "misch" },
    ],
  },
  {
    question: "Welche Aussage spricht dich am meisten an?",
    answers: [
      { label: "Wahrheit schafft Freiheit.", type: "adler" },
      { label: "Kontrolle schafft Sicherheit.", type: "schlange" },
      { label: "Anpassung schafft Frieden.", type: "misch" },
    ],
  },
];

const resultText = {
  adler: {
    title: "Adler-Muster dominant",
    body: [
      "In deinen Antworten zeigt sich ein starkes Adler-Muster.",
      "Du tendierst zu Klarheit, Wahrheit, direkter Kommunikation, Verantwortung und Mustererkennung.",
      "Das bedeutet nicht, dass du perfekt bist.",
      "Es bedeutet, dass dein aktuelles Programm eher auf Bewusstsein und Freiheit ausgerichtet ist.",
    ],
  },
  schlange: {
    title: "Schlangen-Muster dominant",
    body: [
      "In deinen Antworten zeigen sich stärkere Schlangen-Muster.",
      "Das bedeutet nicht, dass du schlecht bist.",
      "Es zeigt, dass Kontrolle, Einfluss, Absicherung oder indirekte Strategien in deinen Antworten stärker wirken.",
      "Der AdlerCode lädt dich dazu ein, diese Muster nicht zu verdrängen, sondern bewusst zu erkennen.",
    ],
  },
  misch: {
    title: "Gemischtes Profil",
    body: [
      "In deinen Antworten zeigt sich kein eindeutiges Muster.",
      "Du bewegst dich zwischen Adler- und Schlangenmustern, je nach Situation, Umfeld oder innerem Zustand.",
      "Das kann auf Anpassung, Selbstschutz oder Unsicherheit hinweisen.",
      "Der nächste Schritt ist nicht Selbstverurteilung, sondern Beobachtung.",
    ],
  },
};

const tieTitles = {
  "adler,misch": "Adler mit Mischprofil",
  "misch,schlange": "Schlangen-Muster mit Mischprofil",
  "adler,schlange": "Innerer Konflikt zwischen Adler und Schlange",
  "adler,misch,schlange": "Drei aktive Programme",
};

const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);

const testForm = document.querySelector("[data-pattern-test]");
const questionsRoot = document.querySelector("[data-test-questions]");
const testMessage = document.querySelector("[data-test-message]");
const testResult = document.querySelector("[data-test-result]");

if (testForm && questionsRoot && testMessage && testResult) {
  questionsRoot.innerHTML = patternTestQuestions
    .map((item, questionIndex) => {
      const answers = item.answers
        .map((answer, answerIndex) => {
          const optionLetter = ["A", "B", "C"][answerIndex];
          const inputId = `question-${questionIndex + 1}-${optionLetter.toLowerCase()}`;
          return `
            <label class="test-option" for="${inputId}">
              <input id="${inputId}" type="radio" name="question-${questionIndex}" value="${answer.type}" />
              <span>${optionLetter}) ${escapeHtml(answer.label)}</span>
            </label>
          `;
        })
        .join("");

      return `
        <fieldset class="test-question">
          <legend>${questionIndex + 1}. ${escapeHtml(item.question)}</legend>
          <div class="test-options">${answers}</div>
        </fieldset>
      `;
    })
    .join("");

  testForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(testForm);
    const answeredCount = Array.from(formData.keys()).length;

    if (answeredCount !== patternTestQuestions.length) {
      testMessage.textContent = "Bitte beantworte alle Fragen, bevor du die Auswertung startest.";
      testResult.hidden = true;
      return;
    }

    const scores = { adler: 0, schlange: 0, misch: 0 };
    Array.from(formData.values()).forEach((type) => {
      if (scores[type] !== undefined) {
        scores[type] += 1;
      }
    });

    testMessage.textContent = "";
    const maxScore = Math.max(scores.adler, scores.schlange, scores.misch);
    const winners = Object.keys(scores).filter((type) => scores[type] === maxScore).sort();
    const isTie = winners.length > 1;
    const winnerKey = winners.join(",");
    const winner = isTie ? null : winners[0];
    const result = winner ? resultText[winner] : {
      title: tieTitles[winnerKey] || "Gemischtes Profil",
      body: [
        winners.length === 3
          ? "Deine Antworten zeigen mehrere aktive Programme. Das ist nicht ungewöhnlich. Menschen reagieren je nach Situation unterschiedlich. Wichtig ist, welches Programm du bewusst stärken willst."
          : "Deine Antworten zeigen zwei aktive Programme. Das ist nicht ungewöhnlich. Menschen reagieren je nach Situation unterschiedlich. Wichtig ist, welches Programm du bewusst stärken willst.",
      ],
    };

    const scoreLabels = {
      adler: "Adler-Punkte",
      schlange: "Schlangen-Punkte",
      misch: "Mischprofil-Punkte",
    };

    const scoreCards = Object.entries(scores)
      .map(([type, score]) => {
        const width = (score / patternTestQuestions.length) * 100;
        return `
          <div class="score-card">
            <header>
              <span>${scoreLabels[type]}</span>
              <span>${score}</span>
            </header>
            <div class="score-bar" aria-hidden="true"><span style="width: ${width}%"></span></div>
          </div>
        `;
      })
      .join("");

    testResult.innerHTML = `
      <div class="score-grid">${scoreCards}</div>
      <h2>${result.title}</h2>
      ${result.body.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      <div class="result-actions">
        <button class="button button-secondary" type="button" data-test-reset>Test wiederholen</button>
        <a class="button button-secondary" href="../adler-kodex/index.html">Adler-Kodex lesen</a>
        <a class="button button-secondary" href="../index.html#book">Buch ansehen</a>
      </div>
    `;
    testResult.hidden = false;
    testResult.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  testResult.addEventListener("click", (event) => {
    if (!event.target.closest("[data-test-reset]")) {
      return;
    }
    testForm.reset();
    testResult.hidden = true;
    testMessage.textContent = "";
    testForm.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
