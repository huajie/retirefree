const fs = require('fs');
const { createCanvas } = require('canvas');

// Create a 1024x1024 canvas
const canvas = createCanvas(1024, 1024);
const ctx = canvas.getContext('2d');

// Create gradient background (green to blue)
const gradient = ctx.createLinearGradient(0, 0, 1024, 1024);
gradient.addColorStop(0, '#059669'); // emerald-600
gradient.addColorStop(1, '#2563EB'); // blue-600

ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1024, 1024);

// Add shadow effect
ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
ctx.shadowBlur = 20;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = 10;

// Draw dollar sign ($)
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 560px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('$', 512, 450);

// Draw upward arrow (↗)
ctx.font = 'bold 240px Arial';
ctx.fillText('↗', 650, 300);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/apple-icon.png', buffer);

console.log('Icon generated successfully: public/apple-icon.png');
console.log('File size:', (buffer.length / 1024).toFixed(2), 'KB');
