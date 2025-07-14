#!/usr/bin/env node

/**
 * Test script for Sanity webhook system
 * Usage: node scripts/test-webhook.js
 */

const crypto = require('crypto');
const https = require('https');
const http = require('http');

// Configuration
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;
const BASE_URL = process.env.WEBHOOK_TEST_URL || 'http://localhost:3000';

if (!WEBHOOK_SECRET) {
  console.error('❌ SANITY_WEBHOOK_SECRET environment variable is required');
  process.exit(1);
}

// Generate webhook signature
function generateSignature(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

// Test webhook payloads
const testPayloads = {
  post: {
    _type: 'post',
    _id: 'post-test-123',
    _rev: 'test-rev-123',
    slug: { current: 'test-blog-post' },
    title: 'Test Blog Post',
    categories: ['newsroom'],
  },
  homePage: {
    _type: 'homePage',
    _id: 'homepage-test-123',
    _rev: 'test-rev-456',
    hero: { heading: 'Updated Hero' },
  },
  lawyer: {
    _type: 'lawyer',
    _id: 'lawyer-test-123',
    _rev: 'test-rev-789',
    slug: { current: 'john-doe-test' },
    name: 'John Doe',
    role: 'Partner',
  },
};

// Send webhook request
async function sendWebhook(payload, endpoint = '/api/revalidate') {
  const payloadString = JSON.stringify(payload);
  const signature = generateSignature(payloadString, WEBHOOK_SECRET);

  console.log(`\n🔄 Testing webhook for ${payload._type}...`);
  console.log(`📝 Payload: ${payloadString}`);
  console.log(`🔐 Signature: ${signature}`);

  const url = new URL(endpoint, BASE_URL);
  const isHttps = url.protocol === 'https:';
  const requestModule = isHttps ? https : http;

  const options = {
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payloadString),
      'sanity-webhook-signature': signature,
    },
  };

  return new Promise((resolve, reject) => {
    const req = requestModule.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log(`✅ Response (${res.statusCode}):`, response);
          resolve(response);
        } catch (error) {
          console.log(`📄 Raw response (${res.statusCode}):`, data);
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error:`, error.message);
      reject(error);
    });

    req.write(payloadString);
    req.end();
  });
}

// Test development endpoint
async function testDevelopmentEndpoint() {
  const testData = {
    action: 'revalidate-all',
  };

  console.log('\n🧪 Testing development endpoint...');

  const url = new URL('/api/test-revalidate', BASE_URL);
  const isHttps = url.protocol === 'https:';
  const requestModule = isHttps ? https : http;

  const payloadString = JSON.stringify(testData);

  const options = {
    hostname: url.hostname,
    port: url.port || (isHttps ? 443 : 80),
    path: url.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payloadString),
    },
  };

  return new Promise((resolve, reject) => {
    const req = requestModule.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          console.log(
            `✅ Development endpoint response (${res.statusCode}):`,
            response
          );
          resolve(response);
        } catch (error) {
          console.log(`📄 Raw response (${res.statusCode}):`, data);
          resolve({ statusCode: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Request error:`, error.message);
      reject(error);
    });

    req.write(payloadString);
    req.end();
  });
}

// Main test function
async function main() {
  console.log('🚀 Starting webhook tests...');
  console.log(`🎯 Target URL: ${BASE_URL}`);
  console.log(`🔑 Webhook secret configured: ${WEBHOOK_SECRET ? 'Yes' : 'No'}`);

  try {
    // Test development endpoint first
    await testDevelopmentEndpoint();

    // Test each webhook payload
    for (const [type, payload] of Object.entries(testPayloads)) {
      await sendWebhook(payload);
      // Add small delay between requests
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log('\n🎉 All webhook tests completed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Generate test curl commands
function generateCurlCommands() {
  console.log('\n📋 Generated curl commands for manual testing:');

  for (const [type, payload] of Object.entries(testPayloads)) {
    const payloadString = JSON.stringify(payload);
    const signature = generateSignature(payloadString, WEBHOOK_SECRET);

    console.log(`\n# Test ${type} webhook:`);
    console.log(`curl -X POST ${BASE_URL}/api/revalidate \\`);
    console.log(`  -H "Content-Type: application/json" \\`);
    console.log(`  -H "sanity-webhook-signature: ${signature}" \\`);
    console.log(`  -d '${payloadString}'`);
  }

  console.log(`\n# Test development endpoint:`);
  console.log(`curl -X POST ${BASE_URL}/api/test-revalidate \\`);
  console.log(`  -H "Content-Type: application/json" \\`);
  console.log(`  -d '{"action": "revalidate-all"}'`);
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node scripts/test-webhook.js [options]

Options:
  --curl-only    Generate curl commands only (don't send requests)
  --help, -h     Show this help message

Environment variables:
  SANITY_WEBHOOK_SECRET  Required webhook secret
  WEBHOOK_TEST_URL       Target URL (default: http://localhost:3000)

Examples:
  node scripts/test-webhook.js
  node scripts/test-webhook.js --curl-only
  WEBHOOK_TEST_URL=https://your-domain.com node scripts/test-webhook.js
  `);
  process.exit(0);
}

if (args.includes('--curl-only')) {
  generateCurlCommands();
} else {
  main();
}
