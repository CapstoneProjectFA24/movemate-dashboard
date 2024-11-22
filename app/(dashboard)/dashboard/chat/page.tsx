import React from "react";
import { Mail } from "./_components/chat";
import { mails } from "./data";
import { cookies } from "next/headers";
const ChatPage = () => {
  const layout = cookies().get("react-resizable-panels:layout:mail");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <div className="hidden flex-col md:flex">
      <Mail
        mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      />
    </div>
  );
};

export default ChatPage;
