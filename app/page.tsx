// pages/index.js
import { Spicy_Rice } from "next/font/google";
import { cn } from "@/lib/utils";

const spicy = Spicy_Rice({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  return (
    <div>
      {/* Header */}
      <header className="bg-[#EA1938] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className={`${spicy.className} text-3xl font-bold`}>
            Spirit of Santa
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-gray-200">
              Home
            </a>
            <a href="#" className="hover:text-gray-200">
              About
            </a>
            {/* <a href="#" className="hover:text-gray-200">
              Events
            </a> */}
            <a href="#" className="hover:text-gray-200">
              Contact
            </a>
            <a href="auth/login" className="hover:text-gray-200">
              Login
            </a>
          </nav>
          <button className="md:hidden bg-white text-[#EA1938] px-3 py-1 rounded">
            Menu
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="text-center bg-cover bg-no-repeat bg-center h-screen flex items-center justify-center"
        style={{ backgroundImage: "url('/santaBack.jpeg')" }}
      >
        <div className="bg-white bg-opacity-60 p-10 rounded-md shadow-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2F4F4F] ">
            Experience the Spirit of Santa
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-[#2F4F4F]">
            Bringing joy and wonder to all ages.
          </p>
          {/* <img
          src="/elf1.png"
          height= "100px"
          width= "100px"
          alt="Santa with Children"
          className="mt-8 rounded-lg mx-auto"
        /> */}
          <button className="mt-6 bg-[#EA1938] text-white px-6 py-2 rounded hover:bg-[#D61245]">
            Discover More
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto py-12 px-4 text-center bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold text-[#2F4F4F]">Our Mission</h2>
        <p className="mt-4 text-lg text-[#2F4F4F]">
          We aim to bring the magic of Santa to life through events, gifts, and
          the joy of giving.
        </p>
        <img
          className="mt-8 rounded-lg mx-auto"
          src="/elfwithgift.png"
          alt="Happy Elf Holding a Gift"
          width="100px"
        />
      </section>

      {/* Events Section */}
      <section className="bg-[#E0F7FA] py-12 px-4">
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
      </section>

      {/* Shop Section */}
      <section className="mx-auto py-12 px-4 text-center bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold text-[#2F4F4F]">Shop the Spirit</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src="/product1.jpg" alt="Product 1" className="rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">
              Holiday Ornament
            </h3>
            <p className="mt-2 text-gray-600">
              Add a touch of Christmas magic to your tree.
            </p>
            <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
              Shop Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src="/product2.jpg" alt="Product 2" className="rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">Santa Hat</h3>
            <p className="mt-2 text-gray-600">
              A classic Santa hat for all ages.
            </p>
            <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
              Shop Now
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src="/product3.jpg" alt="Product 3" className="rounded-lg" />
            <h3 className="mt-4 text-xl font-bold text-[#2F4F4F]">
              Festive Sweater
            </h3>
            <p className="mt-2 text-gray-600">
              Stay warm and festive with our exclusive sweater.
            </p>
            <button className="mt-4 bg-[#B22222] text-white px-4 py-2 rounded hover:bg-[#A52A2A]">
              Shop Now
            </button>
          </div>
        </div>
      </section>

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
      <section className="mx-auto py-12 px-4 text-center bg-[#F5F5F5]">
        <h2 className="text-3xl font-bold text-[#2F4F4F]">Stay Updated</h2>
        <form className="mt-6 flex flex-col items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg border-gray-300 focus:ring-[#B22222] focus:border-[#B22222]"
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
