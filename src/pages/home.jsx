import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  TruckIcon,
  StarIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import o1 from "../assets/1.jpg";
import o2 from "../assets/2.png";
import o3 from "../assets/3.jpg";
import o4 from "../assets/4.png";

import logo from "../assets/logo.png";
import MediaGallery from "../components/MediaGallery ";
import ProductSelector from "../components/ProductSelector ";
import FeatureSection from "../components/FeatureSection";
import { IoIosLeaf } from "react-icons/io";
import CheckoutForm from "../components/Form";
import { createOrder } from "../functions/order";
import { Link } from "react-router-dom";

const products = {
  "600g": {
    title: "600 غ",
    price: 14, // base unit price
    desc: "Léger et moelleux, idéal pour ceux qui dorment sur le ventre",
  },
  "800g": {
    title: "800 غ",
    price: 17,
    desc: "Excellent maintien pour un sommeil réparateur",
  },
  "1kg": {
    title: "1 كغ ",
    price: 22,
    desc: "Finition haut de gamme, idéal pour un confort ferme",
  },
};

export default function Home() {
  useEffect(() => {
    // optional: initialize any animation libs or pixel here
  }, []);

  function trackEvent(name, data = {}) {
    try {
      if (window.fbq) window.fbq("track", name, data);
      if (window.gtag) window.gtag("event", name, data);
    } catch (e) {
      // ignore
    }
  }

  const weights = Object.keys(products);
  const [selectedWeight, setSelectedWeight] = useState(weights[0]);
  const [selectedPack, setSelectedPack] = useState(2);

  const basePrice = products[selectedWeight].price;

  // Discount logic: bigger packs = cheaper per item
  const discount = selectedPack > 2 ? (selectedPack - 1) * 0.03 : 0; // 3% off per extra item
  const total = (basePrice * selectedPack * (1 - discount)).toFixed(2);
  const perUnit = (total / selectedPack).toFixed(2);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    gouvernorat: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    {
      productId: "08101994",
      name: "Oreillers Premium 70×50",
      price: total,
      quantity: selectedPack,
      selectedSize: selectedWeight,
    },
  ];

  //   const subtotal = cartItems.reduce(
  //     (acc, item) => acc + item.price * item.quantity,
  //     0
  //   );

  const shipping = total > 0 ? 8.0 : 0;
  const totalDelivery = total + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🛑 Manual validation for when called outside <form>
    const missingField = Object.entries(formData).find(
      ([key, value]) => !value.trim()
    );
    if (missingField) {
      const fieldName = missingField[0];
      const el = document.querySelector(`[name="${fieldName}"]`);
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);

    const orderData = {
      customer: formData,
      items,
      subtotal: total,
      shipping,
      paymentMethod,
      total: totalDelivery,
    };

    try {
      const response = await createOrder(orderData);
      console.log("✅ Order placed successfully:", response);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        address: "",
        gouvernorat: "",
      });
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Une erreur s’est produite. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setIsOpen(true);
    }
  };
  const [count, setCount] = useState(400); // start at 50

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1); // increment by 1
    }, 10000); // every 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 antialiased">
      <header className="max-w-6xl mx-auto md:px-6 px-1 md:py-8 py-4 px-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center ml-2">
            <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Oreillers Premium 70×50 cm</h1>
            <p className="text-sm text-slate-500">
              Confort local. Qualité hôtel
            </p>
          </div>
        </div>

        {/* <nav className="flex items-center gap-4">
          <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md border border-slate-200 bg-white hover:shadow">
            <ShoppingCartIcon className="w-5 h-5 text-slate-600" /> Shop
          </button>
          <a
            href="#packs"
            className="px-4 py-2 rounded-md bg-slate-900 text-white text-sm"
          >
            Acheter
          </a>
        </nav> */}
      </header>

      <main className="max-w-6xl mx-automd:px-6 px-2 pb-20">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center  ">
          <div className="space-y-4">
            <p
              className="md:text-lg text-sm text-slate-700 leading-relaxed"
              dir="rtl"
            >
              <span className="inline-flex items-center mt-2 text-green-700">
                <IoIosLeaf className="w-5 h-5 " />
              </span>
              <strong>مخدة محشوة بألياف سيليكونية مهواة:</strong> توفر راحة
              وتنفس ممتاز.
              <br />
              <strong>الغلاف:</strong> مايكروفايبر 100% ناعم، مضاد للحساسية
              وللغبار، وقابل للغسل.
              <br />
              <strong>الخامة:</strong> مصنوعة من قطن مقوّى لضمان جودة تدوم
              طويلاً.
              <br />
            </p>

            <FeatureSection />
            <div className="flex justify-between items-center mt-2 text-center px-2">
              {/* Social Proof */}
              <p className="text-xs text-slate-600 ">
                <span className="font-bold">Plus de {count} achetés</span> ce
                mois
              </p>

              {/* Rating */}
              <div className="flex items-center gap-[2px]">
                {/* Full Stars */}
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#fbbf24" // gold
                    className="w-4 h-4"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.597 0 9.75l8.332-1.732z" />
                  </svg>
                ))}

                {/* Partial Star for 0.7 */}
                <div className="relative w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#e5e7eb" // light gray background
                    className="absolute inset-0 w-4 h-4"
                  >
                    <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.597 0 9.75l8.332-1.732z" />
                  </svg>
                  <div
                    className="absolute top-0 left-0 overflow-hidden"
                    style={{ width: "70%" }} // fill 70% of the star
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#fbbf24"
                      className="w-4 h-4"
                    >
                      <path d="M12 .587l3.668 7.431L24 9.75l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.597 0 9.75l8.332-1.732z" />
                    </svg>
                  </div>
                </div>

                {/* Rating Text */}
                <span className="text-[11px] text-slate-500 ml-1">(4.7/5)</span>
              </div>
            </div>

            <MediaGallery
              mainImages={[o1, o2, o3, o4]}
              videoUrl="/videos/oreiller-demo.mp4"
            />
          </div>
        </section>
        <ProductSelector
          products={products}
          weights={weights}
          selectedWeight={selectedWeight}
          setSelectedWeight={setSelectedWeight}
          selectedPack={selectedPack}
          setSelectedPack={setSelectedPack}
          basePrice={basePrice}
          discount={discount}
          total={total}
          perUnit={perUnit}
        />
        <CheckoutForm
          formData={formData}
          setFormData={setFormData}
          loading={loading}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
        {/* TESTIMONIALS */}
        <section className="mt-20">
          <h3 className="text-2xl font-bold">Avis clients</h3>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Fatma",
                country: "Tunis, Tunisie",
                text: "مخدة ممتازة 😍 راحتني برشة! Livraison rapide",
                rating: 5,
              },
              {
                name: "Karim",
                country: "Sfax, Tunisie",
                text: "Super confortable, exactement ce que je cherchais. Merci ",
                rating: 5,
              },
              {
                name: "Sarra",
                country: "Tunis, Tunisie",
                text: "Chouchou de ma chambre. Très douce et anti-allergie 👍",
                rating: 5,
              },
            ].map((client, i) => (
              <div key={i} className="rounded-xl p-6 bg-white shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-semibold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{client.name}</div>
                    <div className="text-xs text-slate-400">
                      {client.country}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">{client.text}</p>
                <div className="mt-4 flex items-center gap-2 text-yellow-400">
                  {Array.from({ length: client.rating }).map((_, idx) => (
                    <StarIcon key={idx} className="w-4 h-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ + Footer */}
        <section className="mt-20 mb-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold">FAQ</h4>
            <div className="mt-4 space-y-3 text-slate-600">
              <div>
                <div className="font-semibold">
                  Quelle est la politique de retour ?
                </div>
                <div className="text-sm">
                  Retour sous 2 jours. Frais de retour à la charge de l'acheteur
                  sauf défaut fabricant.
                </div>
              </div>

              <div>
                <div className="font-semibold">Quels modes de paiement ?</div>
                <div className="text-sm">
                  Espèces à la livraison ou virement bancaire.
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold">Contact</h4>
            <div className="mt-4 text-slate-600">
              <p>
                WhatsApp: <span className="font-medium">+216 96 67 01 02</span>
              </p>
              <Link to="orders">
                {" "}
                <p className="mt-2">Adresse: Tunis, Tunisie</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="sticky bottom-4 left-0 right-0 mx-auto max-w-6xl px-2  ">
        <div className="bg-white rounded-xl p-4 shadow-2xl flex items-center justify-between border border-slate-200">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-sm font-semibold">
                Pack {selectedPack} × {selectedWeight}
              </div>
              <div className="text-xs text-slate-500">
                Total: <span className="font-bold">{total} </span>{" "}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-lg bg-green-700 text-white"
            >
              Commander maintenant
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
