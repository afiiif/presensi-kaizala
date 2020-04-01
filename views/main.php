<!DOCTYPE html>
<html lang="en" class="h-100">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="author" content="Muhammad Afifudin">
	<meta name="theme-color" content="#1572e8">
	<meta property="og:site_name" content="Presensi Kaizala">
	<meta property="og:title" content="Presensi Kaizala · BPS Kabupaten Kayong Utara">
	<meta property="og:url" content="<?=SITE.PATH?>">
	<base href="<?=SITE?>/presensi-kaizala/">
	<title>Presensi Kaizala · BPS Kabupaten Kayong Utara</title>

	<link rel="shortcut icon" href="https://webapp.kaiza.la/web-app-images/favicon.ico?v=2" type="image/x-icon">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900&display=swap">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/css/bootstrap-select.min.css">
	<link rel="stylesheet" href="lib/flaticon/flaticon.css">
	<link rel="stylesheet" href="lib/atlantis-lite/mod/atlantis.mod.css?v=<?php include 'views/partials/_version.php'; ?>">
	<link rel="stylesheet" href="assets/css/main.css?v=<?php include 'views/partials/_version.php'; ?>">

	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js"></script>
</head>
<body>

<?php include 'views/partials/modal.php'; ?>

	<header class="main-header">
		<div class="logo-header p-0 w-100" data-background-color="blue">
			<div class="container-fluid px-lg-4 px-xl-5"><a href="" class="text-white text-decoration-none">Presensi Kaizala</a></div>
		</div>
	</header>

	<div class="pt-55 pb-4"></div>

	<main class="container-fluid px-lg-4 px-xl-5">
		<section id="section-input">
			<div class="row row-8 align-items-center mb-35">
				<div class="col-auto">Zona Waktu:</div>
				<div class="col-auto" style="width: 90px;">
					<select id="timezone" class="selectpicker" data-width="100%" data-style="btn-sm btn-primary btn-border bg-white">
						<option value="7">WIB</option>
						<option value="8">WITA</option>
						<option value="9">WIT</option>
					</select>
				</div>
			</div>
			<input type="file" accept=".csv" id="input-files" class="d-none" multiple>
			<div class="dropzone cur-p" id="dropzone">
				<div class="dropzone-inner">
					<div class="mb-35 d-inline-block position-relative">
						<i class="fas fa-circle fz-22 text-white position-absolute z-5" style="top: 8px; left: -16px;"></i>
						<i class="fas fa-plus-circle fz-22 position-absolute z-5" style="top: 8px; left: -16px;"></i>
						<i class="fas fa-file-csv fz-52 text-success op-7"></i>
					</div>
					<div class="fz-16 fz-md-20">
						<div class="fw-6">Klik untuk Memilih file CSV</div>
						<div class="fw-3">atau drag & drop file di sini</div>
					</div>
				</div>
			</div>
		</section>
		<section id="section-result" style="display: none;">
			<div class="d-flex align-items-center mb-3">
				<h3 class="fw-6">Hasil</h3>
				<div class="ml-auto">
					<button id="btn-export" type="button" class="btn btn-icon btn-round btn-success mr-2" data-toggle="tooltip" title="Simpan ke File Excel"><i class="fas fa-download fz-18"></i></button><button id="btn-reset" type="button" class="btn btn-icon btn-round btn-danger" data-toggle="tooltip" title="Ulangi"><i class="fas fa-redo fz-18 fa-flip-horizontal"></i></button>
				</div>
			</div>
			<div class="card mx--a mx-sm-0">
				<div class="card-body">Lorem ipsum...</div>
			</div>
		</section>
	</main>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.8.9/jquery.csv.min.js"></script>
	<script src="lib/atlantis-lite/mod/atlantis.mod.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>

	<script>

		$.notifyDefaults({
			placement: { from: 'bottom' },
			animate: { enter: 'animated fadeInUp', exit: 'animated fadeOutDown' },
		});

		$(()=>{

			const $el = {
				sectionInput: $('#section-input'),
				sectionResult: $('#section-result'),
				dropzone: $('#dropzone'),
			};

			$el.dropzone
			.on('click', function(e) { $('#input-files').trigger('click') })
			.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) { e.preventDefault(); e.stopPropagation(); })
			.on('dragover dragenter', function() { $el.dropzone.addClass('dragover') })
			.on('dragleave dragend drop', function() { $el.dropzone.removeClass('dragover') })
			.on('drop', function(e) { readFile(e.originalEvent.dataTransfer.files) });

			$('#input-files').change(function(e) { readFile(e.target.files) });

			$('#btn-reset').click(function() {
				$('.tooltip').tooltip('hide');
				$el.sectionResult.hide();
				$el.sectionInput.fadeIn();
			});

			const readFile = files => {

				console.info(files);

				let i = 0,
					n = files.length,
					nValid = 0,
					nInvalid = 0,
					nFailed = 0,
					data = [];

				const checkIfDone = () => {
					if (n === i) {
						if (nValid) {
							utils.notif(nValid+' file berhasil diproses');
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
							let text = e.target.result;
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
				$el.sectionInput.hide();
				$el.sectionResult.fadeIn();
			}

		});

	</script>

</body>
</html>