# Reusable channel outro

Default closing for future videos: "Smarter choices. A better future. Follow for more."
Michael (am_michael), American English. Liberation Serif, dark green and mint. No scene counter, no invented channel name.

Ready-to-use clip: ../../videos/shared-outro.mp4
1080 x 1920, 30fps, 191 frames (~6.37s), H.264 video + AAC audio.

Append the clip in your video editor, or reuse the Remotion component:

1. Copy SharedOutro.tsx and sharedOutroCues.ts into your Remotion src directory.
2. Copy shared-outro-michael.wav into public/audio/.
3. Append `<Series.Sequence durationInFrames={SHARED_OUTRO_DURATION}><SharedOutro /></Series.Sequence>` after the main video's Series.Sequence. Import Series from remotion and the component/constants from SharedOutro. Include the outro frames in the parent Composition duration and use 30fps.
4. Alternatively wrap SharedOutro in a Sequence starting at the main content's ending frame. Ensure the sequence ends within the parent composition.

In the current workspace: /workspace/remotion-studio/src/SharedOutro.tsx
Render standalone with:
`cd /workspace/remotion-studio && npx --no-install remotion render src/index.tsx SharedOutro out/shared-outro.mp4 --concurrency=2`

The component accepts audio={false} if replacing the voice later. Existing exported videos were not retroactively changed.
