// utils/requestNotificationPermission.js

export async function requestNotificationPermission() {
  try {
    console.log('[NotificationPermission] Requesting permission...');
    
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('[NotificationPermission] Notifications not supported');
      return 'denied';
    }

    // Check current permission
    let permission = Notification.permission;
    console.log('[NotificationPermission] Current permission:', permission);

    // If permission is already granted, return it
    if (permission === 'granted') {
      return permission;
    }

    // If permission is denied, we can't request again
    if (permission === 'denied') {
      console.warn('[NotificationPermission] Permission already denied');
      return permission;
    }

    // Request permission
    if (permission === 'default') {
      console.log('[NotificationPermission] Requesting new permission...');
      permission = await Notification.requestPermission();
      console.log('[NotificationPermission] Permission result:', permission);
    }

    return permission;
  } catch (error) {
    console.error('[NotificationPermission] Error requesting permission:', error);
    return 'denied';
  }
}

// Check if we can show notifications
export function canShowNotifications() {
  return 'Notification' in window && Notification.permission === 'granted';
}

// Show a simple notification (for testing)
export function showSimpleNotification(title, options = {}) {
  if (!canShowNotifications()) {
    console.warn('[NotificationPermission] Cannot show notification - permission not granted');
    return null;
  }

  const defaultOptions = {
    body: 'This is a test notification',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    tag: 'simple-notification',
    requireInteraction: false,
    ...options
  };

  try {
    const notification = new Notification(title, defaultOptions);
    
    notification.onclick = (event) => {
      console.log('[NotificationPermission] Notification clicked');
      event.preventDefault();
      window.focus();
      notification.close();
    };

    return notification;
  } catch (error) {
    console.error('[NotificationPermission] Error showing notification:', error);
    return null;
  }
}