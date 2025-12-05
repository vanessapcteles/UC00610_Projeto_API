# Script para instalar prop-types
# Este script contorna o problema de política de execução do PowerShell

Write-Host "Instalando prop-types..." -ForegroundColor Green

# Define a política de execução para o processo atual
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Instala o pacote prop-types
& npm install prop-types

Write-Host "Instalação concluída!" -ForegroundColor Green
