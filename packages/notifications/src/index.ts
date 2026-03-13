import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { AndroidImportance } from "expo-notifications";
import { useEffect } from "react";

type NotificationRegistrationProps = {
  handleNotification: (notification: Notification) => void;
  handleNotificationResponse: (response: NotificationResponse) => void;
};

export const registerNotificationListeners = ({
  handleNotification,
  handleNotificationResponse,
}: NotificationRegistrationProps): (() => void) => {
  const receivedSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      handleNotification(notification);
    },
  );

  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      handleNotificationResponse(response);
    });

  const lastResponse = Notifications.getLastNotificationResponse();
  if (lastResponse) {
    handleNotificationResponse(lastResponse);
  }

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
};

export const requestNotificationPermissions =
  async (): Promise<Notifications.NotificationPermissionsStatus> => {
    return Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
  };

export const setupAndroidNotificationChannel = async (): Promise<void> => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#009D007C",
    });
  }
};

export const getExpoPushToken = (projectId: string) => {
  try {
    if (__DEV__ && Platform.OS !== "android") return;
    return Notifications.getExpoPushTokenAsync({
      projectId,
    });
  } catch {
    // TODO - datadog error
  }
};

export const useInitialiseNotifications = (
  props: NotificationRegistrationProps,
) => {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function initNotifications() {
      // TODO - move this to a contextual situation. Leaving as-is since this is the setup for notifications, and we don't have full implementation yet.
      await requestNotificationPermissions();
      await setupAndroidNotificationChannel();

      cleanup = registerNotificationListeners(props);
    }

    void initNotifications();

    return () => {
      cleanup?.();
    };
  }, [props.handleNotification, props.handleNotificationResponse]);
};

export type NotificationResponse = Notifications.NotificationResponse;
export type Notification = Notifications.Notification;
