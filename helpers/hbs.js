//STEP 65 => STEP 66 creo un helper per formattare le date e lo importo in app.js prima di handlebars

const moment = require ('moment');

module.exports = {
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    //STEP 71 creo heper truncate per tagliare testi in descrizione troppo lunghi => STEP 72 creo helper per eliminare htamltags in overflow
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
          let new_str = str + ' '
          new_str = str.substr(0, len)
          new_str = str.substr(0, new_str.lastIndexOf(' '))
          new_str = new_str.length > 0 ? new_str : str.substr(0, len)
          return new_str + '...'
        }
        return str
      },
    //STEP 72 => STEP73 importo i due nuovi helpers in app.js
    stripTags: function (input){
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    //STEP 75 creo helper per generare icona nelle card 
    // e modificare la storia => importo helper in app.js
    editIcon: function (storyUser, loggedUser, storyId, floating = true) {
        if (storyUser._id.toString() == loggedUser._id.toString()) {
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class ="btn-floating
                halfway-fab blue"><i class ="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/stories/edit/${storyId}"><i class ="fas fa-edit"></i></a>`
            }
        } else {
            return ""
        }
    },
//STEP 83 creo helper per select storia publ/prvt => STEP 84 importo helper in app.js
  
    select: function (selected, options) {
        return options
          .fn(this)
          .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
          )
          .replace(
            new RegExp('>' + selected + '</option>'),
            ' selected="selected"$&'
          )
      },

}