"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Copy, CornerDownLeft, Mic, Paperclip, RefreshCcw } from "lucide-react";

const messages = [
  {
    id: 1,
    message:
      "Halo chat bot. Untuk bulan lalu, berapa total pengaduan yang masuk?",
    sender: "user",
  },
  {
    id: 2,
    message:
      "Halo, selamat datang di chat bot. Mohon tunggu sebentar data sedang disiapkan.",
    sender: "bot",
  },
  {
    id: 3,
    message: "",
    sender: "bot",
    isLoading: true,
  },
];

const actionIcons = [
  { icon: Copy, type: "Copy" },
  { icon: RefreshCcw, type: "Regenerate" },
];

export default function ChatBotComponent({ listChat, sendChat }) {
  const chatMsg = useRef(null);

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Chat Bot</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardContent>
            <div className="flex h-max w-full flex-col items-center mx-auto">
              <div className="flex-1 w-full overflow-y-auto py-6">
                <ChatMessageList>
                  {/* Messages */}
                  {listChat.map((message, index) => {
                    const variant =
                      message.sender === "user" ? "sent" : "received";
                    return (
                      <ChatBubble key={index} variant={variant}>
                        <ChatBubbleAvatar
                          fallback={variant === "sent" ? "GH" : "AI"}
                        />
                        <ChatBubbleMessage isLoading={message.isLoading}>
                          {message.message}
                        </ChatBubbleMessage>
                        {/* Action Icons */}
                        <ChatBubbleActionWrapper>
                          {actionIcons.map(({ icon: Icon, type }) => (
                            <ChatBubbleAction
                              className="size-7"
                              key={type}
                              icon={<Icon className="size-4" />}
                              onClick={() =>
                                console.log(
                                  "Action " +
                                    type +
                                    " clicked for message " +
                                    index
                                )
                              }
                            />
                          ))}
                        </ChatBubbleActionWrapper>
                      </ChatBubble>
                    );
                  })}
                </ChatMessageList>
              </div>

              {/* Form and Footer fixed at the bottom */}
              <div className="w-full px-4 pb-4">
                <div className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1">
                  <ChatInput
                    ref={chatMsg}
                    placeholder="Type your message here..."
                    className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
                  />
                  <div className="flex items-center p-3 pt-0">
                    {/* <Button variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>

                    <Button variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button> */}

                    <Button
                      onClick={() => {
                        sendChat(chatMsg.current.value);
                        chatMsg.current.value = "";
                      }}
                      size="sm"
                      className="ml-auto gap-1.5"
                    >
                      Send Message
                      <CornerDownLeft className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
