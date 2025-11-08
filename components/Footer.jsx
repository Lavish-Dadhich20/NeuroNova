"use client"

export default function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">💠</div>
              NeuroNova
            </h3>
            <p className="opacity-75">AI-Powered Personal Loans Platform</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 opacity-75">
              <li>
                <a href="#" className="hover:opacity-100 smooth-transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 smooth-transition">
                  EMI Calculator
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-100 smooth-transition">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 opacity-75">
              <li>Email: hello@neuronova.com</li>
              <li>Phone: +91 1800-000-000</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center opacity-75">
          <p>© 2025 NeuroNova | Crafted by Team NeuroNova</p>
        </div>
      </div>
    </footer>
  )
}
