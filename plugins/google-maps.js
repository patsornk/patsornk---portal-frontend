import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCq2f8MInssCKHWaNRYIazatNiG2h1SX8Q',
    region: 'TH',
    libraries: 'geocoder'
  }
});
