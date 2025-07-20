import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app would connect to authentication service
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-wealth-gray-bg flex items-center justify-center p-6">
      <Card className="w-full max-w-md bg-white border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-wealth-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
                        <h1 className="text-2xl font-bold text-wealth-blue mb-2">Wealith</h1>
            <p className="text-wealth-gray">Welcome back to your financial journey!</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-wealth-gray-light focus:border-wealth-blue focus:ring-wealth-blue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border-wealth-gray-light focus:border-wealth-blue focus:ring-wealth-blue"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-wealth-blue hover:bg-wealth-blue/90 text-white py-3"
            >
              Sign In
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-wealth-gray">
              Don't have an account?{" "}
              <Link to="/signup" className="text-wealth-blue hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
