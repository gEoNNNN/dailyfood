# Ghid de utilizare — Admin Daily Kebab

## 1. Cum intri în admin

1. Deschide `http://localhost:3000/admin` (sau `https://dailyfood.md/admin` pe producție)
2. Introdu parola: `daily2026`
3. Apasă **Intră**

---

## 2. Cum adaugi / editezi / ștergi produse

### Adaugi un produs nou
1. Apasă **+ Produs nou**
2. Completează câmpurile:
   - **ID** — identificator unic, fără spații (ex: `kebab-pui-extra`)
   - **Categorie** — alege din listă
   - **Nume RO / Nume RU** — numele produsului
   - **Preț** — în MDL
   - **Descriere RO / Descriere RU** — descrierea produsului
   - **Imagine (URL)** — link direct la imagine (vezi secțiunea 3)
   - **Tag RO / Tag RU** — etichetă opțională (ex: "Promo", "Special")
   - **Image fit** — `cover` (umple) sau `contain` (încadrat)
   - **Activ** — bifează ca produsul să fie vizibil pe site
   - **Ordine** — număr pentru ordinea de afișare
3. Apasă **Salvează**

### Editezi un produs
1. Găsește produsul în tabel
2. Apasă **Editează**
3. Modifică ce ai nevoie
4. Apasă **Salvează**

### Ștergi un produs
1. Găsește produsul în tabel
2. Apasă **Șterge**
3. Confirmă

### Ascunzi un produs (fără să-l ștergi)
1. Editează produsul
2. Debifează **Activ**
3. Salvează — produsul dispare de pe site dar rămâne în admin

---

## 3. Cum faci rost de imagine pe Imgur

Imgur e gratuit și nu necesită cont pentru a încărca imagini.

1. Deschide `https://imgur.com/upload`
2. Trage imaginea sau apasă pentru a selecta
3. Așteaptă să se încarce
4. **Click dreapta pe imagine** → **Copy image address**
5. Link-ul copiat ar trebui să arate așa:
   ```
   https://i.imgur.com/AbCdEf.jpg
   ```
6. **Important:** Folosește link-ul care începe cu `i.imgur.com` și se termină cu `.jpg`, `.png` sau `.webp`
7. Nu folosi link-ul care începe cu `imgur.com/a/` — acela e o pagină, nu o imagine

### Cum pui link-ul în admin
1. Copiază link-ul (Ctrl+C)
2. În admin, la câmpul **Imagine (URL)**, apasă **Ctrl+V** (paste)
3. Apasă **Salvează**

---

## 4. Hard refresh (Ctrl+Shift+R)

Când faci modificări și nu le vezi pe site, browserul poate avea versiunea veche în cache.

### Cum faci hard refresh
- **Windows/Linux:** `Ctrl + Shift + R` sau `Ctrl + F5`
- **Mac:** `Cmd + Shift + R`
- **Mobile:** Șterge cache-ul browserului din setări

### Când trebuie să faci hard refresh
- După ce editezi un produs și nu vezi modificarea pe site
- După ce developer-ul face modificări la cod
- Când site-ul arată ciudat sau incomplet

---

## 5. Verifici că modificările sunt pe site

1. Salvează în admin
2. Deschide `http://localhost:3000/menu` (sau `https://dailyfood.md/menu`)
3. Fă **Ctrl+Shift+R**
4. Caută produsul modificat

Dacă nu apare:
- Așteaptă 1 minut (cache-ul de 60 secunde)
- Fă din nou Ctrl+Shift+R
- Verifică că produsul e **Activ**

---

## 6. Parola admin

Parola e stocată în fișierul `.env.local`:
```
ADMIN_PASSWORD=daily2026
```

Pentru a schimba parola, modifică acest fișier și restartează aplicația.

---

## 7. Formatul imaginilor

### Acceptate
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.gif`

### Recomandări
- Dimensiune: **pătrat** (ex: 800x800 px)
- Rezoluție: minim 400x400, maxim 2000x2000
- Fișier: sub 2 MB pentru încărcare rapidă

### Image fit
- **cover** — imaginea umple tot spațiul (taie marginile dacă nu e pătrat)
- **contain** — imaginea întreagă e vizibilă (cu fundal în jur)

---

## 8. Depanare

### Produsul nu apare pe site
- Verifică că e **Activ** (bifat)
- Fă **Ctrl+Shift+R**
- Așteaptă 1 minut și reîncearcă

### Imaginea nu apare
- Verifică că link-ul începe cu `https://i.imgur.com/` și se termină cu `.jpg`/`.png`
- Nu folosi `imgur.com/a/...` — e pagină, nu imagine
- Deschide link-ul în browser — dacă nu apare imagine, link-ul e greșit

### Nu pot da paste în câmpul de imagine
- Asigură-te că ai copiat link-ul (Ctrl+C)
- Click în câmp și apasă Ctrl+V
- Dacă nu merge, scrie link-ul manual

### Comanda nu se trimite
- Verifică că ai produse în coș
- Verifică că ai completat numele și telefonul
- Verifică că suma minimă pentru livrare e atinsă (130 MDL)
