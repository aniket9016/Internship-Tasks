import { useState, useEffect } from "react";
import { Fab, Tooltip, CircularProgress, Badge } from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import CheckIcon from "@mui/icons-material/Check";
import BugReportIcon from "@mui/icons-material/BugReport";
import { requestNotificationPermission } from "../utils/requestNotificationPermission";
import {
  subscribeToPushNotifications,
  getSubscriptionStatus,
  sendTestNotification,
} from "../utils/subscribeToPushNotifications";
import { toast } from "react-toastify";

export default function NotificationButton() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [supported, setSupported] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [hasShownWelcomeToast, setHasShownWelcomeToast] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const status = await getSubscriptionStatus();
        setSupported(status.supported);
        setSubscribed(status.subscribed);

        const shouldShow = !(status.permission === "granted" && status.subscribed);
        setShow(shouldShow);
      } catch (error) {
        console.error("[NotificationButton] Error checking status:", error);
        setSupported(false);
        setShow(true);
      }
    };

    checkStatus();

    const interval = setInterval(checkStatus, 5000); // Check every 5s to auto-hide if granted
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setDebugMode(true);
    }

    const welcomeShown = localStorage.getItem("welcome-toast-shown");
    if (welcomeShown) {
      setHasShownWelcomeToast(true);
    }
  }, []);

  const handleClick = async () => {
    if (debugMode && subscribed) {
      handleTestNotification();
      return;
    }

    setLoading(true);

    try {
      console.log("[NotificationButton] Starting notification setup...");

      const permission = await requestNotificationPermission();
      console.log("[NotificationButton] Permission result:", permission);

      if (permission !== "granted") {
        toast.error(
          "Notifications permission denied. Please enable notifications in your browser settings."
        );
        setLoading(false);
        return;
      }

      const subscription = await subscribeToPushNotifications();
      console.log("[NotificationButton] Subscription successful:", subscription);

      if (subscription && Notification.permission === "granted") {
        setSubscribed(true);
        setShow(false); // ✅ Immediately hide the button
      }

      if (!hasShownWelcomeToast) {
        toast.success("🎉 Notifications enabled! You should receive a welcome message shortly.");
        localStorage.setItem("welcome-toast-shown", "true");
        setHasShownWelcomeToast(true);
      }

    } catch (error) {
      console.error("[NotificationButton] Error enabling notifications:", error);

      let errorMessage = "Failed to enable notifications. ";
      if (error.message.includes("not supported")) {
        errorMessage += "Your browser doesn't support push notifications.";
      } else if (error.message.includes("HTTP error")) {
        errorMessage += "Server error. Please try again later.";
      } else {
        errorMessage += "Please try again or check your browser settings.";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      toast.info("🧪 Sending test notification...");
      await sendTestNotification();
    } catch (error) {
      console.error("[NotificationButton] Error sending test notification:", error);
      toast.error("Failed to send test notification");
    }
  };

  if (!supported || (!show && !debugMode)) {
    return null;
  }

  const getButtonColor = () => {
    if (!supported) return "error";
    if (subscribed) return "success";
    if (Notification.permission === "denied") return "warning";
    return "primary";
  };

  const getTooltipText = () => {
    if (!supported) return "Push notifications not supported";
    if (debugMode && subscribed) return "Test Notification (Debug Mode)";
    if (subscribed) return "Notifications Enabled";
    if (Notification.permission === "denied")
      return "Notifications Blocked - Check Browser Settings";
    return "Enable Notifications";
  };

  const getIcon = () => {
    if (loading) return <CircularProgress size={24} sx={{ color: "white" }} />;
    if (debugMode && subscribed) return <BugReportIcon />;
    if (subscribed) return <CheckIcon />;
    if (Notification.permission === "denied") return <NotificationsOffIcon />;
    return <NotificationsActiveIcon />;
  };

  return (
    <Tooltip title={getTooltipText()} placement="left" arrow>
      <Badge
        badgeContent={debugMode ? "🧪" : 0}
        color="secondary"
        invisible={!debugMode}
      >
        <Fab
          color={getButtonColor()}
          onClick={handleClick}
          disabled={loading}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            },
            "&.Mui-disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {getIcon()}
        </Fab>
      </Badge>
    </Tooltip>
  );
}
