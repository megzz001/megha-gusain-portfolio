# Megha Gusain - Senior Full-Stack Portfolio & AI Twin

A production-quality, responsive, and beautifully balanced full-stack portfolio application for Megha Gusain, a Computer Science Engineering student specializing in Web Development and AI-powered automation workflows.

## 🚀 Key Architectural Features

1. **AI Twin Resume Assistant**: Backed by a secure Express server routing to Google's modern `@google/genai` SDK using `gemini-3.5-flash`. Potential employers can chat with Megha's AI Twin to explore her skills, academic credentials, and project details in real-time.
2. **Interactive Skills Matrix**: A beautifully categorized skill dashboard with smooth percentage sliders, expert metrics, and direct live text filtering.
3. **Immersive Project Case Studies**: Multi-step project galleries utilizing interactive case study modal layers containing project scopes, challenges, solutions, and accomplishments.
4. **Functional Contact Workflow**: Connects seamlessly to a backend database endpoint `POST /api/contact`, parsing and caching user messages in an auto-created `messages.json` file.
5. **PDF Resume Print Engine**: Built using native CSS media queries. Clicking the "Resume / Print" button automatically formats the screen into a single-page paper-optimized layout matching her original curriculum vitae, ready to be saved as a PDF or printed.

---

## 🎨 Design Decisions & Aesthetic Principles

This portfolio utilizes a customized **Minimal Technical Synth** visual aesthetic. It is framed around a modern dark theme with an elegant grid layout to represent structure and automation, paired with a soft light mode that maintains strict compliance with contrast and accessibility (WCAG 2.1 AA) guidelines.

- **Typography**: Paired the technical-forward display typeface **Space Grotesk** for modern display headings with the highly readable **Inter** sans-serif font for descriptive text, accented by **JetBrains Mono** for developer metrics, commands, and statistics.
- **Micro-Interactions**: Features light tactile hover triggers, smooth page anchor offsets, staggered loading sequences using `motion/react`, and instant validation feedback states on form entries.
- **Composition**: Replaces default grid cards with customized asymmetric panels, prioritizing negative space, crisp sub-pixel borders, and smooth radial gradients that capture her dual-competencies in software engineering and intelligent system design.

---

## 🛠️ Setup & Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Configure the Environment
Duplicate `.env.example` to create `.env` and configure your API key:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
GEMINI_API_KEY="your_actual_gemini_api_key"
```

### 2. Install Dependencies
Run the installation manager:
```bash
npm install
```

### 3. Run Development Server
Launches the Express full-stack server on port `3000`:
```bash
npm run dev
```

### 4. Build for Production
Compiles the static Vite client files and packages the server into `dist/server.cjs` using `esbuild`:
```bash
npm run build
```

### 5. Launch Production Server
Runs the standalone optimized full-stack application:
```bash
npm run start
```
