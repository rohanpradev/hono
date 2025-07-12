import { TechLogo } from "@/components/tech-logo";

export const HomePage = () => {
	return (
		<html lang="en">
			<head>
				<title>Modern Web Stack</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<style>{`

          :root {
            --primary: #2563eb;
            --secondary: #1e40af;
            --text: #1f2937;
            --light: #f9fafb;
            --dark: #111827;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.5;
            color: var(--text);
            background-color: var(--light);
          }

          .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
          }

          header {
            background-color: white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--primary);
          }

          .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .tech-stack {
            display: flex;
            gap: 1rem;
            align-items: center;
          }

          .docs-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            background-color: var(--primary);
            color: white;
            border-radius: 0.375rem;
            font-weight: 500;
            text-decoration: none;
            transition: background-color 0.2s;
          }

          .docs-btn:hover {
            background-color: var(--secondary);
          }

          .hero {
            padding: 4rem 0;
            text-align: center;
          }

          .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .hero p {
            font-size: 1.25rem;
            max-width: 800px;
            margin: 0 auto 2rem;
            color: var(--dark);
          }

          .tech-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
          }

          .tech-card {
            background: white;
            border-radius: 0.5rem;
            padding: 2rem;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .tech-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          }

          .tech-card h3 {
            margin-bottom: 1rem;
            color: var(--primary);
          }

          .tech-links {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }

          .tech-links a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.875rem;
          }

          .tech-links a:hover {
            text-decoration: underline;
          }

          footer {
            background-color: var(--dark);
            color: white;
            padding: 2rem 0;
            text-align: center;
            margin-top: 3rem;
          }

          @media (max-width: 768px) {
            .header-content {
              flex-direction: column;
              gap: 1rem;
            }

            .header-actions {
              width: 100%;
              justify-content: center;
            }

            .tech-stack {
              flex-wrap: wrap;
              justify-content: center;
            }

            .hero h1 {
              font-size: 2rem;
            }
          }
        `}</style>
			</head>
			<body>
				<header>
					<div class="container header-content">
						<div class="logo">Modern Stack</div>
						<div class="header-actions">
							<div class="tech-stack">
								<TechLogo name="typescript" width={32} height={32} />
								<TechLogo name="bun" width={32} height={32} />
								<TechLogo name="hono" width={32} height={32} />
								<TechLogo name="drizzle" width={32} height={32} />
								<TechLogo name="postgres" width={32} height={32} />
								<TechLogo name="docker" width={32} height={32} />
							</div>
							<a href="./reference" class="docs-btn">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<title>API Documentation</title>
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
									<polyline points="14 2 14 8 20 8" />
									<line x1="16" y1="13" x2="8" y2="13" />
									<line x1="16" y1="17" x2="8" y2="17" />
									<polyline points="10 9 9 9 8 9" />
								</svg>
								API Docs
							</a>
						</div>
					</div>
				</header>

				<main class="container">
					<section class="hero">
						<h1>Modern Web Development Stack</h1>
						<p>
							A high-performance, type-safe web application built with
							cutting-edge technologies
						</p>
					</section>

					<section>
						<h2 style="text-align: center; margin-bottom: 2rem;">
							Technologies Powering This Stack
						</h2>

						<div class="tech-grid">
							<div class="tech-card" style="border-top: 4px solid #3178C6;">
								<TechLogo name="typescript" width={64} height={64} />
								<h3>TypeScript</h3>
								<p>
									TypeScript adds static typing to JavaScript, improving
									developer experience and code quality with type safety and
									advanced tooling.
								</p>
								<div class="tech-links">
									<a
										href="https://www.typescriptlang.org/"
										target="_blank"
										rel="noopener"
									>
										Docs
									</a>
									<a
										href="https://github.com/microsoft/TypeScript"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #000;">
								<TechLogo name="bun" width={64} height={64} />
								<h3>Bun</h3>
								<p>
									Bun is a fast JavaScript runtime, package manager, test
									runner, and bundler that dramatically improves development
									speed and performance.
								</p>
								<div class="tech-links">
									<a href="https://bun.sh/" target="_blank" rel="noopener">
										Docs
									</a>
									<a
										href="https://github.com/oven-sh/bun"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #F97316;">
								<TechLogo name="hono" width={64} height={64} />
								<h3>Hono</h3>
								<p>
									Hono is a small, simple, and ultrafast web framework for the
									Edges, perfect for building APIs and web applications.
								</p>
								<div class="tech-links">
									<a href="https://hono.dev/" target="_blank" rel="noopener">
										Docs
									</a>
									<a
										href="https://github.com/honojs/hono"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #38BDF8;">
								<TechLogo name="drizzle" width={64} height={64} />
								<h3>Drizzle ORM</h3>
								<p>
									Drizzle is a lightweight and performant TypeScript ORM with
									excellent type-safety and a developer-friendly API.
								</p>
								<div class="tech-links">
									<a
										href="https://orm.drizzle.team/"
										target="_blank"
										rel="noopener"
									>
										Docs
									</a>
									<a
										href="https://github.com/drizzle-team/drizzle-orm"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #336791;">
								<TechLogo name="postgres" width={64} height={64} />
								<h3>PostgreSQL</h3>
								<p>
									The world's most advanced open-source relational database with
									excellent performance, reliability, and feature set.
								</p>
								<div class="tech-links">
									<a
										href="https://www.postgresql.org/"
										target="_blank"
										rel="noopener"
									>
										Docs
									</a>
									<a
										href="https://github.com/postgres/postgres"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #2496ED;">
								<TechLogo name="docker" width={64} height={64} />
								<h3>Docker</h3>
								<p>
									Docker simplifies application deployment with
									containerization, ensuring consistency across development,
									testing, and production environments.
								</p>
								<div class="tech-links">
									<a
										href="https://www.docker.com/"
										target="_blank"
										rel="noopener"
									>
										Docs
									</a>
									<a
										href="https://github.com/docker"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>

							<div class="tech-card" style="border-top: 4px solid #000;">
								<TechLogo name="vercel-ai" width={64} height={64} />
								<h3>Vercel AI SDK</h3>
								<p>
									Build AI-powered applications with React, Svelte, and Vue.
									Stream responses, handle errors, and manage UI states for LLM
									apps.
								</p>
								<div class="tech-links">
									<a
										href="https://sdk.vercel.ai/docs"
										target="_blank"
										rel="noopener"
									>
										Docs
									</a>
									<a
										href="https://github.com/vercel/ai"
										target="_blank"
										rel="noopener"
									>
										GitHub
									</a>
								</div>
							</div>
						</div>
					</section>
				</main>

				<footer>
					<div class="container">
						<p>
							© {new Date().getFullYear()} Modern Web Stack. All rights
							reserved.
						</p>
					</div>
				</footer>
			</body>
		</html>
	);
};
