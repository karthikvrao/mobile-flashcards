
import { Notifications, Permissions } from 'expo';
import { removeNotificationKey, getNotificationKey, setNotificationKey } from './storage';

const clearLocalNotifications = () => removeNotificationKey()
  .then(Notifications.cancelAllScheduledNotificationsAsync);

const createLocalNotifications = () => ({
  title: 'Reminder to study',
  body: '👋 Don\'t forget to study your flashcard decks',
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

const setLocalNotifications = () =>
  getNotificationKey()
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(21);
              tomorrow.setMinutes(0);
              tomorrow.setSeconds(0);

              Notifications.scheduleLocalNotificationAsync(
                createLocalNotifications(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              );

              setNotificationKey(true);
            }
          });
      }
    });

export {
  clearLocalNotifications,
  setLocalNotifications,
};