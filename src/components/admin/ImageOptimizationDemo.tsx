import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileImage, Download } from "lucide-react";
import { optimizeImageToSize, formatFileSize } from "@/utils/imageOptimizer";

interface OptimizationResult {
  originalFile: File;
  optimizedFile: File;
  originalSize: string;
  optimizedSize: string;
  compressionRatio: number;
  originalDimensions: { width: number; height: number };
  optimizedDimensions: { width: number; height: number };
  processingTime: number;
}

const ImageOptimizationDemo = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setResult(null);
      setError(null);
    }
  };

  const handleOptimize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    const startTime = performance.now();

    try {
      const optimizedImage = await optimizeImageToSize(selectedFile, 5);
      const processingTime = performance.now() - startTime;

      // Get original dimensions
      const originalImg = new Image();
      const originalDimensions = await new Promise<{ width: number; height: number }>((resolve, reject) => {
        originalImg.onload = () => resolve({ width: originalImg.naturalWidth, height: originalImg.naturalHeight });
        originalImg.onerror = reject;
        originalImg.src = URL.createObjectURL(selectedFile);
      });

      setResult({
        originalFile: selectedFile,
        optimizedFile: optimizedImage.file,
        originalSize: formatFileSize(optimizedImage.originalSize),
        optimizedSize: formatFileSize(optimizedImage.optimizedSize),
        compressionRatio: optimizedImage.compressionRatio,
        originalDimensions,
        optimizedDimensions: { width: optimizedImage.width, height: optimizedImage.height },
        processingTime
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Optimization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadOptimized = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(result.optimizedFile);
    link.download = `optimized_${result.originalFile.name}`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image Optimization Demo</h1>
        <p className="text-gray-600">
          Test the automatic image optimization that reduces file sizes to under 5MB while maintaining quality
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Upload Image
          </CardTitle>
          <CardDescription>
            Select an image file to test the optimization. The system will automatically compress it to under 5MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-primary block">Click to upload image</span>
              <span className="text-xs text-muted-foreground block mt-1">
                JPG, PNG, or WebP files supported
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleFileSelect}
            />
          </div>

          {selectedFile && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium mb-2">Selected File:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div><strong>Name:</strong> {selectedFile.name}</div>
                <div><strong>Size:</strong> {formatFileSize(selectedFile.size)}</div>
                <div><strong>Type:</strong> {selectedFile.type}</div>
              </div>
            </div>
          )}

          <Button 
            onClick={handleOptimize} 
            disabled={!selectedFile || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Optimizing...
              </>
            ) : (
              'Optimize Image'
            )}
          </Button>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-red-800">
              <h3 className="font-medium mb-2">Optimization Error</h3>
              <p className="text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Optimization Complete!</CardTitle>
            <CardDescription className="text-green-700">
              Your image has been successfully optimized
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-gray-900">Original Image</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium">{result.originalSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensions:</span>
                    <span className="font-medium">{result.originalDimensions.width} × {result.originalDimensions.height}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 text-green-800">Optimized Image</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-medium text-green-600">{result.optimizedSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimensions:</span>
                    <span className="font-medium text-green-600">{result.optimizedDimensions.width} × {result.optimizedDimensions.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compression:</span>
                    <span className="font-medium text-green-600">{result.compressionRatio.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Time:</span>
                    <span className="font-medium text-green-600">{result.processingTime.toFixed(0)}ms</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={downloadOptimized} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Optimized Image
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageOptimizationDemo;
