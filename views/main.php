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
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/css/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css">
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
					<select id="select-timezone" class="selectpicker" data-width="100%" data-style="btn-sm btn-primary btn-border bg-white">
						<option value="7">WIB</option>
						<option value="8">WITA</option>
						<option value="9">WIT</option>
					</select>
				</div>
			</div>
			<input type="file" accept=".csv,.zip" id="input-files" class="d-none" multiple>
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
			<h3 class="fw-6 mt-45 mb-35">Panduan Penggunaan</h3>
			<div class="row">
				<div class="col-sm-6 col-lg position-relative">
					<div class="custom-card-number">1</div>
					<div class="card">
						<div class="card-body">
							<div>Export Attendance Report pada aplikasi Kaizala melalui fitur <span class="fw-6 text-primary">Share Attendance Report</span>, kemudian dapatkan link untuk mengunduh hasil export dengan menekan <span class="fw-6 text-primary">Tap to share link</span>.</div>
							<div class="mx--2">
								<a href="assets/img/cara-export-attendance.png" data-toggle="lightbox" data-gallery="help" class="d-block bg-lightgray mt-3 border" style="width: 100%; padding-bottom: 50%; background-image: url('assets/img/cara-export-attendance.png'); background-size: cover; background-position: bottom;"></a>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-lg position-relative">
					<div class="custom-card-number">2</div>
					<div class="card">
						<div class="card-body">
							<div>Unduh file dari link tadi, maka didapatlah file berekstensi <span class="fw-6">zip</span>. Ambil file <span class="text-primary">SurveyResponse.csv</span> di dalamnya.</div>
							<a href="assets/img/kaizala-zip.png" data-toggle="lightbox" data-gallery="help" class="d-block bg-lightgray mt-3 mx--2 border">
								<img src="assets/img/kaizala-zip.png" class="w-100">
							</a>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-lg position-relative">
					<div class="custom-card-number">3</div>
					<div class="card">
						<div class="card-body">
							<div>Atur zona waktu yang diinginkan.<br>Kemudian masukkan file-file CSV ke web app ini.</div>
							<a href="assets/img/presensi-kaizala.gif" data-toggle="lightbox" data-gallery="help" class="d-block bg-lightgray mt-3 mx--2 border">
								<img src="assets/img/presensi-kaizala.gif" class="w-100">
							</a>
							<div class="d-flex mt-25">
								<div><i class="fas fa-lightbulb text-warning mr-2"></i></div>
								<div>Anda dapat memilih banyak file sekaligus.</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-sm-6 col-lg position-relative">
					<div class="custom-card-number">4</div>
					<div class="card">
						<div class="card-body">
							<div class="text-center d-flex h-100 align-items-center justify-content-center">
								<div>
									<i class="icon-check fz-72 text-success"></i>
									<div class="mt-25">Selesai</div>
								</div>
							</div>
						</div>
						<div class="card-body border-top pt-3">Anda dapat melakukan export data ke dalam file <span class="text-primary">XLS</span>, mengurutkan baris pada tabel, dan melakukan filter presensi berdasarkan pegawai.</div>
					</div>
				</div>
			</div>
		</section>
		<section id="section-result" style="display: none;">
			<div class="row row-8 align-items-center mb-3">
				<div class="col-sm py-15">
					<h3 class="fw-6 mb-0">Rekap Presensi</h3>
				</div>
				<!-- <div class="col fz-16 text-gray">
					<i class="icon-clock mr-2"></i><span id="timezone">WIB</span>
				</div> -->
				<div class="col-auto" style="width: 90px;">
					<select id="select-timezone-2" class="selectpicker" data-width="100%" data-style="btn-sm btn-primary btn-border bg-white">
						<option value="7">WIB</option>
						<option value="8">WITA</option>
						<option value="9">WIT</option>
					</select>
				</div>
				<div class="col text-right">
					<button id="btn-export" type="button" class="btn btn-icon btn-round btn-success mr-2" data-toggle="tooltip" title="Simpan ke File Excel"><i class="fas fa-download fz-18"></i></button><button id="btn-reset" type="button" class="btn btn-icon btn-round btn-danger" data-toggle="tooltip" title="Ulangi"><i class="fas fa-redo fz-18 fa-flip-horizontal"></i></button>
				</div>
			</div>
			<div class="card mx--a mx-sm-0">
				<div class="card-header">
					<div class="custom-control custom-radio">
						<input type="radio" id="display_setting1" name="display_setting" class="custom-control-input" value="0" checked>
						<label class="custom-control-label cur-p" for="display_setting1">Gabungkan presensi pagi & sore</label>
					</div>
					<div class="custom-control custom-radio">
						<input type="radio" id="display_setting2" name="display_setting" class="custom-control-input" value="1">
						<label class="custom-control-label cur-p" for="display_setting2">Pisahkan tiap presensi</label>
					</div>
				</div>
				<div class="card-body">
					<table class="table table-hover table-sm w-100 td3-d-none td6-d-none" id="table"></table>
				</div>
			</div>
		</section>
	</main>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/id.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.2/js/bootstrap-select.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-csv/0.8.9/jquery.csv.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/js/jquery.dataTables.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datatables/1.10.20/js/dataTables.bootstrap4.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/shim.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.14.1/xlsx.full.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.3.0/jszip.min.js"></script>
	<script src="lib/atlantis-lite/mod/atlantis.mod.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script src="assets/js/main.js?v=<?php include 'views/partials/_version.php'; ?>"></script>
	<script>const DEV = <?=json_encode(SITE==='http://localhost')?>;</script>

</body>
</html>