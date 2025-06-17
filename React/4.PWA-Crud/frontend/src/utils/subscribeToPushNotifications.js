// utils/subscribeToPushNotifications.js

const VAPID_PUBLIC_KEY = "BLIh3g8Pzg6QJMUQpVMZxt49NQR0l6k2tYnxh_VYMdaH733jdFjA0LnuLKaT4nJcg42nHr78kQScopyX5-nAWtw";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";

// Convert VAPID key to Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Check if push notifications are supported
export function isPushNotificationSupported() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

// Check service worker status
export async function checkServiceWorkerStatus() {
  try {
    if (!('serviceWorker' in navigator)) {
      return {
        supported: false,
        ready: false,
        active: false,
        message: 'Service Worker not supported'
      };
    }

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      return {
        supported: true,
        ready: false,
        active: false,
        message: 'Service Worker not registered'
      };
    }

    const isReady = !!(registration.active || registration.waiting || registration.installing);
    const isActive = !!registration.active;

    return {
      supported: true,
      ready: isReady,
      active: isActive,
      registration,
      message: isActive ? 'Service Worker active and ready' : 'Service Worker registered but not active'
    };
  } catch (error) {
    console.error('[ServiceWorkerStatus] Error checking service worker status:', error);
    return {
      supported: false,
      ready: false,
      active: false,
      error: error.message,
      message: 'Error checking service worker status'
    };
  }
}

// Get current subscription status
export async function getSubscriptionStatus() {
  try {
    if (!isPushNotificationSupported()) {
      return {
        supported: false,
        subscribed: false,
        permission: 'denied'
      };
    }

    const registration = await navigator.serviceWorker.getRegistration();

    if (!registration) {
      return {
        supported: true,
        subscribed: false,
        permission: Notification.permission,
        subscription: null
      };
    }

    const subscription = await registration.pushManager.getSubscription();

    return {
      supported: true,
      subscribed: !!subscription,
      permission: Notification.permission,
      subscription
    };
  } catch (error) {
    console.error('[SubscriptionUtils] Error getting subscription status:', error);
    return {
      supported: false,
      subscribed: false,
      permission: 'denied'
    };
  }
}

// Subscribe to push notifications
export async function subscribeToPushNotifications() {
  try {
    console.log('[SubscriptionUtils] Starting push subscription...');

    if (!isPushNotificationSupported()) {
      throw new Error('Push notifications are not supported in this browser');
    }

    const registration = await navigator.serviceWorker.ready;
    console.log('[SubscriptionUtils] Service worker ready:', registration);

    let subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      console.log('[SubscriptionUtils] Already subscribed:', subscription);
      await sendSubscriptionToServer(subscription);
      return subscription;
    }

    console.log('[SubscriptionUtils] Creating new subscription...');
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    console.log('[SubscriptionUtils] New subscription created:', subscription);

    await sendSubscriptionToServer(subscription);

    return subscription;
  } catch (error) {
    console.error('[SubscriptionUtils] Error subscribing to push notifications:', error);

    if (error.name === 'NotAllowedError') {
      throw new Error('Push notifications permission denied');
    } else if (error.name === 'NotSupportedError') {
      throw new Error('Push notifications not supported');
    } else {
      throw new Error(`Failed to subscribe: ${error.message}`);
    }
  }
}

// Send subscription to server
async function sendSubscriptionToServer(subscription) {
  try {
    console.log('[SubscriptionUtils] Sending subscription to server...');

    const response = await fetch(`${SERVER_URL}/api/save-subscription`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('[SubscriptionUtils] Subscription saved successfully:', result);

    return result;
  } catch (error) {
    console.error('[SubscriptionUtils] Error sending subscription to server:', error);
    throw new Error(`Server error: ${error.message}`);
  }
}

// Send test notification
export async function sendTestNotification() {
  try {
    console.log('[SubscriptionUtils] Sending test notification...');

    const response = await fetch(`${SERVER_URL}/api/send-test-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[SubscriptionUtils] Test notification sent:', result);

    return result;
  } catch (error) {
    console.error('[SubscriptionUtils] Error sending test notification:', error);
    throw error;
  }
}

// Unsubscribe from push notifications
export async function unsubscribeFromPushNotifications() {
  try {
    if (!isPushNotificationSupported()) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      console.log('[SubscriptionUtils] Unsubscribed successfully');
      return true;
    }

    return false;
  } catch (error) {
    console.error('[SubscriptionUtils] Error unsubscribing:', error);
    return false;
  }
}
