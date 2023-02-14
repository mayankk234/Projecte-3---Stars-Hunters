<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuració de Servidor</title>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script type="module" src="assets/js/server.js"></script>
</head>
<body>
    <form>
        <label for="amplada">Amplada</label>
        <input type="number" name="amplada" id="amplada" min="650" max="1280" value="640">
        <label for="alcada">Alçada</label>
        <input type="number" name="alcada" id="alcada" min="480" max="960" value="480">
        <label for="nEstrelles">Estrelles a Capturar</label>
        <input type="number" name="nEstrelles" id="nEstrelles" min="5" max="10" value="10">
        <button id="start" class="btn">Començar el joc</button>
        <button id="save" class="btn">Guardar Configuració</button>
    </form>
</body>
</html>