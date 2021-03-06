exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'assets/app.js':    /^app/
        'assets/vendor.js': /^vendor/
      order:
        before: [
          /lib/
        ]
    stylesheets:
      joinTo: 'assets/app.css'
      order:
        before: [
          'base.sass'
          'menu.sass'
          'title.sass'
          'speakers.sass'
        ]
    templates:
      joinTo: 'assets/app.js'
  modules:
    wrapper: false
