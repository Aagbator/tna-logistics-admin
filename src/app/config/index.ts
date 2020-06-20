import {HttpHeaders} from '@angular/common/http';
export const Constants = {

    theme_name: 'Naturelle Food Mart',
    current_year:  new Date().getFullYear(),
    home_link: '/index',

  VENDOR: 'Naturelle Food Mart',
  VERSION: '1.0',
  YEAR: new Date().getFullYear(),
  PORTAL_URL: 'portal',

  serviceUrl : 'https://staging.naturellefoodmart.com/naturelle/api/',

  NoTokenHttpHeaders: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/collection+json',
      'Access-Control-Allow-Origin': '*',
      'No-Auth': 'True'
    })
  },


  BlobHttpHeaders: {
    headers: new HttpHeaders({
      'No-Auth': 'False',
    })
  },

  // responseType: 'blob'

  TokenHttpHeaders: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/collection+json',
      'Access-Control-Allow-Origin': '*',
      'No-Auth': 'False'
    })
  },

  AccessToken: 'naturelleapp-access-token',
  RefreshToken: 'naturelleapp-refresh-token',
  userProfileStore: 'naturelleapp_user_data',
  ApiKey: 'pk_live_b9782d2f5d03c87121cb6fec586aebd196d0e520',

	layout: {
		sidebar: {
			always_drawer_mode: false,
		},
	},

	colors: {
		primary: '#2949EF',
		secondary: '#6c757d',
		success: '#06b5b6',
		info: '#00bcd4',
		warning: '#fd7e14',
		danger: '#FE4D2E',
		light: '#dee2e6',
		purple: '#6f42c1',
		indigo: '#6610f2',
		pink: '#e83e8c',
		yellow: '#FDA424',
		teal: '#20c997',
	},

};
