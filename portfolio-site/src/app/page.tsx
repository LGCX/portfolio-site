import ResponsiveLayout from "@/components/ResponsiveLayout";
import ResponsiveSection from "@/components/ResponsiveSection";
import ThreeBackground from "@/components/ThreeBackground";
import Header from "@/components/Header";
import KeynoteCard from "@/components/KeynoteCard";

export default function Home() {
  return (
    
    <ResponsiveLayout showDevMode={false}>
         <ResponsiveSection
        position="absolute"
        className="top-0 left-0 w-full h-[150vh] z-0"
        padding="none"
      >
        <ThreeBackground texturePath="/futuristic-chrome.png" incline={0.45} />
      </ResponsiveSection>
      {/* Header */}
      <Header />
      
      {/* Diagonal Gradient Background */}
   

      {/* Hero Content - Responsive Typography */}
      <ResponsiveSection
        layout="flex"
        className="min-h-screen flex-col justify-center items-start px-6 pt-32 pb-16 sm:px-12 lg:px-20"
        padding="none"
      >
        {/* Main Typography */}
        <div>
          <h1 className="photonegative-text text-[clamp(2rem,8vw,6rem)] font-bold text-black leading-[0.9] tracking-tight mb-6">
            Creative technologist<br />
            building the future<br />
          </h1>
          
          {/* Subtitle */}
          <p className="photonegative-text text-[clamp(1rem,2.5vw,1.5rem)] text-black/70 max-w-2xl leading-relaxed mb-8">
            Full-Stack Software Engineer passionate about creating innovative digital solutions through cutting-edge technology, 
            thoughtful design, and seamless user interactions.
          </p>
        </div>
      </ResponsiveSection>

      {/* Keynote Card Section */}
      <ResponsiveSection
        layout="flex"
        className="flex-col justify-center items-center px-6 py-20 sm:px-12 lg:px-20 bg-gradient-to-br from-orange-300 via-orange-200 to-purple-300"
        padding="lg"
      >
        <KeynoteCard imagePath="/me.jpeg" />
      </ResponsiveSection>
    </ResponsiveLayout>
  );
}
