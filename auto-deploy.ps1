$SERVER = "@a60`$qH9VMVBDxHl@mmabconsultingandheathcare.com"
$PASSWORD = "izzeuqbj47td"

Write-Host "MMABB GoDaddy Auto-Deployment" -ForegroundColor Cyan
Write-Host ""

# Create password file for plink (PuTTY's command-line tool)
$usesPlink = $false

# Check if plink is available
$plinkPath = Get-Command plink -ErrorAction SilentlyContinue
if ($plinkPath) {
    $usesPlink = $true
    Write-Host "Using plink for automated authentication" -ForegroundColor Yellow
}

Write-Host "[1/4] Creating package..." -ForegroundColor Cyan
$tempDir = "deploy_temp"
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }

xcopy /E /I /Y /Q app "$tempDir\app" > $null
xcopy /E /I /Y /Q bootstrap "$tempDir\bootstrap" > $null
xcopy /E /I /Y /Q config "$tempDir\config" > $null
xcopy /E /I /Y /Q database "$tempDir\database" > $null
xcopy /E /I /Y /Q public "$tempDir\public" > $null
xcopy /E /I /Y /Q resources "$tempDir\resources" > $null
xcopy /E /I /Y /Q routes "$tempDir\routes" > $null
xcopy /E /I /Y /Q storage "$tempDir\storage" > $null
Copy-Item artisan "$tempDir\" -ErrorAction SilentlyContinue
Copy-Item composer.json "$tempDir\" -ErrorAction SilentlyContinue
Copy-Item composer.lock "$tempDir\" -ErrorAction SilentlyContinue
Copy-Item .env.example "$tempDir\" -ErrorAction SilentlyContinue

Write-Host "[2/4] Compressing..." -ForegroundColor Cyan
tar -czf deploy.tar.gz -C $tempDir .
Remove-Item -Recurse -Force $tempDir
Write-Host "Package size: $([math]::Round((Get-Item deploy.tar.gz).Length / 1MB, 2)) MB" -ForegroundColor Gray

Write-Host "[3/4] Uploading to server..." -ForegroundColor Cyan

# Create an expect-like script for Windows
$expectScript = @"
set timeout 60
spawn scp deploy.tar.gz $SERVER`:~/
expect {
    "password:" { send "$PASSWORD\r"; exp_continue }
    "Password:" { send "$PASSWORD\r"; exp_continue }
    eof
}
"@
$expectScript | Out-File -FilePath "upload.exp" -Encoding ASCII

# Try using expect if available, otherwise use echo to pipe password
$expectPath = Get-Command expect -ErrorAction SilentlyContinue
if ($expectPath) {
    expect upload.exp
    Remove-Item upload.exp
} else {
    # Use echo to pipe password to scp
    Write-Host "Uploading (automated authentication)..." -ForegroundColor Yellow
    $process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "echo $PASSWORD | scp -o StrictHostKeyChecking=no deploy.tar.gz ${SERVER}:~/" -NoNewWindow -Wait -PassThru
    if ($process.ExitCode -ne 0) {
        Write-Host "Trying alternative method..." -ForegroundColor Yellow
        # Alternative: Use PowerShell to automate
        $psi = New-Object System.Diagnostics.ProcessStartInfo
        $psi.FileName = "scp"
        $psi.Arguments = "deploy.tar.gz ${SERVER}:~/"
        $psi.RedirectStandardInput = $true
        $psi.RedirectStandardOutput = $true
        $psi.RedirectStandardError = $true
        $psi.UseShellExecute = $false
        $psi.CreateNoWindow = $true
        
        $p = New-Object System.Diagnostics.Process
        $p.StartInfo = $psi
        $p.Start() | Out-Null
        $p.StandardInput.WriteLine($PASSWORD)
        $p.WaitForExit()
    }
}

Remove-Item deploy.tar.gz -ErrorAction SilentlyContinue

Write-Host "[4/4] Setting up on server..." -ForegroundColor Cyan

# Create setup script
$setupScript = @"
#!/bin/bash
mkdir -p ~/mmabb
cd ~/mmabb
tar -xzf ~/deploy.tar.gz
rm ~/deploy.tar.gz
composer install --optimize-autoloader --no-dev --no-interaction
test -f .env || cp .env.example .env
php artisan key:generate --force
chmod -R 775 storage bootstrap/cache
php artisan storage:link 2>/dev/null || true
php artisan config:cache
php artisan route:cache
php artisan view:cache
echo Setup complete
"@

$setupScript | Out-File -FilePath "setup.sh" -Encoding ASCII

# Upload setup script
$process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "echo $PASSWORD | scp -o StrictHostKeyChecking=no setup.sh ${SERVER}:~/setup.sh" -NoNewWindow -Wait -PassThru
Remove-Item setup.sh

# Execute setup script
$sshScript = @"
bash ~/setup.sh
rm ~/setup.sh
"@

$sshScript | Out-File -FilePath "exec.sh" -Encoding ASCII
$process = Start-Process -FilePath "cmd.exe" -ArgumentList "/c", "echo $PASSWORD | ssh -o StrictHostKeyChecking=no $SERVER `"bash -s`" < exec.sh" -NoNewWindow -Wait -PassThru
Remove-Item exec.sh

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green  
Write-Host "================================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANT NEXT STEPS:" -ForegroundColor Red
Write-Host ""
Write-Host "1. Configure Database (.env file):" -ForegroundColor Cyan
Write-Host "   Get credentials from GoDaddy cPanel > MySQL Databases" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Edit .env on server:" -ForegroundColor Cyan
Write-Host "   Run these commands in a NEW terminal:" -ForegroundColor Gray
Write-Host ""
Write-Host "   ssh $SERVER" -ForegroundColor Yellow
Write-Host "   nano ~/mmabb/.env" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Update:" -ForegroundColor Gray
Write-Host "   DB_DATABASE=your_db_name" -ForegroundColor White
Write-Host "   DB_USERNAME=your_db_user" -ForegroundColor White  
Write-Host "   DB_PASSWORD=your_db_pass" -ForegroundColor White
Write-Host ""
Write-Host "3. Run migrations:" -ForegroundColor Cyan
Write-Host "   cd ~/mmabb && php artisan migrate --force" -ForegroundColor Yellow
Write-Host ""
Write-Host "4. Set Document Root in cPanel > Domains:" -ForegroundColor Cyan
Write-Host "   /home/@a60`$qH9VMVBDxHl/mmabb/public" -ForegroundColor Yellow
Write-Host ""
Write-Host "5. Visit your site:" -ForegroundColor Cyan
Write-Host "   mmabconsultingandheathcare.com" -ForegroundColor Yellow
Write-Host ""
