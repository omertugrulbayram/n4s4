@echo off
echo AstroVia Web Sunucusu Baslatiliyor...
echo.
echo Tarayicinizda su adresleri deneyin:
echo http://localhost:8080
echo http://localhost:3000
echo.
echo Sunucuyu durdurmak icin Ctrl+C basin
echo.
python -m http.server 8080
pause
