import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import HomePage from "./pages/HomePage";
import EmployeeDetails from "./pages/EmployeeDetails";
import NotificationButton from "./components/NotificationButton";
import { ToastContainer, toast } from "react-toastify";
import { syncOfflineEmployees } from "./utils/idb";
import { pwaInstallHandler } from "./utils/pwaInstallHandler";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        },
      },
    },
  },
});

export default function App() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    let swRegistration = null;

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered successfully:', registration);
          swRegistration = registration;
          
          // Listen for service worker updates
          registration.addEventListener('updatefound', () => {
            console.log('New service worker version found');
          });
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Handle online/offline sync
    const handleOnline = async () => {
      if (isSyncing) return;
      setIsSyncing(true);
      try {
        await syncOfflineEmployees();
        toast.success("📡 Data synced successfully!");
      } catch (error) {
        console.error('Error syncing offline employees:', error);
        toast.error("❌ Failed to sync offline data");
      } finally {
        setIsSyncing(false);
      }
    };

    // Handle offline notification
    const handleOffline = () => {
      toast.warning("🔌 You're now offline. Changes will sync when you're back online.");
    };

    // PWA Install handling
    const handlePWAInstall = () => {
      const installShown = localStorage.getItem('pwa-install-toast-shown');
      if (!installShown) {
        toast.success("🎉 App installed successfully! You can now use it offline.");
        localStorage.setItem('pwa-install-toast-shown', 'true');
      }
      setIsAppInstalled(true);
    };

    // Check if app is already installed
    const checkInstallStatus = () => {
      // Check if running as standalone PWA
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.navigator.standalone === true) {
        setIsAppInstalled(true);
      }
    };

    // Event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("appinstalled", handlePWAInstall);
    
    // Initialize PWA install handler if available
    if (typeof pwaInstallHandler === 'function') {
      try {
        pwaInstallHandler();
      } catch (error) {
        console.warn('PWA install handler error:', error);
      }
    }

    // Check initial install status
    checkInstallStatus();

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("appinstalled", handlePWAInstall);
    };
  }, [isSyncing]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>

        {/* Notification Button - shows when notifications are not enabled */}
        <NotificationButton />

        {/* Sync indicator */}
        {isSyncing && (
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              backgroundColor: "#1976d2",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              zIndex: 10000,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            📡 Syncing offline data...
          </div>
        )}

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontSize: "14px",
            borderRadius: "8px",
          }}
        />
      </Router>
    </ThemeProvider>
  );
}