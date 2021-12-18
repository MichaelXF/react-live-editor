/**
 * This is the default value for the editor.
 */
export const DefaultValue = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React-Live-Editor</title>

    <style>
        body {
            margin: 40px;
            font-family: sans-serif;
        }

        .gradient-text {
            background-image: linear-gradient(60deg, #E21143, #FFB03A);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
        }

        .js-example {
            padding: 20px;
            background: #ddd;
            border-radius: 6px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Welcome to <span class="gradient-text">React-Live-Editor</span>!</h1>

    <p>
        You can write HTML, CSS, and JavaScript on the left-hand side, and see your output live on the right-hand side.
    </p>

    <p>
        Your changes will automatically refresh the right-hand side.
    </p>

    <div class="js-example">
        <button id="button">Click Me</button>

        <p id="button-counter"></p>
    </div>


    <script>
        var counter = 0;

        document.getElementById("button").addEventListener("click", function(){
            counter++;
            document.getElementById("button-counter").innerHTML = "You clicked the button " + counter + " times.";
        });
    </script>
</body>
</html>`;
