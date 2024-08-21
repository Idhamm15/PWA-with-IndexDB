"use client"

// pages/(token)/page.tsx
import TicketBooking from '@/components/TicketBooking';
import { openDB } from 'idb';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

interface Ticket {
  id: number;
  name: string;
  email: string;
  phone: string;
  image: string;
}

const TokenPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const db = await openDB('BookingTickets', 1);
      const allTickets = await db.getAll('booking-tickets');
      console.log('Fetched Tickets:', allTickets); // Ini akan mencetak data di console
      setTickets(allTickets as Ticket[]);
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <TicketBooking />
      {/* Bagian untuk menampilkan tiket yang disimpan dan QR code-nya */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-center mb-10">Saved Tickets</h2>
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket.id} className="flex flex-col items-center justify-center animate-fade-in-down -mt-8 mb-6">
              <h3 className="text-lg font-semibold">{ticket.name}</h3>
              <p>Email: {ticket.email}</p>
              <p>Phone: {ticket.phone}</p>
              <div className="mt-4 mb-14">
                <QRCode
                  value={`Name: ${ticket.name}, Email: ${ticket.email}, Phone: ${ticket.phone}`}
                  size={256}
                  fgColor="#000000" // Warna QR code
                  bgColor="#ffffff" // Warna latar belakang QR code
                />
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default TokenPage;
