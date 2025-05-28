import React, { useState } from 'react';

const AddQuiz = () => {
  const [formData, setFormData] = useState({
    question: '',
    questionType: 'TrueFalse',
    answer: '',
    charLimit: 200,
    feedbackMode: 'Default',
    maxQuestions: 1,
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3999/quiz/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Quiz uploaded successfully!');
      } else {
        alert('❌ Error: ' + data.error + ' - ' + data.details);
      }
    } catch (err) {
      alert('❌ Error uploading quiz');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Add a New Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Question */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Question</label>
            <input 
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Write your question..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Question Type</label>
            <select
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
            >
              <option value="TrueFalse">True / False</option>
              <option value="MultipleChoice">Multiple Choice</option>
              <option value="ShortAnswer">Short Answer</option>
            </select>
          </div>

          {/* Answer */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Answer</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              placeholder="Write correct answer..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Character Limit */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Character Limit (Short Answer)</label>
            <input
              type="number"
              name="charLimit"
              value={formData.charLimit}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Feedback Mode */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Feedback Mode</label>
            <div className="space-y-3">
              {[
                { label: 'Default', description: 'Answer shown after quiz ends.' },
                { label: 'Reveal', description: 'Show result after each attempt.' },
                { label: 'Retry Mode', description: 'Allow multiple attempts.' }
              ].map(mode => (
                <label key={mode.label} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="feedbackMode"
                    value={mode.label}
                    checked={formData.feedbackMode === mode.label}
                    onChange={handleChange}
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium">{mode.label}</span>
                    <p className="text-sm text-gray-500">{mode.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Max Questions */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">Max Questions Allowed</label>
            <input
              type="number"
              name="maxQuestions"
              value={formData.maxQuestions}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-5 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Upload Quiz
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddQuiz;
