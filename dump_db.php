<?php
$db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$out = ["-- MMAB Consulting — SQLite dump", "-- " . date('Y-m-d H:i:s'), "", "PRAGMA foreign_keys=OFF;", "BEGIN TRANSACTION;", ""];
$tables = $db->query("SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name")->fetchAll(PDO::FETCH_ASSOC);
foreach ($tables as $table) {
    $name = $table['name'];
    $out[] = "-- Table: {$name}";
    $out[] = "DROP TABLE IF EXISTS \"{$name}\";";
    $out[] = $table['sql'] . ";";
    $out[] = "";
    foreach ($db->query("SELECT * FROM \"{$name}\"")->fetchAll(PDO::FETCH_ASSOC) as $row) {
        $cols = implode(', ', array_map(fn($c) => '"'.$c.'"', array_keys($row)));
        $vals = implode(', ', array_map(fn($v) => $v === null ? 'NULL' : (is_numeric($v) ? $v : $db->quote($v)), array_values($row)));
        $out[] = "INSERT INTO \"{$name}\" ({$cols}) VALUES ({$vals});";
    }
    $out[] = "";
}
foreach ($db->query("SELECT sql FROM sqlite_master WHERE type='index' AND sql IS NOT NULL")->fetchAll(PDO::FETCH_COLUMN) as $idx) {
    $out[] = $idx . ";";
}
$out[] = ""; $out[] = "COMMIT;";
file_put_contents(__DIR__ . '/database/dump.sql', implode("\n", $out));
echo "Done.\n";
