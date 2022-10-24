$('#dhcp_config').height($(window).height() * 0.6);

var dhcp_config = ace.edit("dhcp_config");
dhcp_config.setTheme("ace/theme/terminal");
dhcp_config.$blockScrolling = Infinity;

function save_dhcp_config() {
	dhcp_config_form_data = get_form_query_string("dhcp_config_form");
	dhcp_config_form_data = dhcp_config_form_data + "&dhcp_config_data=" + encodeURIComponent(dhcp_config.getValue());

	console.log(dhcp_config_form_data)

	$.post( "/dhcp_config_save", dhcp_config_form_data, function( data ) {
		$( "#dhcp_config_result" ).html( data );
	});
}

function save_dhcpv4_config() {
	dhcpv4_config_form_data = get_form_query_string("dhcp_config_form");
	dhcpv4_config_form_data = dhcpv4_config_form_data + "&dhcp_config_data=" + encodeURIComponent(dhcp_config.getValue());

	console.log(dhcpv4_config_form_data)

	$.post( "/dhcpv4_config_save", dhcpv4_config_form_data, function( data ) {
		$( "#dhcp_config_result" ).html( data );
	});
}

function save_dhcpv6_config() {
	dhcpv6_config_form_data = get_form_query_string("dhcp_config_form");
	dhcpv6_config_form_data = dhcpv6_config_form_data + "&dhcp_config_data=" + encodeURIComponent(dhcp_config.getValue());

	console.log(dhcpv6_config_form_data)

	$.post( "/dhcpv6_config_save", dhcp_config_form_data, function( data ) {
		$( "#dhcp_config_result" ).html( data );
	});
}