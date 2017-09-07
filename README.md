# Fazendocontas

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

https://medium.com/@ryanchenkie_40935/angular-cli-deployment-host-your-angular-2-app-on-heroku-3f266f13f352

http://localhost:4200
https://fazendocontas.herokuapp.com/
heroku login
heroku git:remote -a fazendocontas
ng build
git push heroku master


https://medium.com/letsboot/angular-4-and-testing-angular-cli-gitlab-ci-ng-test-phantomjs-tdd-afc20f50b928

http://valor-software.com/ngx-bootstrap/#/


List assets
find . -type f -printf "%T@ %p\n" | cut -d\  -f2-


https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html


/**
 * Calculate a 32 bit FNV-1a hash
 * Found here: https://gist.github.com/vaiorabbit/5657561
 * Ref.: http://isthe.com/chongo/tech/comp/fnv/
 *
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */

function hashFnv32a(str, asString, seed) {
  var i, l,
      hval = (seed === undefined) ? 0x811c9dc5 : seed;

  for (i = 0, l = str.length; i < l; i++) {
      hval ^= str.charCodeAt(i);
      hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
  }
  if( asString ){
      // Convert to 8 digit hex string
      return ("0000000" + (hval >>> 0).toString(16)).substr(-8);
  }
  return hval >>> 0;
}
