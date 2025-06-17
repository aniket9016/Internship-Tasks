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
    primary: { main: "#1976d2", light: "#42a5f5", dark: "#1565c0" },
    secondary: { main: "#dc004e" },
    background: { default: "#f5f5f5" },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
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

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // Handle sync when back online
    const handleOnline = async () => {
      if (isSyncing) return;
      setIsSyncing(true);
      try {
        await syncOfflineEmployees();
        toast.success("📡 Data synced successfully!");
      } catch (error) {
        console.error('Sync failed:', error);
        // toast removed for failed sync (could be added if needed)
      } finally {
        setIsSyncing(false);
      }
    };

    // Notify when offline
    const handleOffline = () => {
      toast.warning("🔌 You're offline. Changes will sync when you're back online.");
    };

    // Handle PWA install (removed toast)
    const handlePWAInstall = () => {
      console.log("App installed as PWA");
    };

    // Event listeners
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("appinstalled", handlePWAInstall);

    // Optional install prompt
    if (typeof pwaInstallHandler === "function") {
      try {
        pwaInstallHandler();
      } catch (error) {
        console.warn("PWA install handler error:", error);
      }
    }

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

        <NotificationButton />

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
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{ fontSize: "14px", borderRadius: "8px" }}
        />
      </Router>
    </ThemeProvider>
  );
}
