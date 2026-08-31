# Stromma Audio Guide

A single-page, multilingual "bring your own device" audio-guide flyer for Stromma.

Visitors scan **one QR code**, pick their language, and read the full instructions in their own language — no printed flyers needed.

## Features
- 19 languages, auto-detected from the visitor's browser (Arabic and Hebrew render right-to-left)
- One self-contained file (`index.html`) — no server, no build step
- Works on any phone

## How to update
Open `index.html`. The languages live in `LANGS` (the list) and `STRINGS` (the translations) at the bottom of the script block. To add or edit a language, update both. No other config is required — the page is self-contained.

## Hosting
Host `index.html` on any static host (GitHub Pages, Netlify, your own server), then generate a QR code pointing at that URL.
