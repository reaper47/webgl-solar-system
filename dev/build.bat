@echo off
IF EXIST ..\node_modules (
  call:setup
) ELSE (
  echo f | npm install
  echo f | npm install -g babel-cli
  call:setup
)

:setup
del ..\app.js
rmdir /Q /S ..\public
rmdir /Q /S ..\controllers
rmdir /Q /S ..\views
mkdir  "..\public\img"
xcopy /Q /s/h/e/k/f/c ".\public\img" "..\public\img"
mkdir ..\views
echo f | npm run-script build:css
echo f | babel .\ --out-dir ..\ --ignore=node_modules,.\public\js\libs\three.min.js --compact=true
copy /b .\public\js\libs\three.min.js ..\public\js\three.min.js
copy /b ..\public\js\three.min.js+..\public\js\classes\ProtoPlanet.js+..\public\js\classes\TrackballControls.js+..\public\js\scenes\planets.js+..\public\js\scenes\solar_scene.js ..\public\js\bundle.js
del ..\public\js\three.min.js
rmdir /Q /S ..\public\js\classes
rmdir /Q /S ..\public\js\scenes
@echo ^<!DOCTYPE html^>^<html^>^<head^>^<meta charset="utf-8"^>^<title^>Solar System^</title^>^<link rel='stylesheet' type='text/css' href='/css/style.css'^>^</head^>^<body^>^<div id='planet-info'^>^<p id='name'^>^</p^>^<p id='alive'^>^</p^>^<p id='dist'^>^</p^>^<p id='day'^>^</p^>^<p id='year'^>^</p^>^<p id='volume'^>^</p^>^<p id='gravity'^>^</p^>^<p id='density'^>^</p^>^</div^>^<script type='text/javascript' src='/js/bundle.js'^>^</script^>^</body^>^</html^> > ..\views\index.ejs
echo f | npm start
goto:eof
