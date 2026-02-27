import { useEffect, useState } from "react";
import { Globe2, Handshake, TrendingUp } from 'lucide-react';
import logo from "./assets/logouinar.png";
import bendera from "./assets/indonesia.png";
import "./styles/index.css"

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/api/frontend/kemitraan/getdata");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
                <img src={logo} alt="UIN AR-Raniry" className="h-40 w-auto" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Kerjasama
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                UIN Ar-Raniry Banda Aceh
              </h1>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-center mb-3">
                    <Handshake className="size-6 text-primary" />
                  </div>
                  <div className="text-3xl mb-2">136</div>
                  <div className="text-sm text-muted-foreground">
                    Kerjasama Aktif
                  </div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-center mb-3">
                    <img src={bendera} alt="Indonesia" className="h-6 w-auto text-primary" />
                  </div>
                  <div className="text-3xl mb-2">104</div>
                  <div className="text-sm text-muted-foreground">MoU Aktif Nasional</div>
                </div>

                <div className="bg-card border rounded-lg p-6">
                  <div className="flex items-center justify-center mb-3">
                    <Globe2 className="size-6 text-primary" />
                  </div>
                  <div className="text-3xl mb-2">32</div>
                  <div className="text-sm text-muted-foreground">
                    MoU Aktif Internasional
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MoU List Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl mb-4">
                Daftar Memorandum of Understanding
              </h2>
            </div>

            {/* <MouList /> */}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-muted/50 border-t mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2026 UIN Ar-Raniry. Semua hak cipta dilindungi.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
