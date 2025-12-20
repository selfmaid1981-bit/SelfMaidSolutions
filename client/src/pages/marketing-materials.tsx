import { SEOHead } from '@/components/ui/seo-head';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Printer, Download, CreditCard, FileText, DoorOpen, Star, Phone, Mail, Globe, MapPin, Shield, Sparkles, Clock, Check } from 'lucide-react';

function BusinessCard() {
  return (
    <div className="print-container" id="business-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-6 rounded-lg shadow-xl w-[350px] h-[200px] flex flex-col justify-between"
          data-testid="business-card-front"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Self-Maid</h3>
            <p className="text-blue-200 text-sm">Cleaning Solutions LLC</p>
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold">Professional Cleaning Services</p>
            <p className="text-blue-200 text-sm">Residential • Commercial • Airbnb • Move-In/Out</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>5.0 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
        
        <div 
          className="bg-white border-2 border-blue-600 p-6 rounded-lg shadow-xl w-[350px] h-[200px] flex flex-col justify-between"
          data-testid="business-card-back"
        >
          <div className="space-y-2 text-gray-700">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">(334) 877-9513</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>selfmaidclean@outlook.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">selfmaidllc.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm">Montgomery, Prattville, Selma & Central AL</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-blue-600 font-bold text-lg">$20 OFF First Cleaning!</p>
            <p className="text-xs text-gray-500">New customers only. Mention this card.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Flyer() {
  return (
    <div 
      className="bg-white border-4 border-blue-600 rounded-lg shadow-2xl p-8 max-w-[600px] mx-auto"
      id="flyer"
      data-testid="flyer-design"
    >
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg mb-4">
          <h2 className="text-3xl font-bold">Self-Maid Cleaning Solutions</h2>
          <p className="text-blue-200">Professional Cleaning You Can Trust</p>
        </div>
        
        <div className="bg-green-500 text-white py-3 px-4 rounded-lg inline-block mb-4">
          <p className="text-2xl font-bold">$20 OFF</p>
          <p className="text-sm">Your First Cleaning!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">Our Services</h4>
          <ul className="text-sm space-y-1 text-gray-700">
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> House Cleaning</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Deep Cleaning</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Move-In/Out</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Airbnb Turnover</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Commercial/Office</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Construction Cleanup</li>
          </ul>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-bold text-blue-800 mb-2">Why Choose Us?</h4>
          <ul className="text-sm space-y-1 text-gray-700">
            <li className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" /> 5-Star Google Rating</li>
            <li className="flex items-center gap-1"><Shield className="w-3 h-3 text-blue-600" /> Fully Insured & Bonded</li>
            <li className="flex items-center gap-1"><Clock className="w-3 h-3 text-blue-600" /> 16 Years Experience</li>
            <li className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-purple-600" /> Eco-Friendly Products</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> Background Checked</li>
            <li className="flex items-center gap-1"><Check className="w-3 h-3 text-green-600" /> 100% Satisfaction</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h4 className="font-bold text-center text-gray-800 mb-3">Recurring Customer Discounts</h4>
        <div className="flex justify-center gap-4 text-sm">
          <div className="bg-white px-3 py-2 rounded shadow text-center">
            <p className="font-bold text-blue-600">Weekly</p>
            <p className="text-lg font-bold text-green-600">15% OFF</p>
          </div>
          <div className="bg-white px-3 py-2 rounded shadow text-center">
            <p className="font-bold text-blue-600">Bi-Weekly</p>
            <p className="text-lg font-bold text-green-600">10% OFF</p>
          </div>
          <div className="bg-white px-3 py-2 rounded shadow text-center">
            <p className="font-bold text-blue-600">Monthly</p>
            <p className="text-lg font-bold text-green-600">5% OFF</p>
          </div>
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-xl">(334) 877-9513</span>
          </div>
        </div>
        <p className="text-blue-600 font-semibold">selfmaidllc.com</p>
        <p className="text-sm text-gray-600">Serving Montgomery, Prattville, Selma, Homewood, Clanton & Surrounding Areas</p>
      </div>
    </div>
  );
}

function DoorHanger() {
  return (
    <div 
      className="bg-gradient-to-b from-blue-600 to-blue-800 text-white rounded-lg shadow-2xl p-6 max-w-[280px] mx-auto min-h-[500px] flex flex-col"
      id="door-hanger"
      data-testid="door-hanger-design"
    >
      <div className="text-center border-b-2 border-blue-400 pb-4 mb-4">
        <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold">Self-Maid</h3>
        <p className="text-blue-200 text-sm">Cleaning Solutions</p>
      </div>
      
      <div className="bg-yellow-400 text-blue-900 py-3 px-4 rounded-lg text-center mb-4">
        <p className="text-sm font-semibold">NEW NEIGHBOR SPECIAL</p>
        <p className="text-2xl font-bold">$20 OFF</p>
        <p className="text-xs">Your First Cleaning</p>
      </div>
      
      <div className="flex-1 space-y-3 mb-4">
        <p className="text-center text-sm text-blue-200">Professional cleaning services for:</p>
        <ul className="text-sm space-y-2">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Homes & Apartments</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Offices & Businesses</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Airbnb & Rentals</li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /> Move-In/Move-Out</li>
        </ul>
        
        <div className="flex justify-center gap-3 pt-2">
          <div className="text-center">
            <Star className="w-5 h-5 text-yellow-400 mx-auto fill-yellow-400" />
            <p className="text-xs">5-Star</p>
          </div>
          <div className="text-center">
            <Shield className="w-5 h-5 text-green-400 mx-auto" />
            <p className="text-xs">Insured</p>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-blue-300 mx-auto" />
            <p className="text-xs">16 Years</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white text-blue-800 rounded-lg p-3 text-center">
        <p className="font-bold text-lg">(334) 877-9513</p>
        <p className="text-sm">selfmaidllc.com</p>
      </div>
    </div>
  );
}

function RackCard() {
  return (
    <div 
      className="bg-white border-2 border-blue-600 rounded-lg shadow-2xl p-6 max-w-[300px] mx-auto min-h-[550px] flex flex-col"
      id="rack-card"
      data-testid="rack-card-design"
    >
      <div className="text-center mb-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-4 rounded-lg">
          <h3 className="text-xl font-bold">Self-Maid</h3>
          <p className="text-blue-200 text-xs">Cleaning Solutions LLC</p>
        </div>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm italic">"We Make Your World Shine"</p>
      </div>
      
      <div className="space-y-3 flex-1">
        <div className="bg-blue-50 p-3 rounded">
          <h4 className="font-bold text-blue-800 text-sm mb-2">Services & Starting Prices</h4>
          <ul className="text-xs space-y-1 text-gray-700">
            <li className="flex justify-between"><span>House Cleaning</span><span className="font-bold">$120+</span></li>
            <li className="flex justify-between"><span>Deep Cleaning</span><span className="font-bold">$250+</span></li>
            <li className="flex justify-between"><span>Move-In/Out</span><span className="font-bold">$325+</span></li>
            <li className="flex justify-between"><span>Airbnb Turnover</span><span className="font-bold">$95+</span></li>
            <li className="flex justify-between"><span>Commercial</span><span className="font-bold">$180+</span></li>
            <li className="flex justify-between"><span>Apt Turnover</span><span className="font-bold">$108+</span></li>
          </ul>
        </div>
        
        <div className="bg-green-100 p-3 rounded text-center">
          <p className="text-green-800 font-bold">SAVE MORE!</p>
          <p className="text-xs text-gray-700">Weekly: 15% OFF | Bi-Weekly: 10% OFF</p>
        </div>
        
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <Star className="w-5 h-5 text-yellow-500 mx-auto fill-yellow-500" />
            <p className="text-xs text-gray-600">5-Star</p>
          </div>
          <div className="text-center">
            <Shield className="w-5 h-5 text-blue-600 mx-auto" />
            <p className="text-xs text-gray-600">Insured</p>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-blue-600 mx-auto" />
            <p className="text-xs text-gray-600">16 Yrs</p>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-3 mt-3">
        <div className="text-center">
          <p className="font-bold text-blue-600 text-lg">(334) 877-9513</p>
          <p className="text-sm text-gray-600">selfmaidllc.com</p>
          <p className="text-xs text-gray-500 mt-1">Montgomery • Prattville • Selma</p>
        </div>
      </div>
    </div>
  );
}

function ReferralCard() {
  return (
    <div 
      className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-6 max-w-[350px] mx-auto"
      id="referral-card"
      data-testid="referral-card-design"
    >
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Give $25, Get $25!</h3>
        <p className="text-purple-200 text-sm">Referral Rewards Program</p>
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold shrink-0">1</div>
            <p>Share this card with a friend who needs cleaning</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
            <p>They get $25 off their first cleaning</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold shrink-0">3</div>
            <p>You get $25 off your next cleaning!</p>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-400 text-purple-900 rounded-lg p-3 text-center mb-4">
        <p className="text-xs font-semibold">REFERRAL CODE</p>
        <p className="text-2xl font-bold tracking-wider">FRIEND25</p>
      </div>
      
      <div className="text-center space-y-1">
        <p className="font-bold text-lg">(334) 877-9513</p>
        <p className="text-sm">selfmaidllc.com</p>
      </div>
    </div>
  );
}

export default function MarketingMaterials() {
  const handlePrint = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Print - Self-Maid Marketing</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
          body { font-family: system-ui, sans-serif; padding: 20px; }
        </style>
      </head>
      <body>
        ${element.outerHTML}
        <script>setTimeout(() => { window.print(); window.close(); }, 500);</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <>
      <SEOHead
        title="Marketing Materials | Self-Maid Cleaning Solutions"
        description="Download and print business cards, flyers, door hangers, and other marketing materials for Self-Maid Cleaning Solutions."
        noindex={true}
      />
      
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <section className="py-12 lg:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                <Printer className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Marketing Materials
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Print-ready business cards, flyers, door hangers, and promotional materials
              </p>
            </div>

            <div className="grid gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Business Cards (3.5" x 2")
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BusinessCard />
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => handlePrint('business-card')} data-testid="print-business-card">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Business Cards
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Full-Page Flyer (8.5" x 11")
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Flyer />
                  <div className="flex justify-center mt-6">
                    <Button onClick={() => handlePrint('flyer')} data-testid="print-flyer">
                      <Printer className="w-4 h-4 mr-2" />
                      Print Flyer
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DoorOpen className="w-5 h-5" />
                    Door Hanger (3.5" x 8.5")
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div>
                    <DoorHanger />
                    <div className="flex justify-center mt-6">
                      <Button onClick={() => handlePrint('door-hanger')} data-testid="print-door-hanger">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Door Hanger
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Rack Card (4" x 9")
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div>
                    <RackCard />
                    <div className="flex justify-center mt-6">
                      <Button onClick={() => handlePrint('rack-card')} data-testid="print-rack-card">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Rack Card
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Referral Reward Card
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <div>
                    <ReferralCard />
                    <div className="flex justify-center mt-6">
                      <Button onClick={() => handlePrint('referral-card')} data-testid="print-referral-card">
                        <Printer className="w-4 h-4 mr-2" />
                        Print Referral Cards
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-muted/50 rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">Printing Tips</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• <strong>Business Cards:</strong> Print on heavy cardstock (110 lb or higher) for a professional feel</li>
                <li>• <strong>Flyers:</strong> Use glossy or semi-gloss paper for vibrant colors</li>
                <li>• <strong>Door Hangers:</strong> Print on thick cardstock and cut with a hole punch at the top</li>
                <li>• <strong>Rack Cards:</strong> Best on glossy 100 lb cardstock, available at local print shops</li>
                <li>• For best results, consider using a local print shop like Staples, Office Depot, or a local printer</li>
              </ul>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}
