$(() => {

	const $$ = {
		sectionInput: $('#section-input'),
		sectionResult: $('#section-result'),
		dropzone: $('#dropzone'),
		tbl: $('#table'),
	};

	var $tbl,
		data = [],
		timezone = 7,
		display = 0,
		timeChoice = $('[name="time_setting"]:checked').val(),
		employees,
		sectionResult = false;

	$$.dropzone
		.on('click', function (e) { $('#input-files').trigger('click') })
		.on('drag dragstart dragend dragover dragenter dragleave drop', function (e) { e.preventDefault(); e.stopPropagation(); })
		.on('dragover dragenter', function () { $$.dropzone.addClass('dragover') })
		.on('dragleave dragend drop', function () { $$.dropzone.removeClass('dragover') })
		.on('drop', function (e) { readFile(e.originalEvent.dataTransfer.files) });

	$('#input-files').change(function (e) { readFile(e.target.files) });

	$('#btn-reset').click(function () {
		$('.tooltip').tooltip('hide');
		$$.sectionResult.hide(); sectionResult = false;
		$$.sectionInput.fadeIn();
	});

	const readFile = files => {

		data = [];
		let i = 0,
			n = files.length,
			nValid = 0,
			nInvalid = 0,
			nFailed = 0;

		const checkIfDone = () => {
			if (n === i) {
				if (nValid) {
					utils.notif(nValid + ' file berhasil diproses', 'success');
					generateResult();
				}
				if (nInvalid) utils.notif((nValid ? nInvalid + ' file' : 'File') + ' tidak valid', 'danger');
				if (nFailed) utils.notif(nFailed + ' file gagal terbaca', 'warning');
			}
		}

		const readCsv = (filename, text) => {
			if (text.replace(/\"/g, '').startsWith('Responder Name,Group Name,')) {
				try {
					data.push({
						filename: filename,
						data: $.csv.toObjects(text.replace(/\,\=\"20/g, ',"20')),
					});
					i++; nValid++; checkIfDone();
				}
				catch (err) {
					i++; nFailed++; checkIfDone();
				}
			}
			else { i++; nInvalid++; checkIfDone(); }
		}

		Array.from(files).forEach(file => {
			let ext = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
			if (ext === 'csv') {
				let reader = new FileReader();
				reader.readAsText(file);
				reader.onload = function (e) { readCsv(file.name, e.target.result.replace(/\t/g, ',')); }
				reader.onerror = function () { i++; nFailed++; checkIfDone(); }
			}
			else if (ext === 'zip') {
				JSZip.loadAsync(file).then(function (zip) {
					let innerFiles = Object.keys(zip.files);
					i -= innerFiles.length - 1;
					innerFiles.forEach(function (filename) {
						if (filename.substr(filename.lastIndexOf('.') + 1).toLowerCase() === 'csv') {
							zip.files[filename].async('string').then(function (text) {
								readCsv(filename, text.replace(/\t/g, ',').replace(/\ufeff/g, ''));
							});
						}
						else { i++; nInvalid++; checkIfDone(); }
					});
				}, function (e) {
					i++; nFailed++; checkIfDone();
				});
			}
			else { i++; nInvalid++; }
		});

		checkIfDone();
	}

	const generateResult = (resetDisplay = true) => {

		console.info(data);

		const colorTime = (m, n) => `<span class="text-${n <= 73000 || n >= (m.format('e') === '4' ? 163000 : 160000) ? 'green' : 'danger'}">${m.format('HH:mm:ss')}</span>`;

		timezone = Number($('#select-timezone').val());

		let merged = []; employees = [];

		data.forEach(a => {
			a.data.forEach(b => {

				let m = moment(b[timeChoice].substr(0, 19)).add(timezone, 'hours'),
					day = m.format('dddd,D MMMM YYYY').split(','),
					time = [m.format('HH:mm:ss'), Number(m.format('HHmmss'))];

				if (!employees.includes(b['Responder Name'])) employees.push(b['Responder Name']);

				let id_employee = employees.findIndex(c => c === b['Responder Name']) + 1,
					id_employee_d = id_employee + m.format('-YYYYMMDD'),
					id_employee_t = id_employee + m.format('-YYYYMMDD-HHmmss');

				merged.push({
					...b,
					m,
					day,
					time,
					dt_day: m.format('[<span class="d-none">]YYYYMMDD[</span>]dddd, D MMMM YYYY'),
					dt_time: colorTime(m, time[1]),
					id_employee,
					id_employee_d,
					id_employee_t,
				});

			});
		});

		merged.forEach(a => {
			let allTime = merged.filter(b => b.id_employee_d === a.id_employee_d).sort((a, b) => a.time[1] > b.time[1] ? 1 : -1),
				n = allTime.length,
				thisTimeIndex = allTime.findIndex(b => b.time[0] === a.time[0]);
			if (thisTimeIndex === 0) {
				if (n === 1) {
					if (a.time[1] < 120000) {
						a.range_time = [a.time[0], '-'];
						a.range_coordinate = [a['Responder Location Latitude'] + ', ' + a['Responder Location Longitude'], '-'];
						a.range_location = [a['Responder Location Location'], '-'];
						a.range_note = [a.NotesQuestionTitle, '-'];
						a.range_photo = [a.PhotoQuestionTitle, '-'];
						a.dt_range_time = [a.dt_time, '<span class="text-gray">-</span>'];
					}
					else {
						a.range_time = ['-', a.time[0]];
						a.range_coordinate = ['-', a['Responder Location Latitude'] + ', ' + a['Responder Location Longitude']];
						a.range_location = ['-', a['Responder Location Location']];
						a.range_note = ['-', a.NotesQuestionTitle];
						a.range_photo = ['-', a.PhotoQuestionTitle];
						a.dt_range_time = ['<span class="text-gray">-</span>', a.dt_time];
					}
				}
				else {
					let b = allTime[n - 1];
					a.range_time = [a.time[0], b.time[0]];
					a.range_coordinate = [a['Responder Location Latitude'] + ', ' + a['Responder Location Longitude'], b['Responder Location Latitude'] + ', ' + b['Responder Location Longitude']];
					a.range_location = [a['Responder Location Location'], b['Responder Location Location']];
					a.range_note = [a.NotesQuestionTitle, b.NotesQuestionTitle];
					a.range_photo = [a.PhotoQuestionTitle, b.PhotoQuestionTitle];
					a.dt_range_time = [a.dt_time, b.dt_time];
				}
			}
		});

		$tbl.clear().rows.add(merged).draw();
		$$.tblFilter.html(
			'<option value="">Semua Pegawai</option><option style="border-bottom: 1px solid #eee; font-size: 0; padding: 6px 0 0; margin-bottom: 6px;" disabled></option>'
			+ employees.map((a, i) => [a, `<option value="${i + 1}">${a}</option>`]).sort((a, b) => a[0] > b[0] ? 1 : -1).map(a => a[1]).join('')
		).trigger('change').selectpicker('refresh');

		if (resetDisplay) {
			$('#display_setting1').click();
			$('#select-timezone-2').selectpicker('val', timezone);
			$$.sectionInput.hide();
			$$.sectionResult.fadeIn(); sectionResult = true;
		}
	}

	$('[name="display_setting"]').change(function () {
		display = Number($(this).val());
		$$.tbl.toggleClass('td3-d-none td6-d-none', display === 0).toggleClass('td4-d-none td5-d-none', display === 1);
		$tbl.draw();
	});

	$('[name="time_setting"]').change(function () {
		timeChoice = $(this).val();
		generateResult(false);
	});

	$('#select-timezone-2').change(function () {
		dbg('Changed - ' + sectionResult);
		if (sectionResult) {
			$('#select-timezone').selectpicker('val', $('#select-timezone-2').val());
			generateResult(false);
		}
	});

	$tbl = $$.tbl.DataTable({
		data: [],
		columns: [{
			className: 'fit',
			title: 'Hari, Tanggal',
			data: 'dt_day',
		}, {
			title: 'Nama',
			data: null,
			render: a => `<span class="d-none">[id=${a.id_employee}]</span>${a['Responder Name']}`,
		}, {
			title: 'Waktu',
			data: 'dt_time',
		}, {
			title: 'Waktu Mulai',
			data: null,
			render: ({ dt_range_time }) => dt_range_time ? dt_range_time[0] : '',
		}, {
			title: 'Waktu Berakhir',
			data: null,
			render: ({ dt_range_time }) => dt_range_time ? dt_range_time[1] : '',
		}, {
			title: 'Catatan',
			data: 'NotesQuestionTitle',
		}],
	});
	$('#table_filter').html('<div class="d-inline-flex align-items-center"><div class="mr-2"><i class="fas fa-user"></i></div><div><select id="table-filter-employee" class="selectpicker" data-style="btn-light btn-sm"></select></div></div>');
	$$.tblFilter = $('#table-filter-employee').change(function () { $tbl.draw() });

	$.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
		return (!$$.tblFilter.val() || data[1].includes(`[id=${$$.tblFilter.val()}]`)) && (display || data[3]);
	});

	const exportExcel = sheets => {
		const sanitizeName = name => {
			if (name.length > 30) name = name.substr(0, 27) + '...';
			return name.replace(/\\|\/|\?|\*|\[|\]/g, '_');
		}
		let wb = XLSX.utils.book_new();
		sheets.forEach(a => { XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(a.data), sanitizeName(a.name)) });
		XLSX.writeFile(wb, `Presensi Kaizala (${$('#select-timezone :selected').text()}) - ${moment.utc().add(timezone, 'hours').format('YYYYMMDD-HHmmss')}.xlsx`);
	}

	$('#btn-export').click(function () {

		let rawdata = $tbl.rows().data().toArray(),
			header,
			data,
			dataByEmployee = [];

		if (display) {
			header = ['Hari', 'Tanggal', 'Nama', 'Waktu', 'Koordinat', 'Lokasi', 'Catatan', 'Foto'];
			data = rawdata.map(a => [
				a.day[0],
				a.day[1],
				a['Responder Name'],
				a.time[0],
				a['Responder Location Latitude'] + ', ' + a['Responder Location Longitude'],
				a['Responder Location Location'],
				a.NotesQuestionTitle,
				a.PhotoQuestionTitle,
			]);
		}
		else {
			header = ['Hari', 'Tanggal', 'Nama', 'Waktu Mulai', 'Waktu Berakhir', 'Koordinat Waktu Mulai', 'Koordinat Waktu Berakhir', 'Lokasi Waktu Mulai', 'Lokasi Waktu Berakhir', 'Catatan Waktu Mulai', 'Catatan Waktu Berakhir', 'Foto Waktu Mulai', 'Foto Waktu Berakhir'];
			data = rawdata.filter(a => a.range_time).map(a => [
				a.day[0],
				a.day[1],
				a['Responder Name'],
				a.range_time[0],
				a.range_time[1],
				a.range_coordinate[0],
				a.range_coordinate[1],
				a.range_location[0],
				a.range_location[1],
				a.range_note[0],
				a.range_note[1],
				a.range_photo[0],
				a.range_photo[1],
			]);
		}

		employees.sort().forEach(name => {
			dataByEmployee.push({ name, data: [header].concat(data.filter(a => a[2] === name)) });
		});

		let sheets = [{ name: 'Semua Pegawai', data: [header].concat(data) }].concat(dataByEmployee);
		exportExcel(sheets);

	});

	$(document).on('click', '[data-toggle="lightbox"]', function (e) {
		e.preventDefault();
		$(this).ekkoLightbox();
	});

});
