# Channel video style

- US audience: English narration and English captions. Default voice: Kokoro Michael (`am_michael`).
- Liberation Serif, dark green backgrounds, cream text, mint and peach accents.
- Let the script and narration determine runtime. Do not force a fixed duration or scene count.
- Use a curiosity-driven opening, a concrete situation, a clear explanation, and a useful conclusion. Do not invent intelligence rankings or statistics for hooks.
- Change settings when the story benefits, with enough time to follow each scene. Avoid constant wipes, fast cuts and repeated full-screen transitions.
- Within scenes, tell the story through action. For interpersonal situations: characters meet, gesture, exchange objects, show speech bubbles, react, pause, and establish boundaries. Prefer meaningful character action over largely static title slides or tiny decorative movement.
- Use diagrams and text when they clarify the concept. Keep one primary action at a time and preserve readable captions.
- Do not show scene counters such as 1/4.
- Append the shared outro in templates/shared-outro: “Smarter choices. A better future. Follow for more.”
- Deliver video downloads through GitHub links; workspace download links did not work for the user.
- Choose the visual form separately for each passage: use characters only for necessary interactions or concrete situations; use objects, metaphors, charts, diagrams, or short text for other passages. Do not carry the same two characters through an entire video by default.

## Latest caption/UI requirements

- Historical exports have low, long captions and footers. Do not copy those placements for new videos.
- New captions should be short, usually 1–2 lines, around 65–75% of frame height as a starting point; reserve bottom and right UI space and reflow illustrations accordingly.
- For 1080x1920, an initial conservative layout is main content x80–900, caption box y1240–1440, with lower ~480px mostly clear. Validate against intended platform/device; this is not a universal platform guarantee.
- Remove bottom-edge footers. Check critical outro content too. Supply English SRT including outro, but do not rely on plain SRT to control placement.
- See docs/PROJECT_MEMORY.md for the authoritative, detailed handoff.

- User update: center the subtitle box on the video’s horizontal midpoint, with centered text. Keep its elevated safe-zone height; narrow the box if needed to avoid the right-side UI. Birthday Paradox uses x180–900 (720px wide), centered at x540, y1270, 45px type.

- Keep the transition into the shared outro brisk: use a short natural pause after the final spoken word and skip redundant leading silence. Preserve full words and recalculate SRT outro offsets.
