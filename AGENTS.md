# Start here in a new chat

Read `docs/PROJECT_MEMORY.md`, `docs/WORKFLOW.md`, and `templates/VIDEO_STYLE.md` before proposing or making a video. These record the user's decisions; do not infer current preferences from older exported videos.

- Communicate with the user in Vietnamese. Video narration, on-screen content and captions are English for a US audience.
- Default voice: Kokoro Michael (`am_michael`, `en-us`). Default font: Liberation Serif, a substitute; do not label it Times New Roman.
- Let the story determine runtime and scene count. Use compelling, accurate scripts; do not invent statistics or promise an intelligence ranking.
- Select visuals passage by passage. Characters are for interactions or concrete situations, not a mandatory cast throughout a video. Mix objects, metaphors, diagrams and short text when useful. Avoid static slides and chaotic rapid transitions.
- No scene counters. Latest subtitle preference: use the original Monty Hall style (full sentence, centered white 37px bold text, dark box near bottom). The user withdrew the Gemini-inspired high/narrow safe-zone caption experiment; do not apply it unless requested again. See PROJECT_MEMORY. Do not add a footer unless requested.
- Append the approved shared outro: “Smarter choices. A better future. Follow for more.” See `studio/src/SharedOutro.tsx`.
- Use the checked-out repository and `studio/`, not hard-coded old `/workspace/remotion-studio` paths. Do not create worktrees unless the user asks. Runtime processes and dependencies may need restarting/reinstalling.
- Keep scripts, cues, source, required assets and English SRT with each new production. Validate output before delivery. The user needs GitHub download links; workspace links did not work.
- Preserve user changes; do not force-push or silently overwrite remote changes. Do not publish the cloud environment or upload to social platforms unless requested.
