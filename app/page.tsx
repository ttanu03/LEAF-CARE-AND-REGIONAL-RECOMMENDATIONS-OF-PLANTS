'use client';

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, MessageSquare, Leaf } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {
  useEffect(() => {
    console.log("🔑 Gemini API Key:", GEMINI_API_KEY);

    if (!GEMINI_API_KEY) {
      console.error("❌ Gemini API key is missing in environment!");
      return;
    }

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Hello from Gemini in Next.js TSX!" }] }],
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Gemini API Response:", data);
      })
      .catch((error) => {
        console.error("❌ Gemini API Error:", error);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green-800">
          Leaf care and Regional Recommendation of Plant
        </h1>
        <br /><br />
        <h3 className="text-2xl font-bold text-green-700 text-center italic">
          A Guide to Thriving Greenery for Every Region
        </h3>
        <br />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Upload a photo of any plant to instantly identify it, detect diseases,
          and get care recommendations. Specialized for Indian plants and growing conditions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/identify">
            <Button className="bg-green-600 hover:bg-green-700 text-lg px-6 py-6 h-auto">
              Identify a Plant
            </Button>
          </Link>
          <Link href="/suggestions">
            <Button
              variant="outline"
              className="text-lg px-6 py-6 h-auto border-green-600 text-green-700 transition-transform duration-300 hover:bg-green-50"
            >
              Get Plant Suggestions
            </Button>
          </Link>
        </div>
      </section>

      <main>
        <ImageSlider />
      </main>

      <br /><br /><br />

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Camera className="h-8 w-8 text-green-600" />,
              title: "Snap a Photo",
              desc: "Take a picture of any plant using your camera or upload an existing photo."
            },
            {
              icon: <Leaf className="h-8 w-8 text-green-600" />,
              title: "Get Instant Results",
              desc: "Our AI identifies the plant, detects any diseases, and provides detailed information."
            },
            {
              icon: <MessageSquare className="h-8 w-8 text-green-600" />,
              title: "Chat for More Info",
              desc: "Ask questions about care, growing conditions, or get location-based suggestions."
            }
          ].map((feature, index) => (
            <Card key={index} className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-green-100 p-4 rounded-full mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* External Links */}
      {[
        {
          img: "/assets/49.webp",
          link: "https://www.ugaoo.com/blogs/gardening-basics/the-best-flowering-plants-for-indian-homes",
          text: "Know some Medical Plants For Home"
        },
        {
          img: "/assets/45.webp",
          link: "https://www.ugaoo.com/blogs/gardening-basics/the-best-flowering-plants-for-indian-homes",
          text: "Best Flowering Plants for Homes In India"
        },
        {
          img: "/assets/2tulsi.jpeg",
          link: "https://www.ugaoo.com/blogs/gardening-basics/top-10-most-useful-plants-for-home",
          text: "Read about the most useful Plant in India"
        }
      ].map((item, idx) => (
        <div key={idx} className="flex justify-center items-center gap-10 py-7">
          <img src={item.img} alt="Leaf" className="w-[400px] h-[300px] object-cover rounded-lg shadow-md" />
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline italic font-bold text-3xl"
          >
            {item.text}
          </a>
        </div>
      ))}

      {/* Indian Plants Section */}
      <section className="mb-16 bg-green-50 py-12 px-6 rounded-xl">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-4">Specialized for Indian Plants</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
          Our AI is trained to recognize plants native to India and provide region-specific growing advice for different
          Indian climates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {["Northern", "Southern", "Eastern", "Western"].map((region) => (
            <Card key={region} className="bg-white">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-700">{region} India</h3>
                <p className="text-sm text-gray-600">
                  Get plant suggestions optimized for {region} Indian growing conditions.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Identify Your Plants?</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Start using our AI-powered plant identification tool today. It's free and easy to use!
        </p>
        <Link href="/identify">
          <Button className="bg-green-600 hover:bg-green-700 text-lg px-6 py-6 h-auto">Get Started Now</Button>
        </Link>
      </section>

      {/* Krishi Vistar */}
      <div className="py-5">
        <h2 className="mb-4">
          <a
            href="https://krishivistar.gov.in/Home.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline font-bold text-4xl"
          >
            KRISHI VISTAR
          </a>
        </h2>
        <div className="flex justify-center items-center gap-3">
          <p className="text-gray-700">
            The next level of agriculture is moving toward Bio and Organic farming. The materials harvested from our own farms should be healthy for our own health. The next generation of cultivation will be completely organic. So get ready for the next level of agricultural inputs. LeafCare BioTech provides Bio and Organic products for the new generation of the agri-community — building a healthy generation for tomorrow, starting today.
          </p>
          <img
            src="/assets/farmercorner1.jpg"
            alt="Farmer"
            className="object-cover rounded-lg shadow-md w-1/3"
          />
        </div>
      </div>
    </div>
  );
}
