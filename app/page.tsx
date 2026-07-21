import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MessageSquare, Leaf } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 overflow-x-hidden">

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-800 leading-tight">
          Leaf Care and Regional Recommendation of Plant
        </h1>

        <h3 className="mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-green-700 text-center italic">
          A Guide to Thriving Greenary for Every Region
        </h3>

        <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Upload a photo of any plant to instantly identify it, detect diseases, and get care recommendations.
          Specialized for Indian plants and growing conditions.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/identify">
            <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg px-6 py-6">
              Identify a Plant
            </Button>
          </Link>
          <Link href="/suggestions">
            <Button
              variant="outline"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg px-6 py-6"
            >
              Get Plant Suggestions
            </Button>
          </Link>
        </div>
      </section>

      <main>
        <ImageSlider />
      </main>

      {/* Features Section */}
      <section className="my-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white border-green-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Camera className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Snap a Photo</h3>
              <p className="text-gray-600">
                Take a picture of any plant using your camera or upload an existing photo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Get Instant Results</h3>
              <p className="text-gray-600">
                Our AI identifies the plant, detects any diseases, and provides detailed information.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-green-100">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Chat for More Info</h3>
              <p className="text-gray-600">
                Ask questions about care, growing conditions, or get location-based suggestions.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Plant Highlight Links */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-7">
        <img
          src="/assets/49.webp"
          alt="Medicinal plants for home"
          className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-md"
        />
        <a
          href="https://www.ugaoo.com/blogs/gardening-basics/the-best-flowering-plants-for-indian-homes?srsltid=AfmBOorHYwL9RBs_hQSJdHeVCBU3JEn6VYBXV3AvizRt1EWJ9ICNdrnS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 hover:underline italic font-bold text-2xl sm:text-3xl text-center"
        >
          Know some Medicinal Plants For Home
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-6">
        <img
          src="/assets/45.webp"
          alt="Best flowering plants for Indian homes"
          className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-md"
        />
        <a
          href="https://www.ugaoo.com/blogs/gardening-basics/the-best-flowering-plants-for-indian-homes?srsltid=AfmBOorHYwL9RBs_hQSJdHeVCBU3JEn6VYBXV3AvizRt1EWJ9ICNdrnS"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 hover:underline italic font-bold text-2xl sm:text-3xl text-center"
        >
          Best Flowering Plants for Homes In India
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 py-6">
        <img
          src="/assets/2tulsi.jpeg"
          alt="Most useful plant in India - Tulsi"
          className="w-full max-w-sm md:max-w-md h-auto object-cover rounded-lg shadow-md"
        />
        <a
          href="https://www.ugaoo.com/blogs/gardening-basics/top-10-most-useful-plants-for-home?srsltid=AfmBOoqk3b53LCeQFlco9GRchUDpcUaISjCbOvG9MJek33rtGQaothFP"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-700 italic hover:underline font-bold text-2xl sm:text-3xl text-center"
        >
          Read about the most useful Plant in India
        </a>
      </div>

      {/* Indian Plants Section */}
      <section className="my-16 bg-green-50 py-12 px-6 rounded-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-green-800 mb-4">
          Specialized for Indian Plants
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Our AI is trained to recognize plants native to India and provide region-specific growing advice for
          different Indian climates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Northern", "Southern", "Eastern", "Western"].map((region) => (
            <Card key={region} className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-700">{region} India</h3>
                <p className="text-sm text-gray-600">
                  Get plant suggestions optimized for {region} Indian growing conditions
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-4">
          Ready to Identify Your Plants?
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Start using our AI-powered plant identification tool today. It's free and easy to use!
        </p>
        <Link href="/identify">
          <Button className="bg-green-600 hover:bg-green-700 text-lg px-6 py-6 h-auto">
            Get Started Now
          </Button>
        </Link>
      </section>

      {/* Krishi Vistar / Farmer Corner */}
      <div className="py-5">
        <h2 className="mb-4">
          <a
            href="https://krishivistar.gov.in/Home.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline font-bold text-2xl sm:text-3xl md:text-4xl"
          >
            KRISHI VISTAR
          </a>
        </h2>

        <div className="flex flex-col-reverse md:flex-row items-center gap-6">
          <p className="text-gray-700">
            The next level of agriculture is moving toward Bio and Organic farming. The materials harvested from
            our own farms should be healthy for our own health. The next generation of cultivation will be
            completely organic. So get ready for the next level of agricultural inputs. LeafCare BioTech provides
            Bio and Organic products for the new generation of the agri-community — building a healthy generation
            for tomorrow, starting today.
          </p>
          <img
            src="/assets/farmercorner1.jpg"
            alt="Farmer corner"
            className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
