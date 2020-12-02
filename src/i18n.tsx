import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// const lng = localStorage.getItem('lang');

const resources = {
  en: {
    translation: {
      'Welcome to React': 'Welcome to React and react-i18next',
      pseudo: 'Pseudo',
      'join game': 'Join game',
      'create game': 'Create game',
    },
  },
  fr: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next',
      pseudo: "Nom d'utilisateur",
      'join game': 'Rejoindre une partie',
      'create game': 'Créer une partie',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
}).then(() => {
}).catch(() => {
});

export default i18n;
