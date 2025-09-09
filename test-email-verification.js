// Test script for NanoBanana AI email verification system
// Run this script to test the email verification functionality

const testEmailVerification = async () => {
  console.log('🧪 Testing NanoBanana AI Email Verification System...\n');

  try {
    // Test 1: Check if development server is running
    console.log('1️⃣ Testing development server...');
    const response = await fetch('http://localhost:3000');
    if (response.ok) {
      console.log('✅ Development server is running');
    } else {
      console.log('❌ Development server is not responding properly');
      return;
    }

    // Test 2: Test signup with email verification
    console.log('\n2️⃣ Testing signup with email verification...');
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-verification@nanobanana.ai',
        password: 'testpassword123',
        nickname: 'Test Verification User'
      }),
    });

    if (signupResponse.ok) {
      const signupData = await signupResponse.json();
      console.log('✅ Signup successful:', signupData.message);
      console.log('   User ID:', signupData.user.id);
      console.log('   User UUID:', signupData.user.uuid);
      console.log('   Email Verified:', signupData.user.email_verified);
      console.log('   Email Sent:', signupData.emailSent);
      
      // Check console for verification email details
      console.log('\n📧 Check the console above for verification email details');
      console.log('   Copy the verification URL and test it in your browser');
    } else {
      const errorData = await signupResponse.json();
      console.log('❌ Signup failed:', errorData.error);
      return;
    }

    // Test 3: Test duplicate signup (should fail)
    console.log('\n3️⃣ Testing duplicate signup (should fail)...');
    const duplicateSignupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-verification@nanobanana.ai',
        password: 'testpassword123',
        nickname: 'Test Verification User'
      }),
    });

    if (!duplicateSignupResponse.ok) {
      const errorData = await duplicateSignupResponse.json();
      console.log('✅ Duplicate signup correctly rejected:', errorData.error);
    } else {
      console.log('❌ Duplicate signup should have failed');
    }

    // Test 4: Test resend verification API
    console.log('\n4️⃣ Testing resend verification API...');
    const resendResponse = await fetch('http://localhost:3000/api/auth/resend-verification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test-verification@nanobanana.ai'
      }),
    });

    if (resendResponse.ok) {
      const resendData = await resendResponse.json();
      console.log('✅ Resend verification successful:', resendData.message);
    } else {
      const errorData = await resendResponse.json();
      console.log('❌ Resend verification failed:', errorData.error);
    }

    console.log('\n🎉 Email verification system test completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Copy the verification URL from the console above');
    console.log('2. Open the URL in your browser');
    console.log('3. Verify the email verification page works');
    console.log('4. Test the verification process');
    console.log('5. Try logging in with the verified account');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
  }
};

// Run the test
testEmailVerification(); 