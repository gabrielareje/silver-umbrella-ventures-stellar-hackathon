import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet } from "lucide-react";
import { Plan } from "@/contexts/PlanContext";
import { Spinner } from "@/components/ui/spinner";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onPayment: (paymentMethod: 'card' | 'crypto' | 'stellar') => Promise<void>;
  isLoading: boolean;
};

const PaymentModal = ({ isOpen, onClose, plan, onPayment, isLoading }: PaymentModalProps) => {
  const [tab, setTab] = useState<'card' | 'crypto' | 'stellar'>('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });
  const [walletAddress, setWalletAddress] = useState('');

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    await onPayment('card');
  };

  const handleCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    await onPayment('crypto');
  };

  const handleStellarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    await onPayment('stellar');
  };

  if (!plan) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
          <DialogDescription>
            You are purchasing the {plan.name} plan for ₦{plan.price.toLocaleString()}.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="card" value={tab} onValueChange={(value) => setTab(value as 'card' | 'crypto' | 'stellar')}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="card" disabled={isLoading}>
              <div className="flex items-center space-x-2">
                <CreditCard size={16} />
                <span>Card</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="crypto" disabled={is
