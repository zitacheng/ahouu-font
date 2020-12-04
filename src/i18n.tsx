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
      'list game': 'List of current games',
      id: 'ID',
      name: 'Name',
      players: 'Players',
      status: 'Status',
      type: 'Type',
      password: 'Password',
      connect: 'Connection',
      register: 'Register',
      deconnection: 'Log out',
      edit: 'Edit',
      firstname: 'Firstname',
      lastname: 'Lastname',
      email: 'Email',
      'account inf': 'Account information',
      save: 'Save',
      create: 'Create',
      public: 'Public',
      private: 'Private',
      'not found': 'Page not found',
      play: 'Play',
      chat: 'Chat',
      playing: 'Playing',
      'you are': 'You are',
      villager: 'Villager',
      werewolf: 'Werewolf',
      witch: 'Witch',
      seer: 'Seer',
    },
  },
  fr: {
    translation: {
      'Welcome to React': 'Bienvenue à React et react-i18next',
      pseudo: "Nom d'utilisateur",
      'join game': 'Rejoindre une partie',
      'create game': 'Créer une partie',
      'list game': 'List de jeu en cours',
      id: 'ID',
      name: 'Nom',
      players: 'Joueurs',
      status: 'Status',
      type: 'Type',
      password: 'Mot de passe',
      connect: 'Connexion',
      register: "S'inscrire",
      deconnection: 'Se déconnecter',
      edit: 'Modifier',
      firstname: 'Prénom',
      lastname: 'Nom',
      email: 'Address email',
      'account inf': 'Information du compte',
      save: 'Sauvegarder',
      create: 'Créer',
      public: 'Public',
      private: 'Privée',
      'not found': 'Page introuvable',
      play: 'Jouer',
      chat: 'Chat',
      playing: 'En jeu',
      'you are': 'Vous êtes',
      villager: 'Villageois',
      werewolf: 'Loup garou',
      witch: 'Sorcière',
      seer: 'Voyante',
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
