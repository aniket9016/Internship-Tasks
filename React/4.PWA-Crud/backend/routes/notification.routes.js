// routes/notification.routes.js
const { sendWelcomeNotification, sendTestNotification } = require("../utils/webPush");

// Store subscriptions in memory (in production, use a database)
const subscriptions = new Map();

module.exports = async function routes(fastify, options) {
  
  // Save subscription and send welcome notification
  fastify.post("/api/save-subscription", async (req, reply) => {
    try {
      const subscription = req.body;
      
      if (!subscription || !subscription.endpoint) {
        return reply.status(400).send({ 
          success: false, 
          message: "Invalid subscription data" 
        });
      }

      // Store subscription (use endpoint as unique key)
      const subscriptionKey = subscription.endpoint;
      subscriptions.set(subscriptionKey, subscription);
      
      console.log(`📱 Subscription saved for endpoint: ${subscription.endpoint.substring(0, 50)}...`);
      
      // Send welcome notification
      await sendWelcomeNotification(subscription);
      
      reply.send({ 
        success: true, 
        message: "Subscription saved and welcome notification sent" 
      });
      
    } catch (error) {
      console.error("❌ Error saving subscription:", error);
      reply.status(500).send({ 
        success: false, 
        message: "Failed to save subscription",
        error: error.message 
      });
    }
  });

  // Send test notification to all subscribers
  fastify.post("/api/send-test-notification", async (req, reply) => {
    try {
      if (subscriptions.size === 0) {
        return reply.status(400).send({
          success: false,
          message: "No subscriptions available"
        });
      }

      const results = [];
      
      for (const [key, subscription] of subscriptions) {
        try {
          await sendTestNotification(subscription);
          results.push({ endpoint: key, success: true });
        } catch (error) {
          results.push({ endpoint: key, success: false, error: error.message });
        }
      }

      reply.send({
        success: true,
        message: `Test notification sent to ${subscriptions.size} subscribers`,
        results: results
      });
      
    } catch (error) {
      console.error("❌ Error sending test notification:", error);
      reply.status(500).send({
        success: false,
        message: "Failed to send test notification",
        error: error.message
      });
    }
  });

  // Get subscription count (for debugging)
  fastify.get("/api/subscription-count", async (req, reply) => {
    reply.send({
      count: subscriptions.size,
      subscriptions: Array.from(subscriptions.keys()).map(key => ({
        endpoint: key.substring(0, 50) + "..."
      }))
    });
  });

  // Remove subscription
  fastify.post("/api/remove-subscription", async (req, reply) => {
    try {
      const { endpoint } = req.body;
      
      if (!endpoint) {
        return reply.status(400).send({
          success: false,
          message: "Endpoint is required"
        });
      }

      const removed = subscriptions.delete(endpoint);
      
      reply.send({
        success: removed,
        message: removed ? "Subscription removed" : "Subscription not found"
      });
      
    } catch (error) {
      console.error("❌ Error removing subscription:", error);
      reply.status(500).send({
        success: false,
        message: "Failed to remove subscription",
        error: error.message
      });
    }
  });

};