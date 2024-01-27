import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client'; 
import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from '../../utils/mutations'; 

// Predefined quotes for each emotion
const quotesData = {
  Happy: [
    "The more you praise and celebrate your life, the more there is in life to celebrate. — Oprah Winfrey",
    "Happiness is not by chance, but by choice. — Jim Rohn",
    "The secret of being happy is accepting where you are in life and making the most out of every day.",
    "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
    "The purpose of our lives is to be happy. — Dalai Lama",
    "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life. - Albert Camus",
    "For every minute you are angry, you lose sixty seconds of happiness. - Ralph Waldo Emerson",
    "Count your age by friends, not years. Count your life by smiles, not tears. - John Lennon",
    "No medicine cures what happiness cannot. - Gabriel Garcia Marquez",
    "Learn to value yourself, which means: fight for your happiness. _ Ayn Rand",
    "Now and then, it's good to pause in our pursuit of happiness and just be happy. - Guillaume Apollinaire",
    "Success is what you want, happiness is what you get. - W.P. Kinsella",
    "They say a person needs just three things to be truly happy in this world: someone to love, something to do, and something to hope for. - Tom Bodett",
    "Happiness cannot be traveled to, owned, earned, worn or consumed. Happiness is the spiritual experience of living every minute with love, grace, and gratitude. - Denis Waitley",
    "The biggest adventure you can ever take is to live the life of your dreams. - Oprah Winfrey", 
    "Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you. - Mary Lou Retton",
    "Everything has its wonders, even darkness and silence, and I learn, whatever state I may be in, therein to be content. - Helen Keller",
    "Everyday is a new day. - Carrie Underwood",
    "Beauty is everywhere. You only have to look to see it. - Bob Ross"
  ],
  Sad: [
    "I allow myself to feel my feelings, but I also know they do not define me.",
    "With every breath, I release the anxiety and fear within me.",
    "I am stronger than my struggles and braver than my fears.",
    "I choose to focus on what I can control, and let go of what I cannot.",
    "Even in the midst of sadness, I have so many reasons to be grateful.",
    "I am deserving of happiness, love, peace, and joy.",
    "My feelings are valid, but they do not hold power over my day.",
    "I am gently moving towards happiness and healing every day.",
    "I am patient with myself and accept that sadness is a part of life.",
    "This feeling is temporary, and I am in the process of positive change.",
    "I am surrounded by people who love and support me.",
    "I find comfort in the knowledge that I am not alone in my feelings.",
    "Each day brings me closer to finding joy and peace within myself.",
    "I am worthy of happiness and I invite it into my life.",
    "I am capable of moving beyond my challenges and learning from them.",
    "Even in sorrow, I can find beauty and strength.",
    "I am resilient, and I can handle the challenges life throws at me.",
    "I give myself the gift of compassion and self-care today.",
    "I have the power to create change in my life and find happiness.",
    "My heart is open to love, healing, and the light that new days bring."
  ],
  Anxious: [
    "I am safe and in control, even when life feels uncertain.",
    "With each breath, I release my anxiety and embrace calm.",
    "I am strong enough to move through my fears and towards my goals.",
    "I choose to focus on the present moment and find peace in it.",
    "I trust in my ability to navigate through challenging situations.",
    "I am more than my anxious thoughts; I am capable and competent.",
    "My mind is slowing down, and I am finding clarity within myself.",
    "I let go of worries about the future and focus on what I can control.",
    "I am surrounded by love and support, which eases my anxiety.",
    "Each deep breath I take fills me with peace and tranquility.",
    "I am deserving of a calm, serene, and peaceful mind.",
    "Anxiety does not define me; I am defined by my courage and strength.",
    "I have the power to overcome my anxiety and live the life I desire.",
    "I embrace my feelings, but I also know they are not my reality.",
    "Every day, I grow stronger and more relaxed in all situations.",
    "I choose to release fear and embrace love and positivity.",
    "I am in charge of my breathing, and I can slow it down when I need to.",
    "I am finding it easier to relax and enjoy my life.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I am centered, I am balanced, and I am at ease within myself."
  ],
  Angry: [
    "I choose to respond to anger with understanding and compassion.",
    "I am in control of my emotions and I choose peace over anger.",
    "Anger is a feeling, it will pass, and I remain calm and centered.",
    "I release my anger and embrace forgiveness and understanding.",
    "I am more than this moment; I am calm, patient, and in control.",
    "Every breath I take dissipates my anger and brings me peace.",
    "I choose to seek peaceful and positive solutions to my frustrations.",
    "My feelings are valid, but I control my reaction to them.",
    "I am letting go of anger to make space for more peace and joy.",
    "With each moment, I am moving towards greater patience and understanding.",
    "I choose to heal rather than to hurt, to forgive rather than to fester.",
    "I am stronger than my anger, and my calmness is my power.",
    "I find strength in tranquility and clarity in calmness.",
    "I let go of anger and welcome peace and positivity into my life.",
    "My anger is a sign of my passion, but I channel it towards positive action.",
    "I have the power to overcome anger and feel peace and serenity.",
    "Anger is just a feeling, and like all feelings, it will pass.",
    "I am learning to transform my anger into understanding and empathy.",
    "Every calm breath I take reduces my anger and brings me peace.",
    "I am in control of my emotions and choose harmony and balance."
  ],
  Stressed: [
    "I have the strength to manage my stress and keep my peace.",
    "With every breath, I release the stress inside me and become more calm.",
    "I am capable of solving any problems that come my way.",
    "I choose to let go of stress and embrace peace and relaxation.",
    "I am in control of my schedule and my priorities, and I choose balance.",
    "I give myself permission to step back and take a break when needed.",
    "I am more than my stress; I am resilient and adaptable.",
    "I focus on one task at a time, knowing each step leads to progress.",
    "I am letting go of what I cannot control and focusing on what I can.",
    "I find peace and joy in the simple moments of life.",
    "I am deserving of a life free from overwhelming stress.",
    "I trust in my ability to navigate through challenging situations calmly.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I embrace activities that help me relax and recharge.",
    "I am learning to balance my responsibilities with my well-being.",
    "I am stronger than the stress that I am currently facing.",
    "I take things one step at a time and trust in the journey.",
    "I am surrounded by peace, and I carry this tranquility with me.",
    "I am in harmony with the rhythm of life and find ease in its flow.",
    "Every challenge I face is an opportunity to grow stronger and more serene."
  ],
  Lonely: [
    "I am at peace when I am alone and cherish this time with myself.",
    "Loneliness is a feeling, not a fact. I am connected to the world around me.",
    "In moments of solitude, I find strength and inner peace.",
    "I am never truly alone; I am surrounded by love and support, seen and unseen.",
    "I open my heart to new connections and cherish the ones I have.",
    "Solitude gives me the opportunity to discover and reinvent myself.",
    "I find comfort in my own company and use this time to rejuvenate.",
    "I am worthy of love and companionship, and I attract the right people into my life.",
    "I am connected to a universe that is full of love and support.",
    "I use moments of loneliness to grow stronger and more self-aware.",
    "I embrace the quiet moments to connect with my inner self deeply.",
    "Every day, I grow stronger in my ability to enjoy my own company.",
    "I am open to the love and presence of others around me.",
    "My alone time is a gift to myself, a space to recharge and reflect.",
    "I am whole and complete in myself, and I welcome the connections that come my way.",
    "I find peace in solitude and use it as a time for creativity and growth.",
    "I am building a life filled with love, starting with the love I have for myself.",
    "I use my feelings of loneliness as a catalyst to reach out and connect with others.",
    "I am a magnet for positive relationships and meaningful connections.",
    "Being alone does not mean being lonely; it's an opportunity to discover who I truly am."
  ],
  Overwhelmed: [
    "I take one step at a time, knowing that progress is not always linear.",
    "I am capable of managing my responsibilities one task at a time.",
    "I prioritize self-care and mental health as I navigate through my tasks.",
    "I release the need to do everything at once and focus on what's most important.",
    "I am more than capable of handling what life brings my way.",
    "I give myself permission to take breaks and recharge.",
    "I am resilient and can adapt to challenges with grace and determination.",
    "I trust that everything will work out in the right time and manner.",
    "I am focused, organized, and calm as I tackle my to-do list.",
    "I allow myself to let go of what I cannot control and focus on what I can.",
    "I trust my journey and know that I am heading in the right direction.",
    "I have the power to calm the storm within and find peace amidst chaos.",
    "Each deep breath I take brings me more clarity and focus.",
    "I choose to view challenges as opportunities to grow and evolve.",
    "I am supported by those around me and am not alone in my struggles.",
    "I embrace a mindset of peace and calm in all that I do.",
    "I am confident in my ability to overcome any obstacle in my path.",
    "I am grounded in the present moment, where peace resides.",
    "I release the burden of overwhelm and embrace a sense of ease.",
    "I am capable of navigating through life's complexities with grace and poise."
  ],
  Frustrated: [
    "I channel my frustration into positive, productive action.",
    "I am patient and understanding with myself during challenging moments.",
    "I find constructive solutions to my frustrations.",
    "I let go of what I cannot change and focus on what I can influence.",
    "I maintain my calm and composure even when things don't go as planned.",
    "I learn from my frustrations and use them as stepping stones to success.",
    "I recognize my triggers and take proactive steps to stay balanced.",
    "I am in control of my reactions and choose responses that serve me well.",
    "I use my energy to create positive changes instead of dwelling on frustration.",
    "I take a step back to gain perspective and return with renewed focus.",
    "I recognize my frustrations as signs pointing me towards needed changes.",
    "I embrace my feelings but choose to focus on solutions and progress.",
    "I am learning to transform frustration into motivation and action.",
    "I release the need for immediate results and trust in the process.",
    "My challenges are making me stronger, wiser, and more resilient.",
    "I find strength in calmness and clarity in moments of stillness.",
    "I choose to let go of frustrations and focus on the positives in my life.",
    "I am mastering the art of patience and understanding in the face of difficulties.",
    "Every challenge is a stepping stone towards my growth and success.",
    "I am equipped with all I need to overcome hurdles and reach my goals."  
  ],
  Disappointed: [
    "I accept that disappointment is part of life and I grow stronger from it.",
    "I let go of expectations and embrace the journey of the unknown.",
    "I find the lesson in every disappointment and use it to move forward.",
    "I trust that better things are on their way and remain hopeful.",
    "I focus on the things that bring me joy and fulfillment.",
    "I understand that setbacks are not the end, but opportunities to learn.",
    "I maintain a positive outlook even when things don't go as planned.",
    "I am resilient in the face of challenges and bounce back with vigor.",
    "I am patient with myself and know that good things take time.",
    "I keep moving forward, knowing that every experience is a part of my growth.",
    "I embrace change and stay open to new possibilities and opportunities.",
    "I am learning that sometimes the best is yet to come, in ways I might not expect.",
    "I choose to find joy and value in the present moment, regardless of circumstances.",
    "I am resilient in the face of setbacks and know that they lead to greater things.",
    "I recognize that disappointment is part of life's journey, not its end.",
    "I focus on gratitude for what I have, knowing it paves the path for more.",
    "Every experience, good or bad, is a valuable part of my story.",
    "I allow myself to feel my emotions, but also to move beyond them.",
    "I am in charge of my happiness and choose to find joy every day.",
    "Disappointments are just life's way of setting me up for something better."  
  ],
  Grateful: [
    "I am thankful for every moment and treasure the gifts life offers me.",
    "Gratitude fills my heart and shapes my perspective towards positivity.",
    "I appreciate the beauty in small moments and simple pleasures.",
    "Every day, I find something new to be grateful for.",
    "I am blessed with so much, and I am deeply thankful for it all.",
    "Gratitude turns what I have into enough, and more.",
    "I live in a state of thankfulness, recognizing the abundance around me.",
    "My heart is open to the endless blessings that surround me.",
    "With gratitude, I recognize and appreciate the love in my life.",
    "Gratitude is my natural state of being, and it guides my choices and actions.",
    "I express my gratitude for health, happiness, and the love I receive.",
    "Every experience is a gift, and for this, I am grateful.",
    "Gratefulness anchors me in the present and enriches my life.",
    "I am thankful for my journey and all it has taught me.",
    "Each day, I am grateful for another opportunity to make a difference.",
    "Gratitude opens the door to abundance and joy in my life.",
    "I am thankful for the people in my life who love and support me.",
    "Gratitude fills my mind with peace and my heart with warmth.",
    "I cherish the present and honor my past with gratitude.",
    "Thankfulness leads me to a positive and fulfilling life."
  ],
  Exhausted: [
    "I give myself permission to rest and recharge without guilt.",
    "My body and mind deserve rest, and I honor them by taking time to relax.",
    "Even in exhaustion, I am taking steps towards growth and renewal.",
    "Rest is a form of self-respect, and I treat myself with kindness.",
    "I listen to my body's need for rest and respond with loving care.",
    "Every breath I take fills me with peace and rejuvenates my spirit.",
    "I am worthy of rest, and I embrace moments of relaxation.",
    "I release all tension with each exhale and invite calm with each inhale.",
    "Rest and recovery are essential for my strength and well-being.",
    "I am patient with myself and understand that rest is part of progress.",
    "I find strength in my moments of rest, knowing they are necessary for balance.",
    "I am learning to balance activity with restfulness for overall harmony.",
    "In rest, I find the energy to pursue my dreams with renewed vigor.",
    "I trust the natural rhythms of my body to guide my need for rest.",
    "I honor my need for downtime, recognizing it as a path to rejuvenation.",
    "I am gentle with myself and recognize when to step back and rest.",
    "Rest is a gift I give myself, and I accept it with gratitude.",
    "I allow myself moments of stillness to restore my energy.",
    "Every restful moment is an investment in my future energy and productivity.",
    "In resting, I am preparing myself for future success and happiness."
  ],
  Insecure: [
    "I am enough just as I am, and I embrace my true self with confidence.",
    "Insecurity is a feeling, not a fact, and I am capable and worthy.",
    "I release self-doubt and welcome self-assurance.",
    "I am worthy of respect and acceptance from myself and others.",
    "I believe in my abilities and trust my instincts.",
    "I am proud of who I am and all that I have accomplished.",
    "Each day, I grow more confident and secure in my identity.",
    "I am surrounded by love and positivity that boosts my self-esteem.",
    "I am a unique individual with incredible value and potential.",
    "My insecurities do not define me; my strength and courage do.",
    "I am deserving of success, love, and happiness.",
    "I stand tall and proud, embracing my strengths and weaknesses alike.",
    "I replace fear of the unknown with curiosity and openness.",
    "I am a work in progress, and every step forward is a victory.",
    "I am secure in my worth and unapologetically myself.",
    "I am confident in my path and trust that I am heading in the right direction.",
    "I embrace my journey, learning from each experience with a strong heart.",
    "I am resilient, capable"
  ],
  Nervous: [
      "I am calm and centered, even in challenging situations.",
      "I trust in my ability to handle what comes my way.",
      "Every deep breath I take brings me peace and clarity.",
      "I am stronger than my nervousness, and I can overcome it.",
      "I choose to focus on the present and let go of anxiety about the future.",
      "My fears do not control me; I control them.",
      "I am prepared and capable of facing any challenge.",
      "I replace my nervous thoughts with positive, reassuring ones.",
      "I am relaxed, confident, and in control.",
      "I embrace my experiences with calmness and confidence.",
      "With each passing moment, my nerves are calming.",
      "I am worthy of a peaceful and serene state of mind.",
      "I am surrounded by an aura of calm and assurance.",
      "Nervousness is just a feeling; it will pass, and I will be okay.",
      "I am the master of my emotions, and I choose tranquility.",
      "I trust in the journey of life and let go of fear and worry.",
      "I am at peace and nothing can disturb my calm spirit.",
      "I face uncertainty with courage and a positive outlook.",
      "My inner strength is greater than any feeling of nervousness.",
      "I am grounded in the present, where peace resides."
    ],
  Hopeless: [
    "I hold hope in my heart, even in the darkest moments.",
    "There is always a light at the end of the tunnel, and I am moving towards it.",
    "I believe in new beginnings and fresh starts.",
    "Every challenge is a doorway to new possibilities.",
    "I am resilient, and my spirit cannot be broken.",
    "I find strength in my ability to survive and thrive.",
    "I trust that better days are ahead, and I move towards them with hope.",
    "I am deserving of a bright and fulfilling future.",
    "I embrace the lessons of my journey and look forward to what's next.",
    "My potential is limitless, and my future is bright.",
    "I am a beacon of hope and positivity.",
    "I release despair and welcome optimism and resilience.",
    "I have the power to create change and bring joy into my life.",
    "Even in despair, I find reasons to be hopeful and grateful.",
    "I am surrounded by support, love, and endless possibilities.",
    "I choose to see the beauty and potential in every day.",
    "I am capable of rising above my circumstances and finding joy.",
    "My heart is filled with courage, hope, and the will to continue.",
    "I am a survivor, and my spirit is unbreakable.",
    "Hope guides me through life's challenges towards a brighter tomorrow."
  ],
  Jealous: [
    "I focus on my own journey and celebrate my unique path.",
    "I am content with who I am and what I have.",
    "I let go of comparisons and embrace my individuality.",
    "My worth is not determined by others but by my own self-love.",
    "I replace envy with admiration and learn from the success of others.",
    "I am grateful for my life and all its blessings.",
    "I am focused on my own growth and achievements.",
    "I am happy for others and their accomplishments.",
    "Jealousy does not control me; I am in control of my emotions.",
    "I am secure in myself and need not compare myself to others.",
    "I am a work in progress, and I am proud of where I am.",
    "I celebrate the success of others, knowing my time will come.",
    "I am on my own path, and it is filled with potential and promise.",
    "I find joy in my own accomplishments and in those of others.",
    "I am confident in my abilities and my journey.",
    "I am too busy working on my own grass to notice if someone else's is greener.",
    "My self-worth is independent of others' achievements.",
    "I am complete in myself and do not need to compare my life to others.",
    "Every person has their own journey, and I respect and honor mine.",
    "I let go of jealousy and open my heart to genuine happiness for others."
  ],
  Lost: [
    "I trust the journey, even when I do not understand it.",
    "Every step I take is leading me to where I need to be.",
    "I am capable of navigating through life's challenges.",
    "I am open to new paths and experiences.",
    "My journey is unique and special.",
    "I am learning and growing every day.",
    "I am guided by inner wisdom and intuition.",
    "I believe in my ability to overcome obstacles.",
    "Every experience is part of my journey.",
    "I am worthy of finding my way.",
    "I am patient with myself as I explore new directions.",
    "I find strength in my ability to adapt.",
    "I trust that I am on the right path, even if it feels uncertain.",
    "My potential is limitless, even when I feel lost.",
    "I am surrounded by opportunities to find my way.",
    "I embrace the unknown as a chance to grow.",
    "I am resilient and can handle life's twists and turns.",
    "I am confident in my decisions, even in uncertainty.",
    "I am not alone in my journey.",
    "I find peace in knowing that everything will work out."
  ]
};


const GeneratedQuotes = ({ selectedFeeling, user }) => {
  const [quotes, setQuotes] = useState([]);
  const [savedAffirmations, setSavedAffirmations] = useState(user ? user.savedAffirmations : []);
  const [showSaved, setShowSaved] = useState(false);

  const [saveAffirmationMutation] = useMutation(SAVE_AFFIRMATION);
  const [unsaveAffirmationMutation] = useMutation(UNSAVE_AFFIRMATION);

  useEffect(() => {
    if (selectedFeeling) {
      fetchQuotes(selectedFeeling);
    }
  }, [selectedFeeling]);

  const fetchQuotes = (feeling) => {
    const availableQuotes = quotesData[feeling] || [];
    const shuffledQuotes = availableQuotes.sort(() => 0.5 - Math.random());
    const selectedQuotes = shuffledQuotes.slice(0, 3);
    setQuotes(selectedQuotes);
  };

  const handleSave = async (quoteId) => {
    try {
      await saveAffirmationMutation({ variables: { userId: user._id, affirmationId: quoteId } });
      setSavedAffirmations([...savedAffirmations, quoteId]);
    } catch (error) {
      console.error('Error saving affirmation:', error);
    }
  };

  const handleUnsave = async (quoteId) => {
    try {
      await unsaveAffirmationMutation({ variables: { userId: user._id, affirmationId: quoteId } });
      setSavedAffirmations(savedAffirmations.filter(id => id !== quoteId));
    } catch (error) {
      console.error('Error unsaving affirmation:', error);
    }
  };

  return (
    <div>
      {quotes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedFeeling}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quotes.map((quote, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-lg h-full">
                <p className="text-lg">{quote.content}</p>
                {user && (
                  <button
                    onClick={() => savedAffirmations.includes(quote._id) ? handleUnsave(quote._id) : handleSave(quote._id)}
                    className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
                  >
                    {savedAffirmations.includes(quote._id) ? 'Unsave' : 'Save'}
                  </button>
                )}
              </div>
            ))}
          </div>
          {user && (
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
            >
              {showSaved ? 'Hide Saved Affirmations' : 'Show Saved Affirmations'}
            </button>
          )}
          {showSaved && savedAffirmations.map((quote, index) => (
            <div key={index} className="bg-white p-4 shadow-md rounded-lg mt-4">
              <p className="text-lg">{quote.content}</p>
              <button
                onClick={() => handleUnsave(quote._id)}
                className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Unsave
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneratedQuotes;