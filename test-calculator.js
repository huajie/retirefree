/**
 * Test script to verify the calculator API works locally
 */

async function testCalculator() {
  const testData = {
    currentAge: 67,
    savingsAmount: 600000,
    monthlyExpenses: 4000,
    riskTolerance: 'medium'
  };

  console.log('Testing calculator with:', testData);
  console.log('Making request to: http://localhost:3000/api/calculate');

  try {
    const response = await fetch('http://localhost:3000/api/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();

    console.log('\nResponse Status:', response.status);
    console.log('Response Data:', JSON.stringify(data, null, 2));

    if (data.success && data.data) {
      console.log('\n✅ SUCCESS!');
      console.log('Withdrawal Amount:', data.data.withdrawalAmount);
      console.log('Confidence:', data.data.confidence + '%');
      console.log('Advice:', data.data.advice);
      console.log('Reasoning:', data.data.reasoning);
    } else {
      console.log('\n❌ FAILED:', data.error);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

testCalculator();
