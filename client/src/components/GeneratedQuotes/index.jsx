// import Auth from "../../utils/auth";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";
import { v4 as uuidv4 } from 'uuid';
// import { GET_USER_SAVED_AFFIRMATIONS } from '../graphql/queries';
// import { CREATE_QUOTE } from "../../utils/mutations";

// Predefined quotes for each emotion
const quotesData = {
  Happy: [
    {
      "_id": uuidv4(),
      "content": "The more you praise and celebrate your life, the more there is in life to celebrate. — Oprah Winfrey"
    },
    {
      "_id": uuidv4(),
      "content": "Happiness is not by chance, but by choice. — Jim Rohn"
    },
    {
      "_id": uuidv4(),
      "content": "The secret of being happy is accepting where you are in life and making the most out of every day."
    },
    {
      "_id": uuidv4(),
      "content": "Happiness is not something ready made. It comes from your own actions. — Dalai Lama"
    },
    {
      "_id": uuidv4(),
      "content": "The purpose of our lives is to be happy. — Dalai Lama"
    },
    {
      "_id": uuidv4(),
      "content": "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life. - Albert Camus"
    },
    {
      "_id": uuidv4(),
      "content": "For every minute you are angry, you lose sixty seconds of happiness. - Ralph Waldo Emerson"
    },
    {
      "_id": uuidv4(),
      "content": "Count your age by friends, not years. Count your life by smiles, not tears. - John Lennon"
    },
    {
      "_id": uuidv4(),
      "content": "No medicine cures what happiness cannot. - Gabriel Garcia Marquez"
    },
    {
      "_id": uuidv4(),
      "content": "Learn to value yourself, which means: fight for your happiness. _ Ayn Rand"
    },
    {
      "_id": uuidv4(),
      "content": "Now and then, it's good to pause in our pursuit of happiness and just be happy. - Guillaume Apollinaire"
    },
    {
      "_id": uuidv4(),
      "content": "Success is not what you want, happiness is what you get. - W.P. Kinsella"
    },
    {
      "_id": uuidv4(),
      "content": "They say a person needs just three things to be truly happy in this world: someone to love, something to do, and something to hope for. - Tom Bodett"
    },
    {
      "_id": uuidv4(),
      "content": "Happiness cannot be traveled to, owned, earned, worn or consumed. Happiness is the spiritual experience of living every minute with love, grace, and gratitude. - Denis Waitley"
    },
    {
      "_id": uuidv4(),
      "content": "The biggest adventure you can ever take is to live the life of your dreams. - Oprah Winfrey"
    },
    {
      "_id": uuidv4(),
      "content": "Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you. - Mary Lou Retton"
    },
    {
      "_id": uuidv4(),
      "content": "Everything has its wonders, even darkness and silence, and I learn, whatever state I may be in, therein to be content. - Helen Keller"
    },
    {
      "_id": uuidv4(),
      "content": "Everyday is a new day. - Carrie Underwood"
    },
    {
      "_id": uuidv4(),
      "content": "Beauty is everywhere. You only have to look to see it. - Bob Ross"
    }
  ],
  Sad: [
  {
    _id: uuidv4(),
    content: "I allow myself to feel my feelings, but I also know they do not define me."
  },
  {
    _id: uuidv4(),
    content: "With every breath, I release the anxiety and fear within me."
  },
  {
    _id: uuidv4(),
    content: "I am stronger than my struggles and braver than my fears."
  },
  {
    _id: uuidv4(),
    content: "I choose to focus on what I can control, and let go of what I cannot."
  },
  {
    _id: uuidv4(),
    content: "Even in the midst of sadness, I have so many reasons to be grateful."
  },
  {
    _id: uuidv4(),
    content: "I am deserving of happiness, love, peace, and joy."
  },
  {
    _id: uuidv4(),
    content: "My feelings are valid, but they do not hold power over my day."
  },
  {
    _id: uuidv4(),
    content: "I am gently moving towards happiness and healing every day."
  },
  {
    _id: uuidv4(),
    content: "I am patient with myself and accept that sadness is a part of life."
  },
  {
    _id: uuidv4(),
    content: "This feeling is temporary, and I am in the process of positive change."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by people who love and support me."
  },
  {
    _id: uuidv4(),
    content: "I find comfort in the knowledge that I am not alone in my feelings."
  },
  {
    _id: uuidv4(),
    content: "Each day brings me closer to finding joy and peace within myself."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of happiness and I invite it into my life."
  },
  {
    _id: uuidv4(),
    content: "I am capable of moving beyond my challenges and learning from them."
  },
  {
    _id: uuidv4(),
    content: "Even in sorrow, I can find beauty and strength."
  },
  {
    _id: uuidv4(),
    content: "I am resilient, and I can handle the challenges life throws at me."
  },
  {
    _id: uuidv4(),
    content: "I give myself the gift of compassion and self-care today."
  },
  {
    _id: uuidv4(),
    content: "I have the power to create change in my life and find happiness."
  },
  {
    _id: uuidv4(),
    content: "My heart is open to love, healing, and the light that new days bring."
  }
],
Anxious: [
  {
    _id: uuidv4(),
    content: "I am safe and in control, even when life feels uncertain."
  },
  {
    _id: uuidv4(),
    content: "With each breath, I release my anxiety and embrace calm."
  },
  {
    _id: uuidv4(),
    content: "I am strong enough to move through my fears and towards my goals."
  },
  {
    _id: uuidv4(),
    content: "I choose to focus on the present moment and find peace in it."
  },
  {
    _id: uuidv4(),
    content: "I trust in my ability to navigate through challenging situations."
  },
  {
    _id: uuidv4(),
    content: "I am more than my anxious thoughts; I am capable and competent."
  },
  {
    _id: uuidv4(),
    content: "My mind is slowing down, and I am finding clarity within myself."
  },
  {
    _id: uuidv4(),
    content: "I let go of worries about the future and focus on what I can control."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by love and support, which eases my anxiety."
  },
  {
    _id: uuidv4(),
    content: "Each deep breath I take fills me with peace and tranquility."
  },
  {
    _id: uuidv4(),
    content: "I am deserving of a calm, serene, and peaceful mind."
  },
  {
    _id: uuidv4(),
    content: "Anxiety does not define me; I am defined by my courage and strength."
  },
  {
    _id: uuidv4(),
    content: "I have the power to overcome my anxiety and live the life I desire."
  },
  {
    _id: uuidv4(),
    content: "I embrace my feelings, but I also know they are not my reality."
  },
  {
    _id: uuidv4(),
    content: "Every day, I grow stronger and more relaxed in all situations."
  },
  {
    _id: uuidv4(),
    content: "I choose to release fear and embrace love and positivity."
  },
  {
    _id: uuidv4(),
    content: "I am in charge of my breathing, and I can slow it down when I need to."
  },
  {
    _id: uuidv4(),
    content: "I am finding it easier to relax and enjoy my life."
  },
  {
    _id: uuidv4(),
    content: "My mind is clear, my body is relaxed, and my spirit is at peace."
  },
  {
    _id: uuidv4(),
    content: "I am centered, I am balanced, and I am at ease within myself."
  }
],
Angry: [
  {
    _id: uuidv4(),
    content: "I choose to respond to anger with understanding and compassion."
  },
  {
    _id: uuidv4(),
    content: "I am in control of my emotions and I choose peace over anger."
  },
  {
    _id: uuidv4(),
    content: "Anger is a feeling, it will pass, and I remain calm and centered."
  },
  {
    _id: uuidv4(),
    content: "I release my anger and embrace forgiveness and understanding."
  },
  {
    _id: uuidv4(),
    content: "I am more than this moment; I am calm, patient, and in control."
  },
  {
    _id: uuidv4(),
    content: "Every breath I take dissipates my anger and brings me peace."
  },
  {
    _id: uuidv4(),
    content: "I choose to seek peaceful and positive solutions to my frustrations."
  },
  {
    _id: uuidv4(),
    content: "My feelings are valid, but I control my reaction to them."
  },
  {
    _id: uuidv4(),
    content: "I am letting go of anger to make space for more peace and joy."
  },
  {
    _id: uuidv4(),
    content: "With each moment, I am moving towards greater patience and understanding."
  },
  {
    _id: uuidv4(),
    content: "I choose to heal rather than to hurt, to forgive rather than to fester."
  },
  {
    _id: uuidv4(),
    content: "I am stronger than my anger, and my calmness is my power."
  },
  {
    _id: uuidv4(),
    content: "I find strength in tranquility and clarity in calmness."
  },
  {
    _id: uuidv4(),
    content: "I let go of anger and welcome peace and positivity into my life."
  },
  {
    _id: uuidv4(),
    content: "My anger is a sign of my passion, but I channel it towards positive action."
  },
  {
    _id: uuidv4(),
    content: "I have the power to overcome anger and feel peace and serenity."
  },
  {
    _id: uuidv4(),
    content: "Anger is just a feeling, and like all feelings, it will pass."
  },
  {
    _id: uuidv4(),
    content: "I am learning to transform my anger into understanding and empathy."
  },
  {
    _id: uuidv4(),
    content: "Every calm breath I take reduces my anger and brings me peace."
  },
  {
    _id: uuidv4(),
    content: "I am in control of my emotions and choose harmony and balance."
  }
],
Stressed: [
  {
    _id: uuidv4(),
    content: "I have the strength to manage my stress and keep my peace."
  },
  {
    _id: uuidv4(),
    content: "With every breath, I release the stress inside me and become more calm."
  },
  {
    _id: uuidv4(),
    content: "I am capable of solving any problems that come my way."
  },
  {
    _id: uuidv4(),
    content: "I choose to let go of stress and embrace peace and relaxation."
  },
  {
    _id: uuidv4(),
    content: "I am in control of my schedule and my priorities, and I choose balance."
  },
  {
    _id: uuidv4(),
    content: "I give myself permission to step back and take a break when needed."
  },
  {
    _id: uuidv4(),
    content: "I am more than my stress; I am resilient and adaptable."
  },
  {
    _id: uuidv4(),
    content: "I focus on one task at a time, knowing each step leads to progress."
  },
  {
    _id: uuidv4(),
    content: "I am letting go of what I cannot control and focusing on what I can."
  },
  {
    _id: uuidv4(),
    content: "I find peace and joy in the simple moments of life."
  },
  {
    _id: uuidv4(),
    content: "I am deserving of a life free from overwhelming stress."
  },
  {
    _id: uuidv4(),
    content: "I trust in my ability to navigate through challenging situations calmly."
  },
  {
    _id: uuidv4(),
    content: "My mind is clear, my body is relaxed, and my spirit is at peace."
  },
  {
    _id: uuidv4(),
    content: "I embrace activities that help me relax and recharge."
  },
  {
    _id: uuidv4(),
    content: "I am learning to balance my responsibilities with my well-being."
  },
  {
    _id: uuidv4(),
    content: "I am stronger than the stress that I am currently facing."
  },
  {
    _id: uuidv4(),
    content: "I take things one step at a time and trust in the journey."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by peace, and I carry this tranquility with me."
  },
  {
    _id: uuidv4(),
    content: "I am in harmony with the rhythm of life and find ease in its flow."
  },
  {
    _id: uuidv4(),
    content: "Every challenge I face is an opportunity to grow stronger and more serene."
  }
],
Lonely: [
  {
    _id: uuidv4(),
    content: "I am at peace when I am alone and cherish this time with myself."
  },
  {
    _id: uuidv4(),
    content: "Loneliness is a feeling, not a fact. I am connected to the world around me."
  },
  {
    _id: uuidv4(),
    content: "In moments of solitude, I find strength and inner peace."
  },
  {
    _id: uuidv4(),
    content: "I am never truly alone; I am surrounded by love and support, seen and unseen."
  },
  {
    _id: uuidv4(),
    content: "I open my heart to new connections and cherish the ones I have."
  },
  {
    _id: uuidv4(),
    content: "Solitude gives me the opportunity to discover and reinvent myself."
  },
  {
    _id: uuidv4(),
    content: "I find comfort in my own company and use this time to rejuvenate."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of love and companionship, and I attract the right people into my life."
  },
  {
    _id: uuidv4(),
    content: "I am connected to a universe that is full of love and support."
  },
  {
    _id: uuidv4(),
    content: "I use moments of loneliness to grow stronger and more self-aware."
  },
  {
    _id: uuidv4(),
    content: "I embrace the quiet moments to connect with my inner self deeply."
  },
  {
    _id: uuidv4(),
    content: "Every day, I grow stronger in my ability to enjoy my own company."
  },
  {
    _id: uuidv4(),
    content: "I am open to the love and presence of others around me."
  },
  {
    _id: uuidv4(),
    content: "My alone time is a gift to myself, a space to recharge and reflect."
  },
  {
    _id: uuidv4(),
    content: "I am whole and complete in myself, and I welcome the connections that come my way."
  },
  {
    _id: uuidv4(),
    content: "I find peace in solitude and use it as a time for creativity and growth."
  },
  {
    _id: uuidv4(),
    content: "I am building a life filled with love, starting with the love I have for myself."
  },
  {
    _id: uuidv4(),
    content: "I use my feelings of loneliness as a catalyst to reach out and connect with others."
  },
  {
    _id: uuidv4(),
    content: "I am a magnet for positive relationships and meaningful connections."
  },
  {
    _id: uuidv4(),
    content: "Being alone does not mean being lonely; it's an opportunity to discover who I truly am."
  }
],
Overwhelmed: [
  {
    _id: uuidv4(),
    content: "I take one step at a time, knowing that progress is not always linear."
  },
  {
    _id: uuidv4(),
    content: "I am capable of managing my responsibilities one task at a time."
  },
  {
    _id: uuidv4(),
    content: "I prioritize self-care and mental health as I navigate through my tasks."
  },
  {
    _id: uuidv4(),
    content: "I release the need to do everything at once and focus on what's most important."
  },
  {
    _id: uuidv4(),
    content: "I am more than capable of handling what life brings my way."
  },
  {
    _id: uuidv4(),
    content: "I give myself permission to take breaks and recharge."
  },
  {
    _id: uuidv4(),
    content: "I am resilient and can adapt to challenges with grace and determination."
  },
  {
    _id: uuidv4(),
    content: "I trust that everything will work out in the right time and manner."
  },
  {
    _id: uuidv4(),
    content: "I am focused, organized, and calm as I tackle my to-do list."
  },
  {
    _id: uuidv4(),
    content: "I allow myself to let go of what I cannot control and focus on what I can."
  },
  {
    _id: uuidv4(),
    content: "I trust my journey and know that I am heading in the right direction."
  },
  {
    _id: uuidv4(),
    content: "I have the power to calm the storm within and find peace amidst chaos."
  },
  {
    _id: uuidv4(),
    content: "Each deep breath I take brings me more clarity and focus."
  },
  {
    _id: uuidv4(),
    content: "I choose to view challenges as opportunities to grow and evolve."
  },
  {
    _id: uuidv4(),
    content: "I am supported by those around me and am not alone in my struggles."
  },
  {
    _id: uuidv4(),
    content: "I embrace a mindset of peace and calm in all that I do."
  },
  {
    _id: uuidv4(),
    content: "I am confident in my ability to overcome any obstacle in my path."
  },
  {
    _id: uuidv4(),
    content: "I am grounded in the present moment, where peace resides."
  },
  {
    _id: uuidv4(),
    content: "I release the burden of overwhelm and embrace a sense of ease."
  },
  {
    _id: uuidv4(),
    content: "I am capable of navigating through life's complexities with grace and poise."
  }
],
Frustrated: [
  {
    _id: uuidv4(),
    content: "I channel my frustration into positive, productive action."
  },
  {
    _id: uuidv4(),
    content: "I am patient and understanding with myself during challenging moments."
  },
  {
    _id: uuidv4(),
    content: "I find constructive solutions to my frustrations."
  },
  {
    _id: uuidv4(),
    content: "I let go of what I cannot change and focus on what I can influence."
  },
  {
    _id: uuidv4(),
    content: "I maintain my calm and composure even when things don't go as planned."
  },
  {
    _id: uuidv4(),
    content: "I learn from my frustrations and use them as stepping stones to success."
  },
  {
    _id: uuidv4(),
    content: "I recognize my triggers and take proactive steps to stay balanced."
  },
  {
    _id: uuidv4(),
    content: "I am in control of my reactions and choose responses that serve me well."
  },
  {
    _id: uuidv4(),
    content: "I use my energy to create positive changes instead of dwelling on frustration."
  },
  {
    _id: uuidv4(),
    content: "I take a step back to gain perspective and return with renewed focus."
  },
  {
    _id: uuidv4(),
    content: "I recognize my frustrations as signs pointing me towards needed changes."
  },
  {
    _id: uuidv4(),
    content: "I embrace my feelings but choose to focus on solutions and progress."
  },
  {
    _id: uuidv4(),
    content: "I am learning to transform frustration into motivation and action."
  },
  {
    _id: uuidv4(),
    content: "I release the need for immediate results and trust in the process."
  },
  {
    _id: uuidv4(),
    content: "My challenges are making me stronger, wiser, and more resilient."
  },
  {
    _id: uuidv4(),
    content: "I find strength in calmness and clarity in moments of stillness."
  },
  {
    _id: uuidv4(),
    content: "I choose to let go of frustrations and focus on the positives in my life."
  },
  {
    _id: uuidv4(),
    content: "I am mastering the art of patience and understanding in the face of difficulties."
  },
  {
    _id: uuidv4(),
    content: "Every challenge is a stepping stone towards my growth and success."
  },
  {
    _id: uuidv4(),
    content: "I am equipped with all I need to overcome hurdles and reach my goals."
  }
],
Disappointed: [
  {
    _id: uuidv4(),
    content: "I accept that disappointment is part of life and I grow stronger from it."
  },
  {
    _id: uuidv4(),
    content: "I let go of expectations and embrace the journey of the unknown."
  },
  {
    _id: uuidv4(),
    content: "I find the lesson in every disappointment and use it to move forward."
  },
  {
    _id: uuidv4(),
    content: "I trust that better things are on their way and remain hopeful."
  },
  {
    _id: uuidv4(),
    content: "I focus on the things that bring me joy and fulfillment."
  },
  {
    _id: uuidv4(),
    content: "I understand that setbacks are not the end, but opportunities to learn."
  },
  {
    _id: uuidv4(),
    content: "I maintain a positive outlook even when things don't go as planned."
  },
  {
    _id: uuidv4(),
    content: "I am resilient in the face of challenges and bounce back with vigor."
  },
  {
    _id: uuidv4(),
    content: "I am patient with myself and know that good things take time."
  },
  {
    _id: uuidv4(),
    content: "I keep moving forward, knowing that every experience is a part of my growth."
  },
  {
    _id: uuidv4(),
    content: "I embrace change and stay open to new possibilities and opportunities."
  },
  {
    _id: uuidv4(),
    content: "I am learning that sometimes the best is yet to come, in ways I might not expect."
  },
  {
    _id: uuidv4(),
    content: "I choose to find joy and value in the present moment, regardless of circumstances."
  },
  {
    _id: uuidv4(),
    content: "I am resilient in the face of setbacks and know that they lead to greater things."
  },
  {
    _id: uuidv4(),
    content: "I recognize that disappointment is part of life's journey, not its end."
  },
  {
    _id: uuidv4(),
    content: "I focus on gratitude for what I have, knowing it paves the path for more."
  },
  {
    _id: uuidv4(),
    content: "Every experience, good or bad, is a valuable part of my story."
  },
  {
    _id: uuidv4(),
    content: "I allow myself to feel my emotions, but also to move beyond them."
  },
  {
    _id: uuidv4(),
    content: "I am in charge of my happiness and choose to find joy every day."
  },
  {
    _id: uuidv4(),
    content: "Disappointments are just life's way of setting me up for something better."
  }
],
Grateful: [
  {
    _id: uuidv4(),
    content: "I am thankful for every moment and treasure the gifts life offers me."
  },
  {
    _id: uuidv4(),
    content: "Gratitude fills my heart and shapes my perspective towards positivity."
  },
  {
    _id: uuidv4(),
    content: "I appreciate the beauty in small moments and simple pleasures."
  },
  {
    _id: uuidv4(),
    content: "Every day, I find something new to be grateful for."
  },
  {
    _id: uuidv4(),
    content: "I am blessed with so much, and I am deeply thankful for it all."
  },
  {
    _id: uuidv4(),
    content: "Gratitude turns what I have into enough, and more."
  },
  {
    _id: uuidv4(),
    content: "I live in a state of thankfulness, recognizing the abundance around me."
  },
  {
    _id: uuidv4(),
    content: "My heart is open to the endless blessings that surround me."
  },
  {
    _id: uuidv4(),
    content: "With gratitude, I recognize and appreciate the love in my life."
  },
  {
    _id: uuidv4(),
    content: "Gratitude is my natural state of being, and it guides my choices and actions."
  },
  {
    _id: uuidv4(),
    content: "I express my gratitude for health, happiness, and the love I receive."
  },
  {
    _id: uuidv4(),
    content: "Every experience is a gift, and for this, I am grateful."
  },
  {
    _id: uuidv4(),
    content: "Gratefulness anchors me in the present and enriches my life."
  },
  {
    _id: uuidv4(),
    content: "I am thankful for my journey and all it has taught me."
  },
  {
    _id: uuidv4(),
    content: "Each day, I am grateful for another opportunity to make a difference."
  },
  {
    _id: uuidv4(),
    content: "Gratitude opens the door to abundance and joy in my life."
  },
  {
    _id: uuidv4(),
    content: "I am thankful for the people in my life who love and support me."
  },
  {
    _id: uuidv4(),
    content: "Gratitude fills my mind with peace and my heart with warmth."
  },
  {
    _id: uuidv4(),
    content: "I cherish the present and honor my past with gratitude."
  },
  {
    _id: uuidv4(),
    content: "Thankfulness leads me to a positive and fulfilling life."
  }
],
Exhausted: [
  {
    _id: uuidv4(),
    content: "I give myself permission to rest and recharge without guilt."
  },
  {
    _id: uuidv4(),
    content: "My body and mind deserve rest, and I honor them by taking time to relax."
  },
  {
    _id: uuidv4(),
    content: "Even in exhaustion, I am taking steps towards growth and renewal."
  },
  {
    _id: uuidv4(),
    content: "Rest is a form of self-respect, and I treat myself with kindness."
  },
  {
    _id: uuidv4(),
    content: "I listen to my body's need for rest and respond with loving care."
  },
  {
    _id: uuidv4(),
    content: "Every breath I take fills me with peace and rejuvenates my spirit."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of rest, and I embrace moments of relaxation."
  },
  {
    _id: uuidv4(),
    content: "I release all tension with each exhale and invite calm with each inhale."
  },
  {
    _id: uuidv4(),
    content: "Rest and recovery are essential for my strength and well-being."
  },
  {
    _id: uuidv4(),
    content: "I am patient with myself and understand that rest is part of progress."
  },
  {
    _id: uuidv4(),
    content: "I find strength in my moments of rest, knowing they are necessary for balance."
  },
  {
    _id: uuidv4(),
    content: "I am learning to balance activity with restfulness for overall harmony."
  },
  {
    _id: uuidv4(),
    content: "In rest, I find the energy to pursue my dreams with renewed vigor."
  },
  {
    _id: uuidv4(),
    content: "I trust the natural rhythms of my body to guide my need for rest."
  },
  {
    _id: uuidv4(),
    content: "I honor my need for downtime, recognizing it as a path to rejuvenation."
  },
  {
    _id: uuidv4(),
    content: "I am gentle with myself and recognize when to step back and rest."
  },
  {
    _id: uuidv4(),
    content: "Rest is a gift I give myself, and I accept it with gratitude."
  },
  {
    _id: uuidv4(),
    content: "I allow myself moments of stillness to restore my energy."
  },
  {
    _id: uuidv4(),
    content: "Every restful moment is an investment in my future energy and productivity."
  },
  {
    _id: uuidv4(),
    content: "In resting, I am preparing myself for future success and happiness."
  }
],
Insecure: [
  {
    _id: uuidv4(),
    content: "I am enough just as I am, and I embrace my true self with confidence."
  },
  {
    _id: uuidv4(),
    content: "Insecurity is a feeling, not a fact, and I am capable and worthy."
  },
  {
    _id: uuidv4(),
    content: "I release self-doubt and welcome self-assurance."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of respect and acceptance from myself and others."
  },
  {
    _id: uuidv4(),
    content: "I believe in my abilities and trust my instincts."
  },
  {
    _id: uuidv4(),
    content: "I am proud of who I am and all that I have accomplished."
  },
  {
    _id: uuidv4(),
    content: "Each day, I grow more confident and secure in my identity."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by love and positivity that boosts my self-esteem."
  },
  {
    _id: uuidv4(),
    content: "I am a unique individual with incredible value and potential."
  },
  {
    _id: uuidv4(),
    content: "My insecurities do not define me; my strength and courage do."
  },
  {
    _id: uuidv4(),
    content: "I am deserving of success, love, and happiness."
  },
  {
    _id: uuidv4(),
    content: "I stand tall and proud, embracing my strengths and weaknesses alike."
  },
  {
    _id: uuidv4(),
    content: "I replace fear of the unknown with curiosity and openness."
  },
  {
    _id: uuidv4(),
    content: "I am a work in progress, and every step forward is a victory."
  },
  {
    _id: uuidv4(),
    content: "I am secure in my worth and unapologetically myself."
  },
  {
    _id: uuidv4(),
    content: "I am confident in my path and trust that I am heading in the right direction."
  },
  {
    _id: uuidv4(),
    content: "I embrace my journey, learning from each experience with a strong heart."
  },
  {
    _id: uuidv4(),
    content: "I am resilient, capable"
  }
],
Nervous: [
  {
    _id: uuidv4(),
    content: "I am calm and centered, even in challenging situations."
  },
  {
    _id: uuidv4(),
    content: "I trust in my ability to handle what comes my way."
  },
  {
    _id: uuidv4(),
    content: "Every deep breath I take brings me peace and clarity."
  },
  {
    _id: uuidv4(),
    content: "I am stronger than my nervousness, and I can overcome it."
  },
  {
    _id: uuidv4(),
    content: "I choose to focus on the present and let go of anxiety about the future."
  },
  {
    _id: uuidv4(),
    content: "My fears do not control me; I control them."
  },
  {
    _id: uuidv4(),
    content: "I am prepared and capable of facing any challenge."
  },
  {
    _id: uuidv4(),
    content: "I replace my nervous thoughts with positive, reassuring ones."
  },
  {
    _id: uuidv4(),
    content: "I am relaxed, confident, and in control."
  },
  {
    _id: uuidv4(),
    content: "I embrace my experiences with calmness and confidence."
  },
  {
    _id: uuidv4(),
    content: "With each passing moment, my nerves are calming."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of a peaceful and serene state of mind."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by an aura of calm and assurance."
  },
  {
    _id: uuidv4(),
    content: "Nervousness is just a feeling; it will pass, and I will be okay."
  },
  {
    _id: uuidv4(),
    content: "I am the master of my emotions, and I choose tranquility."
  },
  {
    _id: uuidv4(),
    content: "I trust in the journey of life and let go of fear and worry."
  },
  {
    _id: uuidv4(),
    content: "I am at peace and nothing can disturb my calm spirit."
  },
  {
    _id: uuidv4(),
    content: "I face uncertainty with courage and a positive outlook."
  },
  {
    _id: uuidv4(),
    content: "My inner strength is greater than any feeling of nervousness."
  },
  {
    _id: uuidv4(),
    content: "I am grounded in the present, where peace resides."
  }
],
Hopeless: [
  {
    _id: uuidv4(),
    content: "I hold hope in my heart, even in the darkest moments."
  },
  {
    _id: uuidv4(),
    content: "There is always a light at the end of the tunnel, and I am moving towards it."
  },
  {
    _id: uuidv4(),
    content: "I believe in new beginnings and fresh starts."
  },
  {
    _id: uuidv4(),
    content: "Every challenge is a doorway to new possibilities."
  },
  {
    _id: uuidv4(),
    content: "I am resilient, and my spirit cannot be broken."
  },
  {
    _id: uuidv4(),
    content: "I find strength in my ability to survive and thrive."
  },
  {
    _id: uuidv4(),
    content: "I trust that better days are ahead, and I move towards them with hope."
  },
  {
    _id: uuidv4(),
    content: "I am deserving of a bright and fulfilling future."
  },
  {
    _id: uuidv4(),
    content: "I embrace the lessons of my journey and look forward to what's next."
  },
  {
    _id: uuidv4(),
    content: "My potential is limitless, and my future is bright."
  },
  {
    _id: uuidv4(),
    content: "I am a beacon of hope and positivity."
  },
  {
    _id: uuidv4(),
    content: "I release despair and welcome optimism and resilience."
  },
  {
    _id: uuidv4(),
    content: "I have the power to create change and bring joy into my life."
  },
  {
    _id: uuidv4(),
    content: "Even in despair, I find reasons to be hopeful and grateful."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by support, love, and endless possibilities."
  },
  {
    _id: uuidv4(),
    content: "I choose to see the beauty and potential in every day."
  },
  {
    _id: uuidv4(),
    content: "I am capable of rising above my circumstances and finding joy."
  },
  {
    _id: uuidv4(),
    content: "My heart is filled with courage, hope, and the will to continue."
  },
  {
    _id: uuidv4(),
    content: "I am a survivor, and my spirit is unbreakable."
  },
  {
    _id: uuidv4(),
    content: "Hope guides me through life's challenges towards a brighter tomorrow."
  }
],
Jealous: [
  {
    _id: uuidv4(),
    content: "I focus on my own journey and celebrate my unique path."
  },
  {
    _id: uuidv4(),
    content: "I am content with who I am and what I have."
  },
  {
    _id: uuidv4(),
    content: "I let go of comparisons and embrace my individuality."
  },
  {
    _id: uuidv4(),
    content: "My worth is not determined by others but by my own self-love."
  },
  {
    _id: uuidv4(),
    content: "I replace envy with admiration and learn from the success of others."
  },
  {
    _id: uuidv4(),
    content: "I am grateful for my life and all its blessings."
  },
  {
    _id: uuidv4(),
    content: "I am focused on my own growth and achievements."
  },
  {
    _id: uuidv4(),
    content: "I am happy for others and their accomplishments."
  },
  {
    _id: uuidv4(),
    content: "Jealousy does not control me; I am in control of my emotions."
  },
  {
    _id: uuidv4(),
    content: "I am secure in myself and need not compare myself to others."
  },
  {
    _id: uuidv4(),
    content: "I am a work in progress, and I am proud of where I am."
  },
  {
    _id: uuidv4(),
    content: "I celebrate the success of others, knowing my time will come."
  },
  {
    _id: uuidv4(),
    content: "I am on my own path, and it is filled with potential and promise."
  },
  {
    _id: uuidv4(),
    content: "I find joy in my own accomplishments and in those of others."
  },
  {
    _id: uuidv4(),
    content: "I am confident in my abilities and my journey."
  },
  {
    _id: uuidv4(),
    content: "I am too busy working on my own grass to notice if someone else's is greener."
  },
  {
    _id: uuidv4(),
    content: "My self-worth is independent of others' achievements."
  },
  {
    _id: uuidv4(),
    content: "I am complete in myself and do not need to compare my life to others."
  },
  {
    _id: uuidv4(),
    content: "Every person has their own journey, and I respect and honor mine."
  },
  {
    _id: uuidv4(),
    content: "I let go of jealousy and open my heart to genuine happiness for others."
  }
],
Lost: [
  {
    _id: uuidv4(),
    content: "I trust the journey, even when I do not understand it."
  },
  {
    _id: uuidv4(),
    content: "Every step I take is leading me to where I need to be."
  },
  {
    _id: uuidv4(),
    content: "I am capable of navigating through life's challenges."
  },
  {
    _id: uuidv4(),
    content: "I am open to new paths and experiences."
  },
  {
    _id: uuidv4(),
    content: "My journey is unique and special."
  },
  {
    _id: uuidv4(),
    content: "I am learning and growing every day."
  },
  {
    _id: uuidv4(),
    content: "I am guided by inner wisdom and intuition."
  },
  {
    _id: uuidv4(),
    content: "I believe in my ability to overcome obstacles."
  },
  {
    _id: uuidv4(),
    content: "Every experience is part of my journey."
  },
  {
    _id: uuidv4(),
    content: "I am worthy of finding my way."
  },
  {
    _id: uuidv4(),
    content: "I am patient with myself as I explore new directions."
  },
  {
    _id: uuidv4(),
    content: "I find strength in my ability to adapt."
  },
  {
    _id: uuidv4(),
    content: "I trust that I am on the right path, even if it feels uncertain."
  },
  {
    _id: uuidv4(),
    content: "My potential is limitless, even when I feel lost."
  },
  {
    _id: uuidv4(),
    content: "I am surrounded by opportunities to find my way."
  },
  {
    _id: uuidv4(),
    content: "I embrace the unknown as a chance to grow."
  },
  {
    _id: uuidv4(),
    content: "I am resilient and can handle life's twists and turns."
  },
  {
    _id: uuidv4(),
    content: "I am confident in my decisions, even in uncertainty."
  },
  {
    _id: uuidv4(),
    content: "I am not alone in my journey."
  },
  {
    _id: uuidv4(),
    content: "I find peace in knowing that everything will work out."
  }
],
};

const GeneratedQuotes = ({ selectedEmotion, user }) => {
  const [quotes, setQuotes] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [savedAffirmations, setSavedAffirmations] = useState(user?.savedAffirmations || []);

  const [saveAffirmationMutation] = useMutation(SAVE_AFFIRMATION);
  const [unsaveAffirmationMutation] = useMutation(UNSAVE_AFFIRMATION);

  useEffect(() => {
    if (selectedEmotion) {
      fetchQuotes(selectedEmotion);
    }
  }, [selectedEmotion]);

  const fetchQuotes = (emotion) => {
    console.log(quotesData);
    // Simulate fetching and randomly selecting 3 quotes
    const emotionQuotes = quotesData[emotion] || [];
    const shuffledQuotes = emotionQuotes
      .map(quote => ({ ...quote, id: uuidv4() })) // Assign a unique ID to each quote
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 3); // Select first 3 elements
    setQuotes(shuffledQuotes);
  };

  const handleSave = async (quoteId) => {
    console.log({quoteId});
    console.log({user});
    console.log(user._id);
    if (!user || !user._id) {
      console.error('User not logged in');
      return;
    }

    try {
      await saveAffirmationMutation({
        variables: { userId: user._id, affirmationId: quoteId },
      });
      setSavedAffirmations((prev) => [...prev, quoteId]);
    } catch (error) {
      console.error('Error saving affirmation:', error);
    }
  };

  const handleUnsave = async (quoteId) => {
    if (!user || !user._id) {
      console.error('User not logged in');
      return;
    }

    try {
      await unsaveAffirmationMutation({
        variables: { userId: user._id, affirmationId: quoteId },
      });
      setSavedAffirmations((prev) => prev.filter((id) => id !== quoteId));
    } catch (error) {
      console.error('Error unsaving affirmation:', error);
    }
  };

  return (
    <div>
      {quotes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedEmotion}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white p-4 shadow-md rounded-lg h-full">
                <p className="text-lg">{quote.content}</p>
                {user && (
                  <button
                    onClick={() => savedAffirmations.includes(quote.id) ? handleUnsave(quote.id) : handleSave(quote.id)}
                    className={`mt-2 py-2 px-4 text-white rounded transition duration-300 ${savedAffirmations.includes(quote.id) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                  >
                    {savedAffirmations.includes(quote.id) ? 'Unsave' : 'Save'}
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
          {showSaved && savedAffirmations.map((id) => {
            const savedQuote = quotes.find((q) => q.id === id);
            return (
              savedQuote && (
                <div key={id} className="bg-white p-4 shadow-md rounded-lg mt-4">
                  <p className="text-lg">{savedQuote.content}</p>
                  <button
                    onClick={() => handleUnsave(id)}
                    className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                  >
                    Unsave
                  </button>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GeneratedQuotes;
