define([
  "backbone"
, "text!./templates/login.html"
, "app"
, "models/currentUser"
], function(
  Backbone
, template
, app
, currentUser
) {

  var View = Backbone.Marionette.ItemView.extend({

    tagName: 'article'

  , attributes: {
      id: 'login-view'
    , 'class': 'view contentPanel'
    }

  , template: _.template(template)

  , initialize: function() {
      _.bindAll(this , 'login')
    }

  , events: {
      "submit form.login-form": "login"
    }

  , login: function(e) {
      var self = this
        , email = this.$("#login-email").val()
        , password = this.$("#login-password").val()

      e.stopPropagation() // FIXME: Remove form tag
      e.preventDefault()

      currentUser.login(
        email
      , password
      , {
          success: function() {
            app.vent.trigger('go:home')
          }
        , error: function(error) {
            self.$(".login-form .error")
              .html("Invalid email or password. Please try again.")
              .show()
            self.$(".login-form button").removeAttr("disabled")
          }
        }
      )

      this.$(".login-form button").attr("disabled", "disabled")

      return false
    }
  })

  return View

})

