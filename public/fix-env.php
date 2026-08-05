<?php
/**
 * Emergency Environment Fix Script
 * Upload this to your public directory and run via browser
 * URL: https://mmabconsultingandheathcare.com/fix-env.php
 * DELETE THIS FILE AFTER USE!
 */

$basePath = dirname(__DIR__);
$envPath = $basePath . '/.env';
$envProductionPath = $basePath . '/.env.production';
$configCachePath = $basePath . '/bootstrap/cache/config.php';

echo "<h1>Production Environment Fix</h1>";
echo "<pre>";

// Check if .env exists
if (file_exists($envPath)) {
    echo "✓ .env file exists\n\n";
    
    // Read current .env
    $envContent = file_get_contents($envPath);
    
    // Show current APP_ENV
    if (preg_match('/APP_ENV=(.*)/', $envContent, $matches)) {
        echo "Current APP_ENV: " . trim($matches[1]) . "\n";
    }
    
    // Fix APP_ENV if not production
    $envContent = preg_replace('/APP_ENV=.*/', 'APP_ENV=production', $envContent);
    $envContent = preg_replace('/APP_DEBUG=.*/', 'APP_DEBUG=false', $envContent);
    
    // Write back
    if (file_put_contents($envPath, $envContent)) {
        echo "✓ Updated .env file to production\n\n";
    }
} else {
    echo "✗ .env file not found\n";
    if (file_exists($envProductionPath)) {
        copy($envProductionPath, $envPath);
        echo "✓ Copied .env.production to .env\n\n";
    }
}

// Remove config cache
if (file_exists($configCachePath)) {
    unlink($configCachePath);
    echo "✓ Deleted config cache: $configCachePath\n\n";
} else {
    echo "✓ Config cache doesn't exist (good)\n\n";
}

// Clear other caches
$commands = [
    'php artisan config:clear',
    'php artisan cache:clear',
    'php artisan view:clear',
    'php artisan route:clear',
];

echo "Running Artisan commands:\n";
foreach ($commands as $cmd) {
    chdir($basePath);
    $output = shell_exec($cmd . ' 2>&1');
    echo "  $cmd\n";
    echo "  → $output\n";
}

// Check final environment
chdir($basePath);
$finalEnv = shell_exec('php artisan tinker --execute="echo config(\'app.env\');" 2>&1');
echo "\nFinal APP_ENV: $finalEnv\n";

echo "\n✅ Fix complete! Now reload your site.\n";
echo "\n⚠️  DELETE THIS FILE IMMEDIATELY FOR SECURITY!\n";
echo "</pre>";
