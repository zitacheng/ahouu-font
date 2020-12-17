import { store } from 'react-notifications-component';

const notify = (title: string, content: string, error: boolean): void => {
  store.addNotification({
    title,
    message: content,
    type: error ? 'danger' : 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
};

export default notify;
