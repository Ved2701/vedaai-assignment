import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface QuestionType {
  type: string;
  questions: number;
  marks: number;
}

interface GenerateAssignmentParams {

  subject: string;

  classLevel: string;

  additionalInfo: string;

  questionTypes: QuestionType[];
}

export const generateAssignment =
  async ({
    subject,
    classLevel,
    additionalInfo,
    questionTypes,
  }: GenerateAssignmentParams) => {

    const formattedQuestions =
      questionTypes
        .map(
          (q) =>
            `${q.type} - ${q.questions} questions of ${q.marks} marks`
        )
        .join("\n");

    const totalMarks =
      questionTypes.reduce(
        (acc, curr) =>
          acc + curr.questions * curr.marks,
        0
      );

    const prompt = `
You are an expert CBSE school exam paper setter.

Your task is to generate a HIGH-QUALITY, REALISTIC, and STRICTLY SUBJECT-SPECIFIC school examination paper.

━━━━━━━━━━━━━━━━━━━━━━━
SUBJECT:
${subject}

CLASS:
${classLevel}

TOTAL MARKS:
${totalMarks}
━━━━━━━━━━━━━━━━━━━━━━━

IMPORTANT RULES:

- ALL questions MUST belong ONLY to ${subject}
- Questions MUST strictly match the academic level of Class ${classLevel}
- Questions should feel like a REAL CBSE school examination
- Questions should be conceptually strong and educationally meaningful
- Maintain a proper progression from easy → medium → hard
- Include analytical, conceptual, application-based, and real-world questions wherever appropriate
- Avoid repetitive questions or repeated concepts
- Avoid vague, generic, or low-quality questions
- Avoid extremely trivial textbook-definition questions unless necessary
- Ensure marks distribution feels natural and balanced
- Use proper educational and subject-specific terminology
- Questions should test understanding, not just memorization

━━━━━━━━━━━━━━━━━━━━━━━
STRICT SUBJECT ENFORCEMENT
━━━━━━━━━━━━━━━━━━━━━━━

Every single question MUST directly relate to ${subject}.

VERY IMPORTANT:

- DO NOT include unrelated subjects
- DO NOT include generic aptitude questions
- DO NOT mix Mathematics into Science unless scientifically required
- DO NOT mix Science into English
- DO NOT mix History into Geography
- DO NOT generate random school questions

Subject-specific rules:

IF SUBJECT = Science:
- include only Physics, Chemistry, Biology concepts
- numerical questions allowed ONLY when scientifically relevant
- NO pure mathematics aptitude questions

IF SUBJECT = Mathematics:
- include calculations, equations, word problems, reasoning, and application-based numericals

IF SUBJECT = English:
- include grammar, literature, comprehension, writing skills, vocabulary
- NO science or mathematics concepts

IF SUBJECT = Social Science:
- include civics, history, geography, economics concepts appropriately

━━━━━━━━━━━━━━━━━━━━━━━
QUESTION DISTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━

${formattedQuestions}

━━━━━━━━━━━━━━━━━━━━━━━
SECTION FORMAT
━━━━━━━━━━━━━━━━━━━━━━━

Generate sections EXACTLY in this format:

Section A → MCQs
Section B → Short Answer Questions
Section C → Long Answer Questions
Section D → Application/Numerical/Case Study Questions

Each section should contain:
- proper title
- proper instruction
- properly grouped questions

━━━━━━━━━━━━━━━━━━━━━━━
QUESTION REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━

For EACH question include:

- question
- difficulty
- marks

For MCQs ALSO include:
- options

Difficulty must ONLY be:
- Easy
- Medium
- Hard

MCQ options should:
- look realistic
- not be obviously wrong
- contain meaningful distractors

Application/numerical questions should:
- test reasoning
- test real understanding
- not feel random

━━━━━━━━━━━━━━━━━━━━━━━
ADDITIONAL INSTRUCTIONS
━━━━━━━━━━━━━━━━━━━━━━━

${additionalInfo}

━━━━━━━━━━━━━━━━━━━━━━━
OUTPUT RULES
━━━━━━━━━━━━━━━━━━━━━━━

- Return ONLY valid JSON
- DO NOT include markdown
- DO NOT include explanation text
- DO NOT include comments
- DO NOT include headings outside JSON
- DO NOT include \`\`\`json
- Response must be directly parsable using JSON.parse()

━━━━━━━━━━━━━━━━━━━━━━━
REQUIRED JSON FORMAT
━━━━━━━━━━━━━━━━━━━━━━━

{
  "sections": [
    {
      "title": "Section A: MCQs",
      "instruction": "Attempt all questions.",
      "questions": [
        {
          "question": "What is photosynthesis?",
          "difficulty": "Easy",
          "marks": 1,
          "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ]
        }
      ]
    }
  ]
}
`;

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.3,
      });

    const content =
      response.choices[0]?.message?.content;

    if (!content) {
      throw new Error(
        "No AI response generated"
      );
    }

    const cleanedContent =
      content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleanedContent);
  };