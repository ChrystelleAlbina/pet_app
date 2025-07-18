/************ Classe & données ************/
class Animal {
  constructor(nom, type, emoji) {
    this.nom     = nom;
    this.type    = type;
    this.emoji   = emoji;
    this.energie = 100;
    this.bonheur = 100;
    this.sante   = 100;
    this.age     = 0;
  }
  manger()   { this.energie = clamp(this.energie + 20); this.bonheur = clamp(this.bonheur + 10); }
  jouer()    { this.energie = clamp(this.energie - 15); this.bonheur = clamp(this.bonheur + 25); }
  dormir()   { this.energie = clamp(this.energie + 30); this.sante   = clamp(this.sante   + 10); }
  vieillir() { this.age++; this.sante   = clamp(this.sante   - 5); }
}

const EMOJIS = {
  chat: '🐱', chien: '🐶', lapin: '🐰', hamster: '🐹',
  oiseau: '🐦', tortue: '🐢', poisson: '🐠', souris: '🐭'
};

let animaux = [];
const clamp = v => Math.max(0, Math.min(100, v));

/************ Affichage dynamique ************/
function afficherAnimaux() {
  const cont = document.getElementById('animalsContainer');
  cont.innerHTML = '';
  if (!animaux.length) {
    cont.textContent = 'Aucun animal.';
    return;
  }
  animaux.forEach((a, i) => {
    cont.insertAdjacentHTML('beforeend', `
      <div class="animal-card">
        <div style="font-size:3em">${a.emoji}</div>
        <h3>${a.nom}</h3>
        <p>${capitalize(a.type)} • ${a.age} an(s)</p>
        ${bar('Énergie',   a.energie,   'energy')}
        ${bar('Bonheur',   a.bonheur,   'happiness')}
        ${bar('Santé',     a.sante,     'health')}
        <div style="margin-top:8px">
          <button onclick="actionAnimal(${i}, 'manger')">🍎</button>
          <button onclick="actionAnimal(${i}, 'jouer')">🎮</button>
          <button onclick="actionAnimal(${i}, 'dormir')">😴</button>
          <button onclick="actionAnimal(${i}, 'vieillir')">⏰</button>
        </div>
        <button style="background:#e53e3e;width:100%;margin-top:6px"
                onclick="supprimerAnimal(${i})">❌ Supprimer</button>
      </div>`);
  });
}

function bar(label, val, cls) {
  return `
    <div><small>${label} ${val}%</small>
      <div class="stat-bar">
        <div class="stat-fill ${cls}" style="width:${val}%"></div>
      </div>
    </div>`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/************ Création & interactions ************/
function creerAnimal() {
  const nom  = document.getElementById('animalName').value.trim();
  if (!nom) return alert('⚠️ Entrez un nom !');
  const type = document.getElementById('animalType').value;
  const ani  = new Animal(nom, type, EMOJIS[type]);
  animaux.push(ani);
  document.getElementById('animalName').value = '';
  afficherAnimaux();
  // Persist dans data.json
  fetch('/animals', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(ani)
  }).catch(() => alert('⚠️ Impossible d’écrire dans data.json'));
}

function actionAnimal(i, action) {
  animaux[i][action]();
  afficherAnimaux();
}

/************ Suppressions ************/
function supprimerAnimal(i) {
  fetch(`/animals/${i}`, { method: 'DELETE' })
    .then(r => {
      if (r.ok || r.status === 204) {
        animaux.splice(i,1);
        afficherAnimaux();
      } else throw new Error();
    })
    .catch(() => alert('⚠️ Impossible de supprimer dans data.json'));
}

function supprimerTous() {
  if (!animaux.length) return;
  fetch('/animals', { method: 'DELETE' })
    .then(r => {
      if (r.ok || r.status === 204) {
        animaux = [];
        afficherAnimaux();
      } else throw new Error();
    })
    .catch(() => alert('⚠️ Impossible de vider data.json'));
}

/************ Initialisation ************/
window.onload = () => {
  fetch('/animals')
    .then(r => r.json())
    .then(list => {
      animaux = list.map(o =>
        Object.assign(new Animal(o.nom, o.type, o.emoji), o)
      );
      afficherAnimaux();
    })
    .catch(() => afficherAnimaux());
};
