
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

const Privacy = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Privacy Policy | DentalDeals</title>
        <meta name="description" content="DentalDeals privacy policy - How we collect, use, and protect your personal information." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        <main className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: April 15, 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <p>
                At DentalDeals, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for an account</li>
                <li>Fill out a form</li>
                <li>Participate in surveys or contests</li>
                <li>Communicate with us via third-party social media sites</li>
                <li>Subscribe to our newsletter</li>
                <li>Request customer support</li>
              </ul>
              
              <p className="mt-4">
                The types of information we may collect include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your name, email address, postal address, phone number, and other contact information</li>
                <li>Your username, password, and preferences</li>
                <li>Your dental practice information</li>
                <li>Billing information and transaction history</li>
                <li>Other information you choose to provide</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Automatically Collected Information</h2>
              <p>
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Access times</li>
                <li>Pages viewed</li>
                <li>Links clicked</li>
                <li>Interactions with our email communications</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
              <p>
                We may use the information we collect for various purposes, including to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send transaction notifications</li>
                <li>Send administrative information, such as updates to our terms, conditions, and policies</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send promotional communications, such as special offers or newsletters</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>Personalize and improve your experience</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Sharing Your Information</h2>
              <p>
                We may share your information as follows:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                <li>With partners when you choose to redeem a deal (only the information necessary to fulfill the redemption)</li>
                <li>In response to a request for information if we believe disclosure is in accordance with applicable law</li>
                <li>If we believe your actions are inconsistent with our user agreements or policies</li>
                <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
                <li>With your consent or at your direction</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Your Choices</h2>
              <p>
                You have several choices regarding the use of information on our service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Information:</strong> You may update, correct, or delete your account information at any time by logging into your account settings.</li>
                <li><strong>Cookies:</strong> Most web browsers are set to accept cookies by default. You can usually choose to set your browser to remove or reject cookies.</li>
                <li><strong>Promotional Communications:</strong> You may opt out of receiving promotional communications from us by following the instructions in those communications.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
              <p>
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction. However, no Internet or email transmission is ever fully secure or error-free.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Children's Privacy</h2>
              <p>
                Our service is not directed to children under 13. We do not knowingly collect information from children under 13. If we learn that we have collected information of a child under 13, we will delete that data from our systems.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to this Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last Updated" date at the top.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> privacy@dentaldeals.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Main Street, Suite 456, San Francisco, CA 94105
                </p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-muted-foreground text-sm">
                By using our service, you acknowledge that you have read and understand this Privacy Policy.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                <Link to="/cookies" className="text-primary hover:underline">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </main>
        
        {/* Footer - Simplified version */}
        <footer className="bg-secondary py-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-sm">DD</span>
                </div>
                <span className="text-lg font-bold">DentalDeals</span>
              </div>
              <div className="text-muted-foreground text-sm">
                © 2025 DentalDeals. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Privacy;
