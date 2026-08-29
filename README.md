# Stromma Audio Guide

A single-page, multilingual "bring your own device" audio-guide flyer for Stromma.

Visitors scan **one QR code**, pick their language, and read the full instructions in their own language — no printed flyers needed.

## Features
- 10 languages, auto-detected from the visitor's browser
- One self-contained file (`index.html`) — no server, no build step
- Works on any phone

## How to update
Open `index.html`. At the top of the `<script>` block is a `CONFIG` object:
- `WIFI_NAME` — the onboard Wi-Fi network name
- `WIFI_PASSWORD` — leave empty if the network is open
- `AUDIO_GUIDE_URL` — the "great guide" audio guide link
- `INSTAGRAM`, `FACEBOOK`, `SURVEY` — already set to Stromma's real links

Languages live in `LANGS` (the list) and `STRINGS` (the translations) at the bottom of the same script.

## Hosting
Host `index.html` on any static host (GitHub Pages, Netlify, your own server), then generate a QR code pointing at that URL.
