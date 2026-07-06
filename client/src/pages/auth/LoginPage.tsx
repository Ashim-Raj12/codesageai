import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export const LoginPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        appearance={{
          variables: {
            colorPrimary: '#8b5cf6', // violet-500
            colorBackground: '#09090b', // zinc-950
            colorInputBackground: '#09090b', // zinc-950
            colorInputText: '#f4f4f5', // zinc-100
            colorText: '#f4f4f5', // zinc-100
            colorTextSecondary: '#a1a1aa', // zinc-400
            colorBorder: '#27272a', // zinc-800
            colorTextOnPrimaryBackground: '#ffffff',
            borderRadius: '0.75rem', // rounded-xl
          },
          elements: {
            rootBox: "w-full flex justify-center",
            card: "bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-xl rounded-xl w-full max-w-sm p-4",
            headerTitle: "text-zinc-50 font-bold text-lg tracking-tight",
            headerSubtitle: "text-zinc-400 text-xs",
            socialButtonsBlockButton: "bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 py-1.5 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer",
            socialButtonsBlockButtonText: "text-zinc-300 font-medium text-xs",
            socialButtonsProviderIcon__github: "brightness-0 invert",
            dividerLine: "bg-zinc-800",
            dividerText: "text-zinc-500 font-semibold text-[10px] uppercase tracking-wider",
            formFieldLabel: "text-zinc-400 text-[10px] font-semibold uppercase tracking-wider",
            formFieldInput: "bg-zinc-900 border border-zinc-800 focus:border-violet-500 text-zinc-100 rounded-lg py-1.5 px-3 text-xs focus:ring-1 focus:ring-violet-500 outline-none transition-colors",
            formButtonPrimary: "bg-violet-600 hover:bg-violet-500 text-white border border-violet-500/20 text-xs font-semibold py-2 rounded-lg shadow-md transition-colors cursor-pointer",
            footer: "bg-zinc-950 text-zinc-400 border-t border-zinc-900/50",
            footerActionText: "text-zinc-400 text-xs",
            footerActionLink: "text-violet-400 hover:text-violet-300 hover:underline text-xs font-semibold",
            identityPreviewText: "text-zinc-300",
            identityPreviewEditButtonIcon: "text-violet-400 hover:text-violet-300",
            alertText: "text-red-400 text-xs",
            alert: "bg-red-950/20 border border-red-500/20 rounded-lg p-3 text-xs text-red-400",
          }
        }}
      />
    </div>
  );
};
