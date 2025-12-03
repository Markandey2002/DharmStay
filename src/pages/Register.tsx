import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

const generateNameFromEmail = (email: string) => {
  if (!email.includes("@")) return "Guest Dharma";
  const prefix = email.split("@")[0];
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
};

const passwordCriteria = [
  {
    label: "At least 8 characters",
    validate: (pw: string) => pw.length >= 8,
  },
  {
    label: "At least 1 number",
    validate: (pw: string) => /\d/.test(pw),
  },
  {
    label: "At least 1 uppercase letter",
    validate: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least 1 symbol",
    validate: (pw: string) => /[^A-Za-z0-9]/.test(pw),
  },
];

const Register = () => {
  const [tab, setTab] = useState("password");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handlePasswordRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const allValid = passwordCriteria.every(c => c.validate(password));
    if (!allValid) {
      toast.error("Your password must meet all criteria.");
      return;
    }
    const fakeName = generateNameFromEmail(email);
    toast.success(`Welcome, ${fakeName}! Registration complete (placeholder)`);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleOtpRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      toast.success("OTP sent (placeholder)");
      return;
    }
    if (!otp) {
      toast.error("Please enter the OTP sent to your email or phone.");
      return;
    }
    const fakeName = generateNameFromEmail(email);
    toast.success(`Welcome, ${fakeName}! OTP Registration complete (placeholder)`);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-8">
      <Card className="max-w-md w-full border-border/50 shadow-strong">
        <CardHeader>
          <CardTitle className="font-display text-xl md:text-2xl text-center">Create Your DharmStay Account</CardTitle>
          <CardDescription className="text-center text-sm">
            Join thousands of spiritual travelers and enjoy divine comfort.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="password">Use Password</TabsTrigger>
              <TabsTrigger value="otp">Use OTP</TabsTrigger>
            </TabsList>
            <TabsContent value="password">
              <form className="space-y-5 mt-2" onSubmit={handlePasswordRegister}>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone Number</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={e => { setPassword(e.target.value); setTouched(true); }}
                    required
                  />
                  {touched && (
                    <ul className="mt-2 pl-4 list-disc text-xs text-muted-foreground space-y-1">
                      {passwordCriteria.map((c, i) => (
                        <li key={i} className={c.validate(password) ? 'text-green-600' : 'text-muted-foreground'}>
                          {c.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <Button type="submit" className="w-full gradient-primary transition-smooth mt-2" size="lg">
                  Register
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="otp">
              <form className="space-y-5 mt-2" onSubmit={handleOtpRegister}>
                <div className="space-y-2">
                  <Label htmlFor="register-email-otp">Email</Label>
                  <Input
                    id="register-email-otp"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-phone-otp">Phone Number</Label>
                  <Input
                    id="register-phone-otp"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                </div>
                {!otpSent && (
                  <Button type="button" className="w-full gradient-primary transition-smooth mt-2" onClick={() => setOtpSent(true)}>
                    Send OTP
                  </Button>
                )}
                {otpSent && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="register-otp">Enter OTP</Label>
                      <Input
                        id="register-otp"
                        type="text"
                        placeholder="Enter received OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full gradient-primary transition-smooth mt-2">
                      Register with OTP
                    </Button>
                  </>
                )}
              </form>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-6 gap-2 text-sm">
            <span>Already a member?</span>
            <Link to="/login" className="text-primary font-medium hover:underline transition">Login</Link>
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

export default Register;
