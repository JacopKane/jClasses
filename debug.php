<html>
<head>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="vendor/js/jquery-1.7.1.min.js"><\/script>')</script>

<?php foreach (glob("./*.js") as $filename): ?>
	<script type="text/javascript" src="<?php echo "$filename";?>"></script>
<?php endforeach; ?>
</head>
<body>
</body>