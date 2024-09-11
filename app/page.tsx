// pages/index.js
import { Spicy_Rice } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaArrowAltCircleRight, FaGift, FaTachometerAlt } from "react-icons/fa";
import { BsEnvelopePaperHeart, BsMagic } from "react-icons/bs";
import { Lilita_One } from "next/font/google";

const lilita = Lilita_One({
  weight: ["400"],
  subsets: ["latin"],
});
const spicy = Spicy_Rice({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="p-4">
        <div className="container flex justify-between items-center">
          <div
            className={`${lilita.className} text-4xl font-bold text-[#EA1938]`}
          >
            Spirit of Santa
          </div>

          <a
            href="auth/login"
            className="bg-[#EA1938] text-white px-6 py-2 rounded hover:bg-[#D61245]"
          >
            Login
          </a>
        </div>
      </header>

      {/* Hero Section */}

      <section
        className="text-center bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center gap-x-6 "
        style={{ backgroundImage: "url('/bkgdme.jpg')" }}
      >
        {/* info section */}
        <aside className="w-1/3 flex justify-center">
          <div className="w-full p-16">
        
{/* PRESENTS */}
<div className="flex items-stretch m-3 min-w-[450px]">
  <div className="bg-santa-red rounded-l-sm flex flex-col items-center justify-center py-2 px-6n min-w-[175px] min-h-[150px]">
    <div className="text-center">
      <FaGift color="white" size={50}/>
    </div>
    <h2 className={`${lilita.className} text-2xl font-bold text-white`}>
      Presents
    </h2>
  </div>
  <div className="bg-white opacity-80 rounded-r-sm p-4 flex-1 flex items-center">
    <p className="text-black">Create your list for Santa that he can see instantly. Change, update, and remove gifts all year long. Earn magic for free gifts!</p>
  </div>
</div>

{/* NICE METER */}
<div className="flex items-stretch m-3 min-w-[450px]">
  <div className="bg-santa-green rounded-l-sm flex flex-col items-center justify-center py-2 px-6 min-w-[175px] min-h-[150px]">
    <div className="text-center">
      <FaTachometerAlt color="white" size={50} />
    </div>
    <h2 className={`${lilita.className} text-2xl font-bold text-white`}>
      Nice Meter
    </h2>
  </div>
  <div className="bg-white opacity-80 rounded-r-sm p-4 flex-1 flex items-center">
    <p className="text-black">Check to see if you have been naughty or nice throughout the year. Get updates and suggestions to improve your meter!</p>
  </div>
</div>
{/* MAGIC POINTS */}
<div className="flex items-stretch m-3 min-w-[450px]">
  <div className="bg-santa-pink rounded-l-sm flex flex-col items-center justify-center py-2 px-5 min-w-[175px] min-h-[150px]">
    <div className="text-center">
      <BsMagic color="white" size={50} />
    </div>
    <h2 className={`${lilita.className} text-2xl font-bold text-white`}>
      Magic Points
    </h2>
  </div>
  <div className="bg-white opacity-80 rounded-r-sm p-4 flex-1 flex items-center">
    <p className="text-black">Earn magic points to receive free gifts by doing good in school and in your community. </p>
  </div>
</div>
{/* EMAIL SANTA */}
<div className="flex items-stretch m-3 min-w-[450px]">
  <div className="bg-santa-blue rounded-l-sm flex flex-col items-center justify-center py-2 px-6 min-w-[175px] min-h-[150px]">
    <div className="text-center">
      <BsEnvelopePaperHeart color="white" size={50} />
    </div>
    <h2 className={`${lilita.className} text-2xl font-bold text-white`}>
     Email Santa
    </h2>
  </div>
  <div className="bg-white opacity-80 rounded-r-sm p-4 flex-1 flex items-center">
    <p className="text-black">Sent messages directly to Santa all year long! </p>
  </div>
</div>


          
          </div>
        </aside>
        {/* register section */}
        <div className=" bg-white  p-10  shadow-[0_0_0_20px_rgba(234,25,56,1)] rounded-[2px] w-1/3">
          <h1
            className={`${lilita.className} mt-10 uppercase text-santa-red text-5xl md:text-5xl font-bold`}
          >
            Santa's Gone Digital!
          </h1>
          <h2
            className={`${lilita.className} mt-10 uppercase text-santa-dark-blue text-2xl md:text-2xl font-bold`}
          >
            Explore Your Presents List, Earn Magic Points, Track Your Nice
            Meter, Email Santa, and So Much More!
          </h2>
          <p className="mt-10 mb-4 text-md text-black">
            Sign up today to unlock all the fun and enjoy these magical
            features!
          </p>
          <div className="flex items-center justify-center gap-2 mb-10">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded "
              placeholder="Enter your Email"
            />

            <a
              href="/auth/register"
              className="flex items-center justify-center bg-santa-dark-blue text-white px-6 py-2 rounded hover:bg-[#D61245] transition-colors"
            >
              Get Started <FaArrowAltCircleRight className="ml-3" />
            </a>
          </div>
        </div>

        {/* comic section */}

        <aside className="w-1/3 flex justify-center  ">
          <Image
            className="shadow-[0_0_0_20px_rgba(55,119,108,1)] rounded-[2px]"
            src="/comicLong.jpg"
            alt="Some image"
            width={250}
            height={900}
          />
        </aside>
      </section>

      {/* About Section */}
      <section className="mx-auto py-12 px-4 text-center bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold text-[#2F4F4F]">Our Mission</h2>
        <p className="mt-4 text-lg text-[#2F4F4F]">
          We aim to bring the magic of Santa to life through events, gifts, and
          the joy of giving.
        </p>
        <Image
          className="mt-8 rounded-lg mx-auto"
          src="/elfwithgift.png"
          alt="Happy Elf Holding a Gift"
          width="100"
          height="100"
        />
      </section>

      {/* Events Section */}
      {/* <section className="bg-[#E0F7FA] py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2F4F4F]">Upcoming Events</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/event1.jpg" alt="Event 1" className="rounded-lg" />
              <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">
                Christmas Parade
              </h3>
              <p className="mt-2 text-gray-600">
                Join us for a festive parade through the city.
              </p>
              <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
                Learn More
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/event2.jpg" alt="Event 2" className="rounded-lg" />
              <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">
                Santa's Workshop
              </h3>
              <p className="mt-2 text-gray-600">
                Experience the magic of Santa's workshop firsthand.
              </p>
              <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
                Learn More
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/event3.jpg" alt="Event 3" className="rounded-lg" />
              <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">
                Winter Wonderland
              </h3>
              <p className="mt-2 text-gray-600">
                Step into a winter wonderland of lights and music.
              </p>
              <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="bg-[#E0F7FA] py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#2F4F4F]">
            What People Are Saying
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">
                "The Spirit of Santa event was a magical experience for our
                whole family."
              </p>
              <p className="mt-4 font-bold text-[#2F4F4F]">- John Doe</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">
                "My kids loved the Christmas parade and can't wait for next
                year!"
              </p>
              <p className="mt-4 font-bold text-[#2F4F4F]">- Jane Smith</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <p className="text-gray-600">
                "Santa's Workshop was like stepping into a winter wonderland."
              </p>
              <p className="mt-4 font-bold text-[#2F4F4F]">- Emily Johnson</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto py-12 px-4 text-center bg-[#d8d8d8]">
        <h2 className="text-3xl font-bold text-[#2F4F4F]">Stay Updated</h2>
        <form className="mt-6 flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg  border-gray-300 focus:ring-[#B22222] focus:border-[#B22222]"
          />
          <button className="mt-4 bg-[#B22222] text-white px-6 py-2 rounded hover:bg-[#A52A2A]">
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F4F4F] text-white py-8">
        <div className="container mx-auto text-center">
          <div className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Home
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              About
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              Events
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              Shop
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              Contact
            </a>
          </div>
          <div className="mb-4">
            <a href="#" className="hover:text-gray-400">
              Facebook
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              Instagram
            </a>{" "}
            |
            <a href="#" className="hover:text-gray-400 ml-2">
              Twitter
            </a>
          </div>
          <div>© 2024 Spirit of Santa. All Rights Reserved.</div>
        </div>
      </footer>
    </div>
  );
}
