'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function BeneficiaryCard({ beneficiary }: { beneficiary: any }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(event, info) => {
        if (info.offset.x < -100) {
          console.log('Delete beneficiary', beneficiary.id);
        }
      }}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={beneficiary.avatar} />
              <AvatarFallback>{beneficiary.name[0]}</AvatarFallback>
            </Avatar>
            <CardTitle>{beneficiary.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>{beneficiary.email}</p>
          <p>{beneficiary.phone}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
