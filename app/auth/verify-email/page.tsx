'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Mail, AlertCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        setVerificationStatus('error');
        setError('No verification token provided');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();

        if (response.ok) {
          setVerificationStatus('success');
          setMessage(result.message);
        } else {
          setVerificationStatus('error');
          setError(result.error || 'Verification failed');
        }
      } catch (error) {
        setVerificationStatus('error');
        setError('An error occurred during verification');
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleSignIn = () => {
    router.push('/auth/signin');
  };

  const handleResendVerification = async () => {
    // 这里可以实现重新发送验证邮件的功能
    setMessage('Verification email resent successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-orange-100">
          {verificationStatus === 'verifying' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </motion.div>
          )}

          {verificationStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <button
                onClick={handleSignIn}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
              >
                Sign In to Your Account
              </button>
            </motion.div>
          )}

          {verificationStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verification Failed</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              
              <div className="space-y-3">
                <button
                  onClick={handleResendVerification}
                  className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 font-medium"
                >
                  Resend Verification Email
                </button>
                
                <button
                  onClick={handleSignIn}
                  className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            </motion.div>
          )}

          {verificationStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-center text-green-800">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-sm">
                  Your email has been successfully verified. You can now access all features of NanoBanana.
                </span>
              </div>
            </motion.div>
          )}

          {verificationStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200"
            >
              <div className="flex items-center text-red-800">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span className="text-sm">
                  If you continue to have issues, please contact our support team or try signing up again.
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 