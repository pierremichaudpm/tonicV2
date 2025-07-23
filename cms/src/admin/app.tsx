export default {
  config: {
    // Set French as default language for admin interface
    locales: ['fr', 'en'],
    translations: {
      fr: {
        'app.components.LeftMenu.navbrand': 'Groupe Tonic CMS',
        'HomePage.welcome': 'Bienvenue sur Strapi',
        'HomePage.welcome.again': 'Bienvenue 👋',
        'HomePage.welcomeBlock.content': 'Félicitations ! Vous êtes connecté à Strapi. Vous découvrez l\'écran d\'accueil. Vous pouvez cliquer sur le lien ci-dessous pour créer votre premier type de contenu.',
        'content-manager.containers.List.displayedFields': 'Champs affichés',
        'content-manager.containers.ListPage.table-headers.name': 'Nom',
        'content-manager.containers.ListPage.table-headers.status': 'Statut',
        'content-manager.containers.ListPage.table-headers.updatedAt': 'Mis à jour le',
        'content-manager.containers.ListPage.table-headers.createdAt': 'Créé le',
        'content-manager.success.record.save': 'Enregistré',
        'content-manager.success.record.delete': 'Supprimé',
        'content-manager.success.record.publish': 'Publié',
        'content-manager.success.record.unpublish': 'Dépublié',
        'global.save': 'Enregistrer',
        'global.cancel': 'Annuler',
        'global.delete': 'Supprimer',
        'global.publish': 'Publier',
        'global.unpublish': 'Dépublier',
        'global.draft': 'Brouillon',
        'global.published': 'Publié',
        'global.create': 'Créer',
        'global.edit': 'Modifier',
        'global.search': 'Rechercher',
        'global.filters': 'Filtres',
        'global.sort': 'Trier',
        'global.loading': 'Chargement...',
        'global.no-content': 'Aucun contenu disponible',
        'Auth.form.welcome.title': 'Bienvenue !',
        'Auth.form.welcome.subtitle': 'Connectez-vous à votre compte Strapi',
        'Auth.form.button.login': 'Se connecter',
        'Auth.form.email.label': 'Email',
        'Auth.form.password.label': 'Mot de passe',
        'Settings.permissions.menu.link.roles.label': 'Rôles',
        'Settings.permissions.menu.link.users.label': 'Utilisateurs',
        'content-type-builder.plugin.name': 'Constructeur de types de contenu',
        'upload.plugin.name': 'Médiathèque',
        'i18n.plugin.name': 'Internationalisation',
        'users-permissions.plugin.name': 'Utilisateurs et permissions'
      }
    },
    theme: {
      light: {
        colors: {
          primary100: '#f0f4ff',
          primary200: '#d6e4ff',
          primary500: '#4945ff',
          primary600: '#4338ca',
          primary700: '#3730a3',
          danger700: '#b91c1c',
          warning100: '#fef3c7',
          warning200: '#fde68a',
          warning500: '#f59e0b',
          warning600: '#d97706',
          warning700: '#b45309'
        }
      }
    }
  },
  async bootstrap(app: any) {
    // Custom bootstrap logic if needed
    console.log('Strapi Admin French Interface Loaded');
  },
};