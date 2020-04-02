$.notifyDefaults({
	placement: { from: 'bottom' },
	animate: { enter: 'animated fadeInUp', exit: 'animated fadeOutDown' },
});

$.extend(true, $.fn.dataTable.defaults, {
	dom: "<'row justify-content-center'<'col-sm-auto'l><'col-sm'f>>r<'table-responsive't><'row justify-content-center align-items-center'<'col-sm-auto'i><'col-sm'p>>",
	language: {
		decimal: ',',
		thousands: '.',
		lengthMenu: 'Menampilkan &nbsp;_MENU_&nbsp; data',
		search: 'Cari',
		info: 'Halaman _PAGE_ dari _PAGES_',
		infoFiltered: '',
		infoEmpty: 'Menampilkan 0 hasil',
		paginate: { previous: '<i class="fas fa-chevron-left"></i>', next: '<i class="fas fa-chevron-right"></i>' },
		zeroRecords: 'Tidak ada hasil',
		emptyTable: 'Tidak ada data',
	},
	pageLength: 50,
	lengthMenu: [10, 25, 50, 100, 250, 500],
});
