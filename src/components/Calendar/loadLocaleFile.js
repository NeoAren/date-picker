// Load the 'date-fns' locale file

const loadLocaleFile = code => {

   if (typeof code !== 'string' || code.length !== 2) {
      console.error('Please enter a valid ISO 639‑1 language code, continuing with the default \'en\' locale.');
      console.error('Please check https://date-fns.org/v1.30.1/docs/I18n#supported-languages for the list of supported languages.');
      code = 'en';
   }

   let localeFile;
   try {
      localeFile = require('date-fns/locale/' + code + '/index.js');
   } catch (err) {
      console.error('Unable to load the \'date-fns\' language file for \'' + code + '\', continuing with the default \'en\' locale.');
      console.error('Please check https://date-fns.org/v1.30.1/docs/I18n#supported-languages for the list of supported languages.');
      localeFile = require('date-fns/locale/en/index.js');
   }

   return localeFile;

};

export default loadLocaleFile;
