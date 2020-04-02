$(()=>{

	const $el = {
		sectionInput: $('#section-input'),
		sectionResult: $('#section-result'),
		dropzone: $('#dropzone'),
		timezone: $('#timezone'),
		display: $('[name="display_setting"]'),
		tbl: $('#table'),
	};
	var $tbl,
		timezone = 7,
		display = 0;

	$el.dropzone
	.on('click', function(e) { $('#input-files').trigger('click') })
	.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) { e.preventDefault(); e.stopPropagation(); })
	.on('dragover dragenter', function() { $el.dropzone.addClass('dragover') })
	.on('dragleave dragend drop', function() { $el.dropzone.removeClass('dragover') })
	.on('drop', function(e) { readFile(e.originalEvent.dataTransfer.files) });

	$el.display.change(function() {
		display = Number($(this).val());
		$el.tbl.toggleClass('td3-d-none td6-d-none', display === 0).toggleClass('td4-d-none td5-d-none', display === 1);
		$tbl.draw();
	});

	$('#input-files').change(function(e) { readFile(e.target.files) });

	$('#btn-reset').click(function() {
		$('.tooltip').tooltip('hide');
		$el.sectionResult.hide();
		$el.sectionInput.fadeIn();
	});

	const readFile = files => {

		let i = 0,
			n = files.length,
			nValid = 0,
			nInvalid = 0,
			nFailed = 0,
			data = [];

		const checkIfDone = () => {
			if (n === i) {
				if (nValid) {
					utils.notif(nValid+' file berhasil diproses', 'success');
					generateResult(data);
				}
				if (nInvalid) utils.notif((nValid ? nInvalid+' file' : 'File')+' tidak valid', 'danger');
				if (nFailed) utils.notif(nFailed+' file gagal terbaca', 'warning');
			}
		}

		Array.from(files).forEach(file => {
			let ext = file.name.substr(file.name.lastIndexOf('.')+1).toLowerCase();
			if (ext === 'csv') {
				let reader = new FileReader();
				reader.readAsText(file);
				reader.onload = function(e) {
					let text = e.target.result.replace(/\t/g, ',');
					if (text.replace(/\"/g, '').startsWith('Responder Name,Group Name,Responder Location Latitude,Responder Location Longitude')) {
						data.push({
							filename: file.name,
							data: $.csv.toObjects(text.replace(/\,\=\"20/g, ',"20')),
						});
						i++; nValid++; checkIfDone();
					}
					else { i++; nInvalid++; checkIfDone(); }
				}
				reader.onerror = function() { i++; nFailed++; checkIfDone(); }
			}
			else { i++; nInvalid++; }
		});

		checkIfDone();
	}

	const generateResult = data => {

		console.info(data);

		const colorTime = (m, n) => `<span class="text-${n <= 73000 || n >= (m.format('e') === '4' ? 163000 : 160000) ? 'green' : 'danger'}">${m.format('HH:mm:ss')}</span>`;

		$el.timezone.html($('#select-timezone :selected').text());
		timezone = Number($('#select-timezone').val());

		let merged = [], employee = [], date = [];
		data.forEach(a => {
			a.data.forEach(b => {
				let m = moment(b['ResponseTime (UTC)'].substr(0,19)).add(timezone, 'hours'),
					d = m.format('D MMMM YYYY'),
					hourInNum = Number(m.format('HHmmss'));
				if (!employee.includes(b['Responder Name'])) employee.push(b['Responder Name']);
				if (!date.includes(d)) date.push(d);
				let id_employee = employee.findIndex(c => c === b['Responder Name'])+1,
					id_employee_d = id_employee + m.format('-YYYYMMDD'),
					id_employee_t = id_employee + m.format('-YYYYMMDD-HHmmss');
				merged.push({
					...b,
					t: colorTime(m, hourInNum),
					d: m.format('[<span class="d-none">]YYYYMMDD[</span>]dddd, D MMMM YYYY'),
					hourInNum,
					id_employee,
					id_employee_d,
					id_employee_t,
				});
			});
		});
		merged.forEach(a => {
			let timeInOneDay = merged.filter(b => b.id_employee_d === a.id_employee_d).map(b => b.t),
				n = timeInOneDay.length,
				thisTimeIndex = timeInOneDay.findIndex(b => b === a.t);
			if (thisTimeIndex === 0) {
				if (n === 1) a.range = a.hourInNum < 120000 ? [a.t, '<span class="text-gray">-</span>'] : ['<span class="text-gray">-</span>', a.t];
				else a.range = [a.t, timeInOneDay[n-1]];
			}
		});

		$tbl.clear().rows.add(merged).draw();
		$el.tblFilter.html(
			'<option value="">Semua Pegawai</option><option style="border-bottom: 1px solid #eee; font-size: 0; padding: 6px 0 0; margin-bottom: 6px;" disabled></option>'
			+ employee.map((a,i) => [a, `<option value="${i+1}">${a}</option>`]).sort((a,b) => a[0]>b[0] ? 1 : -1).map(a => a[1]).join('')
		).trigger('change').selectpicker('refresh');

		$('#display_setting1').click();
		$el.sectionInput.hide();
		$el.sectionResult.fadeIn();
	}

	$tbl = $el.tbl.DataTable({
		data: [],
		columns: [{
			className: 'fit',
			title: 'Hari, Tanggal',
			data: 'd',
		},{
			title: 'Nama',
			data: null,
			render: a => `<span class="d-none">[id=${a.id_employee}]</span>${a['Responder Name']}`,
		},{
			title: 'Waktu',
			data: 't',
		},{
			title: 'Waktu Mulai',
			data: null,
			render: ({ range }) => range ? range[0] : '',
		},{
			title: 'Waktu Berakhir',
			data: null,
			render: ({ range }) => range ? range[1] : '',
		},{
			title: 'Catatan',
			data: 'NotesQuestionTitle',
		},{
			className: 'fit pr-2',
			title: '',
			data: null,
			searchable: false,
			sortable: false,
			render: () => `<i class="fas fa-info-circle fa-fw py-1 cur-p fz-16 text-primary" title="Detail" onclick="utils.notif('Coming soon...', 'wait')"></i>`,
		}],
	});
	$('#table_filter').html('<div class="d-inline-flex align-items-center"><div class="mr-2"><i class="fas fa-user"></i></div><div><select id="table-filter-employee" class="selectpicker" data-style="btn-light btn-sm"></select></div></div>');
	$el.tblFilter = $('#table-filter-employee').change(function() { $tbl.draw() });

	$.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
		return ( !$el.tblFilter.val() || data[1].includes(`[id=${$el.tblFilter.val()}]`) ) && ( display || data[3] );
	});

	$('#btn-export').click(function() {
		utils.notif('Coming soon...', 'wait');
	});

});
