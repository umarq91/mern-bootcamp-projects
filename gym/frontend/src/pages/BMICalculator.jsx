import React, { useState } from 'react';

const exercises = [
  { name: 'Running', category: 'Weight Loss', intensity: 'High' },
  { name: 'Cycling', category: 'Weight Loss', intensity: 'Moderate' },
  { name: 'Jump Rope', category: 'Weight Loss', intensity: 'High' },
  { name: 'Yoga', category: 'Maintenance', intensity: 'Low' },
  { name: 'Swimming', category: 'Maintenance', intensity: 'Moderate' },
  { name: 'Weight Lifting', category: 'Muscle Gain', intensity: 'High' },
  { name: 'Bodyweight Exercises', category: 'Muscle Gain', intensity: 'Moderate' },
  { name: 'Walking', category: 'All', intensity: 'Low' },
];

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [plan, setPlan] = useState('');
  const [exerciseType, setExerciseType] = useState(''); // New state for exercise type
  const [exerciseIntensity, setExerciseIntensity] = useState(''); // New state for exercise intensity
  const [recommendedExercises, setRecommendedExercises] = useState([]); // Store recommendations

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height to meters
      const bmiValue = weight / (heightInMeters ** 2); // BMI formula
      setBmi(bmiValue.toFixed(2));
      categorizeBMI(bmiValue);
    }
  };

  const categorizeBMI = (bmiValue) => {
    let planMessage = '';
    if (bmiValue < 18.5) {
      setCategory('Underweight');
      planMessage = `
        Increase calorie intake with nutritious foods such as:
        - Nuts (almonds, walnuts)
        - Avocados
        - Whole grains (brown rice, oats)
        - Nut butters (peanut, almond)
        - Dried fruits (dates, figs)
        - Smoothies with protein powder
      `;
    } else if (bmiValue < 24.9) {
      setCategory('Normal weight');
      planMessage = `
        Maintain your weight with a balanced diet and regular exercise:
        - Continue eating a variety of fruits and vegetables
        - Whole grains (quinoa, whole wheat bread)
        - Lean proteins (chicken, fish, legumes)
        - Healthy fats (olive oil, avocado)
        - Stay hydrated with water
      `;
    } else if (bmiValue < 29.9) {
      setCategory('Overweight');
      planMessage = `
        Incorporate more fruits and vegetables into your diet and engage in cardio exercises:
        - Eat more:
          - Leafy greens (spinach, kale)
          - Berries (strawberries, blueberries)
          - Lean proteins (fish, turkey)
        - Cardio workouts like:
          - Running
          - Cycling
          - Swimming
      `;
    } else {
      setCategory('Obesity');
      planMessage = `
        Consider a structured weight loss program focusing on a balanced diet and increased physical activity:
        - Reduce processed foods and sugar
        - Include:
          - Vegetables (broccoli, carrots)
          - Fruits (apples, bananas)
          - Whole grains (oatmeal, brown rice)
        - Engage in strength training and high-intensity interval training (HIIT).
      `;
    }

    // Customize the plan based on the goal
    if (goal === 'increase') {
      setPlan(`Goal: Increase Weight\n\n${planMessage}`);
    } else if (goal === 'decrease') {
      setPlan(`Goal: Decrease Weight\n\n${planMessage}`);
    } else {
      setPlan(`Goal: Maintain Weight\n\n${planMessage}`);
    }

    // Call the function to get exercise recommendations
    getExerciseRecommendations();
  };

  const getExerciseRecommendations = () => {
    const filteredExercises = exercises.filter(exercise => {
      if (goal === 'decrease' && exercise.category === 'Weight Loss') return true;
      if (goal === 'increase' && exercise.category === 'Muscle Gain') return true;
      if (goal === 'maintain') return true;
      return false;
    });
    setRecommendedExercises(filteredExercises);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">BMI Calculator</h2>
        <form onSubmit={calculateBMI} className="flex flex-col">
          <label className="mb-2 text-gray-700">
            Weight (kg):
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>
          <label className="mb-4 text-gray-700">
            Height (cm):
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </label>
          <fieldset className="mb-4">
            <legend className="text-gray-700 mb-2">Goal:</legend>
            <label className="block">
              <input
                type="radio"
                value="increase"
                checked={goal === 'increase'}
                onChange={(e) => setGoal(e.target.value)}
                className="mr-2"
              />
              Increase Weight
            </label>
            <label className="block">
              <input
                type="radio"
                value="decrease"
                checked={goal === 'decrease'}
                onChange={(e) => setGoal(e.target.value)}
                className="mr-2"
              />
              Decrease Weight
            </label>
            <label className="block">
              <input
                type="radio"
                value="maintain"
                checked={goal === 'maintain'}
                onChange={(e) => setGoal(e.target.value)}
                className="mr-2"
              />
              Maintain Weight
            </label>
          </fieldset>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Calculate BMI
          </button>
        </form>

        {bmi && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-indigo-700">Your BMI: {bmi}</h3>
            <p className="text-gray-800 font-medium">Category: {category}</p>
            <p className="mt-2 text-gray-600">Plan:</p>
            <pre className="bg-gray-100 p-4 rounded-md text-gray-700 whitespace-pre-wrap">{plan}</pre>
            <h4 className="mt-4 text-lg font-semibold">Recommended Exercises:</h4>
            <ul className="list-disc list-inside">
              {recommendedExercises.length > 0 ? (
                recommendedExercises.map((exercise, index) => (
                  <li key={index} className="text-gray-700">{exercise.name} - {exercise.intensity} Intensity</li>
                ))
              ) : (
                <li className="text-gray-700">No recommendations available.</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
