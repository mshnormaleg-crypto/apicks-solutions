# A-Picks Dashboard (Prototype)

Files:

- `index.html` — prototype dashboard (open in browser)
- `style.css` — styles
- `dashboard.js` — client logic, loads `data.json` and renders charts
- `data.json` — sample data

Usage:

1. Open the `dashboard` folder in your browser directly, or run a simple static server:

```bash
# from the desktop folder
python -m http.server 8000
# then open http://localhost:8000/dashboard/
```

2. Sign in using password: `admin` (prototype only).

Form setup:
- The contact page is configured to use Formspree.
- Replace `YOUR_FORM_ID` in both `contact-us.html` and `index.html` with your own Formspree form ID.
- When a visitor sends a message, Formspree will email you the submission.

Messages panel:
- `dashboard/messages.json` contains sample message entries.
- This dashboard prototype shows sample messages, but real submissions need a backend or database to appear here.

Notes:
- This is a static prototype. For production, replace the password gate with real authentication (Firebase/Auth0) and fetch real metrics from a database or API.
