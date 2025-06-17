// utils/pwaInstallHandler.js
import { useState, useEffect } from 'react'; // ✅ Added this line
import { requestNotificationPermission } from './requestNotificationPermission';
import { subscribeToPushNotifications, checkServiceWorkerStatus } from './subscribeToPushNotifications';
import { toast } from 'react-toastify';

class PWAInstallHandler {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.setupEventListeners();
  }

  setupEventListeners() {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('[PWA] Install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      window.dispatchEvent(new CustomEvent('pwa-installable'));
    });

    window.addEventListener('appinstalled', async () => {
      console.log('[PWA] App was installed successfully');
      this.isInstalled = true;
      this.deferredPrompt = null;
      window.dispatchEvent(new CustomEvent('pwa-installed'));
      await this.handlePostInstallSetup();
    });

    this.checkIfAlreadyInstalled();
    this.setupServiceWorkerListeners();
  }

  checkIfAlreadyInstalled() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone === true;

    if (isStandalone) {
      console.log('[PWA] App is running in standalone mode');
      this.isInstalled = true;
      setTimeout(() => {
        this.handlePostInstallSetup();
      }, 3000);
    }
  }

  setupServiceWorkerListeners() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[PWA] Service Worker controller changed');
        this.handleServiceWorkerUpdate();
      });
    }
  }

  async handleServiceWorkerUpdate() {
    try {
      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting) {
        console.log('[PWA] New service worker waiting');

        toast.info('App update available! Refresh to get the latest version.', {
          autoClose: 10000,
          onClick: () => {
            if (registration.waiting) {
              registration.waiting.postMessage({ type: 'SKIP_WAITING' });
              window.location.reload();
            }
          }
        });
      }
    } catch (error) {
      console.error('[PWA] Error handling service worker update:', error);
    }
  }

  async handlePostInstallSetup() {
    try {
      console.log('[PWA] Setting up post-install features...');
      const swStatus = await checkServiceWorkerStatus();
      console.log('[PWA] Service Worker status:', swStatus);

      if (!swStatus.ready) {
        console.log('[PWA] Service Worker not ready, waiting...');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      toast.success('🎉 Welcome to our PWA! Setting up notifications...');
      await new Promise(resolve => setTimeout(resolve, 1500));

      const permission = await requestNotificationPermission();

      if (permission === 'granted') {
        console.log('[PWA] Notification permission granted, subscribing...');
        await subscribeToPushNotifications();
        toast.success('Notifications enabled! You should receive a welcome message shortly.');
      } else if (permission === 'denied') {
        toast.warning('Notifications were denied. You can enable them later from your browser settings.');
      } else {
        toast.info('You can enable notifications later using the notification button.');
      }
    } catch (error) {
      console.error('[PWA] Error in post-install setup:', error);
      toast.error('Failed to setup notifications. You can try again using the notification button.');
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) {
      console.log('[PWA] No install prompt available');
      return { success: false, reason: 'No install prompt available' };
    }

    try {
      console.log('[PWA] Showing install prompt...');
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;

      console.log('[PWA] Install prompt outcome:', outcome);
      if (outcome === 'accepted') {
        console.log('[PWA] User accepted the install prompt');
        this.deferredPrompt = null;
        return { success: true, outcome: 'accepted' };
      } else {
        console.log('[PWA] User dismissed the install prompt');
        return { success: false, outcome: 'dismissed' };
      }
    } catch (error) {
      console.error('[PWA] Error showing install prompt:', error);
      return { success: false, error: error.message };
    }
  }

  isInstallable() {
    return this.deferredPrompt !== null;
  }

  isPWAInstalled() {
    return this.isInstalled;
  }

  async setupNotifications() {
    try {
      const permission = await requestNotificationPermission();
      if (permission === 'granted') {
        await subscribeToPushNotifications();
        return { success: true };
      } else {
        return { success: false, reason: 'Permission denied' };
      }
    } catch (error) {
      console.error('[PWA] Error setting up notifications:', error);
      return { success: false, error: error.message };
    }
  }
}

export const pwaInstallHandler = new PWAInstallHandler();

export const usePWAInstall = () => {
  const [isInstallable, setIsInstallable] = useState(pwaInstallHandler.isInstallable());
  const [isInstalled, setIsInstalled] = useState(pwaInstallHandler.isPWAInstalled());

  useEffect(() => {
    const handleInstallable = () => setIsInstallable(true);
    const handleInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    const handleBeforeInstallPrompt = () => setIsInstallable(true);
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
    };

    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    setIsInstallable(pwaInstallHandler.isInstallable());
    setIsInstalled(pwaInstallHandler.isPWAInstalled());

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return {
    isInstallable,
    isInstalled,
    promptInstall: () => pwaInstallHandler.promptInstall(),
    setupNotifications: () => pwaInstallHandler.setupNotifications()
  };
};
