import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6 hover:bg-wealth-blue-light"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Privacy Policy
              </CardTitle>
              <p className="text-center text-muted-foreground mt-2">
                Effective Date: January 1, 2024
              </p>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">1. Introduction</h2>
                  <p>
                    This Privacy Policy describes how we collect, use, and protect your personal information 
                    when you use our wealth management and financial planning application ("Service"). 
                    We are committed to protecting your privacy and ensuring the security of your personal 
                    and financial data.
                  </p>
                  <p>
                    By using our Service, you agree to the collection and use of information in accordance 
                    with this Privacy Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">2. Information We Collect</h2>
                  
                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Personal Information</h3>
                  <p>We collect information you provide directly to us, including:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Name, email address, and contact information</li>
                    <li>Date of birth and Social Security Number (for identity verification)</li>
                    <li>Employment information and income details</li>
                    <li>Financial goals and investment preferences</li>
                    <li>Bank account and investment account information</li>
                    <li>Risk tolerance and investment experience</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Financial Data</h3>
                  <p>With your consent, we may collect:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Account balances and transaction history</li>
                    <li>Investment portfolio information</li>
                    <li>Credit score and credit report data</li>
                    <li>Insurance policies and beneficiary information</li>
                    <li>Tax documents and financial statements</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Automatically Collected Information</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, clicks)</li>
                    <li>Location data (if you enable location services)</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">3. How We Use Your Information</h2>
                  <p>We use your information to:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Provide personalized financial planning and investment advice</li>
                    <li>Analyze your financial situation and risk tolerance</li>
                    <li>Generate investment recommendations and portfolio allocations</li>
                    <li>Track progress toward your financial goals</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Send important account notifications and updates</li>
                    <li>Improve our Service and develop new features</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Prevent fraud and ensure platform security</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">4. Information Sharing and Disclosure</h2>
                  
                  <div className="bg-wealth-blue-light p-4 rounded-lg mb-4">
                    <p className="font-semibold text-wealth-blue">
                      We do not sell, trade, or rent your personal information to third parties.
                    </p>
                  </div>

                  <p>We may share your information only in the following circumstances:</p>
                  
                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Service Providers</h3>
                  <p>We work with trusted third-party service providers who assist us in:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Data processing and analytics</li>
                    <li>Payment processing and banking services</li>
                    <li>Identity verification and fraud prevention</li>
                    <li>Cloud hosting and data storage</li>
                    <li>Customer support and communication</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Legal Requirements</h3>
                  <p>We may disclose information when required by law or to:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Comply with legal processes or government requests</li>
                    <li>Enforce our Terms of Service</li>
                    <li>Protect our rights, property, or safety</li>
                    <li>Prevent fraud or security threats</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Business Transfers</h3>
                  <p>
                    In the event of a merger, acquisition, or sale of assets, your information 
                    may be transferred as part of that transaction, subject to the same privacy protections.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">5. Data Security</h2>
                  <p>We implement comprehensive security measures to protect your information:</p>
                  
                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Technical Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>256-bit SSL encryption for data transmission</li>
                    <li>AES-256 encryption for data storage</li>
                    <li>Multi-factor authentication for account access</li>
                    <li>Regular security audits and penetration testing</li>
                    <li>Intrusion detection and monitoring systems</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Administrative Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Limited access to personal data on a need-to-know basis</li>
                    <li>Background checks for employees handling sensitive data</li>
                    <li>Regular security training for all staff members</li>
                    <li>Incident response procedures for data breaches</li>
                  </ul>

                  <h3 className="text-xl font-semibold mb-3 text-wealth-purple">Physical Safeguards</h3>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Secure data centers with 24/7 monitoring</li>
                    <li>Restricted physical access to servers</li>
                    <li>Environmental controls and backup systems</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">6. Your Privacy Rights</h2>
                  <p>You have the following rights regarding your personal information:</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-wealth-green-light p-4 rounded-lg">
                      <h4 className="font-semibold text-wealth-green mb-2">Access Rights</h4>
                      <p className="text-sm">Request copies of your personal data</p>
                    </div>
                    <div className="bg-wealth-green-light p-4 rounded-lg">
                      <h4 className="font-semibold text-wealth-green mb-2">Correction Rights</h4>
                      <p className="text-sm">Update or correct inaccurate information</p>
                    </div>
                    <div className="bg-wealth-green-light p-4 rounded-lg">
                      <h4 className="font-semibold text-wealth-green mb-2">Deletion Rights</h4>
                      <p className="text-sm">Request deletion of your personal data</p>
                    </div>
                    <div className="bg-wealth-green-light p-4 rounded-lg">
                      <h4 className="font-semibold text-wealth-green mb-2">Portability Rights</h4>
                      <p className="text-sm">Receive your data in a portable format</p>
                    </div>
                  </div>

                  <p>
                    To exercise these rights, please contact us using the information provided below. 
                    We will respond to your request within 30 days.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">7. Cookies and Tracking Technologies</h2>
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Remember your login status and preferences</li>
                    <li>Analyze usage patterns and improve our Service</li>
                    <li>Provide personalized content and recommendations</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                  
                  <p>
                    You can control cookie settings through your browser preferences. However, 
                    disabling certain cookies may affect the functionality of our Service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">8. Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to provide our Service 
                    and comply with legal obligations. Specific retention periods include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Account information: Retained while your account is active</li>
                    <li>Financial data: Retained for 7 years after account closure (regulatory requirement)</li>
                    <li>Transaction records: Retained for 5 years after completion</li>
                    <li>Communication records: Retained for 3 years</li>
                    <li>Usage data: Retained for 2 years</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">9. International Data Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries other than your 
                    country of residence. We ensure appropriate safeguards are in place, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Standard contractual clauses approved by regulatory authorities</li>
                    <li>Adequacy decisions by the European Commission</li>
                    <li>Other legally approved transfer mechanisms</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">10. Children's Privacy</h2>
                  <p>
                    Our Service is not intended for individuals under 18 years of age. We do not 
                    knowingly collect personal information from children under 18. If we become 
                    aware that we have collected such information, we will take steps to delete it promptly.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">11. Third-Party Links</h2>
                  <p>
                    Our Service may contain links to third-party websites or services. We are not 
                    responsible for the privacy practices of these external sites. We encourage you 
                    to review their privacy policies before providing any personal information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">12. California Privacy Rights (CCPA)</h2>
                  <p>
                    California residents have additional rights under the California Consumer Privacy Act:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Right to know what personal information is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of the sale of personal information</li>
                    <li>Right to non-discrimination for exercising privacy rights</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">13. European Privacy Rights (GDPR)</h2>
                  <p>
                    If you are in the European Economic Area, you have additional rights under GDPR:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Right to restrict processing of your data</li>
                    <li>Right to object to processing</li>
                    <li>Right to lodge a complaint with supervisory authorities</li>
                    <li>Right to withdraw consent at any time</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">14. Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    material changes by:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Sending an email notification to your registered email address</li>
                    <li>Posting a notice on our Service</li>
                    <li>Updating the "Effective Date" at the top of this policy</li>
                  </ul>
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed 
                    about how we protect your information.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold mb-4 text-wealth-blue">15. Contact Information</h2>
                  <p>
                    If you have any questions about this Privacy Policy or wish to exercise your 
                    privacy rights, please contact us:
                  </p>
                  <div className="bg-wealth-blue-light p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li><strong>Privacy Officer:</strong> privacy@wealthapp.com</li>
                      <li><strong>General Contact:</strong> support@wealthapp.com</li>
                      <li><strong>Phone:</strong> 1-800-PRIVACY (1-800-774-8229)</li>
                      <li><strong>Address:</strong> 123 Financial District, Suite 456, New York, NY 10004</li>
                      <li><strong>Data Protection Officer (EU):</strong> dpo@wealthapp.com</li>
                    </ul>
                  </div>
                </section>

                <div className="bg-wealth-gray-light p-6 rounded-lg mt-8">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Document Information:</p>
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>Version: 2.1</p>
                    <p>Next review date: {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    <p>Compliance: GDPR, CCPA, PIPEDA, SOX</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
