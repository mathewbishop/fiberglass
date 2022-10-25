/**
 * Created by cmiles on 8/5/2017.
 */

var fs = require('fs')
var json_file = require('jsonfile')
var glass_config = json_file.readFileSync('config/glass_config.json')

module.exports = {
  get_index_template: function (body_content, request_url) {
    if (typeof request_url !== 'undefined' && request_url.includes('v_ajax')) {
      return body_content
    } else {
      core = fs.readFileSync('./public/templates/index.html', 'utf8')
      core = core.replace(/\[header_title\]/, glass_config.header_title)
      core = core.replace(/\[body_content\]/, body_content)
      // core = core.replace(/\[(.*?)\]/, "");
      return core
    }
  },
  get_template: function (template) {
    return fs.readFileSync('./public/templates/' + template + '.html', 'utf8')
  },
  set_template_variable: function (template, variable, value) {
    return template.replace('[' + variable + ']', value)
  },
  form_body: function (id, inputs) {
    return '<div id="' + id + '">' + inputs + '</div>'
  },
  form_input: function (title, input) {
    return (
      '<label>' +
      title +
      '</label><div class="form-group"><div class="form-line">' +
      input +
      '</div></div>'
    )
  },
}
