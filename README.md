# Hanke Zhang — Portfolio

Personal portfolio for software engineering, full-stack development and AI application development.

Website: https://hank-rabbit.github.io/

## Featured work

- **GuardSync** — public incident reporting, management dashboard and staff mobile workflows. Independent Web/Mobile development, with contributions to the Python backend.
- **Stride** — shared mobility, map discovery, vehicle communication and Stripe integration. Independent product design and full-stack development.
- **Voice Learning Platform** — conversational learning activities, learner history and agent administration. Independent product design and full-stack development.

This repository contains the portfolio website only. Original product repositories, services, customer databases and credentials are not included. The site is static and does not connect to product backends.

## Development

Use Node.js 22.

```sh
npm ci
npm run dev
npm run build
npm run test:sites
```

The static output is `dist/client`. Relative asset paths and hash navigation support GitHub Pages without server rewrites. The project retains optional Sites packaging; GitHub Pages publishes only the static client.

## Deployment

GitHub Pages uses the GitHub Actions source. Pushing to `main` runs `.github/workflows/pages.yml` to build and deploy the site. The workflow can also be started manually.

## Content

- `src/components/Resume.jsx`: experience, skills and education.
- `src/projects.js`: project ownership, architecture and engineering challenges.
- `src/components/ProductScreens.jsx`: product galleries.
- `src/components/VoiceAgentStory.jsx`: voice activities and session pipeline.
- `src/linear.css`: layout and responsive styling.
- `public/assets`: images, standalone diagrams and downloadable CV.

The galleries combine original local/test-environment captures with source-informed generated interface visuals. Generated GuardSync Mobile and Stride detail/wallet visuals use sample data and are identified in image descriptions; they are not device captures. Homepage artworks are presentation imagery. The Samira device image is an original product asset.

GuardSync Mobile closed-testing status and the Stride project pause are project-owner updates. Stripe card setup and top-ups are implemented; production ride settlement is not claimed. No adoption or performance metrics are inferred from demonstration data.
