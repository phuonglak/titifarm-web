import dynamic from "next/dynamic";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Liên hệ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-4 space-y-4">
          <div className="aspect-video w-full overflow-hidden rounded-md border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.466067406917!2d106.70000000000002!3d10.776000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zVGl0aUZhcm0!5e0!3m2!1svi!2svi!4v1690000000000"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="space-y-2">
            <p><strong>Hotline:</strong> 09xx xxx xxx</p>
            <p>
              <strong>Địa chỉ:</strong> Khu trải nghiệm nông nghiệp TitiFarm
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}


