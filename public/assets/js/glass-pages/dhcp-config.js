$('#dhcp_config').height($(window).height() * 0.6)

var dhcp_config = ace.edit('dhcp_config')
dhcp_config.setTheme('ace/theme/terminal')
dhcp_config.$blockScrolling = Infinity

function save_dhcp_config() {
  dhcp_config_form_data = get_form_query_string('dhcp_config_form')
  dhcp_config_form_data =
    dhcp_config_form_data +
    '&dhcp_config_data=' +
    encodeURIComponent(dhcp_config.getValue())

  console.log(dhcp_config_form_data)

  $.post('/dhcp_config_save', dhcp_config_form_data, function (data) {
    $('#dhcp_config_result').html(data)
  })
}

function save_dhcp6_config() {
  dhcp6_config_form_data = get_form_query_string('dhcp_config_form')
  dhcp6_config_form_data =
    dhcp6_config_form_data +
    '&dhcp_config_data=' +
    encodeURIComponent(dhcp_config.getValue())

  console.log(dhcp6_config_form_data)

  $.post('/dhcp6_config_save', dhcp6_config_form_data, function (data) {
    $('#dhcp_config_result').html(data)
  })
}

function save_dhcpv4_pools() {
  dhcpv4_pools_form_data = get_form_query_string('dhcp_config_form')
  dhcpv4_pools_form_data =
    dhcpv4_pools_form_data +
    '&dhcp_config_data=' +
    encodeURIComponent(dhcp_config.getValue())

  console.log(dhcpv4_pools_form_data)

  $.post('/dhcpv4_pools_save', dhcpv4_pools_form_data, function (data) {
    $('#dhcp_config_result').html(data)
  })
}

function save_dhcpv6_pools() {
  dhcpv6_pools_form_data = get_form_query_string('dhcp_config_form')
  dhcpv6_pools_form_data =
    dhcpv6_pools_form_data +
    '&dhcp_config_data=' +
    encodeURIComponent(dhcp_config.getValue())

  console.log(dhcpv6_pools_form_data)

  $.post('/dhcpv6_pools_save', dhcpv6_pools_form_data, function (data) {
    $('#dhcp_config_result').html(data)
  })
}
