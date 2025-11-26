import './style.css'

const output = document.getElementById('output');
const input = document.getElementById('terminal-input');

const commandHistory = [];
let historyIndex = -1;

const cvData = {
  nom: "Votre Nom",
  titre: "Développeur Full Stack",
  email: "votre.email@example.com",
  telephone: "+33 6 XX XX XX XX",
  localisation: "Ville, France",
  competences: [
    "HTML5, CSS3, JavaScript",
    "React, Vue.js, Node.js",
    "Python, Java, PHP",
    "Git, Docker, Linux",
    "SQL, MongoDB, PostgreSQL"
  ],
  formation: [
    {
      annee: "2020-2023",
      titre: "Master Informatique",
      etablissement: "Université / École"
    },
    {
      annee: "2018-2020",
      titre: "Licence Informatique",
      etablissement: "Université"
    }
  ],
  experience: [
    {
      periode: "2023 - Présent",
      poste: "Développeur Full Stack",
      entreprise: "Entreprise XYZ",
      missions: [
        "Développement d'applications web",
        "Maintenance et optimisation du code",
        "Travail en équipe agile"
      ]
    }
  ],
  langues: [
    "Français - Langue maternelle",
    "Anglais - Courant (B2/C1)"
  ]
};

const projetsData = [
  {
    id: 1,
    titre: "Projet E-commerce",
    description: "Plateforme de vente en ligne complète avec système de paiement sécurisé",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    lien: "#",
    details: "Description détaillée du projet e-commerce..."
  },
  {
    id: 2,
    titre: "Application Mobile",
    description: "Application de gestion de tâches avec synchronisation cloud",
    technologies: ["React Native", "Firebase", "Redux"],
    lien: "#",
    details: "Description détaillée de l'application mobile..."
  },
  {
    id: 3,
    titre: "Dashboard Analytics",
    description: "Interface d'analyse de données en temps réel",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI"],
    lien: "#",
    details: "Description détaillée du dashboard..."
  }
];

const veilleData = [
  {
    id: 1,
    titre: "Intelligence Artificielle et Développement",
    date: "2024-01",
    description: "L'impact de l'IA générative sur les pratiques de développement logiciel",
    lien: "#",
    tags: ["IA", "DevOps", "Productivité"]
  },
  {
    id: 2,
    titre: "WebAssembly - Le futur du Web",
    date: "2023-12",
    description: "Comment WebAssembly révolutionne les performances des applications web",
    lien: "#",
    tags: ["WebAssembly", "Performance", "Web"]
  },
  {
    id: 3,
    titre: "Architecture Microservices",
    date: "2023-11",
    description: "Bonnes pratiques pour concevoir des architectures microservices scalables",
    lien: "#",
    tags: ["Architecture", "Microservices", "Cloud"]
  }
];

const commands = {
  help: () => {
    return `
<div class="help-table">
  <div class="section-title">COMMANDES DISPONIBLES</div>
  <div class="help-row">
    <span class="help-command">help</span>
    <span class="help-description">Affiche cette aide</span>
  </div>
  <div class="help-row">
    <span class="help-command">cv</span>
    <span class="help-description">Affiche mon curriculum vitae</span>
  </div>
  <div class="help-row">
    <span class="help-command">projets</span>
    <span class="help-description">Liste tous mes projets</span>
  </div>
  <div class="help-row">
    <span class="help-command">projet [id]</span>
    <span class="help-description">Affiche les détails d'un projet spécifique</span>
  </div>
  <div class="help-row">
    <span class="help-command">veille</span>
    <span class="help-description">Affiche ma veille technologique</span>
  </div>
  <div class="help-row">
    <span class="help-command">contact</span>
    <span class="help-description">Affiche mes informations de contact</span>
  </div>
  <div class="help-row">
    <span class="help-command">clear</span>
    <span class="help-description">Efface le terminal</span>
  </div>
  <div class="help-row">
    <span class="help-command">about</span>
    <span class="help-description">À propos de ce portfolio</span>
  </div>
</div>
    `;
  },

  cv: () => {
    return `
<div class="section-title">CURRICULUM VITAE</div>
<div class="cv-section">
  <h3>👤 Informations Personnelles</h3>
  <p><strong>Nom:</strong> ${cvData.nom}</p>
  <p><strong>Titre:</strong> ${cvData.titre}</p>
  <p><strong>Email:</strong> ${cvData.email}</p>
  <p><strong>Téléphone:</strong> ${cvData.telephone}</p>
  <p><strong>Localisation:</strong> ${cvData.localisation}</p>
</div>

<div class="cv-section">
  <h3>💻 Compétences Techniques</h3>
  <ul>
    ${cvData.competences.map(comp => `<li>${comp}</li>`).join('')}
  </ul>
</div>

<div class="cv-section">
  <h3>🎓 Formation</h3>
  ${cvData.formation.map(form => `
    <p><strong>${form.annee}</strong> - ${form.titre}</p>
    <p style="padding-left: 20px;">${form.etablissement}</p>
  `).join('')}
</div>

<div class="cv-section">
  <h3>💼 Expérience Professionnelle</h3>
  ${cvData.experience.map(exp => `
    <p><strong>${exp.periode}</strong> - ${exp.poste}</p>
    <p style="padding-left: 20px;"><em>${exp.entreprise}</em></p>
    <ul>
      ${exp.missions.map(mission => `<li>${mission}</li>`).join('')}
    </ul>
  `).join('')}
</div>

<div class="cv-section">
  <h3>🌍 Langues</h3>
  <ul>
    ${cvData.langues.map(langue => `<li>${langue}</li>`).join('')}
  </ul>
</div>
    `;
  },

  projets: () => {
    return `
<div class="section-title">MES PROJETS</div>
<div class="projects-grid">
  ${projetsData.map(projet => `
    <div class="project-card" onclick="executeCommand('projet ${projet.id}')">
      <h4>📁 ${projet.titre}</h4>
      <p>${projet.description}</p>
      <div class="tech-stack">
        ${projet.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <p style="margin-top: 10px; color: var(--text-primary); font-size: 12px;">→ Tapez "projet ${projet.id}" pour plus de détails</p>
    </div>
  `).join('')}
</div>
    `;
  },

  projet: (args) => {
    const id = parseInt(args[0]);
    const projet = projetsData.find(p => p.id === id);

    if (!projet) {
      return `<p class="error">Erreur: Projet #${id} introuvable. Tapez "projets" pour voir la liste.</p>`;
    }

    return `
<div class="section-title">PROJET: ${projet.titre}</div>
<div class="cv-section">
  <h3>📋 Description</h3>
  <p>${projet.description}</p>
  <p>${projet.details}</p>
</div>
<div class="cv-section">
  <h3>🛠️ Technologies Utilisées</h3>
  <div class="tech-stack">
    ${projet.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
  </div>
</div>
<div class="cv-section">
  <h3>🔗 Lien</h3>
  <p><a href="${projet.lien}" target="_blank">${projet.lien}</a></p>
</div>
<p style="margin-top: 20px; color: var(--text-secondary);">Tapez "projets" pour revenir à la liste</p>
    `;
  },

  veille: () => {
    return `
<div class="section-title">VEILLE TECHNOLOGIQUE</div>
${veilleData.map(article => `
  <div class="veille-item">
    <h4>📰 ${article.titre}</h4>
    <div class="date">📅 ${article.date}</div>
    <p>${article.description}</p>
    <div class="tech-stack" style="margin-top: 10px;">
      ${article.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
    </div>
    <p style="margin-top: 10px;"><a href="${article.lien}" target="_blank">Lire l'article →</a></p>
  </div>
`).join('')}
    `;
  },

  contact: () => {
    return `
<div class="section-title">CONTACT</div>
<div class="cv-section">
  <h3>📧 Me Contacter</h3>
  <p><strong>Email:</strong> <a href="mailto:${cvData.email}">${cvData.email}</a></p>
  <p><strong>Téléphone:</strong> ${cvData.telephone}</p>
  <p><strong>Localisation:</strong> ${cvData.localisation}</p>
</div>
<div class="cv-section">
  <h3>🔗 Réseaux Sociaux</h3>
  <ul>
    <li><a href="#" target="_blank">LinkedIn</a></li>
    <li><a href="#" target="_blank">GitHub</a></li>
    <li><a href="#" target="_blank">Twitter</a></li>
  </ul>
</div>
    `;
  },

  clear: () => {
    output.innerHTML = '';
    return null;
  },

  about: () => {
    return `
<div class="section-title">À PROPOS</div>
<div class="cv-section">
  <p>Portfolio interactif en mode terminal. Naviguez à travers mes projets et mon parcours en utilisant des commandes.</p>
  <p style="margin-top: 15px;">Version 1.0 - Développé avec HTML, CSS et JavaScript</p>
  <p>Tapez <span class="command-highlight">help</span> pour voir toutes les commandes disponibles.</p>
</div>
    `;
  }
};

function addOutput(content, className = '') {
  const div = document.createElement('div');
  div.className = `output-line ${className}`;
  div.innerHTML = content;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function addCommandLine(command) {
  addOutput(`<span class="prompt">visitor@portfolio:~$</span> <span class="user-command">${command}</span>`, 'command-line');
}

function executeCommand(commandStr) {
  const parts = commandStr.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (commandStr.trim()) {
    addCommandLine(commandStr);
    commandHistory.push(commandStr);
    historyIndex = commandHistory.length;
  }

  if (command === '') {
    return;
  }

  if (commands[command]) {
    const result = commands[command](args);
    if (result !== null) {
      addOutput(result);
    }
  } else {
    addOutput(`<p class="error">Commande introuvable: ${command}</p><p class="info">Tapez <span class="command-highlight">help</span> pour voir les commandes disponibles.</p>`);
  }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value;
    executeCommand(command);
    input.value = '';
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex > 0) {
      historyIndex--;
      input.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      input.value = commandHistory[historyIndex];
    } else {
      historyIndex = commandHistory.length;
      input.value = '';
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const currentInput = input.value.toLowerCase();
    const matchingCommands = Object.keys(commands).filter(cmd => cmd.startsWith(currentInput));
    if (matchingCommands.length === 1) {
      input.value = matchingCommands[0];
    }
  }
});

document.addEventListener('click', () => {
  input.focus();
});

window.executeCommand = executeCommand;
