# ☁ Cloud Interactive

An interactive study site for Cloud Computing — 12 lectures turned into short chapters, memory hooks, games, calculators, simulators, quizzes and spaced-repetition flashcards.

## Features

- **12 lectures** — cloud basics, global infrastructure, compute, storage, networking, HA & DR, security, databases, Infrastructure as Code, migration, cloud-native apps and Docker
- **Interactive widgets** — subnet calculator, availability (nines) calculator, load-balancer simulator, Docker terminal, Terraform workflow, CI/CD pipeline and more
- **Spaced-repetition review** — flashcards come back after 1, 3, 7, 14 and 30 days
- **Quizzes with mistake review** and an Exam Mode across all lectures
- **Progress tracking** — streaks, "continue where you left off", per-lecture progress
- **Dark / light theme**, keyboard shortcuts, works on mobile

## Run it

No build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 5517
```

Progress is stored in the browser's `localStorage`.

## Structure

```
index.html        page shell, lectures 10–12, exam, review, cheat sheet
style.css         all styles
data.js           lecture list and shared quiz / flashcard / game data
lectures/l01–l09  one file per lecture (page, quiz, flashcards, widgets)
app.js            routing, progress, quizzes, flashcards, dashboard
```

---

© Lithira Silva (@li.kkaa). All rights reserved. Original lecture material belongs to its respective authors; this site is for personal study use.
