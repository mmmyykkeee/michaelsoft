-- Create technologies table
CREATE TABLE IF NOT EXISTS technologies (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert initial suggestions
INSERT INTO technologies (name) VALUES
('React'), ('Next.js'), ('TypeScript'), ('JavaScript'), ('Node.js'), ('TailwindCSS'),
('Supabase'), ('PostgreSQL'), ('Prisma'), ('Go'), ('Rust'), ('Python'), ('Django'),
('Flask'), ('FastAPI'), ('Docker'), ('Kubernetes'), ('Vercel'), ('AWS'), ('Google Cloud'),
('Azure'), ('Redis'), ('MongoDB'), ('GraphQL'), ('Apollo'), ('Redux'), ('Zustand'),
('D3.js'), ('Three.js'), ('WebGL'), ('Framer Motion'), ('GSAP'), ('Vue.js'), ('Nuxt.js'),
('Angular'), ('Svelte'), ('SvelteKit'), ('PHP'), ('Laravel'), ('Firebase'), ('Stripe'),
('Solidity'), ('Web3.js'), ('Ethers.js'), ('OpenAI'), ('TensorFlow'), ('PyTorch')
ON CONFLICT (name) DO NOTHING;
