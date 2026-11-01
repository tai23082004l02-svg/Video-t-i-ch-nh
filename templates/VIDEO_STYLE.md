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

## Current subtitle style — latest user decision

- Use the subtitle style from `studio/src/MontyHall.tsx`: full sentence, white centered bold Liberation Serif, 37px, line-height 1.4, dark box.
- At 1080x1920: left/right 50px, bottom 150px, padding 27px 32px, minimum height 135px, radius 20px, background #091113eb, border 1px solid #778f7755.
- The user explicitly withdrew the Gemini-inspired high-position, narrow-box, short-phrase experiment. Do not reapply it or warn about it unprompted.
- Use the user's latest choice if they change subtitle layout again. Do not add scene counters or an extra footer.
- Keep the transition into the shared outro brisk: around 0.2s after the final spoken line, skip redundant leading silence, preserve full words, and recalculate SRT offsets.

## Main content alignment

- Center the main title, series label, kicker, illustration and explanatory blocks horizontally on the video frame so the composition feels balanced. Center the block and its text; do not retain the old left offset used by the UI-safe-area experiment. Keep internal chart labels and structured diagrams aligned for readability. Preserve the Monty Hall subtitle style.

## Use the frame according to the scene

- Avoid pushing all content into the top half and leaving a large empty gap before captions. Scale and place each scene individually: fewer elements can be larger; denser scenes need more room.
- Keep meaningful illustrations central and lower them when needed. Remove small explanations that only repeat the narration/captions. Do not add arbitrary decoration to fill gaps.
- Let a calculation develop within one shot: factors appear, assemble into the result, then the complementary probability is revealed through the same bar/diagram. Keep mathematical values synchronized with the spoken claim.
