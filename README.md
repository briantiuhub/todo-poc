# Todo

A tiny single-page to-do list. Add a task, check it off, or delete it. Everything is stored in the browser with `localStorage`, so there is no account, backend, database, or build step.

**Live app:** https://briantiuhub.github.io/todo-poc/

## What it does

- Add a task with the **Add** button or the **Enter** key.
- Mark a task complete with its checkbox; completed tasks are struck through.
- Delete any task with its **Delete** button.
- See an empty-state message when there are no tasks.
- Tasks survive page reloads because they are saved in `localStorage`.

## Run locally

1. Clone or download this repository.
2. Open `index.html` in any modern browser.

That's it — there is no build step and no npm install. The app is plain HTML, CSS, and JavaScript.

## Deployment

The app is hosted for free on **GitHub Pages**:

- Repository: https://github.com/briantiuhub/todo-poc
- Live URL: https://briantiuhub.github.io/todo-poc/
- Source: the `main` branch, served from the repository root.

To deploy your own copy, push these files to a public GitHub repository, then go to **Settings → Pages**, choose **Deploy from a branch**, and select the `main` branch and `/ (root)` folder. GitHub Pages serves the static files directly; no build or CI is required.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and form |
| `styles.css` | Responsive layout and completed-task styling |
| `app.js` | Add, complete, delete, render, and `localStorage` persistence |

## Data and limitations

Tasks are stored per-browser and per-device via `localStorage`. They do **not** sync across devices or browsers, and they are lost if you clear the browser's site data. This is intentional for this proof of concept.

The app makes no API calls and does not load any third-party assets. All requests after opening the page are for the three local files above.
