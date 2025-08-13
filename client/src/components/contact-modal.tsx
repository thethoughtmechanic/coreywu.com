
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeButtonPosition?: 'top-right' | 'top-left';
}

export default function ContactModal({ 
  isOpen, 
  onClose, 
  closeButtonPosition = 'top-right' 
}: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-xl shadow-xl overflow-hidden mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 ${
            closeButtonPosition === 'top-left' ? 'left-4' : 'right-4'
          } z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200`}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-light text-warm-brown mb-3">
              Let's Connect
            </h2>
            <p className="text-sm text-soft-black/70 leading-relaxed">
              Have a project idea, want to collaborate, or just want to chat about design and technology? I'd love to hear from you.
            </p>
          </div>
          
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-name" className="block text-sm font-medium text-warm-brown mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="modal-name"
                  name="name"
                  className="w-full px-3 py-2 bg-cream/80 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="modal-email" className="block text-sm font-medium text-warm-brown mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  className="w-full px-3 py-2 bg-cream/80 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="modal-subject" className="block text-sm font-medium text-warm-brown mb-1">
                Subject
              </label>
              <input
                type="text"
                id="modal-subject"
                name="subject"
                className="w-full px-3 py-2 bg-cream/80 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black"
                placeholder="What would you like to discuss?"
              />
            </div>
            
            <div>
              <label htmlFor="modal-message" className="block text-sm font-medium text-warm-brown mb-1">
                Message
              </label>
              <textarea
                id="modal-message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 bg-cream/80 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50 focus:border-transparent text-soft-black resize-none"
                placeholder="Tell me about your project, idea, or just say hello..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget.closest('form') as HTMLFormElement;
                  const formData = new FormData(form);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const subject = formData.get('subject') as string;
                  const message = formData.get('message') as string;
                  
                  const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                  const mailtoLink = `mailto:corey.david.wu@gmail.com?subject=${encodeURIComponent(subject || 'Contact from coreywu.com')}&body=${encodeURIComponent(emailBody)}`;
                  window.open(mailtoLink);
                  onClose();
                }}
                className="bg-warm-brown text-cream px-8 py-3 rounded-lg hover:bg-hover-brown transition-all duration-300 font-medium text-lg shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
