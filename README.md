# 🐾 Animaux Virtuels — Le mini‑Tamagotchi du Web

Bienvenue dans **Animaux Virtuels**, un petit bac à sable JavaScript + Node qui t’apprend :

* les classes ES6 (👩‍🎓)
* la manipulation du DOM (🎨)
* la persistance simple avec un fichier **`data.json`** piloté par un mini‑serveur Node (💾)

Le tout sans aucun framework — juste le plaisir du code brut !

---

## 🚀 Installation express

```bash
# 1. Clone le projet
git clone <repo-url> animaux-virtuels && cd animaux-virtuels

# 2. Lance le serveur (Node ≥ 18)
node server.js

# 3. Ouvre ton navigateur :
→ http://localhost:3000
```

💡 Le serveur crée automatiquement **`data.json`** à la racine s’il n’existe pas.

---

## 👾 Gameplay éclair

1. **Choisis** un nom et une espèce puis clique sur **Créer un Animal**.
2. Joue aux soignants : 🍎 *“Manger”*, 🎮 *“Jouer”*, 😴 *“Dormir”*, ⏰ *“Vieillir”*.
3. Regarde les jauges d’Énergie, Bonheur et Santé osciller.
4. Rafraîchis la page → tes créatures sont de retour ! (Persistées dans `data.json`.)

> Tu veux un grand ménage ? Clique simplement sur **Supprimer Tous**.

---

## ⚙️ Détails techniques

| Côté navigateur                               | Côté Node                                            |
| --------------------------------------------- | ---------------------------------------------------- |
| **`index.html`** 100 % vanilla JS             | **`server.js`** < 100 lignes, pas d’Express          |
| Classe **`Animal`** pour encapsuler les stats | Module **HTTP** natif + `fs` pour écrire `data.json` |
| `fetch('/animals', 'POST')` pour sauvegarder  | Route `POST /animals` : append dans le fichier       |
| Chargement initial via `GET /animals`         | Route `GET /animals` : renvoie le JSON               |

---

## 🛠 Personnalise le bac à sable

* **Nouvelles actions ?** Ajoute des méthodes à la classe `Animal` & des boutons dans le DOM.
* **Style** ? Modifie le CSS inline ou déplace‑le dans un fichier `.css` dédié.
* **Vite + Hot Reload ?** Remplace le serveur basique par Vite ou Express si le cœur t’en dit.

---

## 🔍 Dépannage rapide

| Problème                  | Solution éclair                                                                             |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `node: command not found` | Installe [Node.js](https://nodejs.org) ≥ 18.                                                |
| Port 3000 déjà utilisé    | Lignes 12‑14 de `server.js` → change le numéro de port.                                     |
| Animaux non sauvegardés   | Vérifie que le POST **n’est pas** bloqué par un ad‑blocker ou la politique CORS d’un proxy. |
| JSON corrompu             | Supprime (ou répare) `data.json`, il sera régénéré.                                         |

---

## 📜 Licence

Projet publié sous licence **MIT** — fais‑en bon usage, améliore‑le, et n’oublie pas de partager tes nouveautés !

---

### 🙏 Crédits & Petits biscuits

Créé avec ❤️ et beaucoup d’emojis pour la communauté des apprenants JavaScript. N’hésite pas à étoiler ⭐ le dépôt si l’idée t’a plu !
