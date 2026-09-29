@echo off
powershell -ExecutionPolicy Bypass -File "%~dp0scripts\sync.ps1" %*
