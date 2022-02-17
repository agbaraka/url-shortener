let mix = require('laravel-mix')

mix.js('client/src/main.js', 'client/dist/js')
   .postCss('client/src/css/app.css', 'css', [
      require('tailwindcss')
   ])
   .vue()
   .setPublicPath('client/dist');