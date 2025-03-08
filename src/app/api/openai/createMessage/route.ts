import { Message } from "@/lib/types";
import { SYSTEM_MSG_CREATE_MESSAGE } from "@/lib/variables";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/", //openAI로 바꿀 땐 이 줄은 그냥 지우면 됨
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = (await req.json()) as { messages: Message[] };

    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        { role: "system", content: SYSTEM_MSG_CREATE_MESSAGE }, // 시스템 메시지를 변수로 관리하여 넣어줌
        ...messages, // messages를 풀어서 넣어줌(전개 연산자)
      ],
    });

    console.log(response.choices[0]);

    return NextResponse.json({
      result: "success",
      message: response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      result: "error",
      error,
    });
  }
}
