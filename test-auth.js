// Test script for NanoBanana AI authentication system
// Run this script to test the basic functionality

const testAuthSystem = async () => {
  console.log('🧪 Testing NanoBanana AI Authentication System...\n');

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

    // Test 2: Test signup API
    console.log('\n2️⃣ Testing signup API...');
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@nanobanana.ai',
        password: 'testpassword123',
        nickname: 'Test User'
      }),
    });

    if (signupResponse.ok) {
      const signupData = await signupResponse.json();
      console.log('✅ Signup successful:', signupData.message);
      console.log('   User ID:', signupData.user.id);
      console.log('   User UUID:', signupData.user.uuid);
    } else {
      const errorData = await signupResponse.json();
      console.log('❌ Signup failed:', errorData.error);
    }

    // Test 3: Test duplicate signup (should fail)
    console.log('\n3️⃣ Testing duplicate signup (should fail)...');
    const duplicateSignupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@nanobanana.ai',
        password: 'testpassword123',
        nickname: 'Test User'
      }),
    });

    if (!duplicateSignupResponse.ok) {
      const errorData = await duplicateSignupResponse.json();
      console.log('✅ Duplicate signup correctly rejected:', errorData.error);
    } else {
      console.log('❌ Duplicate signup should have failed');
    }

    // Test 4: Test NextAuth endpoint
    console.log('\n4️⃣ Testing NextAuth endpoint...');
    const authResponse = await fetch('http://localhost:3000/api/auth/session');
    if (authResponse.ok) {
      console.log('✅ NextAuth endpoint is accessible');
    } else {
      console.log('❌ NextAuth endpoint is not accessible');
    }

    console.log('\n🎉 Authentication system test completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Click "Create Account" to test the signup form');
    console.log('3. Try logging in with the test account');
    console.log('4. Check if the navigation bar shows user information');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the development server is running (npm run dev)');
    console.log('2. Check if the database is properly configured');
    console.log('3. Verify environment variables are set correctly');
  }
};

// Run the test
testAuthSystem(); 