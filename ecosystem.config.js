module.exports = {
  apps: [
    {
      name: "michaelsoft.co.ke",
      cwd: "/home/maina/Projects/michaelsoft",
      script: "node_modules/.bin/next",
      args: "start -p 3005",
      env_file: ".env.local",
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
      restart_delay: 5000,
      max_restarts: 10,
    },
    {
      name: "portfolio-database",
      cwd: "/home/maina/Projects/michaelsoft",
      script: "scripts/ensure-supabase.sh",
      restart_delay: 5000,
      max_restarts: 10,
    },
  ],
};
