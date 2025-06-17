// utils/webPush.js
const webpush = require("web-push");

const publicVapidKey = "BLIh3g8Pzg6QJMUQpVMZxt49NQR0l6k2tYnxh_VYMdaH733jdFjA0LnuLKaT4nJcg42nHr78kQScopyX5-nAWtw";
const privateVapidKey = "Qbn8PcXvRrlQPF4KRoozGAfFS_zItkrdha5tJZA9HfQ";

// Set VAPID details
webpush.setVapidDetails(
  "mailto:myxyz0365@gmail.com",
  publicVapidKey,
  privateVapidKey
);

// Send welcome notification
async function sendWelcomeNotification(subscription) {
  const payload = JSON.stringify({
    title: "🎉 Welcome to Our PWA!",
    body: "Thanks for enabling notifications! You'll receive important updates here.",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    data: {
      url: "/",
      timestamp: Date.now(),
      type: "welcome"
    },
    actions: [
      {
        action: "open",
        title: "Open App"
      }
    ]
  });

  try {
    console.log(`📤 Sending welcome notification to: ${subscription.endpoint.substring(0, 50)}...`);
    
    const result = await webpush.sendNotification(subscription, payload);
    console.log("✅ Welcome notification sent successfully");
    return result;
    
  } catch (error) {
    console.error("❌ Error sending welcome notification:", error);
    
    // Handle specific errors
    if (error.statusCode === 410 || error.statusCode === 404) {
      console.log("🗑️ Subscription expired or invalid, should remove from database");
    } else if (error.statusCode === 413) {
      console.log("📦 Payload too large");
    } else if (error.statusCode === 429) {
      console.log("⏰ Rate limited, should retry later");
    }
    
    // Log detailed error information
    if (error.statusCode) {
      console.error("Status Code:", error.statusCode);
      console.error("Headers:", error.headers);
      console.error("Body:", error.body);
    }
    
    throw error;
  }
}

// Send test notification
async function sendTestNotification(subscription) {
  const payload = JSON.stringify({
    title: "🧪 Test Notification",
    body: "This is a test notification to verify your setup is working correctly!",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    data: {
      url: "/",
      timestamp: Date.now(),
      type: "test"
    },
    actions: [
      {
        action: "open",
        title: "Open App"
      },
      {
        action: "close",
        title: "Close"
      }
    ]
  });

  try {
    console.log(`📤 Sending test notification to: ${subscription.endpoint.substring(0, 50)}...`);
    
    const result = await webpush.sendNotification(subscription, payload);
    console.log("✅ Test notification sent successfully");
    return result;
    
  } catch (error) {
    console.error("❌ Error sending test notification:", error);
    throw error;
  }
}

// Send custom notification
async function sendCustomNotification(subscription, title, body, options = {}) {
  const payload = JSON.stringify({
    title: title,
    body: body,
    icon: options.icon || "/icon-192x192.png",
    badge: options.badge || "/icon-72x72.png",
    data: {
      url: options.url || "/",
      timestamp: Date.now(),
      type: options.type || "custom",
      ...options.data
    },
    actions: options.actions || [
      {
        action: "open",
        title: "Open App"
      }
    ],
    requireInteraction: options.requireInteraction || false,
    silent: options.silent || false,
    vibrate: options.vibrate || [100, 50, 100]
  });

  try {
    console.log(`📤 Sending custom notification "${title}" to: ${subscription.endpoint.substring(0, 50)}...`);
    
    const result = await webpush.sendNotification(subscription, payload);
    console.log("✅ Custom notification sent successfully");
    return result;
    
  } catch (error) {
    console.error("❌ Error sending custom notification:", error);
    throw error;
  }
}

// Batch send notifications to multiple subscriptions
async function sendBatchNotification(subscriptions, title, body, options = {}) {
  const results = [];
  
  for (const subscription of subscriptions) {
    try {
      const result = await sendCustomNotification(subscription, title, body, options);
      results.push({
        endpoint: subscription.endpoint.substring(0, 50) + "...",
        success: true,
        result: result
      });
    } catch (error) {
      results.push({
        endpoint: subscription.endpoint.substring(0, 50) + "...",
        success: false,
        error: error.message
      });
    }
  }
  
  console.log(`📊 Batch notification results: ${results.filter(r => r.success).length}/${results.length} successful`);
  return results;
}

module.exports = { 
  sendWelcomeNotification, 
  sendTestNotification, 
  sendCustomNotification,
  sendBatchNotification 
};