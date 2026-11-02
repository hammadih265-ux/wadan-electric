"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Phone, Mail, MapPin, Calendar, CreditCard, ShoppingBag, FileText } from "lucide-react";

export interface OrderCustomer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postcode: string;
  notes?: string;
}

export interface OrderItemSnapshot {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItemSnapshot[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}

interface OrderSnapshotCardProps {
  order: OrderDetails;
}

export const OrderSnapshotCard: React.FC<OrderSnapshotCardProps> = ({ order }) => {
  const { orderId, date, customer, items, subtotal, shipping, total, paymentMethod } = order;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden text-left max-w-2xl mx-auto print:shadow-none print:border-none">
      {/* Receipt Header with Brand Logo */}
      <div className="bg-gradient-to-r from-black via-neutral-900 to-neutral-800 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-2 backdrop-blur-md shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
            <Image
              src="/logo.png"
              alt="The 960 Club Logo"
              width={64}
              height={64}
              sizes="64px"
              priority
              unoptimized
              className="object-contain w-full h-full filter invert drop-shadow"
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Official Receipt</span>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">THE 960 CLUB</h2>
            <p className="text-xs text-neutral-300">Premium Apparel & Accessories</p>
          </div>
        </div>

        <div className="text-center md:text-right bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
          <div className="flex items-center justify-center md:justify-end gap-1.5 text-xs text-emerald-400 font-semibold mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Order Placed
          </div>
          <p className="font-mono text-sm font-bold tracking-wider text-white">#{orderId}</p>
          <div className="flex items-center justify-center md:justify-end gap-1 text-[11px] text-neutral-300 mt-0.5">
            <Calendar className="w-3 h-3" /> {date}
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Customer Information Grid */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-black" /> Customer & Delivery Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50/80 rounded-2xl p-5 border border-gray-100 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-xs text-gray-500 block font-medium">Customer Name</span>
                <span className="font-semibold text-gray-900">{customer.firstName} {customer.lastName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="font-mono text-xs">{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="text-xs truncate">{customer.email}</span>
              </div>
            </div>

            <div className="space-y-2 sm:border-l sm:border-gray-200/80 sm:pl-4">
              <div>
                <span className="text-xs text-gray-500 block font-medium">Shipping Address</span>
                <div className="flex items-start gap-1.5 text-gray-800 text-xs mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span>
                    {customer.address}, {customer.city}, {customer.state} ({customer.postcode})
                  </span>
                </div>
              </div>

              {customer.notes && customer.notes !== "None" && (
                <div className="pt-1">
                  <span className="text-[11px] text-gray-500 block font-medium">Order Notes</span>
                  <span className="text-xs text-gray-700 italic bg-white px-2 py-1 rounded border border-gray-200 inline-block mt-0.5">
                    &quot;{customer.notes}&quot;
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-black" /> Ordered Items ({items.length})
          </h3>
          <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition">
                <div className="w-14 h-14 rounded-xl bg-gray-100 overflow-hidden relative shrink-0 border border-gray-200/80">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={56}
                      height={56}
                      unoptimized
                      sizes="56px"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Rs {item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <div className="text-right font-bold text-gray-900 text-sm">
                  Rs {(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Summary */}
        <div className="bg-neutral-900 text-white rounded-2xl p-5 space-y-3">
          <div className="flex justify-between text-xs text-neutral-400">
            <span>Subtotal</span>
            <span className="font-medium text-neutral-200">Rs {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-xs text-neutral-400">
            <span>Shipping Fee</span>
            <span className="font-medium text-neutral-200">
              {shipping === 0 ? <span className="text-emerald-400 font-semibold uppercase">Free</span> : `Rs ${shipping}`}
            </span>
          </div>

          <div className="flex justify-between text-xs text-neutral-400">
            <span>Payment Method</span>
            <span className="font-medium text-neutral-200 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-neutral-400" /> {paymentMethod}
            </span>
          </div>

          <div className="border-t border-neutral-800 pt-3 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-neutral-400 block">Total Amount</span>
              <span className="text-[10px] text-neutral-500">Taxes Included</span>
            </div>
            <div className="text-2xl font-black tracking-tight text-white">
              Rs {total.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
