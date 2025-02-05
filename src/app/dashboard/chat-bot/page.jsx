"use client";

import { useState, useEffect } from "react";
import ChatBotComponent from "@/components/ChatBotComponent";
import { useUserStore } from "@/store";
import { pause } from "@/lib/utils";

export default function ChatBotPage() {
  const [listChat, setListChat] = useState([
    { message: "Halo, ada yang bisa saya bantu?", sender: "bot" },
  ]);
  const { users } = useUserStore();

  const sendChat = async (message) => {
    try {
      const chat = [
        {
          message,
          sender: "user",
        },
      ];
      setListChat([...listChat, ...chat]);
      await pause(500);

      const agent_id = process.env.NEXT_PUBLIC_BOT_AGENT_ID;
      const payload = {
        query: message,
        agent_id,
        user_uuid: users.id,
        extra: {},
      };
      const token = process.env.NEXT_PUBLIC_BOT_TOKEN;
      const response = await fetch("https://stag-saas.cakra.ai/api/bot/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      const res = [{ message: json.response, sender: "bot" }];
      setListChat([...listChat, ...chat, ...res]);
    } catch (error) {
      cl(error);
      throw error;
    }
  };
  return <ChatBotComponent {...{ listChat, sendChat }} />;
}
