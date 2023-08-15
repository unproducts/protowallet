import { ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate } from 'langchain/prompts';
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

import { loadPDFDocument } from '../toolkit/doc-load';

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a financial analyst extract transactions from a PDF bank statement.
    Return output in following JSON format:
    [{format}]
    Return ONLY OUTPUT, don't return anything else.
    `
  ),
  HumanMessagePromptTemplate.fromTemplate("{text}"),
]);

export async function extractTransactions(blob: Blob, openAiKey: string): Promise<void> {
  const doc = await loadPDFDocument(blob);
  const llm = new ChatOpenAI({ modelName:'gpt-3.5-turbo-16k', temperature: 0, openAIApiKey: openAiKey });
  const chainB = new LLMChain({
    prompt: chatPrompt,
    llm: llm,
  });
  // const resB = await chainB.call({
  //   format: `{ "date": "YYYY-MM-DD", "description": "string", "amount": 0.0" "type": "D if debit, C if credit" }`,
  //   text: doc.pageContent,
  // });
  const res = JSON
  console.log(resB);
}
