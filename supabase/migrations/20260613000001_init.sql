-- Create projects table for portfolio showcase
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(500) NOT NULL,
  technologies VARCHAR(500) NOT NULL, -- JSON array as string: ["React", "Next.js"]
  thumbnail VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- Insert sample projects
INSERT INTO projects (name, description, link, technologies, thumbnail, featured) VALUES
(
  'Project Alpha',
  'A cutting-edge web application built with modern technologies. Click to explore the live demo and see the innovation in action.',
  '#',
  '["React", "Next.js", "TypeScript"]',
  NULL,
  true
),
(
  'Project Beta',
  'Full-stack application with real-time capabilities and seamless user experience.',
  '#',
  '["Node.js", "MongoDB", "WebSocket"]',
  NULL,
  false
),
(
  'Project Gamma',
  'Mobile-first responsive design with advanced UI/UX patterns and interactions.',
  '#',
  '["React Native", "TailwindCSS"]',
  NULL,
  true
),
(
  'Project Delta',
  'Enterprise-level solution featuring scalability and robust architecture.',
  '#',
  '["Cloud", "Microservices", "Docker"]',
  NULL,
  false
),
(
  'Project Epsilon',
  'AI-powered application with machine learning integration and real-time analysis.',
  '#',
  '["Python", "TensorFlow", "FastAPI"]',
  NULL,
  false
),
(
  'Project Zeta',
  'High-performance data visualization tool with interactive dashboards.',
  '#',
  '["D3.js", "Vue.js", "PostgreSQL"]',
  NULL,
  false
);
