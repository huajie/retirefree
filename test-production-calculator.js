/**
 * Test script to verify the calculator API works in production
 */

async function testProductionCalculator() {
  const testData = {
    currentAge: 67,
    savingsAmount: 600000,
    monthlyExpenses: 4000,
    riskTolerance: 'medium'
  };

  console.log('Testing production calculator with:', testData);
  console.log('Making request to: https://retirefree.app/api/calculate');

  try {
    const response = await fetch('https://retirefree.app/api/calculate', {
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
      console.log('Withdrawal Amount: $' + data.data.withdrawalAmount.toLocaleString());
      console.log('Confidence:', data.data.confidence + '%');
      console.log('Provider:', data.data.provider);
      console.log('\nAdvice:', data.data.advice);
      console.log('\nReasoning:', data.data.reasoning);
    } else {
      console.log('\n❌ FAILED:', data.error);
    }
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

testProductionCalculator();
