import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-wealth-gray-bg">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Terms of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this financial planning application, you accept and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                <p>
                  Our application provides financial planning tools and investment guidance. The information provided is for educational and planning purposes only and should not be considered as professional financial advice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the service in accordance with applicable laws</li>
                  <li>Not attempt to gain unauthorized access to the system</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Privacy and Data Protection</h2>
                <p>
                  We are committed to protecting your personal and financial information. Your data will be handled in accordance with our Privacy Policy and applicable data protection regulations.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Investment Disclaimers</h2>
                <p>
                  All investment recommendations and projections are based on historical data and market analysis. Past performance does not guarantee future results. You should consult with a qualified financial advisor before making investment decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p>
                  The service is provided "as is" without warranties of any kind. We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
                <p>
                  We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us through our support channels.
                </p>
              </section>

              <div className="text-sm text-muted-foreground mt-8 pt-6 border-t">
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
