"use client";

import Image from "next/image";
import { motion } from "motion/react";

const features = [
  {
    title: "Thousands of Books",
    description:
      "Explore a growing collection of books across fiction, science, technology, history, business, self-development, and many more categories. BookSphere makes discovering your next favorite book simple and enjoyable.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1200&q=80",
  },
  {
    title: "Easy Book Borrowing",
    description:
      "Borrow books in just a few clicks. Our streamlined borrowing process allows readers to request books online and track their orders without unnecessary paperwork.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&q=80",
  },
  {
    title: "Trusted Library Management",
    description:
      "Librarians can efficiently manage inventory, approve books, monitor deliveries, and maintain an organized digital library through a powerful dashboard.",
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=1200&q=80",
  },
  {
    title: "Community Reviews",
    description:
      "Read genuine reviews from other readers before borrowing a book, and share your own thoughts after reading to help others discover great books.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80",
  },
];

const FeatureCard = ({ feature, reverse }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-14 ${
        reverse ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <Image
          src={feature.image}
          alt={feature.title}
          width={700}
          height={500}
          className="w-full h-[260px] md:h-[380px] object-cover rounded-3xl shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-bold text-[#0A1F5C]">
          {feature.title}
        </h2>

        <p className="mt-6 text-lg leading-8 text-slate-600 text-justify">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function WhyChooseBookSphere() {
  return (
    <section className="bg-gradient-to-b from-[#EEF2FF] via-white to-[#F8FAFF] py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="uppercase tracking-[0.35em] text-blue-600 font-semibold">
          Why Choose BookSphere
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-[#0A1F5C]">
          Your Digital Library,
          <br />
          Reimagined
        </h1>

        <p className="mt-6 text-lg text-slate-600 leading-8">
          BookSphere combines an extensive collection of books, seamless
          borrowing, intelligent library management, and an engaging reader
          community into one modern platform.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-20 space-y-24">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            feature={feature}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}