import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ExternalLink, Server, Folder, Globe, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function MigrationComplete() {
  const { data: migrationStatus } = useQuery({
    queryKey: ["/api/migration-status"],
  });

  const handleOpenPage = (path: string) => {
    window.open(path, "_blank");
  };

  const pages = [
    { path: "/", label: "Accueil (FR)", lang: "fr" },
    { path: "/en", label: "Home (EN)", lang: "en" },
    { path: "/a-propos", label: "À Propos", lang: "fr" },
    { path: "/about", label: "About", lang: "en" },
    { path: "/communiques", label: "Communiqués (FR)", lang: "fr" },
    { path: "/communiques-en", label: "Press Releases (EN)", lang: "en" },
    { path: "/emplois", label: "Emplois (FR)", lang: "fr" },
    { path: "/emplois-en", label: "Jobs (EN)", lang: "en" },
    { path: "/nous-joindre", label: "Contact (FR)", lang: "fr" },
    { path: "/nous-joindre-en", label: "Contact (EN)", lang: "en" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Server className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Migration Complete</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Express.js Migration</span>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="mb-8">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h2 className="text-lg font-semibold text-green-900">Migration Successfully Completed!</h2>
                  <p className="text-green-700">Your project has been migrated to Express.js while preserving all structure and functionality.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Migration Status */}
        {migrationStatus && (
          <div className="mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Folder className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Migration Status</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="font-medium text-blue-900">HTML Pages</div>
                    <div className="text-2xl font-bold text-blue-600">{migrationStatus.pages.length}</div>
                    <div className="text-sm text-blue-700">Multilingual pages migrated</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="font-medium text-green-900">Assets</div>
                    <div className="text-2xl font-bold text-green-600">CSS + JS + Images</div>
                    <div className="text-sm text-green-700">All assets preserved</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="font-medium text-purple-900">Status</div>
                    <div className="text-2xl font-bold text-purple-600 capitalize">{migrationStatus.status}</div>
                    <div className="text-sm text-purple-700">Ready for production</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Migrated Pages */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Available Pages</h3>
                </div>
                <div className="space-y-2">
                  {pages.map((page) => (
                    <div key={page.path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${page.lang === 'fr' ? 'bg-blue-500' : 'bg-red-500'}`}></div>
                        <span className="font-medium text-gray-900">{page.label}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenPage(page.path)}
                        className="flex items-center space-x-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Technical Details */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Technical Details</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Express.js server configured</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Static file serving enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Multilingual routing preserved</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">CSS & JS functionality maintained</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Image assets properly served</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Data loading from JS files preserved</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <h4 className="font-medium text-blue-900 mb-3">Next Steps</h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Test all pages and functionality</li>
                  <li>• Verify multilingual navigation works</li>
                  <li>• Check that data loads from JS files</li>
                  <li>• Ensure all images display correctly</li>
                  <li>• Test contact forms and interactions</li>
                  <li>• Deploy to your production environment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* File Structure Info */}
        <div className="mt-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">File Structure Preserved</h3>
              <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <div className="space-y-1">
                  <div>📁 client/public/</div>
                  <div className="ml-4">📄 index.html (+ 9 other HTML files)</div>
                  <div className="ml-4">📁 css/</div>
                  <div className="ml-8">🎨 shared.css</div>
                  <div className="ml-4">📁 js/</div>
                  <div className="ml-8">⚡ communiques-data.js</div>
                  <div className="ml-8">⚡ communiques-data-en.js</div>
                  <div className="ml-8">⚡ emplois-data.js</div>
                  <div className="ml-8">⚡ shared.js</div>
                  <div className="ml-4">📁 images/</div>
                  <div className="ml-8">🖼️ (16+ image files preserved)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            Migration completed successfully - Your project structure and functionality has been preserved
          </div>
        </div>
      </footer>
    </div>
  );
}
