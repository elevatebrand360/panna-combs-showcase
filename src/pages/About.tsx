import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEO from "@/components/SEO";

const About = () => {
  return (
    <>
      <SEO 
        title="About Panna Combs - Our Legacy & Founding Fathers | Hair Comb Manufacturer Kolkata"
        description="Discover the legacy of Panna Combs - Leading hair comb manufacturer in Howrah, Kolkata. Learn about our founding fathers, family values, and commitment to quality craftsmanship."
        keywords="Panna Combs history, hair comb manufacturer Kolkata, comb factory Howrah, family business combs, legacy combs, founding fathers Panna Combs"
        canonical="https://pannacombs.com/about"
      />
      <Navbar />
      <main>
        <div className="section-brand text-white py-16 px-4">
          <div className="container mx-auto">
            <h1 className="text-center">About Panna Combs</h1>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="about">About Us</TabsTrigger>
              <TabsTrigger value="values">Our Values</TabsTrigger>
              <TabsTrigger value="founders">Founding Father</TabsTrigger>
              <TabsTrigger value="factory">Our Factory</TabsTrigger>
            </TabsList>
            
            <TabsContent value="about" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Legacy</h2>
                  <div className="space-y-6 text-lg leading-relaxed">
                    <p>
                      Panna Combs was born from the vision of Late Sri Dhanraj Kothari, a pioneering entrepreneur whose belief was simple yet profound: that everyday essentials should embody uncompromising quality.
                    </p>
                    <p>
                      Hailing from Churu, Rajasthan, he set out on a journey that led him to Patna, where he laid the cornerstone of what would become our family’s enduring enterprise in comb manufacturing.
                    </p>
                    <p>
                      As the business grew, so did his commitment to excellence—a commitment that eventually brought Panna Combs to Kolkata, where our name became synonymous with craftsmanship and trust.
                    </p>
                    <p>
                      Today, his dedication and hardwork lives through the next generation of dedicated and passionate personal, his son Shri Nirmal Kothari, and the succeeding generation- Nitesh Kothari, Nitin Kothari, Owner of kolkata branch and Deepak Kothari, who handles the Bombay branch carrying forward his passion for creating combs that seamlessly blend tradition, innovation, and care.
                    </p>
                  </div>
                </div>
                
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581957006327-32aa02d95084?q=80&w=2070&auto=format&fit=crop" 
                    alt="Panna Combs History" 
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 glass-card py-2 px-4 rounded">
                    <p className="font-bold text-blue-400">Howrah - 711302, Kolkata</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="values" className="mt-6">
              <div className="flex flex-col items-center">
                <div className="w-full flex flex-col md:flex-row gap-6 mb-6">
                  <div className="flex flex-col items-center w-full md:w-1/2">
                    <img 
                      src="/babosa.jpg" 
                      alt="Babosa Bhagwan" 
                      className="w-full aspect-square object-cover rounded-lg shadow" 
                    />
                    <p className="mt-2 text-center font-semibold text-blue-400">Babosa Bhagwan</p>
                  </div>
                  <div className="flex flex-col items-center w-full md:w-1/2">
                    <img 
                      src="/baisa.jpg" 
                      alt="Param Aradhika Babosa" 
                      className="w-full aspect-square object-cover rounded-lg shadow" 
                    />
                    <p className="mt-2 text-center font-semibold text-blue-400">Param Aradhika Babosa</p>
                  </div>
                </div>
                <div className="max-w-4xl text-center text-lg text-muted-foreground space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-blue-400 mb-4">Jai Shri Babosa</h3>
                    <p className="text-lg leading-relaxed">
                      At Babosa Mandir, our values are rooted in devotion, selfless service, and unwavering faith. Guided by the divine grace of Lord Babosa, we strive to nurture a spiritual community inspired by the life and teachings of Param Aradhika Babosa.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-blue-400 mb-2">Devotion and Surrender</h4>
                        <p className="text-base leading-relaxed">
                          We believe true devotion begins with surrendering the ego and opening the heart to the boundless love of Babosa Maharaj. Every prayer, Kirtan, and ritual is a step closer to this sacred connection.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-blue-400 mb-2">Divine Service (Seva)</h4>
                        <p className="text-base leading-relaxed">
                          Selfless service is at the core of our mission. Param Aradhika Babosa's dedication inspires us to serve humanity with compassion, humility, and purity of intent.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-blue-400 mb-2">Spiritual Awakening</h4>
                        <p className="text-base leading-relaxed">
                          Through satsang and kirtan, devotees experience Babosa Maharaj's divine presence—often manifesting in Bala Roop—to awaken higher consciousness and inner transformation.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xl font-semibold text-blue-400 mb-2">Community and Belonging</h4>
                        <p className="text-base leading-relaxed">
                          Our Mandirs are spaces of togetherness, where every soul is welcomed with respect, regardless of background. We cherish the bonds formed through shared faith and collective worship.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-blue-400 mb-2">Inspiration to Lead a Spiritual Life</h4>
                        <p className="text-base leading-relaxed">
                          Following the example set by Param Aradhika Babosa, we encourage everyone to live with integrity, gratitude, and devotion, carrying Babosa's blessings into everyday life.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-lg leading-relaxed font-medium">
                      Together, these values illuminate our path, sustaining our purpose and guiding every devotee toward divine love and spiritual fulfillment.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="founders" className="mt-6">
              <div className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-bold mb-6 text-center w-full">Our Founding Father</h2>
                <div className="space-y-6 text-lg leading-relaxed w-full max-w-2xl text-center">
                  <div className="flex flex-col items-center mb-6">
                    <img 
                      src="/founder-dhanraj-kothari.jpg" 
                      alt="The Founding Father: Shri. Late Dhanraj Kothari" 
                      className="rounded-lg shadow-lg mb-2 border-4 border-blue-200 w-full max-w-xs sm:max-w-sm mx-auto object-contain" style={{ maxHeight: '350px', background: '#fff' }}
                    />
                    <p className="font-semibold text-center text-blue-400">The Founding Father: Shri. Late Dhanraj Kothari</p>
                    <p className="text-center text-base text-muted-foreground max-w-md">A visionary entrepreneur whose unwavering commitment to quality and integrity laid the foundation for Panna Combs. His journey from Churu to Patna and then Kolkata continues to inspire generations.</p>
                  </div>
                  <p>
                    At the heart of Panna Combs is the enduring spirit of our Founding Fathers, whose dedication, vision, and integrity shaped who we are today.
                  </p>
                  <p>
                    It all began with Late Sri Dhanraj Kothari, whose entrepreneurial foresight transformed a simple idea into a thriving enterprise. His belief that quality should never be compromised laid the foundation for everything we do.
                  </p>
                  <p>
                    Carrying forward his legacy, his sons—Nirmal Kothari, Prakash Kothari, and Praven Kothari—worked tirelessly to expand the business, uphold the family values, and earn the trust of customers across generations.
                  </p>
                  <p>
                    Together, they not only built a brand but also nurtured a culture rooted in hard work, respect, and an unwavering commitment to excellence.
                  </p>
                  <p>
                    Today, their example continues to inspire the next generation, ensuring that every comb we create reflects the same care and craftsmanship envisioned by our Founding Fathers.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="factory" className="mt-6">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Factory</h2>
                <p>
                  Located in Duillya, Nimtalla, Andul, Howrah - 711302, our factory combines traditional craftsmanship 
                  with modern manufacturing technology to produce combs of exceptional quality.
                </p>
                
                <h3 className="text-2xl font-semibold">Manufacturing Process</h3>
                <p>
                  Our combs go through a meticulous manufacturing process that ensures each product meets 
                  our high standards:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Material Selection</h4>
                    <p className="text-sm text-muted-foreground">
                      We carefully select the highest quality materials for durability and comfort.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Precision Molding</h4>
                    <p className="text-sm text-muted-foreground">
                      Our combs are molded with precision to ensure perfect teeth spacing and smoothness.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Quality Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Each comb undergoes rigorous quality checks before packaging and shipping.
                    </p>
                  </div>
                </div>
                
                <p>
                  Our factory is equipped with modern machinery while still maintaining the human touch 
                  that ensures attention to detail. We take pride in our efficient production processes 
                  that allow us to meet both large wholesale orders and specialized custom requests.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default About;
