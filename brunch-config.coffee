exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'assets/app.js':    /^app/
        'assets/vendor.js': /^vendor/
    stylesheets:
      joinTo: 'assets/app.css'
    templates:
      joinTo: 'assets/app.js'
  modules:
    wrapper: false
