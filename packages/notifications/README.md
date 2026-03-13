# Arbor Apps Notifications Wrapper

## Description

A lightweight wrapper around Expo notifications that provides handlers for receiving and responding to notifications.
It also re-exports the Expo notification types `Notification` and `NotificationResponse`.

## Usage

```typescript
import {
  registerNotificationListeners,
  requestNotificationPermissions,
  setupAndroidNotificationChannel,
  type Notification,
  type NotificationResponse,
} from "@arbor-apps/notifications";

// ... other code

useEffect(() => {
  let cleanup: (() => void) | undefined;

  async function initNotifications() {
    await setupAndroidNotificationChannel();
    cleanup = registerNotificationListeners({
      handleNotificationResponse: (response: NotificationResponse) =>
        dispatch(setNotificationResponse(response)),
      handleNotification: (notification: Notification) =>
        dispatch(setReceivedNotification(notification)),
    });
  }

  void initNotifications();

  return () => {
    cleanup?.();
  };
}, [dispatch]);
```
