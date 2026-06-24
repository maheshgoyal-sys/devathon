// Content generation functions for grammar topics

function generatePartsOfSpeechContent() {
  return `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h3 class="text-xl font-bold text-blue-900 mb-3">What are Parts of Speech?</h3>
        <p class="text-gray-700 leading-relaxed">Parts of speech are categories that describe the function of words in a sentence. Understanding them is fundamental to mastering English grammar.</p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <h4 class="font-bold text-blue-800 mb-2">1. Noun</h4>
          <p class="text-sm text-gray-700 mb-2">Names a person, place, thing, or idea</p>
          <p class="text-xs text-blue-600"><strong>Examples:</strong> teacher, Mumbai, book, happiness</p>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
          <h4 class="font-bold text-yellow-800 mb-2">2. Pronoun</h4>
          <p class="text-sm text-gray-700 mb-2">Replaces a noun</p>
          <p class="text-xs text-yellow-600"><strong>Examples:</strong> he, she, it, they, we, you</p>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <h4 class="font-bold text-green-800 mb-2">3. Verb</h4>
          <p class="text-sm text-gray-700 mb-2">Shows action or state of being</p>
          <p class="text-xs text-green-600"><strong>Examples:</strong> run, write, is, seems, become</p>
        </div>
        
        <div class="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
          <h4 class="font-bold text-pink-800 mb-2">4. Adjective</h4>
          <p class="text-sm text-gray-700 mb-2">Describes or modifies a noun</p>
          <p class="text-xs text-pink-600"><strong>Examples:</strong> beautiful, quick, tall, five</p>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
          <h4 class="font-bold text-purple-800 mb-2">5. Adverb</h4>
          <p class="text-sm text-gray-700 mb-2">Modifies verbs, adjectives, or other adverbs</p>
          <p class="text-xs text-purple-600"><strong>Examples:</strong> quickly, very, well, often</p>
        </div>
        
        <div class="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
          <h4 class="font-bold text-orange-800 mb-2">6. Preposition</h4>
          <p class="text-sm text-gray-700 mb-2">Shows relationship between words</p>
          <p class="text-xs text-orange-600"><strong>Examples:</strong> in, on, at, with, under, between</p>
        </div>
        
        <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
          <h4 class="font-bold text-teal-800 mb-2">7. Conjunction</h4>
          <p class="text-sm text-gray-700 mb-2">Connects words or clauses</p>
          <p class="text-xs text-teal-600"><strong>Examples:</strong> and, but, or, because, although</p>
        </div>
        
        <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
          <h4 class="font-bold text-red-800 mb-2">8. Interjection</h4>
          <p class="text-sm text-gray-700 mb-2">Expresses strong emotion</p>
          <p class="text-xs text-red-600"><strong>Examples:</strong> Oh!, Wow!, Ouch!, Hurray!</p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-500">
        <h3 class="text-lg font-bold text-green-900 mb-3">💡 Key Tips</h3>
        <ul class="space-y-2 text-sm text-gray-700">
          <li>✓ A word can be different parts of speech depending on context</li>
          <li>✓ Example: "light" can be a noun (the light), verb (light the candle), or adjective (light color)</li>
          <li>✓ Practice identifying parts of speech in everyday sentences</li>
          <li>✓ Understanding parts of speech helps in constructing grammatically correct sentences</li>
        </ul>
      </div>
    </div>
  `;
}

function generateTensesContent() {
  return `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-l-4 border-purple-500">
        <h3 class="text-xl font-bold text-purple-900 mb-3">Understanding Tenses</h3>
        <p class="text-gray-700 leading-relaxed">Tenses show when an action happens - in the past, present, or future. Mastering tenses is crucial for clear communication.</p>
      </div>

      <div class="space-y-4">
        <div class="bg-green-50 p-5 rounded-xl border-l-4 border-green-500">
          <h4 class="font-bold text-green-900 mb-3 text-lg">Present Tenses</h4>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-green-800">Simple Present</p>
              <p class="text-sm text-gray-600">I work / She works</p>
              <p class="text-xs text-gray-500 mt-1">Use: Habits, facts, general truths</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-green-800">Present Continuous</p>
              <p class="text-sm text-gray-600">I am working / She is working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Actions happening now</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-green-800">Present Perfect</p>
              <p class="text-sm text-gray-600">I have worked / She has worked</p>
              <p class="text-xs text-gray-500 mt-1">Use: Completed actions with present relevance</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-green-800">Present Perfect Continuous</p>
              <p class="text-sm text-gray-600">I have been working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Actions started in past, continuing now</p>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
          <h4 class="font-bold text-blue-900 mb-3 text-lg">Past Tenses</h4>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-blue-800">Simple Past</p>
              <p class="text-sm text-gray-600">I worked / She worked</p>
              <p class="text-xs text-gray-500 mt-1">Use: Completed actions in the past</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-blue-800">Past Continuous</p>
              <p class="text-sm text-gray-600">I was working / She was working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Actions in progress in the past</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-blue-800">Past Perfect</p>
              <p class="text-sm text-gray-600">I had worked / She had worked</p>
              <p class="text-xs text-gray-500 mt-1">Use: Action completed before another past action</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-blue-800">Past Perfect Continuous</p>
              <p class="text-sm text-gray-600">I had been working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Ongoing action before another past action</p>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 p-5 rounded-xl border-l-4 border-orange-500">
          <h4 class="font-bold text-orange-900 mb-3 text-lg">Future Tenses</h4>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-orange-800">Simple Future</p>
              <p class="text-sm text-gray-600">I will work / She will work</p>
              <p class="text-xs text-gray-500 mt-1">Use: Actions that will happen</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-orange-800">Future Continuous</p>
              <p class="text-sm text-gray-600">I will be working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Actions in progress in the future</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-orange-800">Future Perfect</p>
              <p class="text-sm text-gray-600">I will have worked</p>
              <p class="text-xs text-gray-500 mt-1">Use: Action completed before future time</p>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <p class="font-semibold text-orange-800">Future Perfect Continuous</p>
              <p class="text-sm text-gray-600">I will have been working</p>
              <p class="text-xs text-gray-500 mt-1">Use: Ongoing action before future time</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
        <h3 class="text-lg font-bold text-yellow-900 mb-3">💼 Real-Life Job Examples</h3>
        <ul class="space-y-2 text-sm text-gray-700">
          <li><strong>Email:</strong> "I am working on the report" (Present Continuous)</li>
          <li><strong>Meeting:</strong> "We have completed the project" (Present Perfect)</li>
          <li><strong>Interview:</strong> "I worked at XYZ company for 3 years" (Simple Past)</li>
          <li><strong>Planning:</strong> "I will finish this by Friday" (Simple Future)</li>
        </ul>
      </div>
    </div>
  `;
}

function generateDefaultContent(title) {
  return `
    <div class="space-y-6">
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h3 class="text-xl font-bold text-blue-900 mb-3">${title}</h3>
        <p class="text-gray-700 leading-relaxed">Comprehensive learning content for this topic.</p>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-200">
        <h4 class="font-bold text-gray-900 mb-4">📚 Key Concepts</h4>
        <ul class="space-y-3 text-sm text-gray-700">
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-1">✓</span>
            <span>Master the fundamental concepts and rules</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-1">✓</span>
            <span>Practice with real-world examples</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-1">✓</span>
            <span>Learn common mistakes and how to avoid them</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-500 mt-1">✓</span>
            <span>Apply knowledge in professional contexts</span>
          </li>
        </ul>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-500">
        <h3 class="text-lg font-bold text-green-900 mb-3">💡 Learning Tips</h3>
        <ul class="space-y-2 text-sm text-gray-700">
          <li>✓ Practice regularly for better retention</li>
          <li>✓ Use examples from your daily life</li>
          <li>✓ Review and revise frequently</li>
          <li>✓ Apply what you learn in real conversations</li>
        </ul>
      </div>

      <div class="bg-gray-50 p-6 rounded-xl">
        <h4 class="font-bold text-gray-900 mb-3">🎯 Practice Exercise</h4>
        <p class="text-sm text-gray-600 mb-4">Complete the exercises to reinforce your learning.</p>
        <button onclick="alert('Practice exercises coming soon!')" class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Start Practice
        </button>
      </div>
    </div>
  `;
}
