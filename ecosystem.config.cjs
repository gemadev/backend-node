module.exports = {
  apps : [
    {
      name   : "server1",
      script : "src/app.js",
      watch: true,
      env: {
        PORT: 8080
      }
    },
    {
      name   : "server2",
      script : "src/app.js",
      watch: true,
      env: {
        PORT: 8081
      }
    },
    {
      name   : "server3",
      script : "src/app.js",
      watch: true,
      env: {
        PORT: 8082
      },
      exec_mode: "cluster",
      instances: 8,
      node_args: "--harmony"
    }
  ]
}

