# 🐾 Animaux Virtuels

**Le mini‑Tamagotchi 100 % fait maison !**

Bienvenue dans *Animaux Virtuels*, un petit bac à sable JavaScript + Node qui t’apprend :

- 📚 **Classes ES6**  
- 🎨 **Manipulation du DOM**  
- 💾 **Persistance “fichier JSON”** sans base de données  

---

## 📦 Installation

1. **Clone le dépôt**  
   ```bash
   git clone https://github.com/lorycarvajol/pet_app.git
   cd pet_app
````

2. **Installe (aucune dépendance externe)**

   ```bash
   npm install
   ```
3. **Démarre le serveur**

   ```bash
   npm start
   ```
4. **Ouvre** ton navigateur sur
   👉 `http://localhost:3000`

> Au premier démarrage, `data.json` sera créé automatiquement (vide) !

---

## 🎮 Usage

1. **Crée** un animal

   * Renseigne un nom, choisis une espèce
   * Clique sur **Créer**
2. **Interagis**

   * 🍎 Manger
   * 🎮 Jouer
   * 😴 Dormir
   * ⏰ Vieillir
3. **Observe**

   * Les jauges d’Énergie, Bonheur et Santé évoluent
   * Le fichier `data.json` se met à jour en temps réel
4. **Supprime**

   * Un seul animal : bouton ❌
   * Tous les animaux : bouton **Tout supprimer**

---

## 📂 Structure du projet

```
pet_app/
├── index.html     ← l’UI
├── style.css      ← les styles
├── script.js      ← la logique front‑end
├── server.js      ← l’API Node.js (sans Express)
├── data.json      ← stockage persistant (tableau JSON)
├── package.json   ← config & scripts
└── README.md      ← ce guide ludique
```

---

## 🔧 Détails techniques

* **Front** : HTML + CSS + JS vanilla
* **Back**  : Node.js natif (`http`, `fs`)
* **Persistance** :

  * `POST /animals` → ajoute
  * `GET /animals`  → liste
  * `DELETE /animals`        → vide tout
  * `DELETE /animals/:index` → supprime un seul

---

## 🛠️ Personnalisation

* Ajoute d’autres **actions** (méthodes sur `Animal`)
* Crée un **fichier CSS** ou un thème sombre
* Intègre le **LocalStorage** ou un **mini‑framework**
* Déploie sur **Heroku** ou **Vercel**

---

## 📝 Licence

Projet sous licence **MIT** — amuse‑toi bien et customise à l’infini ! ⭐

---

```
```

### 🙏 Crédits & Petits biscuits

Créé avec ❤️ et beaucoup d’emojis pour la communauté des apprenants JavaScript. N’hésite pas à étoiler ⭐ le dépôt si l’idée t’a plu !
