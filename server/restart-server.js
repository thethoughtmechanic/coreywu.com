#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🔄 Starting server with auto-restart...');

function startServer() {
  console.log('🚀 Starting server process...');
  
  const serverProcess = spawn('tsx', ['server/index.ts'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
    cwd: process.cwd()
  });

  serverProcess.on('exit', (code, signal) => {
    if (signal !== 'SIGTERM' && signal !== 'SIGINT') {
      console.log(`⚡ Server crashed with code ${code}, restarting in 1 second...`);
      setTimeout(startServer, 1000);
    } else {
      console.log('🛑 Server stopped by user');
      process.exit(0);
    }
  });

  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start server:', error);
    setTimeout(startServer, 2000);
  });

  return serverProcess;
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  process.exit(0);
});

startServer();