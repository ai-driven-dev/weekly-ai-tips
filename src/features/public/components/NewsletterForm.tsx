'use client';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useToast } from '@/src/components/ui/use-toast';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import { createNewsletterAction } from '../actions/NewsletterAction';

export default function NewsletterForm() {
  const { toast } = useToast();
  const { push } = useRouter();
  const [state, formAction] = useFormState(createNewsletterAction, false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const handleRecaptchaChange = (gResponse: string | null) => {
    if (gResponse) {
      setRecaptchaToken(gResponse);
    }
  };

  if (!process.env.NEXT_PUBLIC_RECAPTCHA_KEY) {
    throw new Error('ReCAPTCHA key is not defined');
  }

  const initialState = useRef(state);

  useEffect(() => {
    if (initialState.current !== state) {
      if (state) {
        toast({
          title: 'Success ✅',
          description: 'You have successfully subscribed to the newsletter.',
        });
        push('/tips');
      } else {
        toast({
          title: 'Failed ❌',
          description:
            'Subscription to the newsletter failed. Please try again.',
        });
      }

      return () => {
        initialState.current = state;
      };
    }
  }, [state, toast, push]);

  return (
    <>
      <form className="mt-8 mb-12 rounded-lg bg-card p-6" action={formAction}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            className="col-span-1"
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="col-span-1"
            required
          />
        </div>
        <input type="hidden" name="public_token" value={recaptchaToken} />
        <Button className="mt-4 w-full">Get My Weekly AI Tips</Button>

        <div className="mt-6 flex justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
            size="normal"
            theme="light"
            onChange={handleRecaptchaChange}
          />
        </div>
      </form>
    </>
  );
}
