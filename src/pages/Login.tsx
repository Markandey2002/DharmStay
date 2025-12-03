import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [tab, setTab] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Logged in with password (placeholder)");
    navigate("/user/dashboard");
  };

  const handleRequestOtp = () => {
    setOtpSent(true);
    toast.success("OTP sent (placeholder)");
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Logged in with OTP (placeholder)");
    navigate("/user/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8">
      <Card className="max-w-md w-full border-border/50 shadow-strong">
        <CardHeader>
          <CardTitle className="font-display text-xl md:text-2xl text-center">Login to DharmStay</CardTitle>
          <CardDescription className="text-center text-sm">
            Secure spiritual journeys begin here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="otp" className="text-sm">OTP</TabsTrigger>
              <TabsTrigger value="password" className="text-sm">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="otp">
              <form className="space-y-4" onSubmit={handleOtpLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email-otp">Email or Phone</Label>
                  <Input
                    id="email-otp"
                    type="text"
                    placeholder="your@email.com or +91 XXXXXX"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                {!otpSent ? (
                  <Button type="button" className="w-full gradient-primary" onClick={handleRequestOtp}>
                    Send OTP
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter received OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-primary mt-2">
                      Login with OTP
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
            <TabsContent value="password">
              <form className="space-y-4" onSubmit={handlePasswordLogin}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    required
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full mt-2 gradient-primary transition-smooth" size="lg">
                  Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-6 gap-2 text-sm">
            <span>New to DharmStay?</span>
            <Link to="/register" className="text-primary font-medium hover:underline transition">Create Account</Link>
          </div>
          <div className="flex justify-center mt-3 gap-2 text-sm">
            <span>Are you a Property Owner?</span>
            <Link to="/auth/owner" className="text-accent font-medium hover:underline transition">Register Property</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
