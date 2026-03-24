"use client";

const CodeSnippet = () => {
  return (
    <div className="bg-[#141a27] rounded-xl p-4 w-full max-w-md shadow-lg">
      {/* Top bar (dots + progress line) */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a36b6b]" />
          <span className="w-3 h-3 rounded-full bg-[#3f8f8b]" />
          <span className="w-3 h-3 rounded-full bg-[#5f7f99]" />
        </div>
      </div>

      {/* Code content */}
      <div className="font-mono text-sm leading-relaxed">
        <p>
          <span className="text-primary">git commit -m</span>{" "}
          <span className="text-gray-200">"feat: architect_onboarding"</span>
        </p>

        <p className="text-gray-400 mt-2">Waiting for user authentication...</p>
      </div>
    </div>
  );
};

export default CodeSnippet;
