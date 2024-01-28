const db = require('../config/connection');
const { User, Product, Category, Affirmation } = require('../models');
const cleanDB = require('../config/cleanDB');

// TODO:
//   Change/populate all shop categories to display subscriptions instead

// TODO: 
//    Clean the Quote / Reaction / Mood collections as well
db.once('open', async () => {
  await cleanDB('Category', 'categories');
  await cleanDB('Product', 'products');
  await cleanDB('Quote', 'quotes');
  await cleanDB('User', 'users');
  await cleanDB('Affirmation', 'affirmations')

  const categories = await Category.insertMany([
    { name: 'Subscription' },
    { name: 'Donation' },
    { name: 'Promotional Materials' },
  ]);

  console.log('categories seeded');

  const affirmations = await Affirmation.insertMany([
      {
        "content": "My feelings are valid, but I control my reaction to them.",
        "emotion": "Angry"
      },
      {
        "content": "I am letting go of anger to make space for more peace and joy.",
        "emotion": "Angry"
      },
      {
        "content": "With each moment, I am moving towards greater patience and understanding.",
        "emotion": "Angry"
      },
      {
        "content": "I choose to heal rather than to hurt, to forgive rather than to fester.",
        "emotion": "Angry"
      },
      {
        "content": "I am stronger than my anger, and my calmness is my power.",
        "emotion": "Angry"
      },
      {
        "content": "I find strength in tranquility and clarity in calmness.",
        "emotion": "Angry"
      },
      {
        "content": "I let go of anger and welcome peace and positivity into my life.",
        "emotion": "Angry"
      },
      {
        "content": "My anger is a sign of my passion, but I channel it towards positive action.",
        "emotion": "Angry"
      },
      {
        "content": "I have the power to overcome anger and feel peace and serenity.",
        "emotion": "Angry"
      },
      {
        "content": "Anger is just a feeling, and like all feelings, it will pass.",
        "emotion": "Angry"
      },
      {
        "content": "I am learning to transform my anger into understanding and empathy.",
        "emotion": "Angry"
      },
      {
        "content": "Every calm breath I take reduces my anger and brings me peace.",
        "emotion": "Angry"
      },
      {
        "content": "I am in control of my emotions and choose harmony and balance.",
        "emotion": "Angry"
      },
      {
        "content": "I have the strength to manage my stress and keep my peace.",
        "emotion": "Stressed"
      },
      {
        "content": "With every breath, I release the stress inside me and become more calm.",
        "emotion": "Stressed"
      },
      {
        "content": "I am capable of solving any problems that come my way.",
        "emotion": "Stressed"
      },
      {
        "content": "I choose to let go of stress and embrace peace and relaxation.",
        "emotion": "Stressed"
      },
      {
        "content": "I am in control of my schedule and my priorities, and I choose balance.",
        "emotion": "Stressed"
      },
      {
        "content": "I give myself permission to step back and take a break when needed.",
        "emotion": "Stressed"
      },
      {
        "content": "I am more than my stress; I am resilient and adaptable.",
        "emotion": "Stressed"
      },
      {
        "content": "I focus on one task at a time, knowing each step leads to progress.",
        "emotion": "Stressed"
      },
      {
        "content": "I am letting go of what I cannot control and focusing on what I can.",
        "emotion": "Stressed"
      },
      {
        "content": "I find peace and joy in the simple moments of life.",
        "emotion": "Stressed"
      },
      {
        "content": "I am deserving of a life free from overwhelming stress.",
        "emotion": "Stressed"
      },
      {
        "content": "I trust in my ability to navigate through challenging situations calmly.",
        "emotion": "Stressed"
      },
      {
        "content": "My mind is clear, my body is relaxed, and my spirit is at peace.",
        "emotion": "Stressed"
      },
      {
        "content": "I embrace activities that help me relax and recharge.",
        "emotion": "Stressed"
      },
      {
        "content": "I am learning to balance my responsibilities with my well-being.",
        "emotion": "Stressed"
      },
      {
        "content": "I am stronger than the stress that I am currently facing.",
        "emotion": "Stressed"
      },
      {
        "content": "I take things one step at a time and trust in the journey.",
        "emotion": "Stressed"
      },
      {
        "content": "I am surrounded by peace, and I carry this tranquility with me.",
        "emotion": "Stressed"
      },
      {
        "content": "I am in harmony with the rhythm of life and find ease in its flow.",
        "emotion": "Stressed"
      },
      {
        "content": "Every challenge I face is an opportunity to grow stronger and more serene.",
        "emotion": "Stressed"
      },
      {
        "content": "I am at peace when I am alone and cherish this time with myself.",
        "emotion": "Lonely"
      },
      {
        "content": "Loneliness is a feeling, not a fact. I am connected to the world around me.",
        "emotion": "Lonely"
      },
      {
        "content": "In moments of solitude, I find strength and inner peace.",
        "emotion": "Lonely"
      },
      {
        "content": "I am never truly alone; I am surrounded by love and support, seen and unseen.",
        "emotion": "Lonely"
      },
      {
        "content": "I open my heart to new connections and cherish the ones I have.",
        "emotion": "Lonely"
      },
      {
        "content": "Solitude gives me the opportunity to discover and reinvent myself.",
        "emotion": "Lonely"
      },
      {
        "content": "I find comfort in my own company and use this time to rejuvenate.",
        "emotion": "Lonely"
      },
      {
        "content": "I am worthy of love and companionship, and I attract the right people into my life.",
        "emotion": "Lonely"
      },
      {
        "content": "I am connected to a universe that is full of love and support.",
        "emotion": "Lonely"
      },
      {
        "content": "I use moments of loneliness to grow stronger and more self-aware.",
        "emotion": "Lonely"
      },
      {
        "content": "I embrace the quiet moments to connect with my inner self deeply.",
        "emotion": "Lonely"
      },
      {
        "content": "Every day, I grow stronger in my ability to enjoy my own company.",
        "emotion": "Lonely"
      },
      {
        "content": "I am open to the love and presence of others around me.",
        "emotion": "Lonely"
      },
      {
        "content": "My alone time is a gift to myself, a space to recharge and reflect.",
        "emotion": "Lonely"
      },
      {
        "content": "I am whole and complete in myself, and I welcome the connections that come my way.",
        "emotion": "Lonely"
      },
      {
        "content": "I find peace in solitude and use it as a time for creativity and growth.",
        "emotion": "Lonely"
      },
      {
        "content": "I am building a life filled with love, starting with the love I have for myself.",
        "emotion": "Lonely"
      },
      {
        "content": "I use my feelings of loneliness as a catalyst to reach out and connect with others.",
        "emotion": "Lonely"
      },
      {
        "content": "I am a magnet for positive relationships and meaningful connections.",
        "emotion": "Lonely"
      },
      {
        "content": "Being alone does not mean being lonely; it's an opportunity to discover who I truly am.",
        "emotion": "Lonely"
      },
      {
        "content": "I take one step at a time, knowing that progress is not always linear.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am capable of managing my responsibilities one task at a time.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I prioritize self-care and mental health as I navigate through my tasks.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I release the need to do everything at once and focus on what's most important.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am more than capable of handling what life brings my way.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I give myself permission to take breaks and recharge.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am resilient and can adapt to challenges with grace and determination.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I trust that everything will work out in the right time and manner.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am focused, organized, and calm as I tackle my to-do list.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I allow myself to let go of what I cannot control and focus on what I can.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I trust my journey and know that I am heading in the right direction.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I have the power to calm the storm within and find peace amidst chaos.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "Each deep breath I take brings me more clarity and focus.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I choose to view challenges as opportunities to grow and evolve.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am supported by those around me and am not alone in my struggles.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I embrace a mindset of peace and calm in all that I do.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am confident in my ability to overcome any obstacle in my path.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am grounded in the present moment, where peace resides.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I release the burden of overwhelm and embrace a sense of ease.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I am capable of navigating through life's complexities with grace and poise.",
        "emotion": "Overwhelmed"
      },
      {
        "content": "I channel my frustration into positive, productive action.",
        "emotion": "Frustrated"
      },
      {
        "content": "I am patient and understanding with myself during challenging moments.",
        "emotion": "Frustrated"
      },
      {
        "content": "I find constructive solutions to my frustrations.",
        "emotion": "Frustrated"
      },
      {
        "content": "I let go of what I cannot change and focus on what I can influence.",
        "emotion": "Frustrated"
      },
      {
        "content": "I maintain my calm and composure even when things don't go as planned.",
        "emotion": "Frustrated"
      },
      {
        "content": "I learn from my frustrations and use them as stepping stones to success.",
        "emotion": "Frustrated"
      },
      {
        "content": "I recognize my triggers and take proactive steps to stay balanced.",
        "emotion": "Frustrated"
      },
      {
        "content": "I am in control of my reactions and choose responses that serve me well.",
        "emotion": "Frustrated"
      },
      {
        "content": "I use my energy to create positive changes instead of dwelling on frustration.",
        "emotion": "Frustrated"
      },
      {
        "content": "I take a step back to gain perspective and return with renewed focus.",
        "emotion": "Frustrated"
      },
      {
        "content": "I recognize my frustrations as signs pointing me towards needed changes.",
        "emotion": "Frustrated"
      },
      {
        "content": "I embrace my feelings but choose to focus on solutions and progress.",
        "emotion": "Frustrated"
      },
      {
        "content": "I am learning to transform frustration into motivation and action.",
        "emotion": "Frustrated"
      },
      {
        "content": "I release the need for immediate results and trust in the process.",
        "emotion": "Frustrated"
      },
      {
        "content": "My challenges are making me stronger, wiser, and more resilient.",
        "emotion": "Frustrated"
      },
      {
        "content": "I find strength in calmness and clarity in moments of stillness.",
        "emotion": "Frustrated"
      },
      {
        "content": "I choose to let go of frustrations and focus on the positives in my life.",
        "emotion": "Frustrated"
      },
      {
        "content": "I am mastering the art of patience and understanding in the face of difficulties.",
        "emotion": "Frustrated"
      },
      {
        "content": "Every challenge is a stepping stone towards my growth and success.",
        "emotion": "Frustrated"
      },
      {
        "content": "I am equipped with all I need to overcome hurdles and reach my goals.",
        "emotion": "Frustrated"
      },
      {
        "content": "I accept that disappointment is part of life and I grow stronger from it.",
        "emotion": "Disappointed"
      },
      {
        "content": "I let go of expectations and embrace the journey of the unknown.",
        "emotion": "Disappointed"
      },
      {
        "content": "I find the lesson in every disappointment and use it to move forward.",
        "emotion": "Disappointed"
      },
      {
        "content": "I trust that better things are on their way and remain hopeful.",
        "emotion": "Disappointed"
      },
      {
        "content": "I focus on the things that bring me joy and fulfillment.",
        "emotion": "Disappointed"
      },
      {
        "content": "I understand that setbacks are not the end, but opportunities to learn.",
        "emotion": "Disappointed"
      },
      {
        "content": "I maintain a positive outlook even when things don't go as planned.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am resilient in the face of challenges and bounce back with vigor.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am patient with myself and know that good things take time.",
        "emotion": "Disappointed"
      },
      {
        "content": "I keep moving forward, knowing that every experience is a part of my growth.",
        "emotion": "Disappointed"
      },
      {
        "content": "I embrace change and stay open to new possibilities and opportunities.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am learning that sometimes the best is yet to come, in ways I might not expect.",
        "emotion": "Disappointed"
      },
      {
        "content": "I choose to find joy and value in the present moment, regardless of circumstances.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am resilient in the face of setbacks and know that they lead to greater things.",
        "emotion": "Disappointed"
      },
      {
        "content": "I recognize that disappointment is part of life's journey, not its end.",
        "emotion": "Disappointed"
      },
      {
        "content": "I focus on gratitude for what I have, knowing it paves the path for more.",
        "emotion": "Disappointed"
      },
      {
        "content": "Every experience, good or bad, is a valuable part of my story.",
        "emotion": "Disappointed"
      },
      {
        "content": "I allow myself to feel my emotions, but also to move beyond them.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am in charge of my happiness and choose to find joy every day.",
        "emotion": "Disappointed"
      },
      {
        "content": "Disappointments are just life's way of setting me up for something better.",
        "emotion": "Disappointed"
      },
      {
        "content": "I am thankful for every moment and treasure the gifts life offers me.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratitude fills my heart and shapes my perspective towards positivity.",
        "emotion": "Grateful"
      },
      {
        "content": "I appreciate the beauty in small moments and simple pleasures.",
        "emotion": "Grateful"
      },
      {
        "content": "Every day, I find something new to be grateful for.",
        "emotion": "Grateful"
      },
      {
        "content": "I am blessed with so much, and I am deeply thankful for it all.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratitude turns what I have into enough, and more.",
        "emotion": "Grateful"
      },
      {
        "content": "I live in a state of thankfulness, recognizing the abundance around me.",
        "emotion": "Grateful"
      },
      {
        "content": "My heart is open to the endless blessings that surround me.",
        "emotion": "Grateful"
      },
      {
        "content": "With gratitude, I recognize and appreciate the love in my life.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratitude is my natural state of being, and it guides my choices and actions.",
        "emotion": "Grateful"
      },
      {
        "content": "I express my gratitude for health, happiness, and the love I receive.",
        "emotion": "Grateful"
      },
      {
        "content": "Every experience is a gift, and for this, I am grateful.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratefulness anchors me in the present and enriches my life.",
        "emotion": "Grateful"
      },
      {
        "content": "I am thankful for my journey and all it has taught me.",
        "emotion": "Grateful"
      },
      {
        "content": "Each day, I am grateful for another opportunity to make a difference.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratitude opens the door to abundance and joy in my life.",
        "emotion": "Grateful"
      },
      {
        "content": "I am thankful for the people in my life who love and support me.",
        "emotion": "Grateful"
      },
      {
        "content": "Gratitude fills my mind with peace and my heart with warmth.",
        "emotion": "Grateful"
      },
      {
        "content": "I cherish the present and honor my past with gratitude.",
        "emotion": "Grateful"
      },
      {
        "content": "Thankfulness leads me to a positive and fulfilling life.",
        "emotion": "Grateful"
      },
      {
        "content": "I give myself permission to rest and recharge without guilt.",
        "emotion": "Exhausted"
      },
      {
        "content": "My body and mind deserve rest, and I honor them by taking time to relax.",
        "emotion": "Exhausted"
      },
      {
        "content": "Even in exhaustion, I am taking steps towards growth and renewal.",
        "emotion": "Exhausted"
      },
      {
        "content": "Rest is a form of self-respect, and I treat myself with kindness.",
        "emotion": "Exhausted"
      },
      {
        "content": "I listen to my body's need for rest and respond with loving care.",
        "emotion": "Exhausted"
      },
      {
        "content": "Every breath I take fills me with peace and rejuvenates my spirit.",
        "emotion": "Exhausted"
      },
      {
        "content": "I am worthy of rest, and I embrace moments of relaxation.",
        "emotion": "Exhausted"
      },
      {
        "content": "I release all tension with each exhale and invite calm with each inhale.",
        "emotion": "Exhausted"
      },
      {
        "content": "Rest and recovery are essential for my strength and well-being.",
        "emotion": "Exhausted"
      },
      {
        "content": "I am patient with myself and understand that rest is part of progress.",
        "emotion": "Exhausted"
      },
      {
        "content": "I find strength in my moments of rest, knowing they are necessary for balance.",
        "emotion": "Exhausted"
      },
      {
        "content": "I am learning to balance activity with restfulness for overall harmony.",
        "emotion": "Exhausted"
      },
      {
        "content": "In rest, I find the energy to pursue my dreams with renewed vigor.",
        "emotion": "Exhausted"
      },
      {
        "content": "I trust the natural rhythms of my body to guide my need for rest.",
        "emotion": "Exhausted"
      },
      {
        "content": "I honor my need for downtime, recognizing it as a path to rejuvenation.",
        "emotion": "Exhausted"
      },
      {
        "content": "I am gentle with myself and recognize when to step back and rest.",
        "emotion": "Exhausted"
      },
      {
        "content": "Rest is a gift I give myself, and I accept it with gratitude.",
        "emotion": "Exhausted"
      },
      {
        "content": "I allow myself moments of stillness to restore my energy.",
        "emotion": "Exhausted"
      },
      {
        "content": "Every restful moment is an investment in my future energy and productivity.",
        "emotion": "Exhausted"
      },
      {
        "content": "In resting, I am preparing myself for future success and happiness.",
        "emotion": "Exhausted"
      },
      {
        "content": "I am enough just as I am, and I embrace my true self with confidence.",
        "emotion": "Insecure"
      },
      {
        "content": "Insecurity is a feeling, not a fact, and I am capable and worthy.",
        "emotion": "Insecure"
      },
      {
        "content": "I release self-doubt and welcome self-assurance.",
        "emotion": "Insecure"
      },
      {
        "content": "I am worthy of respect and acceptance from myself and others.",
        "emotion": "Insecure"
      },
      {
        "content": "I believe in my abilities and trust my instincts.",
        "emotion": "Insecure"
      },
      {
        "content": "I am proud of who I am and all that I have accomplished.",
        "emotion": "Insecure"
      },
      {
        "content": "Each day, I grow more confident and secure in my identity.",
        "emotion": "Insecure"
      },
      {
        "content": "I am surrounded by love and positivity that boosts my self-esteem.",
        "emotion": "Insecure"
      },
      {
        "content": "I am a unique individual with incredible value and potential.",
        "emotion": "Insecure"
      },
      {
        "content": "My insecurities do not define me; my strength and courage do.",
        "emotion": "Insecure"
      },
      {
        "content": "I am deserving of success, love, and happiness.",
        "emotion": "Insecure"
      },
      {
        "content": "I stand tall and proud, embracing my strengths and weaknesses alike.",
        "emotion": "Insecure"
      },
      {
        "content": "I replace fear of the unknown with curiosity and openness.",
        "emotion": "Insecure"
      },
      {
        "content": "I am a work in progress, and every step forward is a victory.",
        "emotion": "Insecure"
      },
      {
        "content": "I am secure in my worth and unapologetically myself.",
        "emotion": "Insecure"
      },
      {
        "content": "I am confident in my path and trust that I am heading in the right direction.",
        "emotion": "Insecure"
      },
      {
        "content": "I embrace my journey, learning from each experience with a strong heart.",
        "emotion": "Insecure"
      },
      {
        "content": "I am resilient, capable",
        "emotion": "Insecure"
      },
      {
        "content": "I am calm and centered, even in challenging situations.",
        "emotion": "Nervous"
      },
      {
        "content": "I trust in my ability to handle what comes my way.",
        "emotion": "Nervous"
      },
      {
        "content": "Every deep breath I take brings me peace and clarity.",
        "emotion": "Nervous"
      },
      {
        "content": "I am stronger than my nervousness, and I can overcome it.",
        "emotion": "Nervous"
      },
      {
        "content": "I choose to focus on the present and let go of anxiety about the future.",
        "emotion": "Nervous"
      },
      {
        "content": "My fears do not control me; I control them.",
        "emotion": "Nervous"
      },
      {
        "content": "I am prepared and capable of facing any challenge.",
        "emotion": "Nervous"
      },
      {
        "content": "I replace my nervous thoughts with positive, reassuring ones.",
        "emotion": "Nervous"
      },
      {
        "content": "I am relaxed, confident, and in control.",
        "emotion": "Nervous"
      },
      {
        "content": "I embrace my experiences with calmness and confidence.",
        "emotion": "Nervous"
      },
      {
        "content": "With each passing moment, my nerves are calming.",
        "emotion": "Nervous"
      },
      {
        "content": "I am worthy of a peaceful and serene state of mind.",
        "emotion": "Nervous"
      },
      {
        "content": "I am surrounded by an aura of calm and assurance.",
        "emotion": "Nervous"
      },
      {
        "content": "Nervousness is just a feeling; it will pass, and I will be okay.",
        "emotion": "Nervous"
      },
      {
        "content": "I am the master of my emotions, and I choose tranquility.",
        "emotion": "Nervous"
      },
      {
        "content": "I trust in the journey of life and let go of fear and worry.",
        "emotion": "Nervous"
      },
      {
        "content": "I am at peace and nothing can disturb my calm spirit.",
        "emotion": "Nervous"
      },
      {
        "content": "I face uncertainty with courage and a positive outlook.",
        "emotion": "Nervous"
      },
      {
        "content": "My inner strength is greater than any feeling of nervousness.",
        "emotion": "Nervous"
      },
      {
        "content": "I am grounded in the present, where peace resides.",
        "emotion": "Nervous"
      },
      {
        "content": "I hold hope in my heart, even in the darkest moments.",
        "emotion": "Hopeless"
      },
      {
        "content": "There is always a light at the end of the tunnel, and I am moving towards it.",
        "emotion": "Hopeless"
      },
      {
        "content": "I believe in new beginnings and fresh starts.",
        "emotion": "Hopeless"
      },
      {
        "content": "Every challenge is a doorway to new possibilities.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am resilient, and my spirit cannot be broken.",
        "emotion": "Hopeless"
      },
      {
        "content": "I find strength in my ability to survive and thrive.",
        "emotion": "Hopeless"
      },
      {
        "content": "I trust that better days are ahead, and I move towards them with hope.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am deserving of a bright and fulfilling future.",
        "emotion": "Hopeless"
      },
      {
        "content": "I embrace the lessons of my journey and look forward to what's next.",
        "emotion": "Hopeless"
      },
      {
        "content": "My potential is limitless, and my future is bright.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am a beacon of hope and positivity.",
        "emotion": "Hopeless"
      },
      {
        "content": "I release despair and welcome optimism and resilience.",
        "emotion": "Hopeless"
      },
      {
        "content": "I have the power to create change and bring joy into my life.",
        "emotion": "Hopeless"
      },
      {
        "content": "Even in despair, I find reasons to be hopeful and grateful.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am surrounded by support, love, and endless possibilities.",
        "emotion": "Hopeless"
      },
      {
        "content": "I choose to see the beauty and potential in every day.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am capable of rising above my circumstances and finding joy.",
        "emotion": "Hopeless"
      },
      {
        "content": "My heart is filled with courage, hope, and the will to continue.",
        "emotion": "Hopeless"
      },
      {
        "content": "I am a survivor, and my spirit is unbreakable.",
        "emotion": "Hopeless"
      },
      {
        "content": "Hope guides me through life's challenges towards a brighter tomorrow.",
        "emotion": "Hopeless"
      },
      {
        "content": "I focus on my own journey and celebrate my unique path.",
        "emotion": "Jealous"
      },
      {
        "content": "I am content with who I am and what I have.",
        "emotion": "Jealous"
      },
      {
        "content": "I let go of comparisons and embrace my individuality.",
        "emotion": "Jealous"
      },
      {
        "content": "My worth is not determined by others but by my own self-love.",
        "emotion": "Jealous"
      },
      {
        "content": "I replace envy with admiration and learn from the success of others.",
        "emotion": "Jealous"
      },
      {
        "content": "I am grateful for my life and all its blessings.",
        "emotion": "Jealous"
      },
      {
        "content": "I am focused on my own growth and achievements.",
        "emotion": "Jealous"
      },
      {
        "content": "I am happy for others and their accomplishments.",
        "emotion": "Jealous"
      },
      {
        "content": "Jealousy does not control me; I am in control of my emotions.",
        "emotion": "Jealous"
      },
      {
        "content": "I am secure in myself and need not compare myself to others.",
        "emotion": "Jealous"
      },
      {
        "content": "I am a work in progress, and I am proud of where I am.",
        "emotion": "Jealous"
      },
      {
        "content": "I celebrate the success of others, knowing my time will come.",
        "emotion": "Jealous"
      },
      {
        "content": "I am on my own path, and it is filled with potential and promise.",
        "emotion": "Jealous"
      },
      {
        "content": "I find joy in my own accomplishments and in those of others.",
        "emotion": "Jealous"
      },
      {
        "content": "I am confident in my abilities and my journey.",
        "emotion": "Jealous"
      },
      {
        "content": "I am too busy working on my own grass to notice if someone else's is greener.",
        "emotion": "Jealous"
      },
      {
        "content": "My self-worth is independent of others' achievements.",
        "emotion": "Jealous"
      },
      {
        "content": "I am complete in myself and do not need to compare my life to others.",
        "emotion": "Jealous"
      },
      {
        "content": "Every person has their own journey, and I respect and honor mine.",
        "emotion": "Jealous"
      },
      {
        "content": "I let go of jealousy and open my heart to genuine happiness for others.",
        "emotion": "Jealous"
      },
      {
        "content": "I trust the journey, even when I do not understand it.",
        "emotion": "Lost"
      },
      {
        "content": "Every step I take is leading me to where I need to be.",
        "emotion": "Lost"
      },
      {
        "content": "I am capable of navigating through life's challenges.",
        "emotion": "Lost"
      },
      {
        "content": "I am open to new paths and experiences.",
        "emotion": "Lost"
      },
      {
        "content": "My journey is unique and special.",
        "emotion": "Lost"
      },
      {
        "content": "I am learning and growing every day.",
        "emotion": "Lost"
      },
      {
        "content": "I am guided by inner wisdom and intuition.",
        "emotion": "Lost"
      },
      {
        "content": "I believe in my ability to overcome obstacles.",
        "emotion": "Lost"
      },
      {
        "content": "Every experience is part of my journey.",
        "emotion": "Lost"
      },
      {
        "content": "I am worthy of finding my way.",
        "emotion": "Lost"
      },
      {
        "content": "I am patient with myself as I explore new directions.",
        "emotion": "Lost"
      },
      {
        "content": "I find strength in my ability to adapt.",
        "emotion": "Lost"
      },
      {
        "content": "I trust that I am on the right path, even if it feels uncertain.",
        "emotion": "Lost"
      },
      {
        "content": "My potential is limitless, even when I feel lost.",
        "emotion": "Lost"
      },
      {
        "content": "I am surrounded by opportunities to find my way.",
        "emotion": "Lost"
      },
      {
        "content": "I embrace the unknown as a chance to grow.",
        "emotion": "Lost"
      },
      {
        "content": "I am resilient and can handle life's twists and turns.",
        "emotion": "Lost"
      },
      {
        "content": "I am confident in my decisions, even in uncertainty.",
        "emotion": "Lost"
      },
      {
        "content": "I am not alone in my journey.",
        "emotion": "Lost"
      },
      {
        "content": "I find peace in knowing that everything will work out.",
        "emotion": "Lost"
      }
  
  ]);
  console.log('Affirmations seeded');


  const products = await Product.insertMany([
    {
      name: 'Bronze Subscription',
      description:
        'Bronze subscription.',
      image: 'bronze.png',
      category: categories[0]._id,
      price: 5.00,
      quantity: 99999
    },
    {
      name: 'Silver Subscription',
      description:
        'Silver subscription.',
      image: 'silver.png',
      category: categories[0]._id,
      price: 15.00,
      quantity: 99999
    },
    {
      name: 'Gold Subscription',
      description:
        'Gold subscription.',
      image: 'gold.png',
      category: categories[0]._id,
      price: 25.00,
      quantity: 99999
    },
    {
      name: 'Donation 10',
      description:
        'Donation.',
      image: 'gold.png',
      category: categories[1]._id,
      price: 10.00,
      quantity: 99999
    },
    {
      name: 'Donation 100',
      description:
        'Donation.',
      image: 'gold.png',
      category: categories[1]._id,
      price: 100.00,
      quantity: 99999
    },
    // {
    //   name: 'Tin of Cookies',
    //   description:
    //     'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    //   image: 'cookie-tin.jpg',
    //   category: categories[0]._id,
    //   price: 2.99,
    //   quantity: 500
    // },
    // {
    //   name: 'Tin of Cookies',
    //   description:
    //     'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    //   image: 'cookie-tin.jpg',
    //   category: categories[0]._id,
    //   price: 2.99,
    //   quantity: 500
    // },
    // {
    //   name: 'Tin of Cookies',
    //   description:
    //     'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    //   image: 'cookie-tin.jpg',
    //   category: categories[0]._id,
    //   price: 2.99,
    //   quantity: 500
    // },
    // {
    //   name: 'Canned Coffee',
    //   description:
    //     'Praesent sed lacinia mauris. Nulla congue nibh magna, at feugiat nunc scelerisque quis. Donec iaculis rutrum vulputate. Suspendisse lectus sem, vulputate ac lectus sed, placerat consequat dui.',
    //   image: 'canned-coffee.jpg',
    //   category: categories[0]._id,
    //   price: 1.99,
    //   quantity: 500
    // },
    // {
    //   name: 'Toilet Paper',
    //   category: categories[1]._id,
    //   description:
    //     'Donec volutpat erat erat, sit amet gravida justo sodales in. Phasellus tempus euismod urna. Proin ultrices nisi ut ipsum congue, vitae porttitor libero suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam lacinia a nisi non congue.',
    //   image: 'toilet-paper.jpg',
    //   price: 7.99,
    //   quantity: 20
    // },
    // {
    //   name: 'Handmade Soap',
    //   category: categories[1]._id,
    //   description:
    //     'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
    //   image: 'soap.jpg',
    //   price: 3.99,
    //   quantity: 50
    // },
    // {
    //   name: 'Set of Wooden Spoons',
    //   category: categories[1]._id,
    //   description:
    //     'Vivamus ut turpis in purus pretium mollis. Donec turpis odio, semper vel interdum ut, vulputate at ex. Duis dignissim nisi vel tortor imperdiet finibus. Aenean aliquam sagittis rutrum.',
    //   image: 'wooden-spoons.jpg',
    //   price: 14.99,
    //   quantity: 100
    // },
    // {
    //   name: 'Camera',
    //   category: categories[2]._id,
    //   description:
    //     'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
    //   image: 'camera.jpg',
    //   price: 399.99,
    //   quantity: 30
    // },
    // {
    //   name: 'Tablet',
    //   category: categories[2]._id,
    //   description:
    //     'In sodales, ipsum quis ultricies porttitor, tellus urna aliquam arcu, eget venenatis purus ligula ut nisi. Fusce ut felis dolor. Mauris justo ante, aliquet non tempus in, tempus ac lorem. Aliquam lacinia dolor eu sem eleifend ultrices. Etiam mattis metus metus. Sed ligula dui, placerat non turpis vitae, suscipit volutpat elit. Phasellus sagittis, diam elementum suscipit fringilla, libero mauris scelerisque ex, ac interdum diam erat non sapien.',
    //   image: 'tablet.jpg',
    //   price: 199.99,
    //   quantity: 30
    // },
    // {
    //   name: 'Tales at Bedtime',
    //   category: categories[3]._id,
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
    //   image: 'bedtime-book.jpg',
    //   price: 9.99,
    //   quantity: 100
    // },
    // {
    //   name: 'Spinning Top',
    //   category: categories[4]._id,
    //   description: 'Ut vulputate hendrerit nibh, a placerat elit cursus interdum.',
    //   image: 'spinning-top.jpg',
    //   price: 1.99,
    //   quantity: 1000
    // },
    // {
    //   name: 'Set of Plastic Horses',
    //   category: categories[4]._id,
    //   description:
    //     'Sed a mauris condimentum, elementum enim in, rhoncus dui. Phasellus lobortis leo odio, sit amet pharetra turpis porta quis.',
    //   image: 'plastic-horses.jpg',
    //   price: 2.99,
    //   quantity: 1000
    // },
    // {
    //   name: 'Teddy Bear',
    //   category: categories[4]._id,
    //   description:
    //     'Vestibulum et erat finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.',
    //   image: 'teddy-bear.jpg',
    //   price: 7.99,
    //   quantity: 100
    // },
    // {
    //   name: 'Alphabet Blocks',
    //   category: categories[4]._id,
    //   description:
    //     'Morbi consectetur viverra urna, eu fringilla turpis faucibus sit amet. Suspendisse potenti. Donec at dui ac sapien eleifend hendrerit vel sit amet lectus.',
    //   image: 'alphabet-blocks.jpg',
    //   price: 9.99,
    //   quantity: 600
    // }
  ]);

  console.log('products seeded');

  console.log('creating pamela');
  let result = await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    userName: 'p.washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    friends: [],
    quotes: [],
    orders: [
      {
        products: [products[0]._id, products[1]._id]
      }
    ]
  });

  console.log('creating elijah');

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    userName: 'e.holt',
    email: 'eholt@testmail.com',
    password: 'password12345',
    quotes: [],
    // friends: [],
    orders: []
  });

  // console.log('creating users 1-10');
  // for (let i = 1; i <=10; i++) {
  //   console.log(`  adding user ${i}`);
  //   await User.create({
  //     firstName: 'User',
  //     lastName: `${i}`,
  //     userName: `user${i}`,
  //     email: `user${i}@hotmail.com`,
  //     password: `user${i}`,
  //     quotes: [],
  //     // friends: []
  //   });
  // };

  // console.log('users seeded');

  process.exit();
});
