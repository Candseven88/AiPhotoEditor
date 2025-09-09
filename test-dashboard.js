// Test script for NanoBanana AI Dashboard
// Run this script to test the complete authentication flow

const testDashboardFlow = async () => {
  console.log('🧪 Testing NanoBanana AI Dashboard Flow...\n');

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

    // Test 2: Test dashboard page (should redirect to home if not authenticated)
    console.log('\n2️⃣ Testing dashboard access (unauthenticated)...');
    const dashboardResponse = await fetch('http://localhost:3000/dashboard');
    if (dashboardResponse.status === 401 || dashboardResponse.status === 302) {
      console.log('✅ Dashboard correctly protected (redirects unauthenticated users)');
    } else {
      console.log('❌ Dashboard should be protected');
    }

    // Test 3: Test signup flow
    console.log('\n3️⃣ Testing signup flow...');
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'dashboard-test@nanobanana.ai',
        password: 'testpassword123',
        nickname: 'Dashboard Test User'
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

    // Test 4: Test login flow
    console.log('\n4️⃣ Testing login flow...');
    const loginResponse = await fetch('http://localhost:3000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'dashboard-test@nanobanana.ai',
        password: 'testpassword123',
      }),
    });

    if (loginResponse.ok) {
      console.log('✅ Login successful');
    } else {
      const errorData = await loginResponse.json();
      console.log('❌ Login failed:', errorData.error);
    }

    console.log('\n🎉 Dashboard flow test completed!');
    console.log('\n📋 Manual Testing Steps:');
    console.log('1. Open http://localhost:3000 in your browser');
    console.log('2. Click "Create Account" and register a new user');
    console.log('3. After registration, you should be redirected to login');
    console.log('4. Login with your credentials');
    console.log('5. You should be redirected to /dashboard');
    console.log('6. Check if the dashboard displays user information correctly');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure the development server is running (npm run dev)');
    console.log('2. Check if the database is properly configured');
    console.log('3. Verify environment variables are set correctly');
    console.log('4. Check browser console for any JavaScript errors');
  }
};

// Run the test
testDashboardFlow(); 