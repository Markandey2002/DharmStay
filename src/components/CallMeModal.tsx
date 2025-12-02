import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CallMeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CallMeModal({ open, onOpenChange }: CallMeModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast({
        title: "Please fill all fields",
        description: "Name and phone number are required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Submitted! 🙏",
      description: "We'll call you back within 24 hours",
    });

    setName("");
    setPhone("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            Request a Callback
          </DialogTitle>
          <DialogDescription className="text-base">
            Share your details and we'll reach out to assist with your booking
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-11"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-11 text-base font-semibold shadow-medium hover:shadow-strong transition-all"
          >
            Request Callback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}