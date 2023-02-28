<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
    <script src="assets/js/main.js"></script>
    <script type="module" src="assets/js/client.js"></script>
    <!-- Bootstrap Link -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js" integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Mostrar SVG per afegir els elements pel joc -->
    <div class="container">
        <div class="row">
            <div class="col">
                <!-- Mostrar les puntuacions dels jugadors -->
                <div class="row">
                    <div class="col" id="Puntuacions">
                    </div>
                </div>
            <div class="col">
                <svg id="joc" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="480px" height="600px" style="border: 1px; border-style: solid;" viewbox: 0 0 480 600>

                </svg>
                <div class="row align-items-center">
                    <div class="col text-center">
                        <a href="../index.php" class="btn btn-dark" id="exit">EXIT</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>