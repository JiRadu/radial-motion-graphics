# public/ — static assets

Files here are referenced with `staticFile("<path inside public>")`.

| Folder    | Put here                               | Use with                                        |
|-----------|----------------------------------------|-------------------------------------------------|
| `audio/`  | music, voice-over, SFX (.mp3/.wav/.m4a) | `<AudioTrack src="audio/x.mp3" />`, `<Sfx />`    |
| `images/` | logos, photos (.png/.jpg/.svg/.webp)    | `<Img src={staticFile("images/logo.png")} />`    |
| `video/`  | footage clips (.mp4/.webm)              | `<Video src={staticFile("video/clip.mp4")} />` from `@remotion/media` |
| `fonts/`  | local font files (.woff2/.ttf)          | `@remotion/fonts` `loadFont()`                   |

Keep file names lowercase with dashes, no spaces.
