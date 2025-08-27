import ResponsiveLayout from "@/components/ResponsiveLayout";
import ResponsiveSection from "@/components/ResponsiveSection";
import ThreeBackground from "@/components/ThreeBackground";
import Header from "@/components/Header";
import KeynoteCard from "@/components/KeynoteCard";
import AboutTwoColumn from "@/components/AboutTwoColumn";
import StatsRow from "@/components/StatsRow";

export default function Home() {
  return (
    
    <ResponsiveLayout showDevMode={false}>
         <ResponsiveSection
        position="absolute"
        className="top-0 left-0 w-full h-[150vh] z-0"
        padding="none"
      >
        <ThreeBackground texturePath="/futuristic-chrome.png" incline={0.40} />
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

      {/* About + Image section (Stripe-style) */}
      <ResponsiveSection
        layout="block"
        className="py-24 mt-50 sm:py-28 bg-white"
        padding="none"
      >
        <AboutTwoColumn
          eyebrow="About"
          title={
            <>
              My mission is to build
              <br /> the Technologies of the Future
            </>
          }
          paragraphs={[
            "I'm a creative technologist who builds economic infrastructure for the internet. From startups to public companies, I design and ship software that accepts payments, automates operations, and delivers delightful user experiences.",
            "Based in the Austin, with experience working across global teams and markets.",
          ]}
          imageSrc="/Luis_Engineering_Headshot_Office.jpeg"
          imageAlt="Workspace photo"
          imageWidthPx={550}
        />
      </ResponsiveSection>

      {/* Stats row */}
      <ResponsiveSection layout="block" className="pb-16" padding="none">
        <StatsRow
          stats={[
            { value: "5+", label: "Years of Software Development Experience" },
            { value: "10K+", label: "Lines of production code shipped across full-stack systems" },
            { value: "5+", label: "Tech stacks mastered — Java, Spring, React, Node.js, SQL" },
            { value: "∞", label: "Dedication to shipping scalable, maintainable, and clean code" }
          ]}
        />
      </ResponsiveSection>

    </ResponsiveLayout>
  );
}
