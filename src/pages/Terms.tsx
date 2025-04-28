
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

const Terms = () => {
  // Mock data for auth modal trigger
  const handleOpenAuth = () => {
    console.log("Open auth modal");
  };
  
  // Mock logged in status - in a real app this would come from auth context
  const isLoggedIn = false;

  return (
    <>
      <Helmet>
        <title>Terms of Service | DentalDeals</title>
        <meta name="description" content="DentalDeals terms of service - The rules, guidelines, and agreements that govern the use of our platform." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar onOpenAuth={handleOpenAuth} isLoggedIn={isLoggedIn} />
        
        <main className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground mb-8">Last updated: April 15, 2025</p>
            
            <div className="prose prose-lg max-w-none">
              <p>
                Welcome to DentalDeals. Please read these Terms of Service ("Terms") carefully as they contain important information about your legal rights, remedies, and obligations. By accessing or using DentalDeals, you agree to comply with and be bound by these Terms.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use DentalDeals.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Eligibility</h2>
              <p>
                Our services are available only to dental professionals, including dentists, dental specialists, hygienists, dental assistants, and dental office managers. By using DentalDeals, you represent and warrant that you are a dental professional or authorized representative of a dental practice.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Account Registration</h2>
              <p>
                To access certain features of DentalDeals, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. User Conduct</h2>
              <p>
                You agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use DentalDeals for any illegal purpose or in violation of any local, state, national, or international law</li>
                <li>Share your account credentials with any third party</li>
                <li>Create more than one account per dental practice (unless authorized under a Premium plan)</li>
                <li>Interfere with or disrupt the operation of DentalDeals</li>
                <li>Attempt to gain unauthorized access to any portion of DentalDeals</li>
                <li>Use DentalDeals to distribute unsolicited promotional or commercial content</li>
                <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Deals and Redemption</h2>
              <p>
                DentalDeals provides a platform for dental professionals to access deals and offers from dental supply vendors ("Partners"). All deals are subject to availability and may be changed or withdrawn at any time without notice.
              </p>
              <p>
                When you redeem a deal, you enter into a direct relationship with the Partner offering the deal. DentalDeals is not responsible for the quality, safety, legality, or any other aspect of any products or services provided by Partners.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Membership Plans</h2>
              <p>
                DentalDeals offers free and Premium membership options. Premium membership requires payment of a subscription fee. By subscribing to a Premium membership, you agree to the subscription terms, including recurring billing until you cancel your subscription.
              </p>
              <p>
                You may cancel your Premium membership at any time from your account settings. Your Premium benefits will continue until the end of your current billing period.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
              <p>
                All content on DentalDeals, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of DentalDeals or our content suppliers and is protected by copyright, trademark, and other laws.
              </p>
              <p>
                You may not reproduce, modify, display, sell, or distribute any content from DentalDeals without our prior written consent.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, DentalDeals and our officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless DentalDeals and our officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees and costs, arising out of or in any way connected with your access to or use of DentalDeals.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Termination</h2>
              <p>
                We may terminate or suspend your account and access to DentalDeals at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our site before the changes become effective. Your continued use of DentalDeals after the effective date of any changes constitutes your acceptance of the modified Terms.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any legal action or proceeding relating to your access to, or use of, DentalDeals shall be instituted in a state or federal court in San Francisco, California.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">13. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> legal@dentaldeals.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Main Street, Suite 456, San Francisco, CA 94105
                </p>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-muted-foreground text-sm">
                By using DentalDeals, you acknowledge that you have read and understand these Terms of Service.
              </p>
              <div className="mt-6 flex space-x-4">
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
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

export default Terms;
