@echo off
echo ========================================
echo    DASHBOARD LOGISTA - REACT
echo ========================================
echo.
echo Escolha uma opcao:
echo 1. Executar em desenvolvimento
echo 2. Fazer build para producao
echo 3. Fazer deploy para GitHub Pages
echo 4. Sair
echo.
set /p choice="Digite sua opcao (1-4): "

if "%choice%"=="1" (
    echo.
    echo Iniciando servidor de desenvolvimento...
    npm start
) else if "%choice%"=="2" (
    echo.
    echo Fazendo build para producao...
    npm run build
    echo.
    echo Build concluido! Arquivos em: build/
    pause
) else if "%choice%"=="3" (
    echo.
    echo Fazendo deploy para GitHub Pages...
    npm run deploy
    echo.
    echo Deploy concluido!
    pause
) else if "%choice%"=="4" (
    echo.
    echo Saindo...
    exit
) else (
    echo.
    echo Opcao invalida!
    pause
    goto :eof
)