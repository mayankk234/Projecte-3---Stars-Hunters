<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuració de Servidor</title>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script type="module" src="assets/js/server.js"></script>
     <!-- Bootstrap Link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="container mt-4">
        <h1 style="text-align: center;">Servidor</h1>
        <form class="form-group">
            <div class="row">
                <div class="col">
                    <label for="amplada">Amplada</label>
                    <input type="number" class="form-control" name="amplada" id="amplada" min="650" max="1280" value="640">
                </div>
                <div class="col">
                    <label for="alcada">Alçada</label>
                    <input type="number" class="form-control" name="alcada" id="alcada" min="480" max="960" value="480">
                </div>
                <div class="col">
                    <label for="nEstrelles">Estrelles a Capturar</label>
                    <input type="number" class="form-control" name="nEstrelles" id="nEstrelles" min="5" max="10" value="10">
                </div>
            </div>
            <div class="row mt-4 align-items-center">
                <div class="col text-center">
                    <button id="start" class="btn btn-dark">Començar el joc</button>
                    <button id="save" class="btn btn-dark">Guardar Configuració</button>
                </div>
            </div>
        </form>

        <!-- Mostrar SVG per afegir els elements pel joc -->
        <div>
            <svg id="joc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="480px" height="600px" style="border: 1px; border-style: solid;" viewbox: 0 0 480 600>

            </svg>
                <a href="../index.php" class="btn btn-dark mb-4" id="exit">EXIT</a>
        </div>
    </div>
</body>
</html>