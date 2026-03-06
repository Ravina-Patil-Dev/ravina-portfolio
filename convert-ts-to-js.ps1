param(
    [string]$SrcDir = "c:\Personal-Projects\Ravina-Portfolio\Ravinanewstudent-portfolio\PortfolioNew"
)

# Function to convert TypeScript to JavaScript
function Convert-TypeScriptToJavaScript {
    param([string]$Content)
    
    # Remove TypeScript-specific syntax
    
    # Remove type annotations from imports
    $Content = $Content -replace 'import\s+{\s*([^}]+?)\s*}\s+from\s+(["\'])', 'import { $1 } from $2'
    
    # Remove interface declarations
    $Content = $Content -replace 'export\s+interface\s+\w+\s*{[^}]*}', ''
    $Content = $Content -replace 'interface\s+\w+\s*{[^}]*}', ''
    
    # Remove type declarations
    $Content = $Content -replace 'export\s+type\s+\w+\s*=\s*[^;]+;', ''
    $Content = $Content -replace 'type\s+\w+\s*=\s*[^;]+;', ''
    
    # Remove generic type parameters from React components (e.g., React.FC<Props>)
    $Content = $Content -replace ':\s*React\.FC(?:<[^>]*>)?', ''
    $Content = $Content -replace 'const\s+(\w+):\s*React\.FC', 'const $1'
    
    # Remove variable type annotations (e.g., const x: string = "")
    $Content = $Content -replace ':\s*(?:string|number|boolean|any|void|null|undefined)(?=[;,=\s\)])', ''
    
    # Remove function return type annotations (e.g., ): string => )
    $Content = $Content -replace '\):\s*(?:[A-Za-z<>|&\[\]\s]+(?<![;,]))\s*(?=[{;=])', ') '
    
    # Remove generic type brackets (but keep the content)
    $Content = $Content -replace '<\s*(\w+)\s*\|?\s*(?:null|undefined)?\s*>', ''
    
    # Remove as type casting
    $Content = $Content -replace '\s+as\s+(?:const|[A-Za-z<>[\]]+)(?![a-zA-Z])', ''
    
    # Remove non-null assertion operator
    $Content = $Content -replace '!(?=[;,\)\]\}])', ''
    
    # Remove React type imports from generics
    $Content = $Content -replace 'React\.FC', ''
    $Content = $Content -replace 'React\.ReactNode', ''
    
    # Clean up any remaining TypeScript artifacts
    $Content = $Content -replace ':\s*\(.*?\)\s*=>', '=>'
    
    return $Content
}

function Update-FileImports {
    param([string]$Content, [string]$FilePath, [string]$TargetDir)
    
    $relativePath = Resolve-Path -Path $FilePath -Relative
    
    # Update .tsx imports to .jsx
    $Content = $Content -replace "from\s+['\`]([^'`\n]+)\.tsx['\`]", "from '`$1.jsx'"
    $Content = $Content -replace "from\s+['\`]([^'`\n]+)\.ts['\`]", "from '`$1.js'"
    
    # Update imports without extension to include .jsx/.js
    $Content = $Content -replace "from\s+['\`](\.\.?/[^'`\n]+?)(['\`])", {
        param($match)
        $importPath = $match.Groups[1].Value
        if ($importPath -notmatch '\.(jsx|js|css|json)$') {
            # Check if it's a component (starts with ./ or ../)
            if ($importPath -match '^\.\.?/' -and -not ($importPath -match '/[a-z]')) {
                return "from '${importPath}.jsx'"
            } else {
                return $match.Value
            }
        }
        return $match.Value
    }
    
    return $Content
}

# Get all .tsx and .ts files
$files = @()
$files += Get-ChildItem -Path $SrcDir -Include "*.tsx", "*.ts" -Recurse -Exclude "node_modules"

Write-Host "Found $($files.Count) TypeScript files to convert"

foreach ($file in $files) {
    Write-Host "Processing: $($file.FullName)"
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $newContent = Convert-TypeScriptToJavaScript -Content $content
    $newContent = Update-FileImports -Content $newContent -FilePath $file.FullName -TargetDir $SrcDir
    
    $newExtension = if ($file.Extension -eq ".tsx") { ".jsx" } else { ".js" }
    $newFilePath = $file.FullName -replace '\.(tsx|ts)$', $newExtension
    
    if ($newFilePath -ne $file.FullName) {
        Set-Content -Path $newFilePath -Value $newContent -Encoding UTF8
        Write-Host "  Created: $newFilePath"
    }
}

# Update all reference-only files that import TypeScript files
$jsxFiles = @()
$jsxFiles += Get-ChildItem -Path $SrcDir -Include "*.jsx", "*.js" -Recurse -Exclude "node_modules"

Write-Host "`nUpdating imports in converted files..."
foreach ($file in $jsxFiles) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $newContent = Update-FileImports -Content $content -FilePath $file.FullName -TargetDir $SrcDir
    
    if ($newContent -ne $content) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        Write-Host "  Updated imports in: $($file.Name)"
    }
}

Write-Host "`n✓ Conversion complete!"
