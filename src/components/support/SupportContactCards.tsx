'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone } from 'lucide-react';
 

export default function SupportContactCards() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6" />
            <div>
              <p className="font-semibold">Email Support</p>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => copyToClipboard('support@gifting.com')}>
                support@gifting.com
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Phone className="w-6 h-6" />
            <div>
              <p className="font-semibold">Phone Support</p>
              <a href="tel:+1234567890" className="text-blue-500">
                +1 (234) 567-890
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Office Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Monday - Friday</p>
          <p>9:00 AM - 5:00 PM EST</p>
        </CardContent>
      </Card>
    </div>
  );
}
