export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

// // API CreateMessage
// export type CreateMessageResponseSucess = {
//   result: "success";
//   message: string;
// };

// export type CreateMessageResponseError = {
//   result: "error";
//   error: Error | unknown;
// };

// export type CreateMessageResponse =
//   | CreateMessageResponseSucess
//   | CreateMessageResponseError;
