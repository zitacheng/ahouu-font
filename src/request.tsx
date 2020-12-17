import notify from './Component/Notif';

const login = (email: string, password: string): void => {
  // console.log(process.env);
  fetch('https://ahouu-back.herokuapp.com/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((responseJson) => {
      // console.log(responseJson);
      if (responseJson.status >= 400) {
        notify('Error', 'Error login', true);
      }
    })
    .catch((error) => {
      // console.log(error);
      notify('Error', error, true);
    });
};

export default login;

// TODO remplacer url api par ${process.env.REACT_APP_ENDPOINT as string}
// TODO la requete ne marche pas cors policy
