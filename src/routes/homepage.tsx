import type { FC } from "hono/jsx";

const HomePage: FC = () => {
	return (
		<>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<title>Bun Hono • Enterprise Server</title>
				<style>
					{`
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              color: #333;
              line-height: 1.6;
            }
            header {
              background: #0a2540;
              color: #fff;
              padding: 2rem 1rem;
              text-align: center;
            }
            header h1 {
              margin: 0;
              font-size: 2.5rem;
            }
            .subtitle {
              font-size: 1.2rem;
              opacity: 0.8;
            }
            .tech-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
              gap: 2rem;
              max-width: 800px;
              margin: 3rem auto;
              padding: 0 1rem;
            }
            .tech {
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }
            .tech svg {
              width: 48px;
              height: 48px;
              margin-bottom: 0.5rem;
            }
            main {
              padding: 1rem;
              max-width: 800px;
              margin: 0 auto;
            }
            footer {
              text-align: center;
              padding: 2rem 1rem;
              font-size: 0.9rem;
              color: #666;
            }
            @media (max-width: 600px) {
              header h1 {
                font-size: 2rem;
              }
              .subtitle {
                font-size: 1rem;
              }
            }
          `}
				</style>
			</head>
			<body>
				<header>
					<h1>Bun Hono</h1>
					<p class="subtitle">
						Fast • Scalable • Enterprise-grade server framework
					</p>
				</header>
				<main>
					<section>
						<h2>Built with leading technologies</h2>
						<div class="tech-grid" />
					</section>
					<section>
						<h2>Why choose Bun Hono?</h2>
						<ul>
							<li>🥇 Developed with TypeScript and Biome</li>
							<li>🚀 Powered by Bun.js for ultra-fast execution</li>
							<li>💾 PostgreSQL + Drizzle ORM</li>
							<li>🤖 Vercel AI SDK integration</li>
							<li>🔧 Clean, responsive, enterprise-grade UI</li>
						</ul>
					</section>
				</main>
				<footer>
					© {new Date().getFullYear()} Bun Hono Inc. — Your next-gen server
					framework.
				</footer>
			</body>
		</>
	);
};

export default HomePage;
