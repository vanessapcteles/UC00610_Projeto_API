# Script para executar o servidor de desenvolvimento
# Este script contorna o problema de política de execução do PowerShell

Write-Host "Iniciando servidor de desenvolvimento..." -ForegroundColor Green

# Define a política de execução para o processo atual
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Executa o servidor de desenvolvimento
& npm run dev
